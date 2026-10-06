"""Profesionální vyříznutí postavy z originálu:
1) retuš trička v plném rozlišení (vyhlazení struktury úpletu → bez moaré),
2) maska BiRefNet: celá postava + zvlášť hlava a ramena (víc detailu ve vlasech),
3) zpřesnění hran alpha mattingem (pymatting, closed-form) v pásu kolem okraje,
4) dekontaminace barev na okraji (pryč šedý lem studiového pozadí),
5) uložení: pracovní 3600 px (pro web) + plné rozlišení (archiv).
Použití: python matte.py <id> [<id> ...]"""
import sys, time
import numpy as np, cv2
from PIL import Image, ImageOps, ImageFilter
from rembg import remove, new_session
from pymatting import estimate_alpha_cf, estimate_foreground_ml

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis\fotky-nove"
ORIG = {"252": "2026-09-23-99999_252.jpg", "259": "2026-09-23-99999_259.jpg", "312": "2026-09-23-99999_312.jpg",
        "325": "2026-09-23-99999_325.jpg", "330": "2026-09-23-99999_330  .jpg"}
WORK_H = 3600
sess = new_session("birefnet-portrait")


def retouch_shirt(o, alpha_full):
    hsv = np.asarray(o.convert("HSV"), dtype=np.float32)
    h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
    shirt = (h > 185) & (h < 230) & (s > 0.07) & (s < 0.65) & (v > 0.40) & (alpha_full > 200)
    m = Image.fromarray((shirt * 255).astype(np.uint8))
    m = m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MinFilter(9))
    m = m.filter(ImageFilter.GaussianBlur(6))
    return Image.composite(o.filter(ImageFilter.GaussianBlur(2.2)), o, m), m


def model_mask(img):
    return np.asarray(remove(img, session=sess, only_mask=True), dtype=np.float32) / 255


for src in sys.argv[1:]:
    t0 = time.time()
    o = ImageOps.exif_transpose(Image.open(f"{ROOT}/{ORIG[src]}")).convert("RGB")
    W0, H0 = o.size
    f = WORK_H / H0
    ws = (round(W0 * f), WORK_H)

    # 1) hrubá maska na pracovním rozlišení (celá postava)
    work0 = o.resize(ws, Image.LANCZOS)
    a = model_mask(work0)

    # 2) hlava a ramena zvlášť → model vidí detail ve větším měřítku
    ys, xs = np.where(a > 0.5)
    top, bot, left, right = ys.min(), ys.max(), xs.min(), xs.max()
    ch = int((bot - top) * 0.38)
    cx0, cx1 = max(0, left - 60), min(ws[0], right + 60)
    cy0, cy1 = max(0, top - 80), min(ws[1], top + ch)
    crop = o.crop((round(cx0 / f), round(cy0 / f), round(cx1 / f), round(cy1 / f)))
    ac = model_mask(crop)
    ac = cv2.resize(ac, (cx1 - cx0, cy1 - cy0), interpolation=cv2.INTER_LINEAR)
    wgt = np.ones_like(ac)
    ramp = min(120, (cy1 - cy0) // 4)
    wgt[-ramp:, :] = np.linspace(1, 0, ramp)[:, None]          # dole plynulý přechod do celé postavy
    a[cy0:cy1, cx0:cx1] = a[cy0:cy1, cx0:cx1] * (1 - wgt) + ac * wgt

    # 3) retuš trička v plném rozlišení (maska postavy zvětšená na originál)
    a_full8 = cv2.resize((a * 255).astype(np.uint8), (W0, H0), interpolation=cv2.INTER_LINEAR)
    r, shirt_m = retouch_shirt(o, a_full8)
    work = np.asarray(r.resize(ws, Image.LANCZOS), dtype=np.float64) / 255

    # 4) trimapa: jistá postava / jisté pozadí / pás kolem okraje k dopočtu
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13))
    fg = cv2.erode((a > 0.95).astype(np.uint8), k)
    bg = cv2.erode((a < 0.05).astype(np.uint8), k)
    tri = np.full(a.shape, 0.5)
    tri[fg == 1] = 1
    tri[bg == 1] = 0

    # matting jen v ohraničení postavy (rychlost)
    pad = 40
    y0, y1 = max(0, top - pad), min(ws[1], bot + pad)
    x0, x1 = max(0, left - pad), min(ws[0], right + pad)
    I = work[y0:y1, x0:x1]
    T = tri[y0:y1, x0:x1]
    alpha = estimate_alpha_cf(I, T)
    # úklid: drobné ostrůvky mimo postavu (prach, šum pozadí) pryč
    n, lab, st, _ = cv2.connectedComponentsWithStats((alpha > 0.02).astype(np.uint8))
    keep = np.zeros(n, bool)
    keep[1:] = st[1:, cv2.CC_STAT_AREA] >= 400
    alpha = np.where(keep[lab], alpha, 0.0)
    F = estimate_foreground_ml(I, alpha)

    out = np.zeros((ws[1], ws[0], 4), dtype=np.uint8)
    out[y0:y1, x0:x1, :3] = np.clip(F * 255 + 0.5, 0, 255).astype(np.uint8)
    out[y0:y1, x0:x1, 3] = np.clip(alpha * 255 + 0.5, 0, 255).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(f"{ROOT}/bez-pozadi-v2/{src}.png")

    # archiv v plném rozlišení: retušovaný originál + zpřesněná maska zvětšená na originál
    a_up = Image.fromarray(out[..., 3]).resize((W0, H0), Image.LANCZOS)
    full = r.convert("RGBA")
    full.putalpha(a_up)
    full.save(f"{ROOT}/bez-pozadi-plne/{src}.png", compress_level=6)
    print(src, ws, "%.0f s" % (time.time() - t0), flush=True)
