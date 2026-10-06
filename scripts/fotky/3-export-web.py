"""Vyrobí z nových fotek (bez pozadí) výřezy se STEJNÝM rámováním jako staré
zkušební fotky, jen ve vyšším rozlišení (hlava ~300 px, bez zvětšování)."""
import json, sys
from PIL import Image

ROOT = r"C:\Users\gajda\OneDrive\Pracovní\Claude projekty\Web patrik gajdadzis"
HW_OLD = {"patrik-hero.png": 97, "patrik-duvera.webp": 192, "patrik-omne-hero-top.png": 97,
          "patrik-omne-hero.webp": 155, "patrik-pristup.png": 119, "patrik-pristup-pece.png": 119}
reg = json.load(open(sys.argv[1]))
outdir = sys.argv[2]
for old, r in reg.items():
    s, tx, ty = r["scale"], r["tx"], r["ty"]
    ow, oh = r["old_size"]
    k = min(s, 300 / HW_OLD[old])          # výstupní px na starý px
    cut = Image.open(f"{ROOT}/fotky-nove/finalni/{r['src']}.png").convert("RGBA")
    f = k / s                               # zmenšení výřezu z bez-pozadi
    if abs(f - 1) > 1e-3:
        cut = cut.resize((round(cut.width * f), round(cut.height * f)), Image.LANCZOS)
    x0, y0 = round(tx * f), round(ty * f)
    W, H = round(ow * k), round(oh * k)
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    out.paste(cut.crop((x0, y0, x0 + W, y0 + H)), (0, 0))
    name = old.rsplit(".", 1)[0] + ".webp"
    out.save(f"{outdir}/{name}", "WEBP", quality=92, method=6, alpha_quality=100)
    print(name, (W, H), "k=%.3f" % k)
