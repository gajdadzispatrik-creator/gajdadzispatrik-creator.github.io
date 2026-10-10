// Funkční test celého webu ve třech vykreslovacích jádrech a na emulovaných
// zařízeních (6. 10. 2026): Chromium (Chrome, Edge, Opera, Samsung Internet),
// WebKit (Safari na Macu, iPhonu, iPadu — na iOS i Chrome) a Firefox.
//
// Na každé stránce: chyby JavaScriptu, nenačtené obrázky, vodorovné přetékání,
// obsah, který po projetí stránkou zůstal neviditelný (animace odhalení).
// Funkce: mobilní menu, cookies (lišta, nastavení, uložení), finanční check-up
// od začátku do výsledku, validace kontaktního formuláře, filtr témat článků,
// seznam k odškrtání v článku.
//
// Spuštění (musí běžet npm run dev): npm run check:funkce
// Jen některé profily: PROFILES=iphone,safari npm run check:funkce

import { chromium, webkit, firefox, devices } from '@playwright/test';

const ORIGIN = (process.env.AUDIT_URL || 'http://localhost:4321').replace(/\/$/, '');
const PROFILES = {
  chrome: { engine: chromium, opts: { viewport: { width: 1440, height: 900 } } },
  android: { engine: chromium, opts: { ...devices['Pixel 7'] } },
  safari: { engine: webkit, opts: { viewport: { width: 1440, height: 900 } } },
  iphone: { engine: webkit, opts: { ...devices['iPhone 13'] } },
  ipad: { engine: webkit, opts: { ...devices['iPad (gen 7) landscape'] } },
  firefox: { engine: firefox, opts: { viewport: { width: 1440, height: 900 } } },
  'firefox-mobil': { engine: firefox, opts: { viewport: { width: 390, height: 844 } } },
};
const only = process.env.PROFILES ? process.env.PROFILES.split(',') : Object.keys(PROFILES);
const fails = [];
let checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) fails.push(msg); };

async function pageList(ctx) {
  const p = await ctx.newPage();
  const links = [];
  for (const start of ['/', '/clanky']) {
    await p.goto(ORIGIN + start, { waitUntil: 'networkidle' });
    links.push(...(await p.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href').split('#')[0].split('?')[0]))));
  }
  await p.close();
  return [...new Set(['/', '/clanky', '/neexistujici-stranka-404', ...links.filter((h) => h && !/\.(xml|txt|png|jpg|pdf)$/.test(h))])];
}

async function scrollThrough(p) {
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += Math.round(innerHeight * 0.6)) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function checkPage(ctx, name, path) {
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/favicon|astro-dev|vite|\[astro\]|Failed to load resource.*404/i.test(m.text())) errors.push(m.text()); });
  const res = await p.goto(ORIGIN + path, { waitUntil: 'networkidle' });
  ok(path === '/neexistujici-stranka-404' || (res && res.ok()), `${name} ${path}: HTTP ${res && res.status()}`);
  await p.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
  await scrollThrough(p);
  const r = await p.evaluate(() => {
    const out = { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, brokenImg: [], hidden: [] };
    for (const img of document.images) {
      if (img.loading === 'lazy' && !img.complete) continue;
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) out.brokenImg.push(img.getAttribute('src').slice(0, 60));
    }
    // text v <main>, který po projetí stránky zůstal neviditelný (opacity ~0)
    for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li, main a.button, main button')) {
      if (!el.textContent.trim() || el.closest('[hidden], .sr-only, [aria-hidden="true"], dialog:not([open])')) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      let o = 1;
      for (let a = el; a && a !== document.body; a = a.parentElement) {
        const c = getComputedStyle(a);
        if (c.display === 'none' || c.visibility === 'hidden') { o = -1; break; }
        o *= parseFloat(c.opacity);
      }
      if (o >= 0 && o < 0.5) out.hidden.push(el.textContent.trim().slice(0, 40));
    }
    return out;
  });
  ok(r.overflow <= 1, `${name} ${path}: stránka přetéká do strany o ${r.overflow} px`);
  ok(!r.brokenImg.length, `${name} ${path}: nenačtené obrázky ${r.brokenImg.join(', ')}`);
  ok(!r.hidden.length, `${name} ${path}: neviditelný text po projetí: ${r.hidden.slice(0, 3).join(' | ')}`);
  ok(!errors.length, `${name} ${path}: chyby JS: ${errors.slice(0, 2).join(' | ')}`);
  await p.close();
}

async function functional(ctx, name, isMobile) {
  const p = await ctx.newPage();
  // cookies: lišta → nastavení → uložit → po načtení už není
  await p.goto(ORIGIN + '/', { waitUntil: 'networkidle' });
  const bar = p.locator('#cookie-bar');
  // Lišta vyjíždí s animací — na rychlém ostrém webu ji jinak test chytí dřív.
  await bar.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
  ok(await bar.isVisible(), `${name}: cookie lišta se nezobrazila`);
  await p.locator('#cookie-bar [data-action="open-settings"]').click();
  ok(await p.locator('#cookie-settings').isVisible(), `${name}: nastavení cookies se neotevřelo`);
  await p.locator('#cookie-settings [data-action="save"]').click();
  await p.waitForTimeout(900); // zavírací animace
  ok(!(await p.locator('#cookie-settings').isVisible()), `${name}: nastavení cookies se po uložení nezavřelo`);
  await p.reload({ waitUntil: 'networkidle' });
  ok(!(await bar.isVisible()), `${name}: cookie lišta se ukazuje i po uložení volby`);

  // mobilní menu
  if (isMobile) {
    const t = p.locator('#menu-toggle');
    ok(await t.isVisible(), `${name}: tlačítko menu není vidět`);
    await t.click();
    await p.waitForTimeout(400);
    ok((await t.getAttribute('aria-expanded')) === 'true' && (await p.locator('#mobile-menu').isVisible()), `${name}: menu se neotevřelo`);
    await t.click();
    await p.waitForTimeout(400);
    ok((await t.getAttribute('aria-expanded')) === 'false', `${name}: menu se nezavřelo`);
  }

  // kontaktní formulář: prázdné odeslání → chyby u povinných polí, nic se neodešle
  const form = p.locator('form.kontakt__form');
  await form.scrollIntoViewIfNeeded();
  await form.locator('button[type="submit"]').click();
  await p.waitForTimeout(300);
  const invalid = await form.locator('[aria-invalid="true"]').count();
  ok(invalid >= 3, `${name}: formulář bez vyplnění neukázal chyby (${invalid} polí)`);
  ok(p.url().startsWith(ORIGIN + '/'), `${name}: prázdný formulář se odeslal`);

  // check-up: začít → odpovídat → výsledek → znovu
  await p.goto(ORIGIN + '/financni-check-up', { waitUntil: 'networkidle' });
  await p.locator('[data-start]').click();
  for (let i = 0; i < 30; i++) {
    if (await p.locator('.chk-offer').isVisible()) break;
    const opt = p.locator('[data-option]:visible').first();
    if (!(await opt.count())) { await p.waitForTimeout(300); continue; }
    await opt.click();
    await p.waitForTimeout(450);
  }
  ok(await p.locator('.chk-offer').isVisible(), `${name}: check-up nedošel k výsledku`);
  await p.locator('[data-restart]').click();
  await p.waitForTimeout(400);
  ok(!(await p.locator('.chk-offer').isVisible()), `${name}: „Projít znovu“ nevrátilo check-up na začátek`);

  // filtr témat + „Zobrazit další články" v /clanky
  await p.goto(ORIGIN + '/clanky', { waitUntil: 'networkidle' });
  const vis = () => p.locator('.cla-article:visible').count();
  const total = await p.locator('.cla-article').count();
  const first = await vis();
  const more = p.locator('[data-articles-more]');
  ok(first === Math.min(6, total), `${name}: /clanky ukazuje na začátku ${first} článků (čekáno ${Math.min(6, total)})`);
  ok((await more.isVisible()) === total > 6, `${name}: tlačítko „Zobrazit další“ neodpovídá počtu článků`);
  const btn = p.locator('.cla-topics__btn').nth(1);
  const topic = (await btn.getAttribute('data-topic')) || '';
  await btn.click();
  await p.waitForTimeout(300);
  const shown = await vis();
  const cats = await p.$$eval('.cla-article', (els) => els.filter((e) => e.offsetParent !== null).map((e) => e.dataset.category));
  ok(shown > 0 && cats.every((c) => c === topic), `${name}: filtr „${topic}“ ukazuje i jiná témata`);
  if (await more.isVisible()) { await more.click(); await p.waitForTimeout(300); }
  const cats2 = await p.$$eval('.cla-article', (els) => els.filter((e) => e.offsetParent !== null).map((e) => e.dataset.category));
  ok(cats2.every((c) => c === topic), `${name}: „Zobrazit další“ při filtru odkrylo jiná témata`);
  await p.locator('.cla-topics__btn').first().click();
  await p.waitForTimeout(300);
  ok((await vis()) === first, `${name}: „Všechna témata“ nevrátilo výchozí stav (${await vis()} místo ${first})`);
  if (total > 6) {
    await more.click();
    await p.waitForTimeout(300);
    ok((await vis()) === Math.min(12, total) && (await more.isVisible()) === total > 12, `${name}: „Zobrazit další“ neodkrylo další články`);
  }

  // článek: seznam k odškrtání počítá
  await p.goto(ORIGIN + '/clanky/nejdriv-hypoteka-potom-nemovitost', { waitUntil: 'networkidle' });
  const box = p.locator('[data-checklist]').first();
  await box.scrollIntoViewIfNeeded();
  await box.locator('label').first().click();
  await p.waitForTimeout(200);
  ok((await box.locator('[data-checked]').textContent()) === '1', `${name}: seznam k odškrtání nepočítá zaškrtnutí`);
  await p.close();
}

for (const name of only) {
  const { engine, opts } = PROFILES[name];
  const browser = await engine.launch();
  const ctx = await browser.newContext(opts);
  const pages = await pageList(ctx);
  for (const path of pages) await checkPage(ctx, name, path);
  const fctx = await browser.newContext(opts);
  try { await functional(fctx, name, !!opts.isMobile || (opts.viewport && opts.viewport.width < 768)); } catch (e) { fails.push(`${name}: test funkcí spadl — ${e.message.split('\n')[0]}`); }
  await browser.close();
  console.log(`${name}: ${pages.length} stránek prověřeno`);
}

console.log(`\n${checks} kontrol, ${fails.length} problém(ů)`);
for (const f of fails) console.log('FAIL ' + f);
process.exit(fails.length ? 1 : 0);
