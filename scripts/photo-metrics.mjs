// Změří na fotce (výřez s průhledným pozadím) body, podle kterých se fotky
// na webu usazují — viz docs/fotky-umisteni.md. Stejná metoda jako při
// kalibraci 28. 9. 2026, takže čísla jsou přímo porovnatelná.
//
// Použití: node scripts/photo-metrics.mjs <soubor> [<soubor> …]
//
// Výstup (v pixelech ZDROJOVÉ fotky):
//   top      — temeno (první neprůhledný řádek)
//   hw       — šířka hlavy (nejširší řádek v horních 10 % výšky fotky)
//   hc       — vodorovný střed hlavy
//   fingers  — spodek prstů (poslední řádek s pleťovými pixely v dolní půlce)

import sharp from 'sharp';

for (const file of process.argv.slice(2)) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const opaque = (x, y) => data[(y * W + x) * C + 3] > 128;

  let top = -1;
  for (let y = 0; y < H && top < 0; y++) for (let x = 0; x < W; x++) if (opaque(x, y)) { top = y; break; }

  let hw = 0;
  const centers = [];
  const win = Math.round(H * 0.1);
  for (let y = top; y < top + win; y++) {
    let a = -1, b = -1;
    for (let x = 0; x < W; x++) if (opaque(x, y)) { if (a < 0) a = x; b = x; }
    if (b - a > hw) hw = b - a;
    if (y > top + win * 0.3) centers.push((a + b) / 2);
  }
  const hc = centers.reduce((s, v) => s + v, 0) / centers.length;

  let fingers = -1;
  for (let y = Math.floor(H * 0.5); y < H; y++) {
    let n = 0;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C;
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      if (a > 200 && r > 100 && r > g && g > b && r - b > 30) n++;
    }
    if (n > 3) fingers = y;
  }

  console.log(JSON.stringify({ file, W, H, top, hw, hc: +hc.toFixed(1), fingers }));
}
