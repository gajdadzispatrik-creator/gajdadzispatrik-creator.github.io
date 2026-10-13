# Stav projektu a TODO

Přesunuto z `CLAUDE.md` 13. 10. 2026 beze změny obsahu (úspora tokenů –
CLAUDE.md se načítá s každou zprávou). Odkazy v kódu a dokumentech ve tvaru
„CLAUDE.md „Konvence: …““ vedou na stejnojmenný oddíl tady; „výše/níže“
může mířit do jiného souboru v `docs/konvence/` (rozcestník je v CLAUDE.md).

## Stav projektu (k 23. 8. 2026)

**Hotovo:** celá homepage vč. footeru — Header (vč. mobilního menu), Hero
(s dekorativní linií a placeholder fotkou), StatsBand, „Neřeším produkty. Řeším
souvislosti.", ConnectionsSection, RouterSection, ProcessSection, ReviewsSection,
BenefitsSection, CasesSection („Výsledky místo slibů"), AboutSection, ArticlesSection,
FaqSection, ContactSection („Proberme, co potřebujete vyřešit.", `id="kontakt"`,
telefonní pás + formulář bez backendu — viz TODO níže), SiteFooter (tři pásma
oddělená trasou, trasa tady poprvé a jediný-krát KONČÍ smaragdovou tečkou u
značky — mimo `<main>`, na úrovni `<body>`, kvůli implicitní roli `contentinfo`).
Design tokeny, self-hostovaný font, přístupnostní základ (skip-link,
focus-visible, `prefers-reduced-motion`), schválené hero screenshoty,
automatická kontrola pozicování (`npm run check:layout`, 192/192 kontrol),
**CookieConsent.astro** (cookie lišta v levém dolním rohu + panel Nastavení,
vložené do `BaseLayout.astro` mezi hlavní obsah a `<slot name="footer" />` —
na všech stránkách, ne jen na homepage; `SiteFooter.astro`'s „Nastavení
cookies" (`#footer-cookie-settings`) ho otevírá).

**Chybí / TODO (nespuštěno):**

**Aktuální seznam úkolů do spuštění je v `docs/audits/prelaunch-p0-status.md`,
sekce 20 („ÚKOLY DO SPUŠTĚNÍ“)** — fotky, sekce Články
na homepage, nasazení na Wedos, Google profil (web `pafinga.cz` →
`patrikgajdadzis.cz`), Search Console, GA4. Tam se udržuje, tady jen stručně:

- **Fotky** jsou od 6. 10. 2026 finální (bez vodoznaku, WebP, stejné
  rámování jako schválené testovací). Usazení je závazně zapsané
  v `docs/fotky-umisteni.md` (cílové hodnoty + postup +
  `scripts/photo-metrics.mjs`) — každou další výměnu usadit přesně podle něj.
- Všechny podstránky (`/sluzby` + 5 detailů, `/pristup`, `/recenze`,
  `/o-mne`, `/clanky`, právní stránky, 404) jsou hotové. `/clanky` je od
  5. 10. 2026 zveřejněné (první tři články, odkaz v menu a patičce).
- **Články (od 5. 10. 2026):** `src/content/clanky/*.mdx` → `/clanky/<soubor>`
  (`src/pages/clanky/[slug].astro`, data `src/data/articles.ts`, prvky
  `src/components/article/`). Postup a pravidla: `docs/clanky-navod.md`.
  Typografie v článcích se doplňuje sama (`src/lib/rehype-czech-nbsp.mjs`,
  Astro 7 kvůli tomu potřebuje `@astrojs/markdown-remark`). `draft: true`
  = jen dev a náhled (PUBLIC_PREVIEW), na Wedos se nesestaví.
- **CookieConsent.astro a právní stránky** — vlastní znění, **uživatel je
  24. 9. 2026 přijal jako hotové bez další právní kontroly**. `loadAnalytics()`
  je inertní stub, dokud nebude GA4 ID. Marketingová kategorie je záměrně
  `disabled` (marketing se nepoužívá).
- **SiteFooter.astro** — všechny odkazy doplněné; „Kariéra“ dočasně skrytá
  (bez cílové stránky).
- **ContactSection.astro — odesílání formuláře:** implementováno 24. 9. 2026 —
  POST na `public/api/poptavka.php` (Wedos PHP ≥ 8.1), e-mail na
  `patrik@mintfinance.cz`, odesílatel `poptavka@patrikgajdadzis.cz`, honeypot
  `website` + doba vyplnění `vyplneno-ms` (min. 3 s). Nic se neukládá na
  server. Lokálně PHP neběží → **po nasazení otestovat skutečné odeslání**
  (doručení, spam složka, SPF domény). Hodnoty ve formuláři obsahují U+00A0
  (typografie) — PHP je normalizuje před kontrolou whitelistu.
- SEO/GEO vrstva (brief §23): favicon a Open Graph / Twitter meta HOTOVO (4. 10. 2026), canonical,
  sitemap (od 4. 10. 2026 automaticky `@astrojs/sitemap` → `sitemap-index.xml`,
  vyřazené stránky v `SITEMAP_EXCLUDE` v `astro.config.mjs`), `robots.txt`, strukturovaná data (JSON-LD `FinancialService`; FAQPage na stránkách s častými otázkami přes `faqPage(faqs)` z `src/data/entity.ts` — z téhož pole, které se vykresluje, u nové stránky s FAQ přidat stejně).
- Právní/regulatorní: registr ČNB, zásady zpracování OÚ, cookies — ověřit dle §8.
- **Příběhy v CasesSection („Výsledky místo slibů“) jsou SKUTEČNÉ** (uživatel
  potvrdil opakovaně) — nenavrhovat jejich nahrazení. ArticlesSection čerpá
  ze zveřejněných článků (od 5. 10. 2026).

**Známé nesrovnalosti k opravě:**

- ~~`StatsBand.astro` „5,0 Google recenze"~~ — vyřešeno 5. 10. 2026: pás ukazuje
  5,0 ★ hodnocení na Google · Zdarma · 30 minut úvodní konzultace; počet recenzí
  záměrně ne (uživatel: mění se).
- ~~Přednačítání jen `manrope-latin.woff2`~~ — vyřešeno 24. 9. 2026:
  `BaseLayout.astro` přednačítá i `manrope-latin-ext.woff2` (ř, š, č, ž, ě, ů),
  oba soubory se stahují současně, bez probliknutí náhradního písma.
