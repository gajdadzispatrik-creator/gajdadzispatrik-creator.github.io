# Předspouštěcí audit webu patrikgajdadzis.cz

Datum: 9. 9. 2026
Rozsah: pouze audit — žádný soubor v `src/`, `public/`, `astro.config.mjs` ani
`package.json` nebyl v rámci tohoto úkolu změněn. Jediný nový soubor je
tento report.

Metodika: přečteny všechny hierarchicky nadřazené dokumenty
(`docs/brand-experience-brief.md`, `docs/art-direction-financial-architecture.md`,
`docs/design-direction.md`, `docs/content-homepage.md`, `docs/content-subpages.md`,
`CLAUDE.md`), poté ověřen SKUTEČNÝ stav kódu — čtení zdrojových souborů,
grep napříč `src/`, `npm run build`, `npm run check:layout`, živé prohlížení
v Browser nástroji na 390/834/1440/1920/2048 px. U každého nálezu je uveden
konkrétní soubor (a řádek, kde to dává smysl) jako důkaz — ne jen dojem
„vypadá to hotovo".

---

## A) Souhrnné shrnutí

**Jak blízko je web spuštění:** Technicky a designově je web výrazně dál,
než by se čekalo u „nehotového" projektu — 13 stránek (homepage + 5 detailů
služeb + `/pristup` + `/recenze` + `/clanky` + 3 právní stránky) je
implementovaných, `npm run build` prochází bez chyby (`astro check` 0
chyb/varování), `npm run check:layout` hlásí **514/514** kontrol v pořádku.
Právní/regulatorní texty (`regulatorni-informace.astro`, `zpracovani-osobnich-udaju.astro`,
`cookies.astro`) jsou obsahově vyplněné a Patrikem potvrzené, ne prázdné
šablony. Cookie lišta funguje správně (negativní/pozitivní souhlas, gating
analytiky).

**Ale web NENÍ připravený jít dnes naostro.** Existuje jeden skutečně tvrdý
blokátor (kontaktní formulář nikam neodesílá — viz P0-1) a několik
menších, ale viditelných rozporů, které vznikly tím, jak postupná stavba
probíhala (stránky se stavěly v pořadí, navigace/patička se needitovaly
souběžně). Žádný z nálezů není designový ani obsahový problém vyžadující
předělávku — jde o dokončení propojení, doplnění metadat a několik
jednořádkových oprav.

**Co je skutečně hotové (ne jen podle názvu souboru):**
- Homepage kompletní vč. patičky, cookie lišty, přístupnostního základu.
- 5 detailních stránek služeb (`/sluzby/hypoteky`, `/sluzby/financni-plan`,
  `/sluzby/pojisteni`, `/sluzby/investice`, `/sluzby/penze`) + `/sluzby`
  rozcestník — obsah i layout, ověřeno `check:layout`.
- `/pristup`, `/recenze`, `/clanky` implementované a ověřené.
- 3 právní stránky s reálným, Patrikem odsouhlaseným obsahem.
- Cookie consent systém (GDPR-konformní gating, jen chybí skutečné GA4 ID).
- Technická základna (build, typová kontrola, layout regresní testy).

**Co skutečně chybí/blokuje:**
- Funkční kontaktní formulář (P0).
- Konzistence navigace — `/o-mne` odkazuje na neexistující stránku (P0).
- SEO metadata (canonical, OG, JSON-LD, favicon, sitemap, robots.txt) — nic
  z toho neexistuje (P0/P1 kombinace, viz níže).
- `/recenze` ukazuje jen placeholdery, přestože homepage má 3 reálné
  recenze se stejným zdrojovým odkazem (P1, snadno opravitelné).
- Patička má 5 nefunkčních odkazů na „Služby", ačkoli cílové stránky už
  existují (P1).
- Domov/hosting/DNS stav webu nebyl možné ověřit z projektu — nutné
  potvrzení od uživatele (viz sekce I).

**Co může počkat** (uživatel to sám potvrdil): `/o-mne` obsah, články,
rozšířené filtrování recenzí/článků, case studies, pokročilá analytika.

---

## B) Přehled stránek

| Route | Obsah schválen? | Design/layout | Implementace | SEO metadata | Doporučený stav pro v1 | Co konkrétně chybí |
|---|---|---|---|---|---|---|
| `/` (homepage) | Ano | Hotovo | Hotovo | Chybí canonical/OG/JSON-LD | **Spustit** | Viz SEO sekce; `/o-mne` odkaz v `AboutSection.astro:66` míří na neexistující stránku |
| `/sluzby` | Ano | Hotovo | Hotovo | Chybí | **Spustit** | SEO metadata |
| `/sluzby/hypoteky` | Ano | Hotovo | Hotovo | Chybí | **Spustit** | SEO metadata |
| `/sluzby/financni-plan` | Ano | Hotovo | Hotovo | Chybí | **Spustit** | SEO metadata |
| `/sluzby/pojisteni` | Ano | Hotovo | Hotovo | Chybí | **Spustit** | SEO metadata |
| `/sluzby/investice` | Ano | Hotovo | Hotovo | Chybí | **Spustit** | SEO metadata |
| `/sluzby/penze` | Ano | Hotovo | Hotovo | Chybí | **Spustit** | SEO metadata |
| `/pristup` | Ano | Hotovo | Hotovo | Chybí | **Spustit** — ale viz P0-3 (Odměna) | Finální právní sign-off sekce „Odměna" (viz D, P1-6) |
| `/recenze` | Ano (struktura), obsah = placeholder | Hotovo | Hotovo, ale s prázdnými daty | Chybí | **Spustit s doplněnými daty** (viz P1-1) | 3 reálné recenze existují na homepage a nejsou přenesené sem |
| `/clanky` | Ano | Hotovo | Hotovo (prázdný stav záměrně) | Chybí | **Spustit** (prázdný stav je legitimní, uživatel potvrdil „Články budu doplňovat později") | Nic blokujícího — funguje jako čekárna |
| `/o-mne` | — | — | **Neexistuje** | — | **Neuvádět v navigaci** (uživatel potvrdil odklad) | Stránka + odstranění 3 mrtvých odkazů |
| `/regulatorni-informace` | Ano (Patrik potvrdil 24.8.2026) | Hotovo | Hotovo | Chybí | **Spustit** — doporučeno finální právní review před ostrým provozem | Právník sign-off (mimo rozsah kódu) |
| `/zpracovani-osobnich-udaju` | Z větší části, 3 retenční lhůty označené jako odhad | Hotovo | Hotovo | Chybí | **Spustit** — doplnit retenční lhůty | Potvrzení přesných retenčních lhůt (6 měs./5 let/14 měs. — `src/data/legal/privacy.ts`) |
| `/cookies` | Ano, retenční lhůty označené jako odhad | Hotovo | Hotovo | Chybí | **Spustit** | Totéž jako výše |

Poznámka k „SEO metadata": sloupec se opakuje u každé stránky, protože
mezera je univerzální (`BaseLayout.astro` neobsahuje canonical/OG/JSON-LD
vůbec) — řešení je jedna společná oprava v layoutu, ne 13 samostatných
oprav. Viz F a G.

---

## C) P0 — blokuje spuštění

### P0-1: Kontaktní formulář nikam neodesílá (žádný backend)

- **Soubor/důkaz:** `src/components/ContactSection.astro`. Submit handler
  volá `event.preventDefault()`, provede klientskou validaci a poté rovnou
  zobrazí stav úspěchu + `form.reset()` — bez jakéhokoli `fetch`/`XHR`.
  Kód to sám komentuje: `// Bez backendu — pouze simulace úspěšného
  odeslání pro ověření stavu (§12).` a `<!-- TODO: cíl odeslání
  (endpoint), ochrana proti spamu (honeypot + časový limit) — viz souhrn
  úkolu. -->`.
- **Dopad:** Uživatel na webu vyplní poptávku, uvidí „úspěšně odesláno",
  ale Patrik ji nikdy nedostane. Tohle je nejzávažnější možný typ chyby u
  webu, jehož hlavním cílem konverze je právě tenhle formulář — tichá
  ztráta leadů, o které nikdo neví.
- **Nejmenší doporučená oprava:** Zvolit doručovací mechanismus (typicky
  e-mailová služba typu formspree/formsubmit/vlastní serverless funkce,
  nebo jednoduchý `mailto:`-fallback jako dočasné řešení), napojit
  `action`/`fetch` na `ContactSection.astro`, přidat honeypot pole +
  časový limit (v kódu už předpřipraveno komentářem, technika levná a bez
  nutnosti CAPTCHA).
- **Vyžaduje rozhodnutí uživatele?** Ano — kam mají poptávky chodit
  (e-mail? jaký?), jestli chce použít externí formulářovou službu nebo
  vlastní backend, a jak dlouho/kde se smí uchovávat odeslaná data (GDPR
  — musí sedět s `src/data/legal/privacy.ts`).

### P0-2: `/o-mne` je odkazovaná na 3 místech, ale stránka neexistuje

- **Soubor/důkaz:** `src/components/Header.astro:6` (`{ label: 'O mně',
  href: '/o-mne' }`, součást hlavní navigace i mobilního menu),
  `src/components/SiteFooter.astro:53` (stejný odkaz v patičce),
  `src/components/AboutSection.astro:66` (CTA „Více o mně" na homepage).
  Živě ověřeno: návštěva `/o-mne` vrací generickou Astro dev 404 stránku
  (`src/pages/404.astro` neexistuje ani jako vlastní stránka).
- **Dopad:** Tři kliknutelné, viditelné odkazy v hlavní navigaci a na
  homepage vedou do prázdna — přímo v rozporu s uživatelovým vlastním
  rozhodnutím „Stránku /o-mne jsme se rozhodli zatím přeskočit", pokud se
  spustí beze změny.
- **Nejmenší doporučená oprava:** Buď (a) odstranit položku „O mně" z
  `Header.astro`/`SiteFooter.astro` navLinks a upravit/skrýt CTA v
  `AboutSection.astro`, nebo (b) přesměrovat na kotvu/existující stránku
  (např. `/#o-financnim-poradenstvi` sekci na homepage, pokud dává
  smysl), nebo (c) rychle publikovat minimální `/o-mne` stránku — ale to
  by byla nová podstránka, což je mimo rozsah tohoto auditu i mimo
  uživatelovo aktuální zadání. Doporučuji variantu (a) jako nejmenší
  zásah odpovídající uživatelovu rozhodnutí.
- **Vyžaduje rozhodnutí uživatele?** Ano — jestli chce odkaz úplně
  odstranit, nahradit kotvou na homepage, nebo nechat jako „coming soon"
  neklikatelný label (stejný vzor jako `serviceLinks: href: null` v
  patičce).

### P0-3: Univerzální absence SEO/technických metadat (canonical, OG, JSON-LD, favicon, sitemap, robots.txt)

- **Soubor/důkaz:** `src/layouts/BaseLayout.astro` (37 řádků) obsahuje
  pouze `charset`, `viewport`, `<title>`, `<meta name="description">` a
  jeden font `preload`. Žádný `<link rel="canonical">`, žádné `og:*`,
  žádné `twitter:*`, žádný `<script type="application/ld+json">`, žádný
  favicon `<link>`. Repo-wide grep (`canonical|og:|twitter:|application/
  ld\+json|structured`) přes `src/` → **0 výskytů**. `public/` obsahuje
  jen 2 soubory fontu — žádný favicon, `robots.txt`, `sitemap.xml`, OG
  obrázek ani manifest. `astro.config.mjs` nemá integraci sitemapu.
- **Dopad:** Bez canonical/OG hrozí problém s duplicitním obsahem a
  nevzhledné sdílení odkazů na sociálních sítích. Bez `sitemap.xml`/
  `robots.txt` má Google ztížené indexování. Bez favicon vypadá web v
  záložce prohlížeče nedodělaně. Toto je zařazeno jako P0, protože jde o
  **launch-blokující základ SEO** (brief §23 to výslovně požaduje před
  spuštěním), ne o postupné doladění — ale technicky je oprava
  jednoduchá a nevyžaduje nové rozhodnutí designu.
- **Nejmenší doporučená oprava:** Doplnit do `BaseLayout.astro` (per
  page, přes props) canonical URL, základní OG (`og:title`, `og:description`,
  `og:url`, `og:type`, `og:image` — potřebuje reálný obrázek, viz P1-7),
  Twitter card, favicon soubor + `<link rel="icon">`, statický
  `public/robots.txt` (povolit vše, odkaz na sitemap), a buď statický
  `public/sitemap.xml`, nebo `@astrojs/sitemap` integraci (nová závislost
  — vyžaduje schválení uživatele, brief §25 zakazuje přidávat knihovny
  bez zadání). JSON-LD `FinancialService`/`Person` structured data lze
  doplnit stejným mechanismem, ale je nutné napřed ověřit fakta proti
  `regulatorni-informace.astro` (viz D, P1-6) — nevymýšlet pole, která
  nejsou nikde potvrzená.
- **Vyžaduje rozhodnutí uživatele?** Částečně — schválení nové závislosti
  (`@astrojs/sitemap`) pokud se zvolí tahle cesta místo ručního XML, a
  dodání/schválení OG obrázku (viz P1-7).

---

## D) P1 — důležité, ne launch-blokující, ale mělo by se doladit brzy

### P1-1: `/recenze` ukazuje jen placeholdery, přestože homepage má 3 reálné recenze

- **Soubor/důkaz:** `src/pages/recenze.astro:63-69` — všech 6 položek
  pole `reviews` má `author: null, rating: null, date: null, text: null,
  sourceUrl: null` (strukturální placeholder, dle vlastního komentáře na
  řádku 60-62 „dokud uživatel nedodá ověřená data"). Přitom
  `src/components/ReviewsSection.astro:34-49` na homepage obsahuje 3
  reálné, jmenovité recenze (Sandra K., Denis I., Karel V.) s plným
  textem a stejným zdrojovým odkazem `https://share.google/WyM4NvhpF51J3DbCZ`,
  jaký `/recenze` používá pro tlačítko „Zobrazit na Google".
- **Dopad:** Uživatel, který klikne z homepage na „Recenze" v navigaci,
  uvidí méně (placeholdery), než už viděl na homepage o pár vteřin dřív
  (reálné recenze) — nekonzistentní a matoucí dojem, navíc zbytečné,
  protože data už v projektu reálně existují.
- **Nejmenší doporučená oprava:** Přenést 3 existující recenze z
  `ReviewsSection.astro` do `recenze.astro`'s `reviews` pole (stejná
  struktura dat, jen doplnit hodnoty místo `null`). Zbylé 3 placeholder
  položky mohou zůstat jako placeholder, dokud nepřibudou další reálné
  recenze, nebo je zredukovat na 3.
- **Vyžaduje rozhodnutí uživatele?** Ne technicky (data už existují a
  jsou schválená pro homepage) — ale je to úprava obsahu/dat, kterou dle
  zadání tohoto auditu NESMÍM sám provést. Doporučuji jako next-step
  úkol, ne součást tohoto auditu.

### P1-2: Patička — 5 odkazů na „Služby" jsou `null`, přestože cílové stránky existují

- **Soubor/důkaz:** `src/components/SiteFooter.astro:59-65` —
  `serviceLinks` pole má u všech pěti položek (Finanční plánování,
  Hypotéky, Investice, Pojištění, Penze) `href: null`, renderované jako
  nekliknutelný `<span>`. Přitom `/sluzby/financni-plan`,
  `/sluzby/hypoteky`, `/sluzby/investice`, `/sluzby/pojisteni`,
  `/sluzby/penze` všechny existují a fungují. Hlavičkový komentář
  souboru (řádky 39-41) je zastaralý — tvrdí, že tyhle podstránky „ještě
  neexistují jako stránky", což už neplatí.
- **Dopad:** Patička na každé stránce webu nabízí 5 vizuálně přítomných,
  ale nefunkčních odkazů — ztracená příležitost k internímu prolinkování
  (SEO i UX) na stránky, které jsou hotové a čekají na provoz.
- **Nejmenší doporučená oprava:** Doplnit `href` u všech pěti položek na
  odpovídající skutečné cesty a opravit zastaralý hlavičkový komentář.
- **Vyžaduje rozhodnutí uživatele?** Ne — je to čistě mechanické
  propojení na už schválené a existující stránky.

### P1-3: `Header.astro`/`AboutSection.astro`/`RouterSection.astro` — odkazy na oblasti služeb míří obecně na `/sluzby`, ne na konkrétní detail

- **Soubor/důkaz:** `src/components/RouterSection.astro` — všech 5
  položek „Co řešíte?" (Bydlení/Finanční plán/Investice/Pojištění/Penze)
  má natvrdo `href="/sluzby"`, žádná nemíří na svou specifickou detailní
  stránku, přestože ty existují.
- **Dopad:** Menší SEO/UX ztráta stejného typu jako P1-2 — uživatel, který
  klikne na „Chci řešit hypotéku", skončí na obecném rozcestníku místo
  rovnou na `/sluzby/hypoteky`.
- **Nejmenší doporučená oprava:** Namapovat každou položku na svou
  specifickou cestu (`/sluzby/hypoteky`, `/sluzby/financni-plan`, atd.).
- **Vyžaduje rozhodnutí uživatele?** Ne — mechanické, stejná logika jako
  P1-2.

### P1-4: GA4 měřicí ID je stále placeholder

- **Soubor/důkaz:** `src/components/CookieConsent.astro` — `GA_MEASUREMENT_ID
  = 'G-XXXXXXXXXX'` s komentářem `// [DOPLNIT]`. Consent-gating logika
  (`loadAnalytics()`) je správně napsaná a funkční, jen s neplatným ID
  nikdy nic neodešle.
- **Dopad:** Bez skutečného ID web fakticky neměří návštěvnost, i když
  uživatel v cookie liště udělí souhlas — tichý, neviditelný problém.
- **Nejmenší doporučená oprava:** Doplnit reálné GA4 měřicí ID, jakmile
  bude Google Analytics property založená.
- **Vyžaduje rozhodnutí uživatele?** Ano — jestli GA4 vůbec chce nasadit
  hned při spuštění, nebo to může počkat (viz §9 zadání — „lze počkat").
  Řešeno i v sekci F/I.

### P1-5: `src/data/legal/privacy.ts` — GA4 zmíněná v přítomném čase, i když je zatím neaktivní

- **Soubor/důkaz:** `src/data/legal/privacy.ts` — sekce právního základu
  výslovně tvrdí „Web používá Google Analytics 4" v přítomném čase,
  přestože `GA_MEASUREMENT_ID` je stále placeholder (viz P1-4) a bez
  reálného ID se GA4 nikdy nenačte.
- **Dopad:** Textově konzistentní s budoucím stavem, ale technicky
  nepřesné vůči aktuálnímu stavu — pokud se web spustí dřív, než se GA4
  doplní, zásady zpracování OÚ popisují nástroj, který ve skutečnosti
  neběží.
- **Nejmenší doporučená oprava:** Buď doplnit GA4 ID současně se
  spuštěním (aby text sedl), nebo dočasně formulaci zmírnit na
  podmíněnou/budoucí („Web může používat..."), než bude GA4 skutečně
  aktivní. Toto je textová úprava — mimo rozsah tohoto auditu, jen
  zaznamenáno.
- **Vyžaduje rozhodnutí uživatele?** Ano — souvisí s P1-4.

### P1-6: `/pristup` sekce „Odměna" — `K OVĚŘENÍ PŘED PUBLIKACÍ` flag

- **Soubor/důkaz:** `src/pages/pristup.astro`, sekce „Odměna", má
  komentářem označené místo čekající na finální ověření. Po přečtení
  `src/data/legal/regulatory.ts` (211 řádků, Patrikem potvrzeno
  24.8.2026: vázaný zástupce BEplan finanční plánování s.r.o., ČNB
  registrace, VECTOR certifikace, provizní odměna) se text `/pristup`
  jeví **věcně konzistentní** s tímhle už schváleným zdrojem.
- **Dopad:** Nejde o rozpor, ale o neuzavřenou položku — sekce sama sebe
  označuje jako needitovanou/needlouhou k publikaci.
- **Nejmenší doporučená oprava:** Explicitní finální sign-off (Patrik
  nebo právník) tohoto konkrétního odstavce a odstranění vizuálního
  „K ověření" štítku. **Důležité:** Toto NENÍ právní závěr tohoto auditu
  — pouze konstatování, že obsah `/pristup` a `regulatorni-informace.astro`
  si věcně neodporují, ne potvrzení právní správnosti. Finální rozhodnutí
  musí učinit uživatel/právník, ne tento audit.
- **Vyžaduje rozhodnutí uživatele?** Ano — explicitní schválení textu a
  odstranění flagu je čistě jeho/právníkovo rozhodnutí.

### P1-7: Chybí OG obrázek a jakýkoli reálný obrázek na webu

- **Soubor/důkaz:** Grep `<img` napříč `src/` → jen 3 výskyty, všechny za
  podmínkou `{photoSrc ? <img/> : placeholder}` s `photoSrc` aktuálně
  prázdným všude — na webu momentálně nerenderuje žádný reálný obrázek
  (jen SVG silueta placeholder). `public/` neobsahuje žádný OG obrázek.
- **Dopad:** Sdílení odkazu na web (Facebook/LinkedIn/WhatsApp náhled)
  nebude mít obrázek. Menší dopad než P0-3 samo o sobě (proto P1, ne
  P0), ale závisí na stejné opravě.
- **Nejmenší doporučená oprava:** Jakmile bude k dispozici alespoň jedna
  reálná/schválená fotka nebo grafika, použít ji i jako `og:image` —
  do té doby lze OG image dočasně vynechat nebo použít neutrální grafiku
  s logem/wordmarkem (pokud existuje, viz P2-2).
- **Vyžaduje rozhodnutí uživatele?** Ano — přímo souvisí s dodáním
  fotografií (viz sekce I).

### P1-8: Retenční lhůty v `privacy.ts`/`cookies.ts` jsou označené jako nepotvrzený odhad

- **Soubor/důkaz:** `src/data/legal/privacy.ts` (3 lhůty: 6 měsíců/5
  let/14 měsíců) a `src/data/legal/cookies.ts` — oba soubory mají u
  těchto čísel komentáře explicitně říkající, že jde o odhad čekající na
  potvrzení právníkem a Patrikem.
- **Dopad:** Zásady zpracování OÚ musí uvádět skutečné retenční lhůty,
  ne odhad — GDPR čl. 13/14 vyžaduje přesnost.
- **Nejmenší doporučená oprava:** Potvrdit skutečné retenční lhůty (jak
  dlouho se uchovávají leady z formuláře, jak dlouho účetní/smluvní
  doklady, jak dlouho cookie souhlas) a nahradit odhad.
- **Vyžaduje rozhodnutí uživatele?** Ano — reálná čísla zná jen Patrik/
  jeho účetní/právník, tento audit je nesmí vymýšlet (přesně dle
  zadání „Nevymýšlej regulatorní fakta").

### P1-9: `manrope-latin-ext.woff2` není přednačtený, přestože nese českou diakritiku

- **Soubor/důkaz:** `src/layouts/BaseLayout.astro` má jediný `<link
  rel="preload">` na `manrope-latin.woff2`. `src/styles/fonts.css`
  potvrzuje, že `latin-ext` sadu (obsahuje ř/š/č/ž/ě/ů) používají váhy
  400/500/600/700, tedy prakticky všechen viditelný český text, ale bez
  preloadu se načte později → riziko krátkého probliknutí/reflow
  nejvýraznějšího textu na stránce (H1). Toto je už zdokumentovaná známá
  nesrovnalost v `CLAUDE.md`, znovu potvrzená tímto auditem jako stále
  neopravená.
- **Dopad:** Drobný, ale viditelný FOUT/CLS risk na první návštěvě.
- **Nejmenší doporučená oprava:** Přidat druhý `<link rel="preload">` pro
  `manrope-latin-ext.woff2` vedle stávajícího.
- **Vyžaduje rozhodnutí uživatele?** Ne — mechanická, jednořádková
  oprava bez dopadu na design/copy.

---

## E) P2 — může počkat

- **`/o-mne` obsah** — uživatel to sám odložil („Stránku /o-mne jsme se
  rozhodli zatím přeskočit"). Jen odkazy na ni (P0-2) je nutné vyřešit
  hned, samotný obsah stránky ne.
- **Články / content collection** — uživatel sám potvrdil „Články budu
  doplňovat později". `/clanky.astro` má funkční, korektní prázdný stav
  — žádný okamžitý zásah není nutný.
- **Pokročilé filtrování recenzí/článků** — aktuální jednoduchá „načíst
  další" logika (`PAGE_SIZE`) je dostatečná pro spuštění.
- **Case studies, rozšířená analytika/reporting** — nejsou v žádném
  aktuálním zadání, nejsou blokující.
- **`StatsBand.astro` „5,0 Google recenze" vs. brief §7 preferované „42
  recenzí s hodnocením 5★"** — `src/components/StatsBand.astro` stále
  zobrazuje jen `{ number: '5,0', label: 'Google recenze' }`, brief chce
  silnější formulaci s počtem recenzí. Menší, kosmetický textový
  rozdíl — CLAUDE.md ho už eviduje jako „známou nesrovnalost", tento
  audit ji jen znovu potvrzuje jako stále neopravenou. Nemá dopad na
  funkčnost.
- **`SiteFooter.astro` — `Infinity` konzolová chyba při některých
  načteních** — `syncRoute()` transientně zapíše `Infinity` do SVG
  atributu (chybí `svgRect.width === 0` vedle existujícího
  `svgRect.height === 0` v guard klauzuli). Vizuálně se to samo opraví
  (žádný viditelný layout bug), jen to hází chybu do konzole. Živě
  reprodukováno i při tomto auditu. Nízké riziko, nízká priorita, ale
  „zadarmo" opravitelné, až se bude příště sahat do `SiteFooter.astro`.
- **Nová vizuální vylepšení, animace, marketing features** — mimo rozsah
  podle explicitního zadání uživatele („Nyní NECHCI další návrhy
  podstránek, nové funkce ani rozsáhlé předělávání designu").

---

## F) Technické výsledky

- **`npm run build`** (= `astro check && astro build`): **PROŠEL.**
  `astro check`: 0 chyb, 0 varování, 0 hintů napříč 40 soubory.
  `astro build`: 13 stránek vygenerováno úspěšně, 0 chyb.
- **`npm run check:layout`** (Playwright, `scripts/audit-layout.mjs`):
  **514/514 kontrol v pořádku**, žádná regrese. Pole `PAGES` zahrnuje
  všech 10 relevantních stránek s dekorativní trasou (homepage +
  8 detailních/podstránek + `/clanky`).
- **Velikost buildu:** `dist/` celkem **1,2 MB**. Per-stránka JS bundly
  4,1–5,5 KB (minimální, žádný zbytečný klientský JS). Per-stránka CSS
  9,7–91,2 KB (homepage největší, protože bundluje styly všech sekcí —
  očekávané, ne problém).
- **Závislosti:** `package.json` — jen `astro ^5.1.1` jako runtime
  závislost. Dev závislosti: `@astrojs/check`, `@playwright/test`,
  `typescript`. Žádné nadbytečné knihovny, žádná analytika/sitemap
  balíček zatím není přidaný (v souladu se zadáním „nepřidávej knihovny
  bez schválení").
- **Bezpečnost/tajemství:** Žádný `.env` soubor v projektu (`ls -la
  .env*` → nic), grep `API_KEY|SECRET|process.env|import.meta.env` přes
  `src/` → 0 výskytů. `.gitignore` správně vylučuje `.env*`, `dist/`,
  `.astro/`, `node_modules/` (pro budoucnost, až/pokud se založí git
  repozitář — repozitář aktuálně NENÍ git repo, viz sekce I).
- **H1 struktura:** Grep přes `src/pages/*.astro` + `src/pages/sluzby/*.astro`
  potvrzuje přesně 1 `<h1>` na každé obsahové stránce (na `index.astro`
  a právních stránkách H1 žije v `Hero.astro`/`LegalLayout.astro` —
  ověřeno zvlášť, také přesně 1×).
- **Trailing slash:** Grep `href="/[a-z][a-z/-]*/"` → 0 výskytů, všechny
  interní odkazy konzistentně bez koncového lomítka; `astro.config.mjs`
  nemá explicitní `trailingSlash` nastavení (výchozí `'ignore'`) — v
  souladu s konzistentním vzorem v kódu.
- **Noindex/nofollow:** Grep `noindex|nofollow|robots` přes `src/` a
  `astro.config.mjs` → 0 výskytů — nic na webu náhodně neblokuje
  indexaci (dobrá zpráva, ale zároveň neexistuje ani `robots.txt`, viz
  P0-3).
- **Živá kontrola horizontálního přetečení:** Homepage testována na
  390/834/1440/2048 px v Browser nástroji — **žádné horizontální
  přetečení na žádné šířce**. `/pristup`'s „K ověření před publikací"
  štítek potvrzen živě viditelný a správně vykreslený. `/o-mne` potvrzen
  živě jako 404.
- **Konzolové chyby:** Jediná reprodukovaná chyba je již zdokumentovaný
  `SiteFooter.astro` `Infinity` SVG atribut (viz P2 výše) — samoopravný,
  nízké riziko.

**Co NEBYLO spuštěno** (mimo bezpečný, read-only rozsah tohoto auditu):
Lighthouse audit nebyl spuštěn (vyžadoval by delší běh a není v
`package.json` jako existující skript — dle zadání „pokud skript
neexistuje, nevymýšlej ho"). Žádný produkční deploy, žádná DNS/hosting
kontrola (nelze ověřit z projektu samotného, viz sekce I).

---

## G) Doporučený minimální rozsah pro v1

**Spustit hned (po vyřešení P0):**
`/`, `/sluzby`, `/sluzby/hypoteky`, `/sluzby/financni-plan`,
`/sluzby/pojisteni`, `/sluzby/investice`, `/sluzby/penze`, `/pristup`,
`/recenze` (ideálně s doplněnými reálnými daty z P1-1, ale i s placeholdery
funguje — jen s horší první dojmem), `/clanky` (prázdný stav je legitimní
a uživatelem schválený), `/regulatorni-informace`, `/zpracovani-osobnich-udaju`,
`/cookies`.

**Dočasně skrýt/odstranit odkazy:**
`/o-mne` — stránka jako taková neexistuje a nemá se v1 vytvářet (uživatel
to sám odložil). Klíčové je odstranit/upravit 3 mrtvé odkazy (P0-2), ne
stránku dělat narychlo.

**Nic není potřeba odkládat na pozdější release kvůli neúplnosti obsahu**
— všech 10 „obsahových" stránek má schválený, hotový obsah. Jediné
odklady jsou technické/propojovací (P0/P1 výše), ne obsahové.

---

## H) Konkrétní plán spuštění (v pořadí závislostí)

1. **Funkčnost a právní blokátory nejdřív** (nemá smysl řešit SEO/vzhled
   webu, který ještě neumí přijmout poptávku, nebo který má mrtvé
   navigační odkazy):
   - Rozhodnout a napojit backend/doručení kontaktního formuláře (P0-1).
   - Odstranit/upravit 3 odkazy na `/o-mne` (P0-2).
   - Finální právní sign-off `/pristup` „Odměna" (P1-6) a retenčních lhůt
     v `privacy.ts`/`cookies.ts` (P1-8).
2. **Dokončení už schváleného obsahu:**
   - Přenést 3 reálné recenze z homepage do `/recenze` (P1-1).
   - Propojit patičku (P1-2) a `RouterSection` (P1-3) na existující
     detailní stránky služeb.
3. **SEO/technický základ** (P0-3 + P1-4/P1-5/P1-7/P1-9):
   - Doplnit canonical, OG, Twitter meta, favicon, `robots.txt`,
     `sitemap.xml` (po rozhodnutí ruční XML vs. `@astrojs/sitemap`),
     JSON-LD (až budou fakta ověřená proti `regulatorni-informace.astro`).
   - Doplnit GA4 ID, pokud se analytika nasazuje současně se spuštěním
     (jinak nechat vypnuté a doplnit později — obojí je v pořádku,
     rozhoduje uživatel).
   - Přednačíst `latin-ext` font (P1-9).
4. **Responzivní/vizuální kontrola** — uživatel sám potvrdil, že tohle
   udělá ručně po tomto auditu (tablet/mobil). `check:layout` 514/514 už
   pokrývá automatickou část; doporučuji tenhle ruční průchod jako
   poslední krok před spuštěním, po vyřešení bodů 1–3 výše (nemá smysl
   ladit vzhled stránky, jejíž navigace/formulář se ještě budou měnit).
5. **Finální technická kontrola + deploy** — teprve po 1–4: opakovat
   `npm run build` + `npm run check:layout`, ověřit doménu/hosting (viz
   sekce I), a až poté provést samotné nasazení (mimo rozsah tohoto
   auditu i mimo rozsah, který smí Claude Code sám iniciovat — brief §25
   zakazuje deploy bez explicitního zadání).

Žádné časové odhady (hodiny/dny) nejsou v tomto plánu uvedené záměrně —
audit nemá podklad pro reálný odhad pracnosti jednotlivých bodů.

---

## I) Co musí uživatel dodat nebo rozhodnout

Toto je pouze to, co tento audit nemůže sám určit z projektu:

1. **Doména a hosting** — Nelze z projektu ověřit, jestli je doména
   `patrikgajdadzis.cz` (uvedená v `astro.config.mjs`'s `site`) skutečně
   zakoupená/nasměrovaná, jaký hosting/deploy proces se plánuje (FTP/
   GitHub Actions/WEDOS/jiné), jestli existuje HTTPS certifikát, a jak
   se má řešit případná migrace ze starého webu `pafinga.cz` (žádné
   materiály o plánovaném nahrazení nebyly v projektu nalezeny — pokud
   existují mimo tento projekt, je potřeba je dodat). **Tohle je externí
   bod, který audit nemůže sám potvrdit ani vyvrátit.**
2. **Cíl doručení kontaktního formuláře** — e-mailová adresa/služba, kam
   mají poptávky chodit (P0-1), a potvrzení retenční politiky pro
   uchovávaná data.
3. **Rozhodnutí o `/o-mne` odkazech** — odstranit úplně, nahradit kotvou
   na homepage, nebo nechat jako neaktivní label (P0-2).
4. **Reálné fotografie** — hero fotka, `/pristup` fotky, případně OG
   obrázek. Beze změny od stavu popsaného v `CLAUDE.md` — nic se
   nevytváří ani nevymýšlí automaticky (v souladu s „Nevytvářej AI
   podobu Patrika", §14 zadání).
5. **Retenční lhůty pro GDPR texty** (P1-8) — přesná čísla zná jen
   Patrik/jeho účetní/právník.
6. **Finální právní schválení** `/pristup` sekce „Odměna" (P1-6),
   `regulatorni-informace.astro` a `zpracovani-osobnich-udaju.astro` —
   tenhle audit potvrzuje jen VĚCNOU konzistenci mezi stránkami, ne
   právní správnost.
7. **Rozhodnutí o GA4** — nasadit hned při spuštění (a dodat reálné
   měřicí ID, P1-4), nebo počkat.
8. **Schválení nové závislosti**, pokud se pro sitemap zvolí
   `@astrojs/sitemap` místo ručního `sitemap.xml` (P0-3) — brief §25
   vyžaduje explicitní souhlas před přidáním jakékoli knihovny.
9. **3 recenze na `/recenze`** (P1-1) — technicky lze přenést z už
   schválených dat na homepage bez nového rozhodnutí, ale jde o úpravu
   obsahového souboru, kterou tento audit sám neprovádí.

---

*Konec reportu. Žádný existující soubor projektu nebyl v rámci tohoto
úkolu změněn, žádný soubor v `src/` nebyl upraven, neproběhl žádný deploy
ani git push (projekt navíc aktuálně není git repozitářem).*
