"""Zjemnění záhybů na tričku a kalhotách (frekvenční separace, jen jas).

Jas oblečení se rozdělí na tři vrstvy:
  - tvar těla   (velké stínování, rozmazání sigma VELKA)  → zůstává,
  - záhyby      (rozdíl mezi jemnou a velkou vrstvou)       → zeslabí se o SILA,
  - struktura   (nejjemnější detail)                        → zůstává.
Ostré hrany (límec, lem rukávu, knoflíky, logo, švy) se chrání maskou.
Vstup:  fotky-nove/bez-pozadi-v2/<id>.png
Výstup: fotky-nove/bez-pozadi-v3/<id>-<sila>.png
Použití: python 1b-zjemnit-zahyby.py <id> <sila 0–1> [<sila> …]"""
import sys
import numpy as np, cv2
from PIL import Image

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis\fotky-nove"
VELKA, JEMNA = 36.0, 3.0      # px při výšce 3600


def blur(x, s):
    return cv2.GaussianBlur(x, (0, 0), s)


def masked_blur(x, m, s):
    """Rozmazání jen z pixelů oblečení — kůže ani pozadí se do tvaru nepřimíchají."""
    return blur(x * m, s) / np.maximum(blur(m, s), 1e-4)


src = sys.argv[1]
im = np.asarray(Image.open(f"{ROOT}/bez-pozadi-v2/{src}.png").convert("RGBA"))
rgb, a = im[..., :3], im[..., 3].astype(np.float32) / 255
hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255

shirt = (h > 185) & (h < 230) & (s > 0.07) & (s < 0.65) & (v > 0.40)
rows = np.where(shirt.sum(1) > 50)[0]
shirt_bottom = rows.max() if len(rows) else 0
pants = (s < 0.22) & (v > 0.40) & (v < 0.92) & ((h < 70) | (h > 330) | (s < 0.06)) \
        & (np.arange(im.shape[0])[:, None] > shirt_bottom - 40)
cloth = ((shirt | pants) & (a > 0.98)).astype(np.uint8)
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
cloth = cv2.morphologyEx(cloth, cv2.MORPH_CLOSE, k)
cloth = cv2.erode(cloth, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15)))
m = blur(cloth.astype(np.float32), 5)

lab = cv2.cvtColor(rgb.astype(np.float32) / 255, cv2.COLOR_RGB2LAB)   # L 0–100, bez zaokrouhlení
L = lab[..., 0]
fine = blur(L, JEMNA)
low = masked_blur(L, m + 1e-6, VELKA)
mid = fine - low            # záhyby
high = L - fine             # struktura

# ochrana ostrých hran: velký gradient jemně rozmazaného jasu
g = cv2.magnitude(cv2.Sobel(blur(L, 1.2), cv2.CV_32F, 1, 0), cv2.Sobel(blur(L, 1.2), cv2.CV_32F, 0, 1))
protect = (g > 24).astype(np.uint8)
protect = cv2.dilate(protect, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (11, 11)))
protect = blur(protect.astype(np.float32), 4)
w_base = m * (1 - protect)

dbg = Image.fromarray((np.dstack([m, protect, w_base]) * 255).astype(np.uint8))
dbg.resize((dbg.width // 4, dbg.height // 4)).save(f"{ROOT}/bez-pozadi-v3/{src}-maska.png")

for sila in map(float, sys.argv[2:]):
    w = w_base * sila
    Ln = low + high + mid * (1 - w)
    out = lab.copy()
    out[..., 0] = np.clip(Ln, 0, 100)
    rgb2 = np.clip(cv2.cvtColor(out, cv2.COLOR_LAB2RGB) * 255 + 0.5, 0, 255).astype(np.uint8)
    rgb2 = np.where((w > 0.002)[..., None], rgb2, rgb)        # mimo oblečení pixely beze změny
    res = np.dstack([rgb2, im[..., 3]])
    Image.fromarray(res, "RGBA").save(f"{ROOT}/bez-pozadi-v3/{src}-{int(sila * 100)}.png")
    print(src, sila, flush=True)
