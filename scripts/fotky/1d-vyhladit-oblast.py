"""Cílené vyhlazení látky v zadané oblasti (např. prsty rýsující se pod
kalhotami u kapes). Stejný princip jako 1b (frekvenční separace jasu), ale
silněji a jen v elipsách; kůže a ostré hrany (šev kapsy, poklopec) se chrání.
Upravuje fotky-nove/finalni/<id>.png na místě (záloha <id>-pred-1d.png).
Použití: python 1d-vyhladit-oblast.py <id> <sila> cx,cy,rx,ry [cx,cy,rx,ry …]
(souřadnice v px pracovního rozlišení 3600)"""
import sys, os, shutil
import numpy as np, cv2
from PIL import Image

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis\fotky-nove"
src, sila = sys.argv[1], float(sys.argv[2])
ells = [tuple(map(float, e.split(","))) for e in sys.argv[3:]]
path = f"{ROOT}/finalni/{src}.png"
backup = f"{ROOT}/finalni/{src}-pred-1d.png"
if not os.path.exists(backup):
    shutil.copy(path, backup)
im = np.asarray(Image.open(backup).convert("RGBA"))
rgb = im[..., :3]
H, W = rgb.shape[:2]
hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
h, s = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255
cloth = ((s < 0.22) & ~((h > 5) & (h < 45) & (s > 0.18)) & (im[..., 3] > 250)).astype(np.uint8)
cloth = cv2.erode(cloth, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
m = cv2.GaussianBlur(cloth.astype(np.float32), (0, 0), 3)

Y, X = np.mgrid[0:H, 0:W].astype(np.float32)
area = np.zeros((H, W), np.float32)
for cx, cy, rx, ry in ells:
    d = ((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2
    area = np.maximum(area, np.clip(1.5 - d, 0, 1) ** 1.5)

lab = cv2.cvtColor(rgb.astype(np.float32) / 255, cv2.COLOR_RGB2LAB)
L = lab[..., 0]
L0 = L.copy()  # původní jas (L je pohled do lab, po úpravě se mění s ním)
FINE = float(os.environ.get("FINE", 2.0))     # co zůstane jako struktura látky
LOW = float(os.environ.get("LOW", 28))       # co zůstane jako tvar
PROT = float(os.environ.get("PROTECT", 30))  # práh ochrany ostrých hran (0 = bez ochrany)
fine = cv2.GaussianBlur(L, (0, 0), FINE)
mm = m + 1e-6
low = cv2.GaussianBlur(L * mm, (0, 0), LOW) / np.maximum(cv2.GaussianBlur(mm, (0, 0), LOW), 1e-4)
g = cv2.magnitude(cv2.Sobel(cv2.GaussianBlur(L, (0, 0), 1.2), cv2.CV_32F, 1, 0),
                  cv2.Sobel(cv2.GaussianBlur(L, (0, 0), 1.2), cv2.CV_32F, 0, 1))
protect = cv2.GaussianBlur(cv2.dilate((g > 30).astype(np.uint8), np.ones((7, 7), np.uint8)).astype(np.float32), (0, 0), 3)
w = sila * area * m * ((1 - protect) if PROT > 0 else 1)
lab[..., 0] = np.clip(L - (fine - low) * w, 0, 100)
out = np.clip(cv2.cvtColor(lab, cv2.COLOR_LAB2RGB) * 255 + 0.5, 0, 255).astype(np.uint8)
out = np.where((w > 0.002)[..., None], out, rgb)
Image.fromarray(np.dstack([out, im[..., 3]]), "RGBA").save(path)
np.save(f"{ROOT}/finalni/{src}-1d-dL.npy", (lab[..., 0] - L0).astype(np.float16))
print(src, "hotovo")
