"""Jemná retuš oblasti břicha (navazuje na 1b-zjemnit-zahyby.py).

1) Stínování: v elipse kolem pupku se velké stínování (to, co dělá dojem
   vystouplého břicha) nahradí plynulým přechodem z hrudníku do boků.
   Struktura látky zůstává.
2) Obrys: pas se v úzkém vodorovném pásu nepatrně stáhne ke středu těla
   (posunutí obrazu, jako „liquify“). Mimo pás beze změny, ruce v kapsách
   leží pod ním.
Vstup:  fotky-nove/bez-pozadi-v3/<id>-<zahyby>.png
Výstup: fotky-nove/bez-pozadi-v3/<id>-<zahyby>-b<stin>-o<obrys>.png
Použití: python 1c-brisko.py <id> <zahyby%> <stin 0–1> <obrys %>"""
import sys
import numpy as np, cv2
from PIL import Image

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis\fotky-nove"
src, zah, stin, obrys = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
im = np.asarray(Image.open(f"{ROOT}/bez-pozadi-v3/{src}-{zah}.png").convert("RGBA")).astype(np.float32)
H, W = im.shape[:2]
rgb8 = im[..., :3].astype(np.uint8)
hsv = cv2.cvtColor(rgb8, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
shirt = ((h > 185) & (h < 230) & (s > 0.07) & (s < 0.65) & (v > 0.40) & (im[..., 3] > 250)).astype(np.uint8)
shirt = cv2.morphologyEx(shirt, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))

# trup = největší souvislá plocha trička; břicho = spodní třetina trupu
n, lab, st, _ = cv2.connectedComponentsWithStats(shirt)
i = 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])
torso = (lab == i)
ys, xs = np.where(torso)
top, bot = ys.min(), ys.max()
cy = top + 0.74 * (bot - top)
row = torso[int(cy)]
lx, rx = np.where(row)[0][[0, -1]]
cx = (lx + rx) / 2
ex, ey = (rx - lx) * 0.42, (bot - top) * 0.16
Y, X = np.mgrid[0:H, 0:W].astype(np.float32)

# 1) stínování
if stin > 0:
    labf = cv2.cvtColor(im[..., :3] / 255, cv2.COLOR_RGB2LAB)
    L = labf[..., 0]
    m = cv2.GaussianBlur(torso.astype(np.float32), (0, 0), 4)
    def mblur(x, sg):
        return cv2.GaussianBlur(x * m, (0, 0), sg) / np.maximum(cv2.GaussianBlur(m, (0, 0), sg), 1e-4)
    low = mblur(L, 60)                         # stínování tvaru (pupek, boky)
    flat = mblur(L, 220)                       # velmi plynulý přechod hrudník → boky
    ell = np.exp(-(((X - cx) / ex) ** 2 + ((Y - cy) / ey) ** 2) * 1.6)
    w = stin * ell * m
    L2 = L + (flat - low) * w
    labf[..., 0] = np.clip(L2, 0, 100)
    rgb2 = cv2.cvtColor(labf, cv2.COLOR_LAB2RGB) * 255
    im[..., :3] = np.where((w > 0.002)[..., None], rgb2, im[..., :3])

# 2) obrys: vodorovné stažení ke středu v pásu kolem pasu
if obrys > 0:
    a = obrys / 100
    band = np.exp(-((Y - cy) / (ey * 1.25)) ** 2)
    reach = (rx - lx) / 2 + 60                       # kousek za okraj trupu
    d = np.abs(X - cx)
    fall = np.clip((reach - d) / 60, 0, 1)            # za okrajem plynule k nule
    fall = np.where(d < reach - 60, 1.0, fall)
    k = a * band * fall
    mapx = (cx + (X - cx) * (1 + k)).astype(np.float32)
    im = cv2.remap(im, mapx, Y, interpolation=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT)

out = np.clip(im + 0.5, 0, 255).astype(np.uint8)
name = f"{src}-{zah}-b{int(stin * 100)}-o{obrys:g}"
Image.fromarray(out, "RGBA").save(f"{ROOT}/bez-pozadi-v3/{name}.png")
print(name, "pupek y=%d x=%d" % (cy, cx))
