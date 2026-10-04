// Automatická pojistka pro mezery (CLAUDE.md „Konvence: mezera nadpis →
// úvodní text“, „mezera mezi sekcemi“, „mezera MEZI BLOKY“). Na VYKRESLENÉ
// stránce měří skutečnou vzdálenost, ne CSS hodnoty — bez ohledu na to, jak
// je markup poskládaný (text v jiném sloupci/wrapperu než nadpis se počítá
// stejně jako sourozenec):
//
//   nadpis → text  — od spodní hrany nadpisu (h2/h3) k nejbližšímu textovému
//                    bloku pod ním ve stejném sloupci. Stejná role (typ sekce
//                    + úroveň nadpisu + sourozenec / jiný sloupec) musí mít na
//                    jednom stupni všude stejnou mezeru; nikde pod 8 px.
//   konce sekcí    — od horní hrany sekce k prvnímu obsahu a od posledního
//                    obsahu ke spodní hraně. Kapitoly podstránek (a zvlášť
//                    jejich závěrečné pásy) mají na stupni všude stejně;
//                    homepage na mobilu 72 px u každé sekce.
//
// Vzniklo 4. 10. 2026 — ruční kontrola měřila jen nadpis → sourozenec a minula
// text přilepený pod nadpisem ve vedlejším sloupci (/sluzby/financni-plan).
//
// Spuštění: dev server musí běžet (npm run dev), pak `npm run check:spacing`.
// Exit kód 0 = vše v pořádku, 1 = nalezen problém (detaily ve výpisu).

import { chromium } from '@playwright/test';

const ORIGIN = (process.env.AUDIT_URL || 'http://localhost:4321').replace(/\/$/, '');
const EXTRA_PATHS = ['/clanky', '/neexistujici-stranka-404'];
const WIDTHS = process.env.WIDTHS ? process.env.WIDTHS.split(',').map(Number) : [320, 375, 430, 767, 834, 1024, 1366, 1440, 1920];
const tier = (w) => (w < 768 ? 'mobil' : w < 1200 ? 'tablet' : w < 1400 ? 'notebook' : 'desktop');
// Odchylka danná zaokrouhlením a půlprokladem řádku (konce sekcí se měří
// k textu, ne k boxu — různé line-height dají ±3 px).
const TOL_HEAD = 1.5;
const TOL_END = 2;
const HOME_MOBILE_END = 72;

function measure() {
  const vis = (e) => { const c = getComputedStyle(e); return c.display !== 'none' && c.visibility !== 'hidden' && e.getClientRects().length > 0; };
  const prefixStrip = (cls) => cls.replace(/^(hyp|fp|inv|poj|pen|pri|om|rec|cla|sluzby|nf)-/, '');
  const section = (el) => el.closest('main section, main > div[class], footer');
  const family = (sec) => {
    if (!sec) return '';
    const first = (sec.className || '').split(' ')[0];
    if (location.pathname === '/') return first; // homepage: každá sekce je samostatná role
    return prefixStrip(first).replace(/--.*/, '');
  };

  // Skutečně viditelný obdélník (oříznutý předky s overflow ≠ visible).
  const clipRect = (el, r) => {
    let top = r.top, bottom = r.bottom, left = r.left, right = r.right;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const c = getComputedStyle(a);
      if (c.overflow !== 'visible' || c.clipPath !== 'none') {
        const ar = a.getBoundingClientRect();
        top = Math.max(top, ar.top); bottom = Math.min(bottom, ar.bottom);
        left = Math.max(left, ar.left); right = Math.min(right, ar.right);
      }
    }
    return bottom > top && right > left ? { top, bottom, left, right } : null;
  };

  // Textové řádky a jejich blokový předek.
  const lines = [];
  const tw = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const n = tw.currentNode;
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (el.closest('svg, .sr-only, [hidden], script, style, [aria-hidden="true"]') || !vis(el)) continue;
    let blk = el;
    while (blk && getComputedStyle(blk).display.startsWith('inline') && !/^(A|BUTTON)$/.test(blk.tagName)) blk = blk.parentElement;
    const rg = document.createRange();
    rg.selectNodeContents(n);
    for (const q of rg.getClientRects()) if (q.width > 1 && q.height > 1) lines.push({ q, el, blk });
  }

  // 1) nadpis → text: první text, který po nadpisu následuje v pořadí čtení.
  //    Leží-li vedle nadpisu (dva sloupce), mezera „pod nadpisem“ neexistuje.
  const heads = [];
  for (const h of document.querySelectorAll('main h2, main h3, main dt, main [class*="__name"]')) {
    if (!vis(h) || h.closest('[class*="hero"]')) continue;
    const hr = h.getBoundingClientRect();
    const next = lines.find(({ el }) => !h.contains(el) && (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING));
    if (!next || next.q.top < hr.bottom - 1 || Math.abs(next.q.left - hr.left) > 48 || next.q.top - hr.bottom > 200) continue;
    let blk = next.blk;
    // Text uvnitř rámečku/podbarveného boxu (např. identita na právních
    // stránkách): mezera se měří k boxu, ne k textu uvnitř jeho paddingu.
    const boxedEl = (e) => { const c = getComputedStyle(e); return (c.borderTopStyle !== 'none' && parseFloat(c.borderTopWidth) > 0) || (c.borderLeftStyle !== 'none' && parseFloat(c.borderLeftWidth) > 1) || (c.backgroundColor !== 'rgba(0, 0, 0, 0)' && c.backgroundColor !== 'transparent'); };
    for (let a = blk; a && !a.contains(h); a = a.parentElement) if (boxedEl(a) && a.tagName !== 'LI') blk = a;
    const br = blk.getBoundingClientRect();
    // sourozenec = text má s nadpisem společného rodiče (stejný sloupec v markupu)
    const sibling = blk.parentElement === h.parentElement;
    const list = blk.closest('ul, ol, dl') || /step|row|phase/.test(blk.className + ' ' + (blk.parentElement?.className || ''));
    const sec = section(h);
    heads.push({
      role: `${family(sec)} ${h.tagName}${/__name/.test(h.className) ? ' název' : ''} → ${list ? 'seznam' : 'text'}${sibling ? '' : ' (jiný blok)'}`,
      gap: br.top - hr.bottom,
      txt: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 40),
    });
  }

  // 2) konce sekcí
  const ends = [];
  const secs = [...document.querySelectorAll('main > section, main > div > section, main > div[class*="statement"]')].filter((s) => vis(s) && s.getBoundingClientRect().height > 40);
  for (const s of secs) {
    const cls = (s.className || '').split(' ')[0];
    if (/hero|stats-band/.test(cls)) continue;
    const sr = s.getBoundingClientRect();
    // Boxy textových bloků (ne řádky — půlproklad by dal ±3 px podle line-height).
    const rs = [...new Set(lines.filter(({ el }) => s.contains(el)).map(({ blk }) => blk))].map((b) => b.getBoundingClientRect());
    // Prvky s vlastním viditelným boxem (tlačítka, rámečky, pásy, fotky).
    const boxed = (e) => { const c = getComputedStyle(e); return c.borderTopStyle !== 'none' && parseFloat(c.borderTopWidth) > 0 || (c.backgroundColor !== 'rgba(0, 0, 0, 0)' && c.backgroundColor !== 'transparent') || c.backgroundImage !== 'none'; };
    for (const e of s.querySelectorAll('img, button, input, textarea, select, a, [class*="__band"], [class*="card"], [class*="empty"]')) {
      if (!vis(e) || e.closest('svg') || (e.tagName === 'A' && !boxed(e))) continue;
      const frame = e.tagName === 'IMG' ? e.closest('[class*="photo"]') || e : e; // fotka = její rámeček
      const c = clipRect(frame, frame.getBoundingClientRect());
      if (c) rs.push(c);
    }
    if (!rs.length) continue;
    ends.push({
      sec: cls + ((s.className.match(/\S+--\S+/) || [''])[0].replace(/^\S+--/, '--')),
      family: family(s),
      top: Math.min(...rs.map((q) => q.top)) - sr.top,
      bottom: sr.bottom - Math.max(...rs.map((q) => q.bottom)),
    });
  }
  return { heads, ends };
}

function collectLinks(origin) {
  return [...document.querySelectorAll('a[href]')]
    .map((a) => new URL(a.getAttribute('href'), location.href))
    .filter((u) => u.origin === origin && !u.pathname.startsWith('/api/'))
    .map((u) => u.pathname.replace(/\/$/, '') || '/');
}

const mode = (vals) => {
  const counts = new Map();
  for (const v of vals) { const k = Math.round(v); counts.set(k, (counts.get(k) || 0) + 1); }
  return [...counts].sort((a, z) => z[1] - a[1] || a[0] - z[0])[0][0];
};

const browser = await chromium.launch();
const fails = [];
let headCount = 0, endCount = 0;
const pages = ['/', ...EXTRA_PATHS];

try {
  const crawler = await browser.newPage();
  const seen = new Set(pages);
  for (let i = 0; i < pages.length; i++) {
    await crawler.goto(ORIGIN + pages[i], { waitUntil: 'networkidle' });
    for (const link of await crawler.evaluate(collectLinks, ORIGIN)) if (!seen.has(link)) { seen.add(link); pages.push(link); }
  }
  await crawler.close();

  for (const w of WIDTHS) {
    const t = tier(w);
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const headRoles = new Map(); // role → [{gap, where}]
    const endFamilies = new Map(); // family → [{top, bottom, where}]
    for (const path of pages) {
      await page.goto(ORIGIN + path, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
        await document.fonts.ready;
        await Promise.all([...document.images].map((i) => (i.complete ? null : i.decode().catch(() => null))));
      });
      await page.waitForTimeout(250);
      const { heads, ends } = await page.evaluate(measure);
      for (const h of heads) {
        headCount++;
        if (h.gap < 8) fails.push(`${w}px ${path}: nadpis „${h.txt}“ → text jen ${h.gap.toFixed(1)} px (přilepené)`);
        const key = `${path === '/' ? 'home' : 'sub'} ${h.role}`;
        if (!headRoles.has(key)) headRoles.set(key, []);
        headRoles.get(key).push({ gap: h.gap, where: `${path} „${h.txt}“` });
      }
      for (const e of ends) {
        endCount++;
        if (path === '/' && t === 'mobil') {
          for (const side of ['top', 'bottom']) {
            // Výjimka: O mně končí fotkou s rozpuštěním do pozadí — konec
            // viditelné části neodpovídá boxu fotky (CLAUDE.md, mezera mezi sekcemi).
            if (e.sec.startsWith('about') && side === 'bottom') continue;
            const v = e[side];
            if (Math.abs(v - HOME_MOBILE_END) > TOL_END) fails.push(`${w}px / ${e.sec}: ${side === 'top' ? 'začátek sekce → obsah' : 'obsah → konec sekce'} ${v.toFixed(0)} px, má být ${HOME_MOBILE_END}`);
          }
        }
        if (path !== '/') {
          if (!endFamilies.has(e.family)) endFamilies.set(e.family, []);
          endFamilies.get(e.family).push({ ...e, where: `${path} ${e.sec}` });
        }
      }
    }
    // Stejná role → stejná mezera na celém webu (na tomhle stupni).
    for (const [role, list] of headRoles) {
      if (list.length < 2) continue;
      const m = mode(list.map((x) => x.gap));
      for (const x of list) if (Math.abs(x.gap - m) > TOL_HEAD) fails.push(`${w}px ${x.where}: nadpis → text ${x.gap.toFixed(1)} px, stejná role (${role}) má jinde ${m} px`);
    }
    // Kapitoly podstránek: stejné konce na celém webu (na tomhle stupni).
    for (const [fam, list] of endFamilies) {
      if (list.length < 2) continue;
      for (const side of ['bottom']) {
        const m = mode(list.map((x) => x[side]));
        for (const x of list) if (Math.abs(x[side] - m) > TOL_END) fails.push(`${w}px ${x.where}: obsah → konec sekce ${x[side].toFixed(0)} px, ostatní ${fam} mají ${m} px`);
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

console.log(`Zkontrolováno ${pages.length} stránek × ${WIDTHS.length} šířek (${headCount} měření nadpis → text, ${endCount} měření konců sekcí).\n`);
if (!fails.length) {
  console.log('Mezery v pořádku: nadpis → text i konce sekcí všude podle pravidel.');
  process.exit(0);
}
const uniq = [...new Set(fails)];
for (const f of uniq.slice(0, 120)) console.log('FAIL  ' + f);
console.log(`\n${uniq.length} nález(ů).`);
process.exit(1);
