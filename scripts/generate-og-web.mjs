// Vyfotí předlohu src/pages/og-web/[variant].astro (jen při vývoji) a uloží
// výchozí obrázek pro sdílení webu do public/og-image.png (1200 × 630).
// Spuštění: npm run og:web (musí běžet npm run dev).
import { chromium } from 'playwright';
import { fitTextToPhoto, MIN_GAP } from './lib/og-fit.mjs';

const ORIGIN = (process.env.OG_URL || 'http://localhost:4321').replace(/\/$/, '');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const res = await page.goto(`${ORIGIN}/og-web/vychozi`, { waitUntil: 'networkidle' });
if (!res || !res.ok()) throw new Error(`/og-web/vychozi vrátilo ${res?.status()} — běží npm run dev?`);
await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const fit = await fitTextToPhoto(page);
if (!fit.ok) throw new Error(`text „${fit.what}“ je jen ${fit.gap} px od postavy (min. ${MIN_GAP})`);
console.log(`text ${fit.gap} px od postavy`);
await page.locator('[data-og]').screenshot({ path: 'public/og-image.png' });
await browser.close();
console.log('OK  public/og-image.png');
