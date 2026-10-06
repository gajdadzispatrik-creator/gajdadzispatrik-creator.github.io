"""„Rovné tričko“: přestavba stínování v oblasti břicha (jako retuš ve
Photoshopu — dodge & burn přes celou plochu, ne jen zjemnění).

Rovné vypnuté tričko na trupu má stínování dané jen tvarem trupu: tmavší
k bokům, světlejší uprostřed, a to stejně v každé výšce. Z řádků NAD
břichem se proto změří vodorovný profil jasu (v poměrné šířce trupu
0 = levý bok, 1 = pravý bok) a v oblasti břicha se jas trička nahradí
tímto profilem + plynulým svislým přechodem. Jemná struktura látky
(< ~2 px) se ponechá, okraj trupu a lem trička se nemění.
Upravuje fotky-nove/finalni/<id>.png (záloha <id>-pred-1e.png).
Použití: python 1e-rovne-tricko.py <id> <y_ref_od> <y_ref_do> <y_od> <y_do> [síla]
(řádky v px při výšce 3600: referenční pás nad břichem, oblast úpravy)"""
import sys, os, shutil
import numpy as np, cv2
from PIL import Image

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis\fotky-nove"
src = sys.argv[1]
r0, r1, y0, y1 = map(int, sys.argv[2:6])
sila = float(sys.argv[6]) if len(sys.argv) > 6 else 1.0
path, backup = f"{ROOT}/finalni/{src}.png", f"{ROOT}/finalni/{src}-pred-1e.png"
if not os.path.exists(backup):
    shutil.copy(path, backup)
im = np.asarray(Image.open(backup).convert("RGBA"))
rgb = im[..., :3]
H, W = rgb.shape[:2]

hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
shirt = ((h > 185) & (h < 230) & (s > 0.07) & (s < 0.65) & (v > 0.40) & (im[..., 3] > 250)).astype(np.uint8)
shirt = cv2.morphologyEx(shirt, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25)))
n, lab_, st, _ = cv2.connectedComponentsWithStats(shirt)
torso = (lab_ == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)

lab = cv2.cvtColor(rgb.astype(np.float32) / 255, cv2.COLOR_RGB2LAB)
L0 = lab[..., 0].copy()
m = cv2.GaussianBlur(torso.astype(np.float32), (0, 0), 3) + 1e-6
smooth = cv2.GaussianBlur(L0 * m, (0, 0), 12) / np.maximum(cv2.GaussianBlur(m, (0, 0), 12), 1e-4)

# hranice trupu v každém řádku → poměrná souřadnice u
left = np.full(H, -1.0); right = np.full(H, -1.0)
for y in range(H):
    xs = np.where(torso[y])[0]
    if len(xs) > 50:
        left[y], right[y] = xs[0], xs[-1]
# hranice vyhladit ve svislém směru — ruka/loket u boku jinak dělají skoky
# (a s nimi vodorovné „schody“ v jasu)
from scipy.ndimage import median_filter, gaussian_filter1d  # noqa: E402
valid = left >= 0
for arr in (left, right):
    a = arr.copy()
    idx = np.where(valid)[0]
    a[idx] = gaussian_filter1d(median_filter(a[idx], size=61, mode="nearest"), 20, mode="nearest")
    arr[:] = a
BINS = 80
def profile(rows):
    acc = [[] for _ in range(BINS)]
    for y in rows:
        if left[y] < 0:
            continue
        xs = np.arange(int(left[y]), int(right[y]) + 1)
        u = (xs - left[y]) / max(right[y] - left[y], 1)
        b = np.clip((u * BINS).astype(int), 0, BINS - 1)
        for bi, val in zip(b, smooth[y, xs]):
            acc[bi].append(val)
    p = np.array([np.median(a) if a else np.nan for a in acc])
    p = np.interp(np.arange(BINS), np.where(~np.isnan(p))[0], p[~np.isnan(p)])
    return cv2.GaussianBlur(p.reshape(1, -1).astype(np.float32), (0, 0), 2.5).ravel()

P = profile(range(r0, r1))
Pmean = P.mean()
# svislý trend: průměrný jas referenčního pásu → průměr těsně nad lemem
def rowmean(rows):
    vals = [smooth[y, int(left[y]):int(right[y]) + 1].mean() for y in rows if left[y] >= 0]
    return float(np.mean(vals))
top_mean = rowmean(range(r0, r1))
bot_mean = rowmean(range(y1 - 30, y1))

SIDE = float(os.environ.get("SIDE", 80))   # šířka přechodu k bokům (px)
TOP = float(os.environ.get("TOP", 150))    # přechod nahoru do zbytku trička
BOT = float(os.environ.get("BOT", 60))     # přechod dolů k lemu
EDGE = float(os.environ.get("EDGE", 0.22))  # jak daleko od boku (podíl šířky) se drží původní tón
# rozdíl skutečného tónu u boků proti rovnému profilu, řádek po řádku
offL = np.zeros(H, np.float32); offR = np.zeros(H, np.float32)
for y in range(max(0, y0 - 40), min(H, y1 + 40)):
    if left[y] < 0:
        continue
    xs = np.arange(int(left[y]), int(right[y]) + 1)
    u = (xs - left[y]) / max(right[y] - left[y], 1)
    tm = top_mean + (bot_mean - top_mean) * np.clip((y - r1) / max(y1 - r1, 1), 0, 1)
    base = np.interp(u * (BINS - 1), np.arange(BINS), P) - Pmean + tm
    dif = smooth[y, xs] - base
    kL, kR = (u > 0.02) & (u < 0.08), (u > 0.92) & (u < 0.98)
    offL[y] = dif[kL].mean() if kL.any() else 0
    offR[y] = dif[kR].mean() if kR.any() else 0
offL = gaussian_filter1d(offL, 25); offR = gaussian_filter1d(offR, 25)
target = L0.copy()
w = np.zeros((H, W), np.float32)
for y in range(y0, y1):
    if left[y] < 0:
        continue
    t = (y - r1) / max(y1 - r1, 1)
    level = top_mean + (bot_mean - top_mean) * np.clip(t, 0, 1)
    xs = np.arange(int(left[y]), int(right[y]) + 1)
    u = (xs - left[y]) / max(right[y] - left[y], 1)
    base = np.interp(u * (BINS - 1), np.arange(BINS), P) - Pmean + level
    # u boků navázat na skutečný tón okraje (stín boku u ruky), dovnitř
    # plynule do rovné plochy — žádný světlý pruh podél okraje
    fL = np.clip(1 - u / EDGE, 0, 1); fL = fL * fL * (3 - 2 * fL)
    fR = np.clip(1 - (1 - u) / EDGE, 0, 1); fR = fR * fR * (3 - 2 * fR)
    target[y, xs] = base + offL[y] * fL + offR[y] * fR
    # váha: plná uvnitř, k okrajům trupu (25 px) a k horní/dolní hranici oblasti plynule
    edge = np.minimum(xs - left[y], right[y] - xs)
    wx = np.clip((edge - 8) / SIDE, 0, 1)
    wy = min(1.0, (y - y0) / TOP, (y1 - y) / BOT)
    wx, wy = wx * wx * (3 - 2 * wx), max(wy, 0) ** 2 * (3 - 2 * max(wy, 0))   # plynulé (smoothstep)
    w[y, xs] = wx * wy
w = cv2.GaussianBlur(w, (0, 0), 6) * sila * torso

fine = cv2.GaussianBlur(L0, (0, 0), 1.6)        # jemná struktura látky zůstává (L0 − fine)
# Kousek drobných přirozených záhybů (do ~8 px) ponechat, ať tričko nepůsobí
# jako plast — velké tvary (břicho) ne.
KEEP = float(os.environ.get("KEEP", 0.3))
target = target + KEEP * (fine - cv2.GaussianBlur(L0, (0, 0), 8))
Ln = L0 + w * (target - fine)
lab[..., 0] = np.clip(Ln, 0, 100)
out = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2RGB) * 255 + 0.5, 0, 255).astype(np.uint8)
out = np.where((w > 0.002)[..., None], out, rgb)

# Napojení na zbytek trička bez švu (jako „Healing brush“ ve Photoshopu):
# gradientní (Poissonovo) prolnutí — uvnitř oblasti zůstane nový průběh
# jasu, na její hranici se hodnoty přesně srovnají s okolním tričkem.
if os.environ.get("SEAMLESS", "0") == "1":
    mask = ((w > 0.02) & (cv2.erode(torso, np.ones((15, 15), np.uint8)) > 0)).astype(np.uint8) * 255
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((9, 9), np.uint8))
    x, y, bw, bh = cv2.boundingRect(mask)
    center = (x + bw // 2, y + bh // 2)
    cloned = cv2.seamlessClone(np.ascontiguousarray(out), np.ascontiguousarray(rgb), mask, center, cv2.NORMAL_CLONE)
    soft = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 2)[..., None]
    out = np.clip(cloned * soft + rgb * (1 - soft) + 0.5, 0, 255).astype(np.uint8)
    lab = cv2.cvtColor(out.astype(np.float32) / 255, cv2.COLOR_RGB2LAB)
Image.fromarray(np.dstack([out, im[..., 3]]), "RGBA").save(path)
np.save(f"{ROOT}/finalni/{src}-1e-dL.npy", (lab[..., 0] - L0).astype(np.float16))
print(src, "hotovo; profil z řádků", r0, r1, "oblast", y0, y1)
