# Předspouštěcí P0 technické dotažení — stav po úkolu

Datum: 10. 9. 2026
Navazuje na `docs/audits/prelaunch-audit.md` (9. 9. 2026) — tenhle dokument
ho NENAHRAZUJE ani nemaže, jen zaznamenává stav PO implementaci úkolu
„Předspouštěcí P0 technické dotažení webu patrikgajdadzis.cz“. Kde se čísla/
závěry liší, platí tento novější dokument (starší zůstává jako historický
záznam původního nálezu).

Rozsah: technická/SEO/entity/indexační a konverzní dotažení. Bez redesignu,
bez nových landing pages, bez nových článků, bez rozsáhlého přepisu copy,
bez deploy, bez git push (projekt navíc není git repozitář).

---

## 1) Změněné soubory

**Nové soubory:**
- `src/data/entity.ts` — jediný zdroj pravdy pro JSON-LD (Person, WebSite, `breadcrumbList()` helper).
- `public/robots.txt`
- `public/sitemap.xml`
- `docs/audits/prelaunch-p0-status.md` (tento report)

**Upravené soubory:**
- `src/layouts/BaseLayout.astro` — canonical, `meta robots`, Open Graph, Twitter card, JSON-LD `@graph` (nové props `robots`, `ogType`, `jsonLd`).
- `src/components/Header.astro` — odstraněn odkaz „Články“ (`/clanky`) z hlavní i mobilní navigace.
- `src/components/SiteFooter.astro` — odstraněn odkaz „Články“ z `navLinks`; propojeno 5 `serviceLinks` na existující detailní stránky služeb (dřív `href: null` i přesto, že stránky existují **a** šablona pro ně navíc vůbec neuměla vykreslit odkaz — viz bod 6); aktualizován zastaralý hlavičkový komentář.
- `src/components/ArticlesSection.astro` — odstraněno CTA „Všechny články“ (odkaz na `/clanky`).
- `src/components/StatsBand.astro` — odstraněna položka „Od 2020 / Ve financích“; zjednodušen dvouprvkový layout, odstraněna nepoužívaná `--since` CSS varianta.
- `src/components/CasesSection.astro` — opraven mrtvý odkaz `href="/reference"` → `/recenze` (route `/reference` nikdy neexistovala).
- `src/pages/index.astro` — SEO title změněn na „Finanční poradce Ostrava | Patrik Gajdadzis“ (H1 beze změny).
- `src/pages/o-mne.astro` — SEO title změněn na „O mně | Patrik Gajdadzis“; `ogType="profile"`; přidáno `ProfilePage` + `BreadcrumbList` JSON-LD.
- `src/pages/sluzby/hypoteky.astro` — SEO title změněn na „Hypoteční poradce Ostrava | Patrik Gajdadzis“; přidáno `Service` + `BreadcrumbList` JSON-LD (H1 beze změny).
- `src/pages/sluzby/financni-plan.astro`, `investice.astro`, `pojisteni.astro`, `penze.astro` — přidáno `Service` + `BreadcrumbList` JSON-LD, beze změny title/description/H1.
- `src/pages/clanky.astro` — `robots="noindex, follow"`.

**Nezměněno** (záměrně, viz jednotlivé body níže): `ContactSection.astro` (formulář), `CookieConsent.astro` (GA4), `recenze.astro` (placeholdery), `pristup.astro` (flag „K OVĚŘENÍ“), `src/data/legal/*.ts`, `package.json`, `astro.config.mjs`.

---

## 2) `/clanky`

- Odkazy odstraněny ze **3** míst: `Header.astro` (hlavní i mobilní nav), `SiteFooter.astro` (`navLinks`), `ArticlesSection.astro` (CTA „Všechny články“ na homepage).
- Route **existuje** (`src/pages/clanky.astro`, funkční prázdný stav — schváleno uživatelem v dřívějším úkolu) — podle zadání „nevytvářej náhradní placeholder“ se nemazala, jen se odpojila od veřejné navigace.
- **Není** v `sitemap.xml` (13 URL, `/clanky` mezi nimi chybí záměrně).
- **Není** indexovatelná — `<meta name="robots" content="noindex, follow">`. `robots.txt` ji záměrně NEBLOKUJE (`Disallow`) — kdyby ji crawler nesměl navštívit, nikdy by neuviděl `noindex` tag a mohl by URL i tak zaindexovat bez popisku (běžné doporučení Google/Bing). Bez interních odkazů a bez sitemapu ji navíc prakticky nemá jak najít.
- Ověřeno crawlem: `/clanky` vrací `200` (technicky funkční, jen neodkazovaná/needindexovaná) — přesně stav, který zadání žádalo.

---

## 3) `/o-mne`

- Route **existuje** (dokončena v samostatném předchozím úkolu v rámci tohoto sezení) — vrací `200`.
- Odkazy z `Header.astro`, `SiteFooter.astro`, `AboutSection.astro` (CTA „Více o mně“ na homepage) — všechny ověřeny crawlem, všechny funkční.
- **SEO title změněn** z „Patrik Gajdadzis | Finanční poradce Ostrava“ (schválený návrh v `docs/content-subpages.md`) na „O mně | Patrik Gajdadzis“ — **rozpor se starším content masterem, záměrný a hlášený**: zadání tohoto úkolu (§8) výslovně žádá, aby `/o-mne` nesoutěžila s homepage o hlavní dotaz „finanční poradce Ostrava“, protože homepage title byl ve stejném úkolu změněn na přesně tuhle frázi. Meta description beze změny. Zdokumentováno i přímo v kódu (`o-mne.astro`, komentář nad `<BaseLayout>`).
- Přidáno `ProfilePage` schema (`mainEntity` → jediná Person entita) + `BreadcrumbList` (Domů → O mně) — nahrazuje dřívější návrh `AboutPage` z content masteru (`docs/content-subpages.md` ho nikdy neimplementoval, takže nejde o regresi, jen o jinou volbu typu podle aktuálního zadání §12).

---

## 4) „Od 2020“

- Odstraněno z **jediného** místa, kde se na produkčním webu vyskytovalo: `src/components/StatsBand.astro` (homepage, pás pod hero). Nenahrazeno žádnou vymyšlenou statistikou — `stats-band` teď má 2 položky místo 3, flex layout (`flex:1`) se rozdělení přizpůsobil beze změny.
- **Nezůstává nikde jinde na veřejném webu** — `/o-mne` už od svého vzniku žádný rok zahájení praxe neuváděla (viz vlastní hlavičkový komentář v `o-mne.astro`), ostatní podstránky ho nikdy neměly.
- `docs/content-homepage.md` (interní dokumentace, řádky 69–70) pořád obsahuje starý schválený text s „Od 2020“ — podle zadání „interní historická dokumentace nemusí být hromadně přepisována“ ponechána beze změny; `StatsBand.astro`'s vlastní nový komentář teď explicitně říká, že se veřejně nezobrazuje a proč.

---

## 5) Broken links

- **Před změnami:** grep všech `href="/…"` napříč `src/` odhalil **1 skutečně mrtvý odkaz** — `CasesSection.astro:143` (`href="/reference"`, route nikdy neexistovala; CLAUDE.md už dřív dokumentuje, že web používá „Recenze“, ne „Reference“). Dále **5 vizuálně přítomných, ale nefunkčních** odkazů ve `SiteFooter.astro`'s `serviceLinks` (`href: null` + šablona bez podmíněného renderu — dvojitá příčina, viz bod 6).
- **Po změnách:** `0`. Ověřeno (a) grepem `href="/reference"`/`href="/clanky"` v celém vybuildovaném `dist/`, (b) skriptovaným crawlem, který z 13 veřejných stránek vytáhl KAŽDÝ interní `href` a ověřil ho proti seznamu skutečně existujících routes (žádný nález mimo seznam), (c) `curl` na všech 13 stránek + `/robots.txt` + `/sitemap.xml` → všude `200`.
- Telefonní odkaz `tel:+420775217721` — ověřen konzistentní na všech výskytech (Hero, ContactSection, SiteFooter, `regulatorni-informace.astro`).

---

## 6) SEO

Všech **13 veřejných indexovatelných stránek** (homepage + 5 detailů služeb + `/sluzby` + `/pristup` + `/recenze` + `/o-mne` + 3 právní stránky) teď automaticky (přes `BaseLayout.astro`, žádná ruční hodnota na 14 místech) dostává:
- unikátní `<title>` a `meta description` (beze změny kromě 3 výslovně zadaných title — homepage, `/o-mne`, `/sluzby/hypoteky`),
- **self-referencing canonical** dopočítaný z `Astro.url`/`Astro.site` (bez koncového lomítka, kromě domovské stránky — stejná konvence jako všechny interní `href`),
- `meta name="robots"` (`index, follow` všude kromě `/clanky`: `noindex, follow`),
- Open Graph (`og:title`, `og:description`, `og:url`, `og:type` — `website` všude, `profile` na `/o-mne`; `og:site_name`, `og:locale`),
- Twitter card (`summary` — bez obrázku, viz bod 19 pravidel/„chybí OG obrázek“ níže),
- právě jedno `<h1>` na stránku (beze změny, nekontrolováno znovu — poslední prelaunch audit z 9. 9. 2026 to už ověřil a od té doby se H1 struktura nezměnila).

Ověřeno přímo v `dist/` po buildu (ne jen v kódu) — namátkou homepage, `/o-mne`, `/sluzby/hypoteky`, `/clanky`.

---

## 7) Sitemap

- Cesta: `public/sitemap.xml` → produkčně `https://patrikgajdadzis.cz/sitemap.xml`.
- **13 URL** — ruční statické XML (žádná nová závislost, `@astrojs/sitemap` nebyl přidán — projekt má jen 14 stránek, ruční správa je bezpečně udržitelná a zadání §18 to výslovně preferuje před novou knihovnou).
- Obsahuje: `/`, `/sluzby`, 5× `/sluzby/*`, `/pristup`, `/recenze`, `/o-mne`, 3× právní stránky.
- **Potvrzeno: `/clanky` v sitemap NENÍ.**

---

## 8) `robots.txt`

- Cesta: `public/robots.txt` → `https://patrikgajdadzis.cz/robots.txt`.
- `Googlebot`: povolen (`Allow: /`). `Bingbot`: povolen. `OAI-SearchBot`: povolen. `PerplexityBot`: povolen. Obecné pravidlo `User-agent: *` → `Allow: /` (nic na webu není omylem blokované).
- Odkaz na `Sitemap:` přítomen.
- **`GPTBot`: záměrně NEŘEŠEN** — v `robots.txt` není žádné specifické pravidlo pro `GPTBot` (spadá jen pod obecné `User-agent: *`, tedy fakticky povolen tímhle pravidlem, ale bez vlastního řádku). Podle zadání „pokud není v projektu výslovně řešený, neměň jeho stav na základě domněnky“ — nechávám na tobě, jestli chceš `GPTBot` explicitně povolit/zakázat vlastním pravidlem.

---

## 9) Structured data (JSON-LD)

- **Jediná Person entita** na celém webu: `@id: https://patrikgajdadzis.cz/#person` — definovaná v `src/data/entity.ts`, vkládaná automaticky do KAŽDÉ stránky přes `BaseLayout.astro`. Ověřeno skriptem, který na všech 13 stránkách naparsoval JSON-LD a potvrdil přesně **1 distinct Person `@id`** napříč celým webem.
  - Pole: `name`, `url`, `telephone` (`+420775217721`), `email` (`patrik@mintfinance.cz`), `jobTitle` („Finanční poradce“ — stejná fráze jako všude v copy), `worksFor` (MINT reality a finance s.r.o.), `areaServed` (Ostrava), `knowsAbout` (5 oblastí služeb), `sameAs` (Facebook/Instagram/Google — všechny reálné, ověřené ve `SiteFooter.astro`).
  - **Záměrně chybí:** `image` (žádná reálná fotka), jakákoli akreditace/certifikace/počet let praxe, a **vztah k BEplan finanční plánování s.r.o.** — `regulatory.ts` popisuje Patrika jako jejich vázaného zástupce (regulovaná, právně nuancovaná kategorie podle zákona č. 257/2016 Sb. a dalších), ne zaměstnance — mapovat to do `worksFor` by mohlo zavádějícím způsobem zjednodušit právní vztah, který má vlastní samostatnou stránku (`/regulatorni-informace`). Zadání to samo řadí mezi zakázané „neověřený vztah k BEplan“.
- `WebSite` (`@id: …/#website`) s `publisher` odkazem na Person — přítomné na každé stránce.
- `/o-mne`: `ProfilePage` (`mainEntity` → Person) + `BreadcrumbList` (Domů → O mně).
- `/sluzby/hypoteky`, `/sluzby/financni-plan`, `/sluzby/investice`, `/sluzby/pojisteni`, `/sluzby/penze`: `Service` (`name`/`description` = doslovně schválený SEO title/meta description dané stránky, `provider` → Person, `areaServed` Ostrava + Česko — ověřeno proti vlastnímu textu „Ostrava nebo online po celé ČR“ v popisu) + `BreadcrumbList` (Domů → Služby → [název služby]).
- **Žádné** `LocalBusiness`/`FinancialService` — viz bod 13.
- **Žádné** `AggregateRating`/`Review` — viz bod 10.
- **Žádné** `FAQPage` — na webu dosud nebylo žádné (audit 9. 9. 2026 potvrdil 0 výskytů structured data vůbec), takže nešlo o nic k opravě; nové jsem nepřidával (zadání ho nevyžaduje explicitně a `/sluzby/hypoteky` a další mají viditelné FAQ sekce, které by ho unesly — nechávám jako P1 příležitost, ne nutnost).
- Syntaktická validace: skript naparsoval `JSON.parse()` na JSON-LD ze všech 13 stránek — **0 chyb**, žádná placeholder data, žádné fake rating hodnoty.
- **Nemohu tvrdit, že schema je způsobilé pro rich results** — to vyžaduje živé ověření Google Rich Results Test/Search Console, mimo rozsah lokálního auditu.

---

## 10) Recenze (`/recenze`)

- **Obsahuje placeholdery** — `src/pages/recenze.astro`, pole `reviews`, všech 6 položek má `author/rating/date/text/sourceUrl: null` (strukturální placeholder, ne fiktivní data — vykresluje se jako vlasové řádky + viditelný štítek „RECENZE — PLACEHOLDER“, ne prázdný/fingovaný blockquote). Beze změny — zadání §15 žádá „nahlas jako blocker“, ne oprav.
- **Blocker:** dokud nedodáš skutečná ověřená data z Google profilu, `/recenze` ukazuje jen placeholdery, zatímco homepage (`ReviewsSection.astro`) má 3 reálné recenze. Technicky funkční (žádná fiktivní data, žádná chyba), ale slabý první dojem pro návštěvníka, který klikne z homepage na „Recenze“.
- **Žádné** `AggregateRating`/`Review` schema na stránce ani nikde jinde — potvrzeno.

---

## 11) Kontaktní formulář

- **Frontend:** kompletní, funkční klientská validace (povinná pole, e-mail formát, rádio skupina), stavy úspěchu/chyby, přístupnost (ARIA, focus management) — `src/components/ContactSection.astro`.
- **Backend: NEEXISTUJE.** `event.preventDefault()` → validace → simulace úspěchu (`successStatus.hidden = false`, `form.reset()`) — žádný `fetch`/`action`/API volání. Kód to sám komentuje (`// Bez backendu — pouze simulace…`).
- **Lead reálně NEODEJDE NIKAM.** Toto je jediný skutečný P0 blocker zbývající po tomhle úkolu — nemůžu ho vyřešit bez tvého rozhodnutí (viz zadání §20 — „pokud backend neexistuje, nevytvářej fake řešení“).
- **Co potřebuju od tebe, abych to dokončil:**
  1. Kam mají poptávky chodit — e-mailová adresa (současný kontaktní e-mail ve footeru je `patrik@mintfinance.cz` — má tam chodit i tohle?), nebo preferuješ externí formulářovou službu (Formspree/Formsubmit/podobné) či vlastní backend?
  2. Jaký hosting/deployment web skutečně používá (statický hosting bez serveru = potřeba externí formulářová služba nebo serverless funkce; hosting s vlastním backendem = jiná cesta) — tohle nejde odhadnout z projektu samotného.
  3. Souhlas s honeypot polem + časovým limitem proti spamu (levné, bez CAPTCHA) — technika je v kódu už předpřipravená komentářem.
  4. Retenční politika pro uchovávaná data (musí sedět s `src/data/legal/privacy.ts`).

---

## 12) Analytics

- **Skutečný současný stav beze změny:** `CookieConsent.astro`, `GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'` — placeholder, gtag skript se nikdy reálně nenačte platným ID. Consent-gating logika (žádný analytický skript před souhlasem) je správně napsaná a funkční — **neměnil jsem ji**, jen jsem ji znovu ověřil.
- **Nevytvořil jsem placeholder tracking ani žádné nové ID.**
- **Event naming (`generate_lead`, `form_start`, `form_error`, `click_phone`, `cta_consultation`, `external_hypotekaostrava_click`) jsem NEIMPLEMENTOVAL** — zadání to výslovně dovoluje jen „pokud to nevyžaduje zbytečný refaktor“. Formulář ještě nemá fungující odesílání (bod 11) a GA4 nemá reálné ID — zavádět teď event infrastrukturu by znamenalo napojovat ji na kód, který se stejně brzy změní (až se doplní backend). Řadím to do P1 (viz níže).
- **UTM/attribution příprava:** stejný důvod, stejně odloženo do P1 — nedává smysl řešit atribuci pro formulář, který zatím nikam neodesílá.
- **Co budeš muset dodat:** reálné GA4 měřicí ID (až založíš property), a rozhodnutí, jestli chceš analytiku nasadit současně se spuštěním, nebo později (obojí je v pořádku).

---

## 13) Legal/compliance — zbývající body vyžadující lidské ověření

Nic z tohoto jsem sám neměnil (mimo rozsah, zadání to výslovně zakazuje):

- **`/pristup`, sekce „Odměna“** — pořád nese vizuální štítek „K OVĚŘENÍ PŘED PUBLIKACÍ“. Věcně konzistentní s `regulatory.ts` (potvrzeno už dřívějším auditem 9. 9. 2026), ale finální právní sign-off musíš dát ty/právník, ne audit.
- **Retenční lhůty** v `src/data/legal/privacy.ts` a `cookies.ts` — potvrzeny 24. 9. 2026 (6 měsíců/10 let/14 měsíců, souhlas 12 měsíců), viz bod 5 v sekci 20.
- **`LocalBusiness`/`FinancialService` schema jsem NEIMPLEMENTOVAL** (zadání §14) — z projektu nejde jednoznačně určit, který subjekt je právně/provozně „ten“ business pro tento účel (Patrik jako OSVČ na `Hlavní třída 568/73, Ostrava`? MINT reality a finance s.r.o.? BEplan finanční plánování s.r.o. jako regulovaný subjekt?), který odpovídá Google Business Profilu, ani jakou adresu by měl nést. `regulatory.ts` navíc jasně rozlišuje **registrované sídlo** (Hlavní třída 568/73) od **místa osobních konzultací** (17. listopadu 599/30, Ostrava-Poruba) — obě adresy jsou reálné, ale patří jinému účelu, a plést je do jednoho schema by bylo přesně to zavádějící sloučení, které zadání §26 zakazuje. **Potřebuju tvoje rozhodnutí/potvrzení**, než se tohle schema vůbec dá bezpečně přidat.
- **Kontrola zakázaných frází** („nezávislý finanční poradce“, „certifikovaný poradce u ČNB“, „vlastní licence Mint“, garance výnosu/schválení, „nejlepší produkt“) — grep přes celý `src/`: **0 výskytů**. Web je v tomhle čistý.

---

## 14) Technické testy

- `npm run build` (`astro check && astro build`): **0 chyb, 0 varování, 0 hintů**, 14 stránek vygenerováno (spuštěno opakovaně po každé sadě úprav).
- `npm run check:layout`: **558/558 kontrol v pořádku** (žádná regrese ze změn v `StatsBand`/`ArticlesSection`/`Header`/`SiteFooter`/`CasesSection`).
- Broken-link crawl: skript extrahoval KAŽDÝ interní `href` ze všech 13 vybuildovaných stránek a ověřil ho proti seznamu skutečně existujících routes — **0 problémů**. `curl` na všech 13 stránek + `robots.txt` + `sitemap.xml` → všude `200`.
- JSON-LD validace: `JSON.parse()` na `@graph` ze všech 13 stránek — **0 syntaktických chyb**, přesně 1 distinct Person `@id`, žádná fake rating data.
- Bezpečnost: žádný nový `.env`/secret nebyl přidán ani odhalen; `GA_MEASUREMENT_ID` zůstává neaktivní placeholder, žádný klíč v klientském JS.

---

## 15) P0 — stále blokuje spuštění

1. **Kontaktní formulář neodesílá lead nikam** (bod 11) — jediný skutečně tvrdý blocker. Vyžaduje tvoje rozhodnutí (cíl doručení, hosting, anti-spam).
2. **`/recenze` ukazuje jen placeholdery** (bod 10) — technicky funkční, ale slabý dojem; ne blokující v technickém smyslu, ale zadání ho žádá nahlásit jako blocker obsahu.
3. **Chybí favicon a OG obrázek** — `public/` neobsahuje žádný favicon ani sociální náhledový obrázek; podle zadání jsem NEVYTVÁŘEL žádný nahodilý/AI asset. Web bude v záložce prohlížeče bez ikony a sdílení odkazu na sítích bude bez náhledu, dokud nedodáš finální logo/fotku.
4. **`LocalBusiness`/`FinancialService` schema chybí** (bod 13) — bezpečně odloženo, dokud nepotvrdíš právní/provozní subjekt.
5. **Finální právní sign-off** — `/pristup` „Odměna“ + retenční lhůty v `privacy.ts`/`cookies.ts` (bod 13).

## 16) P1 — první měsíc po spuštění

- Skutečné články + content collection + detail článku + `Article`/`BlogPosting` schema (`/clanky` pak reaktivovat — odstranit `noindex`, přidat zpět do navigace a sitemap).
- Author profile propojení s Hypotéka Ostrava (cross-site entity) — samostatný úkol.
- Search Console napojení, Bing Webmaster Tools, IndexNow.
- Finální GA4/GTM ID + event naming (`generate_lead` atd., viz bod 12) — až bude formulář reálně odesílat.
- UTM/attribution příprava — stejná závislost.
- Přenést 3 reálné recenze z homepage do `/recenze` (data existují, jen nejsou zkopírovaná).
- `FAQPage` schema na stránkách s viditelným FAQ (`/sluzby/hypoteky` a další) — bezpečná, ne nutná příležitost.
- `manrope-latin-ext.woff2` font preload (drobný FOUT risk na české diakritice — CLAUDE.md i minulý audit ho eviduje, tenhle úkol ho záměrně nechal beze změny, protože je to výkonnostní doladění, ne SEO/entity/indexace).
- `SiteFooter.astro`'s `Infinity` konzolová chyba při některých načteních (`syncRoute` guard, zdokumentováno už dřív).
- Případné landing pages (refinancování, OSVČ, výstavba, rekonstrukce) — NEIMPLEMENTOVÁNO, podle zadání.

## 17) P2 — může počkat

- Další landing pages podle dat, pokročilé filtrování článků/recenzí, case studies, další obsahové clustery, sofistikovaný attribution, další animace, `llms.txt` (bez konkrétního důvodu zatím netřeba).
- Explicitní `GPTBot` pravidlo v `robots.txt` (dnes jen implicitně povolen přes `User-agent: *`) — tvoje rozhodnutí, ne technický dluh.

## 18) Potvrzení

- **Žádný redesign** — nezměněny barvy, font, spacing systém, layout koncept, schválená art direction.
- **Žádné nové články, žádné nové landing pages, žádné nové URL routes.**
- **Žádná nová knihovna/závislost** — `package.json` beze změny, sitemap řešen ručním XML.
- **Žádný deploy, žádný git push** — projekt navíc není git repozitář.
- Jediná věcná odchylka od psaného zadání/content masteru je zdokumentovaná a zdůvodněná přímo v kódu i v tomhle reportu: SEO title `/o-mne` (bod 3) a `/sluzby/hypoteky` (bod 6/9) — obojí přímo podle výslovné instrukce v zadání tohoto úkolu (§8), ne svévolná změna.

---

## 19) Aktualizace stavu — 24. 9. 2026 (SEO + bezpečnostní kontrola)

**Vyřešeno od posledního reportu**
- `/recenze` — 42 skutečných recenzí z Google profilu (bod 10 P0 i P1 „přenést recenze“ splněny).
- `/pristup` „Odměna“ — kapitola odstraněna z webu 14. 9. 2026 (bod 13 právní sign-off pro ni odpadá).
- Meta description — 4 popisky zkráceny pod ~920 px, 8 popisků převedeno do první osoby (brief §6); promítnuto do `content-subpages.md`.
- `manrope-latin-ext.woff2` preload (P1) — hotovo.
- `SiteFooter.astro` `Infinity` chyba (P1) — hotovo, stejná pojistka doplněna do dalších 6 sekcí.
- **Nově (plán dřív neřešil):** `public/.htaccess` pro Wedos — 301 na `https://patrikgajdadzis.cz` (bez www, bez koncového lomítka, přes `%{THE_REQUEST}`), `DirectorySlash Off`, bezpečnostní hlavičky (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP `frame-ancestors/base-uri/object-src`), cache a komprese. Ověřeno jen simulací — doména zatím neexistuje v DNS, po nasazení nutný `curl` test a kontrola hlaviček (např. securityheaders.com).

**Stále otevřené — P0 (blokuje spuštění)**
1. ~~Kontaktní formulář neodesílá~~ — implementováno 24. 9. 2026: `public/api/poptavka.php` → e-mail na patrik@mintfinance.cz, honeypot + min. doba vyplnění. Zbývá jen živý test po nasazení na Wedos (doručení, spam, SPF, PHP ≥ 8.1).
2. Favicon a OG obrázek chybí (bod 15.3) — bez faviconu prohlížeč žádá `/favicon.ico` → 404.
3. Vlastní stránka 404 chybí (`src/pages/404.astro`) — Wedos jinak ukáže svou výchozí chybovou stránku; po vytvoření doplnit `ErrorDocument 404 /404.html` do `.htaccess`.
4. Retenční lhůty v `privacy.ts`/`cookies.ts` pořád „odhad“ — potvrzení.

**Stále otevřené — rozhodnutí/P1**
- `LocalBusiness`/`FinancialService` schema (bod 13) — beze změny, čeká na potvrzení subjektu/adresy.
- GA4 ID (`G-XXXXXXXXXX` placeholder) + eventy.
- `npm audit`: 8 zranitelností v build nástrojích (1 critical v `astro`). Pro statický web bez SSR, bez obrázkové optimalizace a bez uživatelského vstupu je dopad na návštěvníky prakticky nulový; týká se buildu a dev serveru (`server.host: true` ho otevírá do lokální sítě). Nezlomové opravy: `npm audit fix`; `astro` vyžaduje major upgrade 5 → 7 jako samostatný úkol.
- `FAQPage` schema (P1) — nízká hodnota: Google od 8/2023 zobrazuje FAQ rich results jen u autoritativních vládních/zdravotnických webů. Doporučeno vyřadit z plánu.
- Search Console/Bing Webmaster/IndexNow, `GPTBot` pravidlo — beze změny (po spuštění / tvoje rozhodnutí).
- `sameAs` v `src/data/entity.ts` odkazuje na `share.google/cjOK…`, odkaz na recenze na webu je `share.google/XnAx…` — ověřit, že oba vedou na správný profil.

---

## 20) Stav a úkoly — 24. 9. 2026 (funkční dotažení)

**Hotovo v tomto kole**
- **Git** — repozitář založen (`main`), `.gitattributes` drží LF (Wedos je Linux). Zatím jen lokálně.
- **Formulář** — záloha každé poptávky do `poptavka@patrikgajdadzis.cz` (jiný poskytovatel než Google Workspace), limit 8 odeslání/hod. z jedné IP (otisk v `api/limity/`, složka zvenku zakázaná `api/.htaccess`), zásady ochrany údajů doplněny o skutečné příjemce (WEDOS, Google Workspace) a otisk IP.
- **Strukturovaná data** — adresa kanceláře (17. listopadu 599/30, 708 00 Ostrava-Poruba) jako `workLocation` u `Person`.
- **robots.txt** — výslovně povoleni AI roboti (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended).
- **Titulky v plánu** — `/sluzby/hypoteky` a `/o-mne` dorovnány na stav webu (změna z předspouštěcího úkolu se nepromítla do `content-subpages.md`).
- **Astro 5 → 7.3.5**, `npm audit` 0 zranitelností, build i `check:layout` beze změny výstupu (554/554). Dev server jen na `127.0.0.1` (dřív celá lokální síť).
- **Lighthouse (mobil, produkční build, 5 stránek):** rychlost 98–100, přístupnost 100, osvědčené postupy 96 (jen chybějící favicon → 404), SEO 100. Opraven přístupný název loga (WCAG 2.5.3).
- **Safari (WebKit, iPhone 13 + iPad, 13 stránek):** žádné chyby JS, přetečení, NaN/Infinity v trase, deformované tečky; tečka v patičce na konci linky; validace formuláře funguje.
- **Postup nasazení** — `docs/deploy-wedos.md` (nastavení Wedosu, nahrání vč. skrytých `.htaccess`, kontrolní příkazy po nasazení).

**Otevřené — dodá/rozhodne uživatel (vizuál a obsah se dodělávají)**
1. Fotky místo placeholderů (homepage hero „FOTO PATRIKA - PLACEHOLDER“, O mně, `/o-mne`, `/pristup`).
2. Sekce Články na homepage — 3 prázdné řádky; skrýt nebo naplnit, dokud nejsou články.
3. Favicon + OG obrázek — bez faviconu hlásí každá stránka 404 v konzoli (jediná výtka Lighthouse).
4. ~~Stránka 404~~ — hotovo 24. 9. 2026 (`src/pages/404.astro`, `ErrorDocument 404 /404.html`, `noindex`, bez canonical). Po nasazení ověřit, že vrací kód 404 (postup v `docs/deploy-wedos.md`).
5. ~~Doby uchovávání údajů~~ — potvrzeno 24. 9. 2026: poptávky 6 měsíců, dokumentace k produktům 10 let (zákon proti praní peněz; přesnou lhůtu ještě ověřit u compliance BEplanu), GA4 14 měsíců, souhlas s cookies 12 měsíců. **Při zapnutí GA4 nastavit uchovávání dat na 14 měsíců** (výchozí jsou 2).
6. Měření — GA4 ID + událost odeslání formuláře a kliknutí na telefon, Search Console + Bing Webmaster (v den spuštění), hlídání dostupnosti (např. UptimeRobot).
7. ~~PSČ na webu~~ — hotovo 24. 9. 2026: patička, kontakt i regulatorní informace „17. listopadu 599/30, 708 00 Ostrava-Poruba" (profil Google uvádí „Ostrava 8" — stejné PSČ, Google obě varianty páruje).
8. ~~`FinancialService` schema~~ — hotovo 24. 9. 2026 (`businessEntity` v `src/data/entity.ts`, název 1:1 podle profilu „Patrik Gajdadzis | Hypotéky a finance", na každé stránce). **Chybí otevírací doba** — dodat celý týden (profil ukazuje 8–18, ale ne všechny dny).
9. Dva různé Google odkazy (`sameAs` → `share.google/cjOK…`, recenze → `share.google/XnAx…`) — ověřit, že oba vedou na správný profil.
9a. ~~Nové recenze na `/recenze`~~ — rozhodnuto 24. 9. 2026: recenze se na web nedoplňují. `/recenze` zobrazuje 3, „Zobrazit další recenze" otevírá Google profil. Počet recenzí se na webu nikde neuvádí (jen hodnocení 5,0), takže nic nezastarává.

**Otevřené — technické**
10. Nasazení na Wedos podle `docs/deploy-wedos.md` + živé testy (přesměrování, hlavičky, formulář do obou schránek, SPF/DKIM/DMARC, kontrola na skutečném iPhonu — testovací WebKit pro Windows nevykresluje věrně tučnost variabilního fontu).
11. Vzdálená záloha gitu (soukromý GitHub/GitLab) — dnes je repozitář jen na OneDrivu.
12. Projekt na OneDrivu — synchronizace `node_modules` způsobuje hromadné dotazy na mazání (tisíce souborů při každé aktualizaci) a hrozí promíchání knihoven. Doporučeno přesunout projekt mimo OneDrive (záloha je teď git) nebo vyřadit `node_modules` ze synchronizace.
13. Drobnosti bez dopadu na návštěvníka: hláška Vite „Failed to scan for dependencies“ v dev režimu (komentáře ve `<script>`), blokující CSS ~0,5 s při simulaci pomalého mobilu (rychlost i tak 98–100).
