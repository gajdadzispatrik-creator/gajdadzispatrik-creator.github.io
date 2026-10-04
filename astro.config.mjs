import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Stránky mimo sitemap — `noindex` (dočasně skrytý `/clanky`, viz clanky.astro).
// Po zveřejnění článků cestu odsud odebrat, zbytek se doplní sám.
const SITEMAP_EXCLUDE = ['/clanky'];

export default defineConfig({
  site: 'https://patrikgajdadzis.cz',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.includes(new URL(page).pathname.replace(/\/$/, '')),
      // Adresy bez koncového lomítka (kromě domovské) — shodně s canonical
      // a přesměrováním v .htaccess.
      serialize: (item) => ({ ...item, url: item.url.replace(/(.)\/$/, '$1') }),
    }),
  ],
  server: {
    // Windows: bez explicitního hosta naslouchal dev server jen na "::"
    // (IPv6) a odmítal spojení na 127.0.0.1. `host: true` to řešilo, ale
    // otevíralo server celé lokální síti — 127.0.0.1 stačí a zůstane jen na
    // tomhle počítači (prohlížeče i Node při „localhost“ zkusí obě adresy).
    host: '127.0.0.1',
  },
});
