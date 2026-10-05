// Obrázky pro sdílení článků (og:image, 1200 × 630).
//
// Vyfotí předlohu src/pages/og/[slug].astro (existuje jen při vývoji) pro
// každý zveřejněný článek a uloží ji do public/og/<soubor>.png. Detail
// článku ji pak použije místo výchozího public/og-image.png.
//
// Spuštění: dev server musí běžet (npm run dev), pak `npm run og`.
// Po přidání nebo přejmenování článku / změně nadpisu spustit znovu.
// Jen jeden článek: ONLY=<soubor bez .mdx> npm run og

import { chromium } from '@playwright/test';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = (process.env.AUDIT_URL || 'http://localhost:4321').replace(/\/$/, '');
const CONTENT = 'src/content/clanky';
const OUT = 'public/og';

const slugs = readdirSync(CONTENT)
  .filter((f) => f.endsWith('.mdx'))
  .filter((f) => !/^draft:\s*true\s*$/m.test(readFileSync(join(CONTENT, f), 'utf8').split('---')[1] ?? ''))
  .map((f) => f.replace(/\.mdx$/, ''))
  .filter((s) => !process.env.ONLY || s === process.env.ONLY);

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const slug of slugs) {
  const res = await page.goto(`${ORIGIN}/og/${slug}`, { waitUntil: 'networkidle' });
  if (!res || !res.ok()) throw new Error(`/og/${slug} vrátilo ${res?.status()} — běží npm run dev?`);
  // Lišta vývojového serveru Astra se jinak vyfotí dole uprostřed.
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('[data-og]').screenshot({ path: join(OUT, `${slug}.png`) });
  console.log(`OK  ${OUT}/${slug}.png`);
}

await browser.close();
console.log(`\nHotovo: ${slugs.length} obrázků.`);
