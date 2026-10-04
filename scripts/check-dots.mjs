// Automatická pojistka pro CLAUDE.md „Konvence: velikost teček a délka
// zářezů" — na VYKRESLENÉ stránce měří každou tečku a každý zářez na
// dekorativní trase (SVG s preserveAspectRatio="none"):
//
//   tečka   — kulatá, průměr přesně 2 × r; r = 3,2 (hlavní) / 2,4 (ostatní)
//             na mobilu a tabletu, 3,5 / 2,6 na notebooku a desktopu,
//   zářez   — délka 22 px mobil / 44 px tablet / 36 px notebook+desktop,
//   mezera  — tečka na konci zářezu → text vedle ní: 14 px mobil, 20 px výš,
//   osa     — tečka s textem VEDLE sebe leží v ose PRVNÍHO řádku textu,
//   pod     — tečka na vodorovném úseku: levá hrana textu nad/pod ní = tečka.
//
// Stránky se hledají procházením odkazů od homepage (+ EXTRA_PATHS), každá
// se měří na všech šířkách z WIDTHS (hrany stupňů i šířky mimo kalibraci).
// Vzniklo 1. 10. 2026 — tečky byly v každé sekci jinak velké (3,4–9,6 px),
// zářezy 18–72 px.
//
// Spuštění: dev server musí běžet (npm run dev), pak `npm run check:dots`.
// Exit kód 0 = vše v pořádku, 1 = nalezen problém (detaily ve výpisu).

import { chromium } from '@playwright/test';

const ORIGIN = (process.env.AUDIT_URL || 'http://localhost:4321').replace(/\/$/, '');
const EXTRA_PATHS = ['/clanky', '/neexistujici-stranka-404'];
const WIDTHS = [320, 375, 390, 430, 767, 768, 834, 1024, 1199, 1200, 1300, 1366, 1399, 1400, 1440, 1920, 2560];
const TOL = 0.6; // px — zaokrouhlení vykreslení

const tier = (w) => (w < 768 ? 'mobile' : w < 1200 ? 'tablet' : 'desktop');
const RADII = { mobile: [3.2, 2.4], tablet: [3.2, 2.4], desktop: [3.5, 2.6] };
const NOTCH = { mobile: 22, tablet: 44, desktop: 36 };
const GAP = { mobile: 14, tablet: 20, desktop: 20 };

function measure() {
  const visible = (svg) => getComputedStyle(svg).display !== 'none' && svg.getBoundingClientRect().width > 0;
  const svgs = [...document.querySelectorAll('svg[preserveAspectRatio="none"]')].filter(visible);
  const where = (el) => {
    const sec = el.closest('section, footer, aside, main');
    return (sec?.getAttribute('class') || sec?.tagName || '').split(' ')[0];
  };

  // Text na stránce (bez skrytého textu pro čtečky): řádky + jejich blok.
  const texts = [];
  const lines = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const n = tw.currentNode;
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (el.closest('svg, header, .sr-only, [hidden]') || getComputedStyle(el).visibility === 'hidden') continue;
    let blk = el;
    while (blk && getComputedStyle(blk).display === 'inline') blk = blk.parentElement;
    const rg = document.createRange();
    rg.selectNodeContents(n);
    for (const r of rg.getClientRects()) if (r.width > 1) { texts.push(r); lines.push({ r, blk }); }
  }

  const dots = svgs.flatMap((svg) => [...svg.querySelectorAll('circle')]).map((c) => {
    const r = c.getBoundingClientRect();
    const dx = r.left + r.width / 2, dy = r.top + r.height / 2;
    // Text pod/nad tečkou (vodorovný úsek): nejbližší řádek do 80 px svisle, začínající do ±70 px vodorovně.
    const vert = lines.filter(({ r: t }) => Math.abs(t.left - dx) < 70 && ((t.top > dy && t.top - dy < 60) || (t.bottom < dy && dy - t.bottom < 80)) && t.left > dx - 70);
    let below = null, beside = null;
    if (vert.length) {
      vert.sort((a, z) => Math.abs(a.r.left - dx) - Math.abs(z.r.left - dx));
      below = vert[0].r.left - dx;
    }
    if (below === null || Math.abs(below) > 8) {
      // Text vedle tečky: začíná 8–90 px vpravo (nebo končí 8–90 px vlevo), svisle do ±70 px.
      const side = lines.filter(({ r: t }) => ((t.left - dx > 8 && t.left - dx < 90) || (dx - t.right > 8 && dx - t.right < 90)) && Math.abs(t.top + t.height / 2 - dy) < 70);
      if (side.length) {
        side.sort((a, z) => Math.abs(a.r.top + a.r.height / 2 - dy) - Math.abs(z.r.top + z.r.height / 2 - dy));
        const first = lines.filter((l) => l.blk === side[0].blk).sort((a, z) => a.r.top - z.r.top)[0].r;
        beside = { delta: dy - (first.top + first.height / 2), txt: side[0].blk.textContent.trim().replace(/s+/g, ' ').slice(0, 30) };
        below = null;
      }
    }
    return { where: where(c), r: parseFloat(getComputedStyle(c).r), w: r.width, h: r.height, below, beside };
  }).filter((d) => d.w > 0);

  const notches = [];
  for (const svg of svgs) {
    const vb = svg.viewBox.baseVal, sr = svg.getBoundingClientRect();
    const sx = sr.width / vb.width, sy = sr.height / vb.height;
    for (const el of svg.querySelectorAll('[class*="notch"]')) {
      if (getComputedStyle(el).display === 'none') continue;
      const segs = [];
      if (el.tagName === 'line') segs.push([el.x1.baseVal.value, el.y1.baseVal.value, el.x2.baseVal.value]);
      else for (const m of (el.getAttribute('d') || '').matchAll(/M\s*([\d.-]+)[ ,]+([\d.-]+)\s*H\s*([\d.-]+)/g)) segs.push([+m[1], +m[2], +m[3]]);
      for (const [x1, y, x2] of segs) {
        const ax = sr.left + x1 * sx, dx = sr.left + x2 * sx, dy = sr.top + y * sy;
        let gap = null;
        for (const t of texts) if (t.top - 4 <= dy && t.bottom + 4 >= dy && t.left > dx - 2) gap = gap === null ? t.left - dx : Math.min(gap, t.left - dx);
        notches.push({ where: where(el), len: Math.abs(dx - ax), gap });
      }
    }
  }
  return { dots, notches };
}

function collectLinks(origin) {
  return [...document.querySelectorAll('a[href]')]
    .map((a) => new URL(a.getAttribute('href'), location.href))
    .filter((u) => u.origin === origin && !u.pathname.startsWith('/api/'))
    .map((u) => u.pathname.replace(/\/$/, '') || '/');
}

const browser = await chromium.launch();
const fails = [];
let dotCount = 0, notchCount = 0;
// ONLY=/o-mne,/pristup — zkontrolovat jen vybrané stránky (po úpravě jedné stránky).
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null;
const pages = ONLY || ['/', ...EXTRA_PATHS];

try {
  // Seznam stránek z odkazů.
  const crawler = await browser.newPage();
  const seen = new Set(pages);
  for (let i = 0; !ONLY && i < pages.length; i++) {
    await crawler.goto(ORIGIN + pages[i], { waitUntil: 'networkidle' });
    for (const link of await crawler.evaluate(collectLinks, ORIGIN)) if (!seen.has(link)) { seen.add(link); pages.push(link); }
  }
  await crawler.close();

  for (const w of WIDTHS) {
    const t = tier(w);
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    for (const path of pages) {
      await page.goto(ORIGIN + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(200);
      const { dots, notches } = await page.evaluate(measure);
      for (const d of dots) {
        dotCount++;
        const exp = 2 * d.r;
        if (!RADII[t].includes(d.r)) fails.push(`${w}px ${path} ${d.where}: tečka r=${d.r}, na tomhle stupni má být ${RADII[t].join(' nebo ')}`);
        else if (Math.abs(d.w - exp) > TOL || Math.abs(d.h - exp) > TOL) fails.push(`${w}px ${path} ${d.where}: tečka ${d.w.toFixed(1)}×${d.h.toFixed(1)} px, má být ${exp}×${exp}`);
        if (d.beside && Math.abs(d.beside.delta) > 1.5) fails.push(`${w}px ${path} ${d.where}: tečka ${d.beside.delta.toFixed(1)} px mimo osu prvního řádku „${d.beside.txt}“`);
        if (d.below !== null && Math.abs(d.below) > 1.5 && Math.abs(d.below) < 70) fails.push(`${w}px ${path} ${d.where}: text nad/pod tečkou začíná ${d.below.toFixed(1)} px od tečky, má začínat přesně na ní`);
      }
      for (const n of notches) {
        notchCount++;
        if (Math.abs(n.len - NOTCH[t]) > TOL) fails.push(`${w}px ${path} ${n.where}: zářez ${n.len.toFixed(1)} px, má být ${NOTCH[t]}`);
        if (n.gap !== null && Math.abs(n.gap - GAP[t]) > 1) fails.push(`${w}px ${path} ${n.where}: mezera tečka → text ${n.gap.toFixed(1)} px, má být ${GAP[t]}`);
      }
    }
    await ctx.close();
  }
} catch (err) {
  console.error(`Nepodařilo se načíst ${ORIGIN} — běží dev server (npm run dev)?\n${err.message}`);
  await browser.close();
  process.exit(1);
}
await browser.close();

console.log(`Zkontrolováno ${pages.length} stránek × ${WIDTHS.length} šířek (${dotCount} měření teček, ${notchCount} měření zářezů).\n`);
if (!fails.length) {
  console.log('Tečky a zářezy v pořádku: všude stejná velikost a délka podle pravidel.');
  process.exit(0);
}
for (const f of fails.slice(0, 80)) console.log('FAIL  ' + f);
console.log(`\n${fails.length} nález(ů).`);
process.exit(1);
