"""Najde, kde v nové fotce (bez pozadí) leží výřez staré zkušební fotky.
Výstup: měřítko (nové px na staré px), posun, rotace, počet shod."""
import cv2, numpy as np, json, sys
from PIL import Image

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis"
PAIRS = {
    "patrik-hero.png": ["330", "325"],
    "patrik-duvera.webp": ["252", "259"],
    "patrik-omne-hero-top.png": ["312"],
    "patrik-omne-hero.webp": ["259", "252"],
    "patrik-pristup.png": ["325", "330"],
    "patrik-pristup-pece.png": ["312"],
}

def gray_on(img, bg=(200, 200, 200)):
    img = img.convert("RGBA")
    b = Image.new("RGBA", img.size, bg + (255,))
    b.alpha_composite(img)
    return cv2.cvtColor(np.array(b.convert("RGB")), cv2.COLOR_RGB2GRAY)

sift = cv2.SIFT_create(nfeatures=8000)
res = {}
for old, cands in PAIRS.items():
    o = Image.open(f"{ROOT}/src/assets/photos/{old}")
    og = gray_on(o)
    # zvětšit starou (malou) fotku, ať má SIFT víc detailů
    up = 3
    og = cv2.resize(og, None, fx=up, fy=up, interpolation=cv2.INTER_CUBIC)
    ko, do = sift.detectAndCompute(og, None)
    best = None
    for c in cands:
        n = Image.open(f"{ROOT}/fotky-nove/bez-pozadi/{c}.png")
        f = 1600 / n.height
        ng = gray_on(n.resize((round(n.width * f), 1600), Image.LANCZOS))
        kn, dn = sift.detectAndCompute(ng, None)
        m = cv2.BFMatcher().knnMatch(do, dn, k=2)
        good = [a for a, b in m if a.distance < 0.75 * b.distance]
        if len(good) < 10:
            continue
        src = np.float32([ko[g.queryIdx].pt for g in good]) / up
        dst = np.float32([kn[g.trainIdx].pt for g in good]) / f
        M, inl = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=4 / f)
        ninl = int(inl.sum())
        s = float(np.hypot(M[0, 0], M[1, 0]))
        rot = float(np.degrees(np.arctan2(M[1, 0], M[0, 0])))
        cand = dict(src=c, inliers=ninl, matches=len(good), scale=s, rot=rot, tx=float(M[0, 2]), ty=float(M[1, 2]), old_size=o.size)
        print(old, cand, flush=True)
        if not best or ninl > best["inliers"]:
            best = cand
    res[old] = best
json.dump(res, open(sys.argv[1], "w"), indent=1)
