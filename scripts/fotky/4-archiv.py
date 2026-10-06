"""Přenese retuš (záhyby + břicho) z pracovního rozlišení 3600 px do archivu
v plném rozlišení originálu (fotky-nove/bez-pozadi-plne → fotky-nove/finalni-plne).

Tónová retuš je plynulá (žádný jemný detail), takže se rozdíl jasu
spočítá na 3600 px a zvětší na originál; jemná kresba originálu zůstane.
Posun obrysu (liquify) se přepočítá ve stejném vzorci v plném rozlišení.
Použití: python 4-archiv.py <id>:<obrys %> [...]   např. 330:3 312:0"""
import sys
import numpy as np, cv2
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis\fotky-nove"


def L_of(rgb8):
    return cv2.cvtColor(rgb8.astype(np.float32) / 255, cv2.COLOR_RGB2LAB)[..., 0]


for arg in sys.argv[1:]:
    src, obrys = arg.split(":")
    obrys = float(obrys)
    before = np.asarray(Image.open(f"{ROOT}/bez-pozadi-v2/{src}.png").convert("RGBA"))
    after = np.asarray(Image.open(f"{ROOT}/bez-pozadi-v3/{src}-50-b50-o0.png").convert("RGBA"))
    dL = L_of(after[..., :3]) - L_of(before[..., :3])          # jen tónová změna, bez posunu

    full = np.asarray(Image.open(f"{ROOT}/bez-pozadi-plne/{src}.png").convert("RGBA"))
    H0, W0 = full.shape[:2]
    F = H0 / before.shape[0]
    dL_full = cv2.resize(dL, (W0, H0), interpolation=cv2.INTER_CUBIC)
    lab = cv2.cvtColor(full[..., :3].astype(np.float32) / 255, cv2.COLOR_RGB2LAB)
    lab[..., 0] = np.clip(lab[..., 0] + dL_full, 0, 100)
    rgb = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2RGB) * 255 + 0.5, 0, 255).astype(np.uint8)
    del lab
    changed = np.abs(dL_full) > 0.01
    rgb = np.where(changed[..., None], rgb, full[..., :3])
    out = np.dstack([rgb, full[..., 3]])
    del rgb, dL_full, changed

    if obrys > 0:
        # stejná detekce pasu jako 1c-brisko.py, souřadnice × F
        a8 = after[..., :3]
        hsv = cv2.cvtColor(a8, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
        h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
        shirt = ((h > 185) & (h < 230) & (s > 0.07) & (s < 0.65) & (v > 0.40) & (after[..., 3] > 250)).astype(np.uint8)
        shirt = cv2.morphologyEx(shirt, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
        n, lab_, st, _ = cv2.connectedComponentsWithStats(shirt)
        torso = lab_ == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])
        ys, xs = np.where(torso)
        top, bot = ys.min(), ys.max()
        cy = top + 0.74 * (bot - top)
        lx, rx = np.where(torso[int(cy)])[0][[0, -1]]
        cx = (lx + rx) / 2
        ey = (bot - top) * 0.16
        cx, cy, ey, half = cx * F, cy * F, ey * F, (rx - lx) / 2 * F
        edge = 60 * F
        Y, X = np.mgrid[0:H0, 0:W0].astype(np.float32)
        band = np.exp(-((Y - cy) / (ey * 1.25)) ** 2)
        d = np.abs(X - cx)
        reach = half + edge
        fall = np.where(d < reach - edge, 1.0, np.clip((reach - d) / edge, 0, 1))
        mapx = (cx + (X - cx) * (1 + obrys / 100 * band * fall)).astype(np.float32)
        del band, d, fall, X
        out = cv2.remap(out, mapx, Y, interpolation=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT)
        del mapx, Y

    Image.fromarray(out, "RGBA").save(f"{ROOT}/finalni-plne/{src}.png", compress_level=6)
    print(src, (W0, H0), "hotovo", flush=True)
