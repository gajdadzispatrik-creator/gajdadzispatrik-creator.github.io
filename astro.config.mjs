import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeCzechNbsp from './src/lib/rehype-czech-nbsp.mjs';
import { readdirSync, readFileSync } from 'node:fs';

// Datum poslední změny článků pro sitemapu (`lastmod`, implementační plán SEO
// 25. 11. 2026, A-3d): updatedAt, jinak publishedAt z hlavičky článku. Ostatní
// stránky lastmod nemají – Google nepřesné datum stejně ignoruje.
const ARTICLE_LASTMOD = Object.fromEntries(
  readdirSync('./src/content/clanky')
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const head = readFileSync(`./src/content/clanky/${file}`, 'utf8').split('---')[1] ?? '';
      const date = head.match(/^updatedAt:\s*(\S+)/m)?.[1] ?? head.match(/^publishedAt:\s*(\S+)/m)?.[1];
      return [file.replace(/\.mdx$/, ''), date];
    })
    .filter(([, date]) => Boolean(date))
);

// Stránky mimo sitemap (cesty bez koncového lomítka) — např. stránka
// s `noindex`. Od 5. 10. 2026 prázdné (`/clanky` zveřejněné s prvními články).
const SITEMAP_EXCLUDE = ['/dekuji'];

export default defineConfig({
  site: 'https://patrikgajdadzis.cz',
  output: 'static',
  // Články (src/content/clanky, MDX): nezlomitelné mezery se doplní samy.
  markdown: {
    rehypePlugins: [rehypeCzechNbsp],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.includes(new URL(page).pathname.replace(/\/$/, '')),
      // Adresy bez koncového lomítka (kromě domovské) — shodně s canonical
      // a přesměrováním v .htaccess.
      serialize: (item) => {
        const url = item.url.replace(/(.)\/$/, '$1');
        const slug = url.match(/\/clanky\/([^/]+)$/)?.[1];
        const date = slug ? ARTICLE_LASTMOD[slug] : undefined;
        return { ...item, url, ...(date ? { lastmod: new Date(date).toISOString() } : {}) };
      },
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
