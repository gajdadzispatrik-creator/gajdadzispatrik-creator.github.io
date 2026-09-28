# CLAUDE.md — patrikgajdadzis.cz

Kořenový orientační dokument pro každé sezení Claude Code i Claude Design.
Přečti si ho jako první. Popisuje, kde je zdroj pravdy, jak projekt spustit,
co je hotové a jaká platí pravidla.

---

## Co to je

Osobní web Patrika Gajdadzise — finančního poradce z Ostravy. Cíl webu:
silná osobní značka + konverze na nezávaznou konzultaci. Web se staví
postupně přes Claude Code (implementace) a Claude Design (návrh).

Stavěno jako **statický web v Astru** (bez frameworku, minimum JS).

## Jak spustit

```bash
npm install
npm run dev          # vývojový server (astro dev)
npm run build        # astro check + astro build → dist/
npm run preview      # náhled buildu
npm run check:layout # automatická kontrola pravidel z „Konvence" níže (vyžaduje běžící npm run dev)
npm run check:typo   # kontrola zalamování řádků v textu (vyžaduje běžící npm run dev)
```

`check:typo` (`scripts/check-typography.mjs`) projde **všechny stránky, na
které web odkazuje** (plus `/clanky` a stránku 404), a hledá ve vykresleném
textu místa, kde se řádek může zlomit tam, kde nesmí — viz „Konvence:
nezlomitelná mezera" níže. **Spusť ho po každé změně nebo doplnění textu**
(nový článek, podstránka, úprava copy, právní texty) — teprve s 0 nálezy je
text hotový. Nová stránka se zkontroluje sama, jakmile na ni vede odkaz;
stránku bez odkazu přidej do `EXTRA_PATHS` ve skriptu.

`check:layout` (Playwright, `scripts/audit-layout.mjs`) ověří na živém dev serveru u
sekcí s dekorativní trasou: že text drží konstantní odstup od tečky/osy na
celém rozsahu jednoho breakpointu (ne jen na kalibrační šířce), že nadpisy
bez sousední trasy sedí na stejné souřadnici všude, že sekce na sebe navazují
švem 0 px, a že se hlavní bloky nepřekrývají. **Spusť ho po každé úpravě
pozicování v sekci s trasou** (nová sekce, změna `margin`/`padding`/
`grid-template-columns` u nadpisu/textu/dělítka) — přesně tuhle třídu chyb
(pevný px místo procentuálního odsazení, špatná základna `%` v CSS Grid)
jinak odhalí jen ruční proměření v prohlížeči na netriviální šířce.

**Skript od 2. 9. 2026 běží nad polem `PAGES`** (ne jen nad homepage) — každá
podstránka je vlastní záznam s `path` + `anchoredChecks`/`flatChecks`/
`seamChain`/`overlapChecks`/`wideStageChecks`. **Při vytvoření další
podstránky s dekorativní trasou (pruh kapitoly + tečka podle „Konvence:
kontinuální linka, tečky a text") je POVINNÉ přidat do `PAGES` nový záznam,
ne jen ověřit stránku ručně v prohlížeči** — ruční kontrola se dřív
opakovaně ukázala nedostatečná (viz „Globální pravidlo: povinná kontrola
nové stránky proti referenční implementaci" níže) a bez trvalého záznamu
v `PAGES` navíc přestane příští úpravu stránky hlídat cokoliv automaticky.
Pro běžný vzor „pruh s popiskem + tečka" (většina podstránek) stačí použít
pomocnou funkci `chapterBarChecks(prefix, markers)` ve skriptu — stejně,
jako je to udělané pro `SLUZBY_PAGE`/`HYPOTEKY_PAGE`/`FINANCNI_PLAN_PAGE`;
netypické vzory (odlišná struktura popisku, vlastní dvojice prvků k
porovnání) přidej jako ruční `anchoredChecks`/`wideStageChecks` záznam
stejně jako u `HOME_PAGE`. Teprve po čistém průběhu `npm run check:layout`
(0 selhání pro NOVOU stránku i pro všechny ostatní) smí báze úkolu napsat
uživateli, že je layout stránky hotový/ověřený.

- Node projekt, `type: module`. Astro `^5`.
- `npm run build` spouští `astro check` (typová kontrola) — build spadne při chybě typů.
- Výstup: statické HTML do `dist/` (`output: 'static'`, `site: 'https://patrikgajdadzis.cz'`).

## Struktura

```
docs/                         # zadání a pravidla (viz hierarchie níže)
  content-subpages.md         # obsahový zdroj pravdy pro podstránky
design-exploration/           # schválené průzkumy a implementační specifikace
  financial-architecture/approved-hero/
    hero-implementation-spec.md   # detailní spec hero sekce (odkazovaná z kódu)
    claude-code-task.md
review/approved-hero/         # schválené referenční screenshoty (390/834/1366/1440)
public/fonts/manrope/         # self-hostovaný font Manrope (woff2, latin + latin-ext)
src/
  layouts/BaseLayout.astro    # <head>, meta, preload fontu, skip-link
  pages/index.astro           # homepage (jediná stránka zatím)
  components/                  # Header, Hero, HeroLine, HeroPhotoPlaceholder, StatsBand, NextSectionIntro
  styles/
    tokens.css                # KANONICKÉ hodnoty (barvy, radiusy, stíny, pohyb, layout)
    fonts.css                 # @font-face Manrope
    global.css                # reset, skip-link, container, reduced-motion
```

## Hierarchie zdrojů pravdy

Při rozporu platí toto pořadí:

1. **`docs/brand-experience-brief.md`** — nejvyšší autorita pro strategii, cílovou
   skupinu, pozici značky, fakta, texty, hlavní CTA, právní/regulatorní pravidla,
   styl komunikace a zakázané fráze.
2. **`docs/art-direction-financial-architecture.md`** — má přednost při **vizuálních**
   rozporech (kreativní směr: kontinuální linie, hero kompozice, fotografie).
3. **`docs/design-direction.md`** — závazné vizuální zadání (barvy, typografie,
   layout, komponenty). Ustupuje briefu i art-direction.
4. **`docs/content-homepage.md`** — konkrétní texty a pravidla jednotlivých sekcí homepage.
5. **`design-exploration/.../hero-implementation-spec.md`** — implementační detaily
   hero sekce (souřadnice linie, tokeny). Komentáře v kódu na něj odkazují.

**Kanonické hodnoty (barvy, spacing, radiusy, stíny, časování) žijí v
`src/styles/tokens.css`.** Dokumenty popisují *záměr*; závazná *čísla* jsou v tokenech.
Nová hodnota se přidává do `tokens.css`, ne natvrdo do komponenty.

## Klíčová pravidla (z briefu, §25)

**Claude Code** implementuje schválený návrh. Bez výslovného zadání **nesmí**:
měnit design, přepisovat texty, přidávat nové barvy, přidávat knihovny/frameworky,
měnit produkční nastavení, pushovat do hlavní větve ani deployovat.

**Claude Design** může navrhovat kompozici, práci s fotografií, rytmus sekcí,
podobu finanční mapy a vizuální detaily v rámci systému. Nesmí svévolně měnit
barvy, font, cílovku, styl komunikace, hlavní CTA, fakta, právní informace,
základní strukturu ani pravidla responzivity.

Zakázané vizuální prvky (§24): glassmorphism, velké/neonové gradienty, 3D koule,
náhodné AI ilustrace, výrazný parallax, fotobanka, množství stejných karet,
druhý font, dark mode, plovoucí WhatsApp tlačítko, rámečky kolem hero fotky.

Fakta a čísla (§7) prezentovat přesně: *Od roku 2020 · 150+ klientů ·
42 recenzí s hodnocením 5★ · odborná způsobilost pro úvěry, pojištění a investice.*

## Globální pravidlo: povinná kontrola nové stránky proti referenční implementaci

Doplněno 2. 9. 2026 po `/sluzby/financni-plan` — Claude Code při implementaci
téhle stránky opakovaně napsal, že „ověřil" shodu s `hypoteky.astro`, a
přitom minul: asymetrický padding kapitol na desktopu (nulový vertikální
padding vzniklý nedopatřením), `margin-top` navíc na KAŽDÉ kapitole místo
jen první, dvojitě počítanou mezeru (`gap` na rodiči + vlastní `margin-top`
na dítěti) na třech místech, velikosti H2 na mobilu posunuté o 6px mimo
zadání, natvrdo zapsané hex barvy místo tokenů, posunutou pozici hero
nadpisu (jiný `padding` než referenční stránka) a odlišnou techniku ohybu
dekorativní trasy v hero. Každou z těchto chyb musel odhalit až uživatel
ručním porovnáním screenshotů — to se nesmí opakovat. Platí **globálně a
automaticky** pro každou budoucí podstránku a každou netriviální úpravu
existující stránky, bez ohledu na to, jestli to zadání znovu zmíní.

**Proč nestačí jen přečíst zadání a CSS zdrojový kód:** psané zadání úkolu
může obsahovat čísla, která si sama odporují se skutečností na již
schválené a nasazené referenční stránce (typicky `hypoteky.astro` — první
plně dokončená detailní stránka služby, dosud nejvíc prověřená). Čtení
CSS druhé stránky „od oka" a subjektivní dojem, že „to sedí", tenhle
rozpor nezachytí — přesně to se stalo v tomto úkolu opakovaně.

**Povinný postup před tím, než napíšeš uživateli „ověřeno"/„hotovo":**

1. Najdi nejbližší existující referenční stránku se stejným typem layoutu
   (kapitoly s pruhem a tečkou, hero s trasou apod. — typicky
   `hypoteky.astro`, případně `sluzby.astro`).
2. Otevři OBĚ stránky živě v prohlížeči na STEJNÉ šířce viewportu (ne dvě
   různá okna v různém zoomu — použij `resize_window`/`preview` na obou).
3. Pro každou z následujících kategorií přímo změř `getBoundingClientRect()`/
   `getComputedStyle()` na obou stránkách a **porovnej čísla vedle sebe**,
   ne z paměti/dojmu:
   - padding sekcí na každém stupni (musí být symetrický top/bottom, viz
     „Konvence: mezera mezi sekcemi" — a **jen první** kapitola smí mít
     navíc `margin-top`, žádná další),
   - každý `margin-top`/`margin` u prvku, který je zároveň potomkem
     rodiče s vlastním `gap` — to je dvakrát započtená mezera, oprav na
     jeden zdroj (viz „Konvence: mezera MEZI BLOKY"),
   - `font-size`/`line-height` prvek po prvku na KAŽDÉM stupni (mobil,
     tablet, notebook, desktop) — ne jen na jednom kalibračním stupni,
   - pozice hero nadpisu (`padding`/`left`/`top` sekce hero) — musí sedět
     na stejné ose jako referenční stránka, pokud není explicitně a
     viditelně jinak zdůvodněno,
   - šířky sloupců (nadpisový sloupec, druhý/obsahový sloupec, seznamy) —
     nepřebírej číslo ze zadání slepě, ověř ho proti referenční stránce,
   - chování dekorativní trasy v hero (technika ohybu, vzdálenost od
     tlačítek CTA) — stejná technika jako referenční stránka, pokud není
     explicitně jinak zdůvodněno,
   - barvy — žádný natvrdo zapsaný hex, pokud existuje token se stejnou
     hodnotou v `tokens.css`.
4. **Když psané zadání dává jiné číslo, než jaké má referenční stránka ve
   skutečnosti, a není u toho jasné kompoziční zdůvodnění proč se stránky
   mají lišit, důvěřuj referenční stránce** a rozpor nahlas uživateli v
   souhrnu úkolu — neimplementuj mlčky číslo ze zadání jen proto, že tam
   je napsané.
5. Teprve po tomhle porovnání smí báze úkolu napsat uživateli, že je
   layout „ověřen shodný" s referenční stránkou — bez živého srovnání čísel
   na obou stránkách vedle sebe je taková věta nepravdivá, i kdyby autor
   subjektivně věřil, že to zkontroloval.
6. **Přidej stránku do `PAGES` v `scripts/audit-layout.mjs`** (viz „Jak
   spustit" výše) a spusť `npm run check:layout` — 0 selhání pro novou
   stránku i pro všechny ostatní, teprve pak je úkol hotový. Ruční
   porovnání v bodech 1–5 najde chyby při TÉHLE úpravě; zápis do `PAGES`
   je to, co zachytí regresi při KAŽDÉ BUDOUCÍ úpravě, aniž by si o to
   uživatel musel znovu říkat — přesně to bylo doplněno 2. 9. 2026 poté, co
   `/sluzby`, `/sluzby/hypoteky` a `/sluzby/financni-plan` několik týdnů
   neměly žádnou automatickou kontrolu vůbec (audit běžel jen na homepage)
   a jednu regresi v `/sluzby` tak odhalil až tenhle rozšířený skript,
   ne dřívější ruční review.

## Globální pravidlo: žádné viditelné číslování kroků/bodů

Doplněno 1. 9. 2026. Platí **globálně a automaticky** — pro homepage,
`/sluzby`, `/sluzby/hypoteky`, `/sluzby/financni-plan`, všechny současné i
budoucí podstránky, bez ohledu na to, jestli to zadání znovu zmíní. Platí
pro Claude Code i Claude Design.

Na veřejném webu se v copy ani v designu **nepoužívá viditelné pořadové
číslování** kroků nebo obsahových bodů ve stylu `01`, `02`, `03`, `1.`,
`2.`, `3.` — pokud uživatel výslovně neschválí konkrétní výjimku pro
konkrétní místo.

Číslování smí existovat POUZE interně:

- v dokumentaci (`docs/`),
- v názvu sekcí v markdownu (např. `#### 5. Jak probíhá...` slouží jen k
  organizaci dokumentu),
- v technickém komentáři v kódu,
- v implementační logice (pořadí polí v datovém poli, `data-index` apod.).

Nesmí se promítnout do veřejného copy ani viditelného designu. Pořadí kroků
nese svislá odbočka trasy s kotvami (viz „Konvence: kontinuální linka,
tečky a text" níže) a pořadí v toku textu/seznamu, ne viditelná číslice —
přesně jako `sluzby/hypoteky.astro`'s kapitola „Jak probíhá vyřízení
hypotéky" (§13 jejího zadání).

**Historie:** `docs/content-subpages.md` dřív obsahoval viditelné prefixy
`01 —`/`02 —`/… u kroků na `/sluzby/hypoteky` a `/pristup` (zdroj pravdy
pro copy) — číselné prefixy byly z copy odstraněny 1. 9. 2026, samotný text
nadpisů zůstal beze změny.

## Konvence: kontinuální linka, tečky a text

Platí pro všechny sekce s dekorativní SVG trasou (ConnectionsSection,
RouterSection, ProcessSection, ReviewsSection, BenefitsSection, CasesSection,
AboutSection, ArticlesSection, FaqSection, ContactSection, SiteFooter — trasa
v SiteFooter.astro jako jediná KONČÍ, viz jeho hlavičkový komentář).
Při vytváření další takové sekce toto dodržet automaticky, bez čekání na
opravu:

1. **Text u tečky na vodorovném úseku trasy** (text „pod tečkou"): zarovnat
   **vlevo, bez vycentrování** — levá hrana textu = x-souřadnice tečky
   (`--ox: 0`, žádný `translateX(-50%)`, `text-align: left`). Ne vystředit na
   tečku, ne odsadit vpravo.
2. **Text u tečky na svislém úseku trasy** (text „vedle tečky"): odsadit
   **vpravo** o pevný počet px (typicky 16–24) a **svisle vycentrovat** na
   tečku (`transform: translateY(-50%)` nebo ekvivalentní `--ty: -50%`).
   Skládá-li se text z **nadpisu + popisku dohromady** (ne jeden řádek),
   vycentrovat na **celý blok** (nadpis i popisek), ne jen na nadpis —
   zjištěno 24. 8. 2026 v BenefitsSection.astro (`syncMarkers` měřilo jen
   `.benefits__name`, tečka pak procházela středem nadpisu a popisek pod ní
   opticky „visel"; oprava měří `.benefits__item` jako celek). **Výjimka:**
   pokud mají položky výrazně různou výšku (např. CasesSection.astro, kde
   jedna studie nese celou trojici situace/řešení/výsledek a další jsou jen
   krátké řádky), je vycentrování na nadpis samotný legitimní — u „celého
   bloku" by tam tečka skákala nepředvídatelně podle obsahu, ne podle pozice
   nadpisu.
3. **Tečka musí ležet přímo na vykreslené křivce**, ne v „uříznutém rohu"
   před zaoblením oblouku — u zakřivených úseků počítat souřadnici tečky až
   za koncem příslušného oblouku (poloměr + odstup), ne v bodě, kde by se
   čáry teoreticky protly bez zaoblení.
4. **Odsazení textu od osy/tečky musí být procentuální, ne pevný px**, kdykoli
   sekce používá `preserveAspectRatio="none"` (trasa se neuniformně roztahuje
   s šířkou okna): `calc(<x> * 100% / <viewBoxWidth> + <px>)`, ne
   `calc(<x> * 1px + <px>)`. Pevný px se mimo kalibrační šířku (390/834/
   1366/1440) od reálné pozice trasy vzdaluje — tahle chyba se v tomto
   projektu opakovala víckrát (ReviewsSection, BenefitsSection, AboutSection),
   než se stala konvencí.
5. Pokud výška sekce plyne z obsahu (ne pevný `height`), musí se poloha tečky
   dopočítávat v JS ze skutečné vykreslené pozice obsahu (`getBoundingClientRect`
   po vykreslení + `ResizeObserver`), ne z pevné souřadnice ve viewBoxu —
   viz `syncDotPosition`/`syncRoute` v ReviewsSection.astro, BenefitsSection.astro,
   AboutSection.astro. Přepočet po vykreslení musí proběhnout ještě jednou po
   `document.fonts.ready` — `font-display: swap` (fonts.css) vykreslí text
   nejdřív náhradním fontem, takže první přepočet se může trefit do jiných
   metrik, než jaké má finální Manrope (zjištěno 24. 8. 2026 v
   BenefitsSection.astro — jedna položka ze čtyř měla tečku o 10 px mimo,
   ostatní tři náhodou stihly přepočet až po dohrání fontu).
6. **Odstup tečky/zářezu od textu ≥ 20 px** na tabletu/notebooku/desktopu,
   kde na to je místo (toto číslo se opakovaně objevovalo jako požadavek
   v jednotlivých zadáních — CasesSection, ContactSection, SiteFooter —, ale
   do teď nebylo v této obecné konvenci zapsané). Na mobilu je zavedená
   praxe menší odstup, typicky ~14 px (BenefitsSection i CasesSection),
   protože tam na 20 px často není prostor bez zúžení sloupce textu.
   Odstup musí být i **konzistentní napříč stupni** — nemá dávat smysl, že
   notebook/desktop mají menší mezeru než tablet pod nimi jen proto, že
   zářez převzal stejný pevný offset (typicky 44 v místních SVG jednotkách)
   bez ohledu na to, že text na daném stupni sedí blíž k ose.

   **Odstup musí zůstat konstantní i MIMO kalibrační šířku, ne jen na ní**
   (stejná třída chyby jako bod 4, ale na druhé straně) — zjištěno
   25. 8. 2026 v BenefitsSection.astro a CasesSection.astro: zářez/tečka je
   uvnitř neuniformně roztahovaného SVG (`preserveAspectRatio="none"`), takže
   jeho odsazení od osy v LOKÁLNÍCH SVG jednotkách (např. `x2="976"` při
   ose `x1="940"`, tedy lokální offset 36) roste úměrně s roztažením SVG —
   na 1920 px reálně naroste ze 36 px na ~48 px. Text má ale odsazení pevné
   v reálných px (`calc(... + 56px)`), takže se tečka mimo kalibrační šířku
   textu přibližuje (mezera se zmenšuje, ne zůstává stejná). Na 1920 px to
   v obou nalezených případech scvrklo mezeru z cílových 20/24 px na
   8–10 px. **Řešení:** JS přepočet (stejná funkce, která už dopočítává
   svislou pozici, `syncMarkers`/`syncRoute`) musí dopočítávat i vodorovnou
   pozici zářezu/tečky ze SKUTEČNÉ (reálné, ne lokální) pozice osy + pevný
   px offset, ne ponechat offset natvrdo v markupu:
   ```js
   const axisRealX = svgRect.left + axisLocal * scaleX;
   const targetLocalX = (axisRealX + offsetPx - svgRect.left) / scaleX;
   notch.setAttribute('x2', String(targetLocalX));
   dot.setAttribute('cx', String(targetLocalX));
   ```
   Testovat vždy i na netriviální šířce v rámci stupně (např. 1920 px pro
   desktop), ne jen na kalibrační — na kalibrační šířce (`scaleX === 1`) se
   tahle chyba vůbec neprojeví.

Referenční implementace: `ProcessSection.astro` (`--ox`/`--oy` na kotvě),
`RouterSection.astro` (`left: calc(var(--x) * 100% / var(--vb))` bez offsetu
pro dominantní/vodorovné položky), `ConnectionsSection.astro`.

## Konvence: běžný text nikdy pod 16px

`docs/design-direction.md` má tvrdý zákaz (ne jen orientační hodnotu):
„Běžný text ani text formulářových polí nesmí být na mobilu menší než 16 px."
Auditem obsahu 1. 9. 2026 se zjistilo, že `font-size: 15.5px` byl zavedený
(ale pravidlu odporující) vzor napříč **10 soubory** celého webu
(`BenefitsSection.astro`, `CasesSection.astro`, `CookieConsent.astro`,
`Header.astro`, `ProcessSection.astro`, `SiteFooter.astro`,
`legal/LegalBlock.astro`, `LegalLayout.astro`, `sluzby.astro`,
`sluzby/hypoteky.astro`) — sjednoceno na `16px` všude. Při psaní jakéhokoli
nového běžného textu (odstavce, popisky, textové odkazy — ne drobné
uppercase labely typu `.hyp-chapter__list-label`, tam menší velikost je
záměrná typografická kategorie, ne běžný text) nepoužívat nic pod 16px,
i kdyby to jinde v kódu vypadalo jako zavedený vzor — `15.5px` byl přesně
tenhle případ.

## Konvence: nájezdový gradient jen na SKUTEČNÉM začátku linky

Zjištěno a ustáleno 28. 8. 2026 poté, co se krátký smaragdovo-modrý
„nájezdový" gradient (`LineGradientDefs.astro`, sdílené barvy
`#1E7A5C → #1B4A8A`) omylem objevil na dvou místech homepage
(Hero **i** ConnectionsSection) a uživatel to nahlásil jako vizuální chybu —
„jako by se linka uprostřed stránky restartovala".

- **Efekt patří jen tam, kde SKUTEČNĚ začíná nová linka** — typicky hero
  sekce dané stránky (homepage Hero, budoucí `/pristup`, `/recenze`, `/o-mne`,
  `/clanky` — kdykoli taková stránka dostane vlastní kontinuální linku se
  vstupem z hlavičky). Tady ano: `HeroLine.astro` (homepage), hero-tier
  trasa v `sluzby.astro`.
- **Efekt NEPATŘÍ na mezisekční napojení**, i když je to samostatný SVG
  `<path>` element, který v DOM/kódu „začíná" znovu — pokud sekce jen
  POKRAČUJE v už jednou začaté lince (typicky po vizuálním zmizení za
  full-width pásem/bannerem, jako ConnectionsSection.astro po StatsBand),
  jde o pokračování, ne o nový začátek. Taková návazná cesta zůstává
  jednobarevná `var(--line)` @ `.18` (stejná konvence jako ProcessSection/
  RouterSection/…/SiteFooter).
- Sdílené gradient stopy (`LineGradientDefs.astro`) jsou úmyslně jemné
  (pozvolný náběh, nižší vrchol opacity ~0.4 než dřívějších ~0.6–0.65) —
  neredukovat zpět na ostrý skok bez výslovného zadání.
- Trasa se vstupem z hlavičky nesmí začínat slepená na její hranici
  (`y=0`/`y=-20`) — musí mít viditelný odstup (na `/sluzby` `y=40`, viz
  `HERO_ENTRY_START_Y` v `sluzby.astro`), stejně jako homepage Hero linka
  vizuálně nezačíná hned na okraji sekce.
- **Nájezdová cesta a navazující plnobarevná cesta se NIKDY nesmí
  překrývat** — buď hlavní cesta začíná přesně tam, kde nájezd končí (`M`
  na koncovém bodu gradientu, ne na jeho začátku — viz `HeroLine.astro`
  všechny 4 tiery, `heroArcPath` v `sluzby.astro`), nebo nese nájezd JEDNU
  cestu s gradientem po celé délce, nikdy ne dvě cesty nad sebou na
  stejném úseku. Dva poloprůhledné tahy stejné barvy nad sebou se opticky
  SEČTOU na vyšší výsledné krytí než samotná cílová opacita — i když
  nájezdův poslední gradient stop barevně/opacitně přesně odpovídá hlavní
  cestě, na hranici překryvu vznikne viditelný skok krytí/tloušťky
  („zub"). Zjištěno a opraveno 1. 9. 2026 na obou místech (Hero i
  `/sluzby`) současně — obě dřív měly tuhle stejnou chybu, protože obě
  vycházely ze stejného (chybného) vzoru.

## Konvence: nezlomitelná mezera za krátkými předložkami/spojkami

Platí **globálně a automaticky** pro veškerý český text na webu (nadpisy,
odstavce, popisky, položky seznamů) — homepage i všechny podstránky,
současné i budoucí, bez ohledu na to, jestli to zadání znovu zmíní.

Krátké předložky a spojky nesmí zůstat osamocené na konci řádku. Mezera za
nimi musí být nezlomitelná, aby prohlížeč zalomil řádek AŽ ZA ně, ne mezi
ně a následující slovo. Příklad: „Bydlení, ochranu, investice a penzi..." —
bez zásahu by se „a" mohlo octnout samo na konci řádku.

**Rozsah (rozšířeno 1. 9. 2026 na výslovné přání uživatele):**
- Jednopísmenné (**a, i, k, o, s, u, v, z** — velká i malá písmena)
- Dvoupísmenné/krátké (**do, ke, na, od, po, pro, se, ve, za, ze** — velká
  i malá písmena)

**Implementace:**
- V literálním textu přímo v `.astro` šabloně (mezi tagy, ne v `{}` výrazu):
  HTML entita `&nbsp;` — např. `Bydlení, ochranu, investice a&nbsp;penzi`.
- V textu uvnitř JS/TS řetězců (pole dat vykreslovaná přes `{promenna}`,
  které Astro escapuje, entity se tam NEVYHODNOTÍ jako mezera): skutečný
  znak nezlomitelné mezery U+00A0, ne text `&nbsp;` — jinak se na stránce
  zobrazí doslovný text „&nbsp;" místo mezery. V editoru/kódu je vizuálně
  nerozeznatelný od běžné mezery, počítej s tím při hledání/kontrole.

**Další místa, kde se nesmí zalomit (doplněno 24. 9. 2026 po celowebové
kontrole):**
- číslo + to, k čemu patří: `30&nbsp;minut`, `12&nbsp;měsíců`, `10&nbsp;let`,
  `Google Analytics&nbsp;4`,
- telefon `+420&nbsp;775&nbsp;217&nbsp;721`, PSČ + město `708&nbsp;00&nbsp;Ostrava`,
  datum `1.&nbsp;9.&nbsp;2026`, `17.&nbsp;listopadu`,
- právní odkazy: `č.&nbsp;257/2016&nbsp;Sb.`, `§&nbsp;3`, `odst.&nbsp;1`,
  `čl.&nbsp;6`, `písm.&nbsp;f)`, `Osvědčení č.&nbsp;…`,
- pomlčka nesmí začínat řádek: `slovo&nbsp;— další`, stejně oddělovač
  `slovo&nbsp;· další`,
- spojovník v místním názvu (`Ostrava-Poruba`, `Ostravě-Porubě`): za
  spojovník vložit **word joiner** U+2060 (`&#8288;` v šabloně, znak
  U+2060 v JS řetězci), nebo celý úsek obalit `white-space: nowrap`
  (adresa v patičce a kontaktu). **Ne** U+2011 (nezlomitelný spojovník) —
  Manrope ho nemá a prohlížeč by ho vykreslil jiným písmem.

Všechna pravidla výše hlídá automaticky `npm run check:typo` (viz „Jak
spustit").

**Pozor na falešné nálezy:** kontroluj jen SAMOSTATNÁ slova (celá předložka/
spojka mezi mezerami/interpunkcí), ne stejnou písmennou sekvenci jako
součást delšího slova (např. „ze" ve slově „zeleň" se netýká) — a nezaměňuj
předložku „na" s částí slova jako „navíc"/"nastavení".

## Konvence: mezera nadpis → úvodní text

Platí pro nadpis (`<h2>`) bezprostředně následovaný jedním krátkým úvodním
odstavcem (ne seznamem otázek, ne řádkem s CTA a víc prvky). Zjištěno
24. 8. 2026 při srovnání sekcí — nejnovější tři (CasesSection, ArticlesSection,
ContactSection) se nezávisle ustálily na stejné hodnotě, starší sekce
(Hero, ConnectionsSection) mají 3–6× větší mezeru z doby před touto konvencí.

- **Mezera: 14 px mobil, 14–18 px vyšší stupně** (přesná hodnota v rámci
  tohoto rozsahu je na úvaze — jde o řád velikosti, ne fixní číslo).
- **Mechanismus: `gap` na flex sloupci** obalujícím nadpis i text
  (`display: flex; flex-direction: column; gap: <hodnota>`), ne `margin-top`
  na textu a ne absolutní `top` na obou zvlášť. `gap` na flow layoutu se
  automaticky nerozjede, když se nadpis zalomí na jiný počet řádků (viz
  obecné pravidlo „flow layout místo pevného `top`" v hlavičkových
  komentářích ContactSection.astro/CasesSection.astro) — přesně třída
  chyby, kterou absolutní pozicování (viz ConnectionsSection.astro) svádí
  udělat znovu.
- Hero.astro **vědomě není** přizpůsobené této konvenci (schválený, hotový
  návrh z doby před jejím ustálením) — needituj ho kvůli tomuto pravidlu
  bez výslovného zadání. ConnectionsSection.astro byla dřív taky výjimka,
  ale na žádost uživatele (1. 9. 2026) sjednocena na 14px stejně jako
  CasesSection/ArticlesSection/ContactSection/podstránky — `top` hodnoty
  `.connections__text` na všech čtyřech stupních teď počítají s `+14px`
  místo `+18px`.

Referenční implementace: `CasesSection.astro` (`.cases__intro`),
`ContactSection.astro` (`.kontakt__intro`).

**Platí i pro OPAKOVANÉ položky, ne jen pro jeden hlavní nadpis sekce**
(doplněno 1. 9. 2026, `/sluzby` a `/sluzby/hypoteky`). Kdykoli je vzor
„krátký tučný nadpis/název → vysvětlující text" uvnitř seznamu/řádku
(karta, řádek tabulky, FAQ otázka+odpověď, krok procesu), platí STEJNÝCH
14px, ne menší hodnota jen proto, že se prvek opakuje víckrát na stránce.
Zjištěno na `.hyp-areas__row`, `.hyp-step`, `.hyp-faq__row` (6–8px),
`.sluzby-areas__col`, `.sluzby-router__row` (8–10px) — všechno stejná
rodina vztahu nadpis→text jako `.cases__intro`, jen s jinou (nižší,
nezdůvodněnou) hodnotou. Sjednoceno na 14px. Týká se jen svislého úseku —
pokud stejný pár na vyšším stupni přejde na řádkový grid vedle sebe (text
vpravo od nadpisu, ne pod ním), gap tam řeší jinou vlastnost (typicky
`column-gap`) a 14px se na něj nevztahuje.

**14px platí jen pro vztah nadpis→text, NE mezi dvěma větami/odstavci,
které pokračují jednu myšlenku** (zjištěno týž den, hned po zavedení
pravidla výše — `.hyp-phase`/`.hyp-step`/`.hyp-chapter__statement-col`
mají někdy dvě věty jako dva `<p>`, ne jeden odstavec). Když text obsahuje
víc takových vět, obal je do VLASTNÍHO wrapperu s menším gapem (~8px,
`display:flex;flex-direction:column;gap:8px`) a nech 14px z rodiče
uplatnit se jen JEDNOU — mezi nadpisem/zvýrazněnou větou a celým tímhle
blokem, ne mezi každou dvojicí sourozenců bez rozdílu. Referenční
implementace: `.hyp-phase__body`, `.hyp-step__body`,
`.hyp-chapter__statement-body` v `sluzby/hypoteky.astro`.

## Konvence: mezera mezi sekcemi (symetrický padding, ne margin)

Platí **globálně a automaticky** — pro homepage i pro každou budoucí
podstránku, bez ohledu na to, jestli to zadání znovu zmíní.

Sousední sekce (`<section>`, `<footer>`) na tomto webu na sebe navazují
BEZ marginu mezi nimi (kvůli kontinuální SVG trase, která musí procházet
švem beze skoku — viz „Konvence: kontinuální linka, tečky a text" výše).
Z toho plyne: **reálná mezera mezi obsahem dvou sousedních sekcí = součet
vlastního `padding-bottom` první sekce a `padding-top` druhé sekce.**
Žádný jiný mechanismus tu mezeru netvoří.

**Pravidlo:** `padding-top` a `padding-bottom` každé sekce musí být na
každém stupni STEJNÉ (symetrické), pokud pro asymetrii není explicitní,
zdokumentovaný důvod (např. sekce, která má být od sousední záměrně blíž
kvůli tematickému seskupení — a i pak to musí být okomentované, ne tiché).
Bez toho vznikne nekonzistentní rytmus: sekce s `padding-bottom: 0` (nebo
jakoukoli hodnotou menší než její vlastní `padding-top`) dá další sekci
POLOVIČNÍ (nebo jinak menší) mezeru než mají ostatní přechody na stránce —
vizuálně se to projeví jako „namačkaná" dvojice sekcí uprostřed jinak
pravidelně rozestupovaného webu.

**Zjištěno a opraveno 26. 8. 2026** na `/sluzby`: `.sluzby-chapter--plan`
(kapitola „Finanční plán") mělo `padding-bottom: 0` na všech stupních,
zatímco sousední `.sluzby-chapter--dominant` („Hypotéky") a `.sluzby-areas`
(„Další oblasti") měly padding symetrický. Přechod Hypotéky→Finanční plán
tak měl dvojnásobnou mezeru (padding obou sekcí) oproti přechodu Finanční
plán→Další oblasti (jen padding jedné sekce, protože druhá strana měla 0) —
uživatel to popsal jako „moc namačkané". Oprava: `padding-bottom` sjednocen
s `padding-top` na všech stupních (base/tablet/notebook/desktop).

**Kontrola při tvorbě/úpravě sekce:** neposuzuj jen CSS hodnoty izolovaně —
změř v prohlížeči skutečnou mezeru mezi POSLEDNÍM viditelným prvkem jedné
sekce (typicky odkaz/CTA/poslední řádek posledního sloupce — ne hranici
`<section>` samotnou, ta je vždy 0) a PRVNÍM viditelným prvkem další sekce
(nadpis, pruh/bar), a porovnej ji s mezerami u ostatních přechodů na téže
stránce. Pokud je nápadně menší nebo větší bez zdůvodnění, jde o stejnou
třídu chyby jako výše.

## Konvence: mezera MEZI BLOKY uvnitř sekce (flex `gap`, ne izolovaně CSS hodnoty)

Platí **globálně a automaticky** — pro homepage i pro každou budoucí
podstránku. Doplněk k „Konvenci: mezera mezi sekcemi" výše — ta řeší mezeru
MEZI sekcemi, tahle mezeru MEZI bloky (úvodní text → seznam, nadpis →
seznam kroků, dvě po sobě jdoucí věty v postranním sloupci) uvnitř jedné
sekce, kde je `flex; flex-direction: column; gap: <N>px` na společném
rodiči zavedený vzor napříč webem (`.sluzby-chapter__content`,
`.hyp-chapter__content` apod.).

**Zjištěno a opraveno 1. 9. 2026** na `/sluzby/hypoteky` — uživatel nahlásil
„text je na sobě moc namačkaný" u čtyř kapitol. Dvě samostatné příčiny,
obě stejná rodina chyby (mezera se spoléhá na `gap`, ale něco ho tiše
zruší nebo zdvojí):

1. **Responzivní override změnil `display` a tím zahodil `gap`.** Base
   pravidlo mělo `display: flex; gap: 32px`, notebook+ override pro
   jednosloupcovou variantu (`.hyp-chapter__content--single`) přepsal na
   `display: block` — `gap` platí jen na flex/grid kontejneru, na `block`
   se prostě ztratí, žádná náhrada za něj nenastoupí. Úvodní text
   (Oblasti/Průběh) pak seděl nalepený přímo na navazující seznam.
   **Pravidlo:** měníš-li v responzivním override `display`, buď zachovej
   `flex`/`grid` (jen změň směr/šablonu), nebo za ztracený `gap` vědomě
   dosaď náhradu (`margin-top` na dětech) — nikdy ho neztrácej mlčky.
2. **`gap` na rodiči + vlastní `margin-top` na dítěti se SČÍTAJÍ.** `gap`
   mezi flex položkami nekoliduje s jejich vlastními external margins —
   obojí se přičte. `.hyp-steps` mělo `margin: 24px 0 0` navíc k rodičovu
   `gap: 40px` (h2 → seznam kroků vyšlo 64px), `.hyp-steps__closing` mělo
   `margin: 36px 0 0` navíc ke stejnému `gap` (seznam → závěrečná věta
   místo zamýšlených ~40px vyšlo výrazně víc). Menší z těchto dvou chyb je
   neškodná (jen víc vzduchu), ale svědčí o stejném architektonickém
   problému — **vyber JEDEN zdroj mezery mezi danou dvojicí bloků, ne oba
   zároveň.** Preferuj `gap` na rodiči (funguje automaticky pro všechny
   sourozence bez nutnosti pamatovat na `:first-child`/`:last-child`
   výjimky) a nech dětem `margin: 0`.

**Kontrola:** stejná jako u mezery mezi sekcemi — změř v prohlížeči
skutečnou mezeru mezi KAŽDÝMI dvěma po sobě jdoucími bloky uvnitř sekce
(`getBoundingClientRect`, ne jen čtení CSS), na stupni, kde se `gap`
poprvé mění (typicky notebook 1200px). Nespoléhej na to, že vizuálně
„vypadá to podobně jako jinde" — konkrétní px hodnotu ověř.

## Konvence: pruh (bar) + obsah vedle sebe — zarovnání prvního prvku

Platí pro layout „popisek/pruh vlevo, obsah vpravo" (`display: flex;
align-items: flex-start`) — na `/sluzby` používají `.sluzby-router__bar`
+ `.sluzby-router__list`, `.sluzby-chapter__bar` + `.sluzby-chapter__content`,
`.sluzby-areas__bar` + `.sluzby-areas__columns`, a bude ho pravděpodobně
používat i každá další podstránka s obdobnou kompozicí.

**Pravidlo:** první/hlavní prvek obsahového sloupce (první nadpis, první
karta, první řádek seznamu) musí vizuálně začínat na STEJNÉ výšce jako
text pruhu vedle něj — `align-items: flex-start` na rodiči k tomu nestačí
samo o sobě, pokud první prvek obsahu má vlastní `padding-top`/`margin-top`
(typicky proto, že sdílí styl se zbytkem seznamu pod ním, kde je ten
padding žádoucí jako mezera mezi položkami). V takovém případě dostane
PRVNÍ prvek `:first-child` výjimku (`padding-top: 0`), zbytek seznamu
pokračuje v původním rozestupu beze změny.

Tohle je nezávislé na pozici TEČKY u pruhu — ta se podle „Konvence:
kontinuální linka, tečky a text" centruje na celý text pruhu
(`rect.top + rect.height / 2`), ne na jeho horní hranu, a zůstává tak
i po zarovnání prvního prvku obsahu.

**Zjištěno a opraveno 26. 8. 2026** u `.sluzby-router__list` — první řádek
(„Chci řešit bydlení") měl stejný `padding-top: 22px` jako všechny další
řádky pod ním, takže seděl o 26 px níž než pruh „Začněte tím, co právě
řešíte." vedle něj, zatímco `.sluzby-chapter__content`/`.sluzby-areas__columns`
(bez per-item paddingu na prvním prvku) už byly zarovnané správně. Oprava:
`.sluzby-router__list li:first-child .sluzby-router__row { padding-top: 0; }`
od notebooku výš (na tabletu/mobilu je layout naskládaný pod sebe, ne vedle
sebe, takže se tam netýká).

**Vodorovné zarovnání DRUHÉHO sloupce napříč sourozeneckými sekcemi
(zjištěno a opraveno 28. 8. 2026).** Když stejný „bar + dvousloupcový obsah"
vzor používá VÍC sekcí stejného typu za sebou (`.sluzby-chapter--dominant`
a `.sluzby-chapter--plan`, obě s `lead-col` vlevo + druhý sloupec vpravo),
šířka `lead-col` (prvního sloupce) musí být na daném stupni STEJNÁ napříč
všemi variantami — i když mají různě dlouhý nadpis/text a menší `lead-col`
by se textu vešel. Jinak druhý sloupec (kde sedí text, který si čtenář
porovnává mezi sekcemi svisle nad sebou) začíná v každé sekci na jiné
vodorovné pozici, což čtenář vnímá jako neúmyslné rozjetí, i když je každá
sekce samostatně „správně" zarovnaná (bar → obsah, `align-items: flex-start`).
Nalezeno na `.sluzby-chapter--plan .sluzby-chapter__lead-col`, který měl
o 40 px užší `width` než `.sluzby-chapter--dominant`'s (kvůli kratšímu
nadpisu) — `.sluzby-chapter__list-label`/`.sluzby-chapter__statement-intro`
tak nezačínaly na stejné ose. Oprava: `lead-col` šířka sjednocena (odstraněn
`--plan`-specifický užší override na notebooku i desktopu), `font-size`
nadpisu zůstává rozdílný (to je samostatná, záměrná typografická volba,
ne příčina chyby).

**Šířka nadpisového sloupce musí být STEJNÁ napříč VŠEMI kapitolami stránky
— i mezi dvousloupcovými a jednosloupcovými layouty (zjištěno a opraveno
1. 9. 2026, `/sluzby/hypoteky`, finální řešení po dvou kolech).**

První kolo (zvrácené, zdokumentováno pro dohledatelnost — NEOPAKOVAT):
zúžení jednosloupcových kapitol (Oblasti/Průběh, `.hyp-chapter__content--single`,
tehdy 640px) na 340px, aby odpovídaly dvousloupcovým (Fáze/Rozhodnutí/
Souvislosti). Uživatel při kontrole screenshotů řekl, že se mu naopak líbí
„roztáhlejší" styl — širší sloupec jako na `/sluzby` (600px desktop/540px
notebook), ne užší 340px.

**Finální řešení:** šířka `.hyp-chapter__lead-col` sjednocena na **540px
notebook / 600px desktop** pro VŠECHNY kapitoly bez rozdílu typu layoutu —
stejné hodnoty jako `.sluzby-chapter__lead-col` na `/sluzby`. Kapitoly BEZ
vlastního `.hyp-chapter__lead-col` wrapperu (Průběh — H2 je mimo něj,
sdílí sloupec se seznamem kroků) dostaly stejnou šířku samostatně
(`#steps-heading`/`.hyp-steps`, 640px — prakticky totožné se 600px ostatních,
navázané na šířku vlastního obsahu pod nadpisem, ne na svévolnou hodnotu).

Obecné poučení pro budoucí podstránky: šířka nadpisového sloupce je
vlastnost STRÁNKY (jeden společný sloupcový systém), ne jednotlivé kapitoly
— i když má kapitola jiný typ layoutu (2 sloupce vs. 1 sloupec), nadpisový
sloupec musí zůstat stejně široký jako u sesterských kapitol. Než měnit
šířku kvůli „logice layoutu" (2sloup vs. 1sloup), ověř u uživatele, jestli
si to skutečně přeje — vizuální preference („roztáhlejší"/„užší") má
přednost před strukturální úhledností.

**Šířka pruhu (bar) musí bezpečně pojmout NEJDELŠÍ jednoslovný popisek
kapitoly na dané stránce — jinak přeteče do mezery ke sloupci obsahu
(zjištěno a opraveno 1. 9. 2026, `/sluzby/hypoteky`).** `<p>` v pruhu je
flex potomek (`align-self: stretch`), takže se NEZALOMÍ, pokud je to JEDNO
slovo bez mezery (žádná příležitost k zalomení) — místo toho text
horizontálně přeteče za hranici svého sloupce a spolyká mezeru k obsahu
vedle něj (`.hyp-chapter__bar { width: 180px }` s popiskem „Rozhodnutí"/
„Souvislosti" scvrklo mezeru z ~56 px na ~26–31 px, uživatel to nahlásil
jako „text namačkaný"). **Kontrola tohle NEODHALÍ prosté měření
`getBoundingClientRect()` na `<p>` elementu samotném** — blokový prvek
vyplňuje celou šířku svého sloupce bez ohledu na to, kam sahá skutečný
text, takže box vždy vrátí šířku sloupce. Musíš změřit skutečný okraj
TEXTU (`Range.selectNodeContents(p).getBoundingClientRect()`, nebo
vizuální kontrola screenshotem), ne box prvku. Oprava: šířka pruhu
sjednocena na 240 px (stejná hodnota jako `.sluzby-chapter__bar`/
`.sluzby-areas__bar` na `/sluzby`, tam už ověřeno bezpečné i pro
nejdelší tamní popisek „Finanční plán" — dvě slova, může se zalomit,
proto fungovalo i na užších 180 px, ale 240 px je bezpečnější univerzální
volba pro budoucí podstránky s neznámými popisky). Při zavádění pruhu s
novým textem na jakékoli budoucí podstránce zkontroluj TOUTO metodou
(Range, ne box), ne jen vizuálně na kalibrační šířce.

## Konvence: wide desktop a centrované designové plátno

Platí **globálně a automaticky** — pro homepage, všechny současné i budoucí
podstránky, nové i upravované komponenty, nové textové sekce a jakoukoli
změnu layoutu. Platí pro Claude Code i Claude Design bez ohledu na to, jestli
ji uživatel u konkrétního úkolu znovu zmíní.

Web je záměrně asymetrický — to zůstává. Asymetrie ale nesmí znamenat, že se
hlavní obsah na širokých monitorech drží u levého okraje a napravo vzniká
neúměrně velké nezáměrné prázdno.

**Princip:** pozadí sekcí, barevné pásy a dekorativní kontinuální linka
mohou zůstat `full-width` (linka může mít i jiný horizontální rozsah než
obsah, pokud to vyžaduje kompozice — nijak to nemění „Konvenci: kontinuální
linka, tečky a text" výše). Ale **hlavní obsah** sekce musí mít definovaný
maximální horizontální rozsah a celý tento rozsah musí být na širokých
obrazovkách horizontálně centrovaný vůči viewportu — „designové plátno" /
stage.

**Centruje se plátno, ne jednotlivé prvky.** Uvnitř plátna zůstává plná
editorial asymetrie: H1/H2 nemusí být geometricky uprostřed, textové bloky
mohou být vlevo nebo vpravo, sekce mohou mít různou kompozici a velké
záměrné plochy negativního prostoru — to je součást značky, ne chyba
layoutu. Chyba je jen **nezáměrné** prázdno vzniklé tím, že obsah zůstal
nalepený vlevo, protože viewport narostl.

**Rozsah:** na 1366/1440 px layout dál přirozeně využívá dostupnou šířku
podle schváleného designu beze změny. Od 1400 px (existující desktopový
stupeň — žádný nový breakpoint) se hlavní obsah dál nesmí donekonečna
roztahovat s viewportem; patří do centrovaného `max-width` plátna —
implementováno a ověřeno 25. 8. 2026, token `--stage-max: 1760px` v
`tokens.css` (mezi 1400–1759 px je hodnota no-op, sekce jsou užší; nad
1759 px se šířka zastaví a zbytek jde rovnoměrně do okrajů).

**Jeden společný souřadný základ pro VŠECHNO** (doplněno 25. 8. 2026 po
opravě nekonzistence popsané níže): full-width viewport se nikde nepoužívá
jako nezávislá horizontální základna pro běžný obsah. Všechny hlavní
obsahové horizontální souřadnice — H1/H2, odstavce, CTA, seznamy, karty,
čísla, texty a tečky u kontinuální linky — na homepage i libovolné
podstránce vycházejí z jednoho společného centrovaného stage, včetně
`Header.astro` a patičky. Výjimku tvoří jen skutečné full-bleed vrstvy
(pozadí, barevný pás, samotná SVG route, pokud technicky potřebuje celý
viewport) — a i tehdy platí, že obsahové kotvy dekorativní SVG (tečky,
zářezy, konce trasy vázané na text) se počítají ze stage, ne z viewportu.

**Implementační vzor — ZÁVAZNÉ pro každou sekci, jeden token
(`--stage-max`, tokens.css):**

`FULL-WIDTH SECTION BACKGROUND` → `CENTERED 1760px CONTENT STAGE` →
`ASYMMETRIC CONTENT`. Kořenový element sekce, který nese `background`
(barvu, gradient, obrázek — cokoli vizuálně odlišitelné od okolí), **nikdy
nesmí dostat `max-width`/`margin-inline: auto`** — zůstává full-width,
nese jen pozadí. Centrovaný strop patří na **samostatnou obsahovou
vrstvu** uvnitř sekce (existující `__inner`/`__stage` wrapper, nebo nově
zavedený, pokud sekce ještě žádný nemá):

```css
.section { /* kořen, nese background */
  position: relative; /* zůstává full-width, BEZ max-width */
}
.section__inner { /* obsahová stage vrstva */
  max-width: var(--stage-max);
  margin-inline: auto;
}
```

Díky tomu se `100%` uvnitř všech `calc(X * 100% / vb + Y)` výpočtů (CSS
i JS `getBoundingClientRect`) automaticky přepočítá vůči omezené šířce
obsahové vrstvy — beze změny jediného `calc()` vzorce, `--vb`/`--axis-x`
tokenu nebo JS `syncRoute`/`syncMarkers` funkce. Dekorativní trasa
(`.xxx__route--desktop`/`.xxx__axis--desktop`) zůstává PŘÍMÝM potomkem
kořenové sekce (ne obsahové vrstvy) a dostává STEJNÝ strop nezávisle
(`left: 50%; right: auto; width: 100%; max-width: var(--stage-max);
transform: translateX(-50%);`), protože je sourozenec obsahové vrstvy, ne
její rodič ani potomek — bez toho by obsahová vrstva a trasa sice byly OBĚ
capnuté, ale nezávisle na sobě, takže tohle jen zajišťuje, že obě dostanou
STEJNOU šířku a střed. Sekce bez vlastní trasy (StatsBand) dostane místo
wrapperu jen `max-width: calc(var(--stage-max) - <levý+pravý padding>);
margin-inline: auto;` na svůj přímý obsahový prvek (`.stats-band__list`) —
matematicky stejný výsledek, bez nutnosti nového wrapper elementu.

Tohle pravidlo platí **bez ohledu na to, jestli má sekce dnes stejnou
barvu jako okolí** (`--bg`) nebo jinou (`#FFFFFF`, tmavý gradient) — capnutí
kořenového background elementu je vždy strukturální chyba, i když se
zrovna vizuálně neprojeví, protože barva jednoho dne sedí. Aplikuj ho na
KAŽDOU novou sekci a při jakékoli budoucí úpravě existující sekce.

**Proč to dřív bylo nekonzistentní — dvě samostatné chyby, obě nalezené
a opravené 25. 8. 2026:**

1. *Obsah bez stropu.* První průchod tímhle pravidlem (dopoledne) capoval
   jen DEKORATIVNÍ TRASU plnobarevných sekcí (RouterSection, BenefitsSection,
   FaqSection, SiteFooter, StatsBand, `/sluzby`'s `.sluzby-closing`), ne
   jejich SKUTEČNÝ OBSAH — nadpisy/seznamy tam zůstaly pozicované napevno
   vůči CELÉMU viewportu (`left: 120px` nebo `100vw` uvnitř `calc()` vázané
   na neomezenou šířku sekce), zatímco jejich sousední sekce už obsah
   capovaly. `Header.astro` navíc vůbec nebyl součástí prvního průchodu a
   používal vlastní, jinak škálovaný strop (`.container`, `--content-max:
   1240px`, nesouvisející s `--stage-max: 1760px`). Výsledkem bylo, že se
   při scrollování horizontální osa obsahu mezi sekcemi opticky posouvala.
   Oprava: `.container`/`--content-max` odstraněny z `Header.astro` (token
   `--content-max` zůstal v `tokens.css` nepoužitý, nebyl nikde jinde),
   zavedeny `.router__stage`/`.benefits__stage` wrappery, `.faq__inner`/
   `.footer__inner`/`.sluzby-closing__grid` dostaly strop navíc ke svému
   existujícímu paddingu, `.stats-band__list` dostal odvozený `max-width`.

2. *Background capnutý spolu s obsahem.* Oprava bodu 1 capovala u
   „světlých" sekcí (CasesSection, ContactSection, a dalších — viz níže)
   strop přímo na kořenový element sekce, PROTOŽE u většiny z nich (Hero,
   ConnectionsSection, ProcessSection, ReviewsSection, AboutSection,
   ArticlesSection) `background: var(--bg)` je LITERÁLNĚ stejný token jako
   `body`, takže capnutí kořene je barevně neprokazatelné (nemůže vzniknout
   viditelný šev, ať dělá cokoli). CasesSection a ContactSection ale mají
   `background: #FFFFFF` — VIDITELNĚ odlišné od `--bg` (#F8FAFC) — takže
   capnutí jejich kořene omezilo i pozadí: nad `--stage-max` (1920/2048 px+)
   vznikly boční pruhy `--bg` kolem bílého středu. Oprava: strop přesunut
   z `.cases`/`.kontakt` (kořen, nese pozadí, teď zůstává full-width) na
   `.cases__inner`/`.kontakt__inner` (existující obsahová vrstva, dřív jen
   pro svislý padding), trasa (`.cases__route--desktop`/
   `.kontakt__route--desktop`, dřív bez vlastního stropu, protože ho
   implicitně dědila od capnutého kořene) dostala strop samostatně stejnou
   route-only-cap technikou jako plnobarevné sekce v bodě 1.
   Hero/ConnectionsSection/ProcessSection/ReviewsSection/AboutSection/
   ArticlesSection/`Header.astro`'s `.site-header__inner` NEBYLY
   restrukturalizované na wrapper vzor (žádný viditelný ani možný bug —
   `var(--bg)` je vždy identická barva), ale při jakékoli budoucí úpravě,
   která by některé z nich dala VLASTNÍ odlišnou barvu pozadí, MUSÍ dostat
   stejný wrapper vzor jako `.cases`/`.kontakt` výše — capnutí kořene je
   bezpečné jen do chvíle, kdy se barva pozadí od okolí odchýlí.

**Výjimka** z centrovaného plátna je povolená jen když je záměrně
definovaná schváleným designem, vizuálně odůvodněná, nezpůsobuje optické
vychýlení celé stránky a je výslovně popsaná v komponentě nebo
implementační specifikaci. Claude Code ani Claude Design ji nesmí vytvářet
svévolně. Známá, zdokumentovaná výjimka: `/sluzby`'s dekorativní trasa
používá vlastní, na `--vb` procentech nezávislou konvenci (viewBox
dynamicky sleduje SKUTEČNOU vykreslenou šířku SVG, ne nominální 1440/1366/
834/390 — viz komentář u `.sluzby__route-svg` v `sluzby.astro`), protože
obsah `/sluzby` používá pevné px odsazení, ne procenta vázaná na `--vb`
jako homepage.

**Šev `/sluzby` → `SiteFooter.astro` — opraveno 26. 8. 2026, čtvrté a
finální kolo** (tři předchozí pokusy — z-index schovávání textu, dlouhá
šikmá úsečka, krátký oblý zákrut „zub" — uživatel po každém z prvních tří
poslal screenshot s tím, že to pořád není správně; historii pokusů viz git
blame / dřívější verze téhle poznámky, pokud je někdy potřeba). Finální
řešení, dvě samostatné části v `sluzby.astro`:

1. **Jednotný posun osy, žádný zákrut.** `axis` je pevný reálný px (scaleX
   zdejšího SVG je vždy 1), zatímco `SiteFooter.astro`'s vstup roste
   procentuálně se skutečnou šířkou svého (staticky kalibrovaného) viewBoxu
   — na kalibrační šířce (1440/1366/834/390) se shodovaly, mimo ni ne (~27px
   rozjezd na 2048px). Místo dopočtu zákrutu na KONCI trasy se `axis` ROVNOU
   nahrazuje procentuálně přepočítanou verzí (`axisScaled = axis / nominalVb
   * vb`) a používá se DŮSLEDNĚ všude — v cestě (hero oblouk i rovný úsek
   pod ním), v zářezech i tečkách (`notch`/`dot` x-souřadnice). Pod
   `--stage-max` (do 1440px) je to no-op, nad ní se CELÁ trasa pod hero
   obloukem posune vpravo jako jeden nepřerušený celek — jediný ohyb na
   stránce zůstává ten v hero (existující, neměněný, „nahoře se linka
   napojí tak jak je napojena"). Aby zůstal zachovaný odstup tečka→text
   (CLAUDE.md, ≥20px) u popisků tras (Rozcestník/Hypotéky/Finanční plán/
   Další oblasti), posouvají se o STEJNOU hodnotu (`--sluzby-shift`, CSS
   custom property nastavovaná v JS) i ONY — `padding-left: calc(<původní
   hodnota> + var(--sluzby-shift, 0px))` na všech čtyřech stupních.

2. **Skutečná mezera v čáře u nadpisu „Nemusíte řešit všechno najednou.",
   NE z-index.** Nadpis nemá vlastní odsazení od kraje `.sluzby-closing__grid`
   — na desktopu např. začíná na x=100, `axisScaled` bez posunu je na x=120
   (uvnitř nadpisu, přes první písmeno „N"). Na VÝSLOVNÉ přání uživatele
   („MAŠ UDĚLAT TU LINKU PŘERUŠENOU TAM KDE LEŽÍ TEN NADPIS", text se
   NESMÍ posouvat) se `darkPath` v místě, kde `axisScaled` reálně padne do
   vodorovného rozsahu nadpisu (`getBoundingClientRect` nadpisu, měřeno
   živě), rozdělí na DVĚ samostatné `M...V` podcesty v jednom `d` řetězci —
   SVG mezi nimi nic nevykreslí, skutečná mezera (+12px rezerva nahoře/dole),
   ne spoléhání na to, že text (jen řídce pokrytý glyfy, ne plná plocha)
   čáru vizuálně překryje. Kontrola je dynamická (přepočítává se při každém
   `syncRoute()`) — na stupních, kde `axisScaled` do nadpisu nezasahuje
   (notebook/tablet), zůstává trasa vcelku, žádná zbytečná mezera.

   Kritická chyba nalezená a opravená PŘI implementaci bodu 1: zářezy/tečky
   zůstaly omylem na starém `axis` místo `axisScaled` (jen cesta byla
   opravená) — způsobilo by to, že by tečka „ujela" od popisku (odstup
   46,67px místo 20px na 2048px). Opraveno, ověřeno přeměřením všech čtyř
   popisků na 2048px (odstup 20px, délka zářezu 36px, shodné se
   sjednocením z předchozího úkolu).

   Ověřeno `getPointAtLength`/`getBoundingClientRect` na 390/834/1366/1440/
   1920/2048/2560 px — tmavý úsek svisle konstantní (X rozptyl 0px) všude,
   šev vůči `SiteFooter.astro` 0px všude, mezera u nadpisu se objevuje
   přesně na stupních, kde se osa a nadpis reálně kryjí (2048/1920/2560/1440/
   390), a chybí tam, kde se nekryjí (1366/834) — nadpis samotný beze změny
   pozice na žádném stupni.

3. **Nájezdový gradient — jen na skutečném začátku linky, ne na `/sluzby`'s
   napojení na Connections (opraveno 26.–28. 8. 2026, dvě kola).** Homepage
   má nájezdový gradient (smaragdová → modrá, `LineGradientDefs.astro`) na
   SKUTEČNÉM začátku trasy — v Hero, u H1. Krátce se to omylem zavedlo i na
   začátku ConnectionsSection.astro (hned po přerušení stat pásem) — to ale
   NENÍ nový začátek linky, jen pokračování TÉŽE linky po vizuálním zmizení
   za pásem (viz vlastní hlavičkový komentář ConnectionsSection.astro:
   „nájezd začíná na y=0... sekce navazuje přímo na statistický pás, za
   kterým mizí konec Hero linky"). Uživatel po nasazení na obě místa nahlásil,
   že to působí jako by se linka na homepage „restartovala" uprostřed
   stránky — `s2-line-entry-*` gradient/`<defs>` v ConnectionsSection.astro
   byl proto ODSTRANĚN, cesta se vrátila na jednobarevnou `var(--line)` @
   `.18` (stejná konvence jako ProcessSection/RouterSection/…). Obecné
   pravidlo (viz nová konvence „Nájezdový gradient jen na začátku linky"
   níže): efekt patří jen na první segment routy STRÁNKY (typicky její
   hero), ne na každé mezisekční napojení.

   `/sluzby` naopak nájezd nikdy neměla a DOSTALA ho — protože její hero je
   skutečný, samostatný začátek vlastní linky (analogie k homepage Hero, ne
   k Connections). Jen pro `hero: true` stupně (laptop/desktop — jediné, kde
   trasa vstupuje shora dolů z hlavičky; tablet/mobil na `/sluzby` žádnou
   trasu do hero nemají, §4 originálního zadání, beze změny). Svislý gradient
   (na rozdíl od vodorovného u Hero, protože tady trasa vstupuje shora, ne od
   H1 vodorovně) na `M {entry} {HERO_ENTRY_START_Y} L {entry} {+100}` (osa
   `entry`, beze změny s viewportem — leží v prázdném prostoru napravo od
   `.sluzby-hero__text`, ověřeno 1300/1440px).

   **Mezera od hlavičky (doplněno 28. 8. 2026).** Trasa v hero dřív začínala
   na `y=-20` (prakticky slepená na hranici hlavičky, žádný vizuální odstup)
   — na výslovné přání uživatele teď začíná na `y=40`
   (`HERO_ENTRY_START_Y` konstanta v `<script>` v `sluzby.astro`, musí sedět
   s `y1`/`y2` v `<LineGradientDefs>` a `d` entry overlaye v markupu nad ním
   — tři místa, jedna hodnota). Ověřeno živě: `mainTop === headerBottom`,
   trasa se objevuje 40px pod tím, ne v `0`.

   **Jemnost přechodu (doplněno 28. 8. 2026).** Gradient stops v
   `LineGradientDefs.astro` byly příliš ostré (skok 0→65% opacity během
   prvních ~19 % délky) — na přání uživatele („udělej ten přechod jemnější")
   zmírněno na pozvolnější náběh s nižším vrcholem (~32%/68% zlomy, nižší
   peak opacity ~0.4 místo ~0.6) u všech tří tierů (`desktop`/`laptop`/
   `tablet`) — sdílená komponenta, mění se tedy současně pro Hero i
   `/sluzby`.

   **Skok krytí/tloušťky na konci nájezdu — „zub" (opraveno 1. 9. 2026).**
   Nájezdová (`hero-line__entry`/`sluzby__route-entry`) a hlavní trasa se
   na úseku nájezdu vždy PŘEKRÝVALY — hlavní trasa (plná barva `--line` @
   .18) kreslila i tenhle úsek, nájezd přes ni. Dva poloprůhledné tahy
   STEJNÉ barvy nad sebou se opticky sečtou na vyšší výsledné krytí, než má
   samotná `.18` — na konci nájezdu (kde nájezdův poslední stop = `--line` @
   .18, tedy vizuálně STEJNÝ jako hlavní trasa) proto vznikal viditelný
   skok krytí/tloušťky, uživatel to popsal jako „tučná linka do tenčí,
   nějaký zub". Oprava: hlavní trasa teď kreslí `d` až OD KONCE nájezdu
   (Hero: `M` na `x2` gradientu místo `x1`; `/sluzby`: `heroArcPath` začíná
   na `HERO_ENTRY_START_Y + HERO_ENTRY_LENGTH` místo na `HERO_ENTRY_START_Y`)
   — cesty na sebe navazují BEZ překryvu, žádné sčítání krytí, přechod je
   matematicky hladký. Týká se všech čtyř tierů `HeroLine.astro` (desktop/
   laptop/tablet/tablet-wide) i obou hero tierů `sluzby.astro` (laptop/
   desktop). **Obecné pravidlo pro budoucí nájezdy:** nájezdová cesta a
   navazující plnobarevná cesta se nikdy nesmí překrývat — buď hlavní
   cesta začíná přesně tam, kde nájezd končí (tahle technika), nebo
   (alternativně) nese nájezd JEDNU cestu s gradientem po celé délce, ne
   dvě cesty nad sebou.

**Povinné testovací šířky** při každé významné změně desktopového layoutu:
1366 / 1440 / 1920 / 2048 px (2560 px navíc, pokud to jde snadno ověřit).
Pokud změna ovlivňuje responzivitu celé sekce, kontrolovat i 834 / 390 px.
Nestačí testovat jen 1440 px — chyba wide-desktop stage se tam nemusí vůbec
projevit, protože je pod `--stage-max` no-op. Při scrollování CELOU
stránkou (ne jen izolovanou sekcí) na těchto šířkách hledat horizontální
„skok" kompozice mezi sousedícími sekcemi — to je přesně třída chyby, která
unikla prvnímu průchodu (viz výše).

Zachovej všechny stávající konvence trasy při budoucí implementaci
(procentuální přepočty, `preserveAspectRatio="none"`, skutečné pozice přes
`getBoundingClientRect`, `ResizeObserver`, `document.fonts.ready`,
`npm run check:layout`) — rozliš `viewport`/`full-width` vrstvu, centrovaný
content stage a dekorativní route vrstvu; linka smí mít jiný rozsah než
stage, text a důležité obsahové prvky musí stage respektovat vždy.

`npm run check:layout` obsahuje od 25. 8. 2026 samostatnou kategorii
kontrol právě pro tenhle mechanismus (`WIDE_STAGE_CHECKS` ve
`scripts/audit-layout.mjs`) — ověřuje na 1440/1920/2048/2560 px, že
odstup mezi dvěma prvky na RŮZNÝCH sekcích, které mají ležet na stejné ose
(např. Header logo vs. Hero H1, nadpis Connections vs. nadpis Benefits),
zůstává konstantní. Existující `TIER_WIDTH_PAIRS`/`FLAT_CHECKS` k tomu
nestačí — jejich desktopový pár (1440/1700 px) nikdy neopouští no-op zónu
pod `--stage-max` (1760 px), takže by přesně tuhle třídu regrese vůbec
nezachytil (FLAT_CHECKS navíc testuje opačnou vlastnost — konstantní
POZICI JEDNOHO prvku, což je legitimně pravda jen pod `--stage-max`, ne
nad ním, takže se jeho páry NESMÍ rozšiřovat na širší rozsah bez rozmyslu).
Žádná z těchto kontrol netestuje BARVU pozadí (jen geometrii) — chybu
z bodu 2 výše (background capnutý spolu s obsahem) `check:layout`
nezachytí; při každé úpravě stropu na kořenovém elementu sekce proto
ručně ověř `getComputedStyle(section).backgroundColor` na kraji i uprostřed
viewportu nad `--stage-max`, ne jen pozice prvků.

Zdroj: úkol „wide desktop a centrované designové plátno" (25. 8. 2026), viz
i doplněk v `docs/design-direction.md` §4. Implementováno 25. 8. 2026 na
homepage i `/sluzby`, opraveno téhož dne ve dvou samostatných kolech (viz
„Proč to dřív bylo nekonzistentní" výše — nejdřív chybějící strop na
obsahu plnobarevných sekcí, pak omylem capnuté pozadí u CasesSection/
ContactSection) — `npm run check:layout` 206/206, `npm run build` bez
chyb, ověřeno 1366/1440/1920/2048/2560 px a regresně 834/390 px.

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
sekce 20 („ÚKOLY DO SPUŠTĚNÍ“)** — fotky, favicon + OG obrázek, sekce Články
na homepage, nasazení na Wedos, Google profil (web `pafinga.cz` →
`patrikgajdadzis.cz`), Search Console, GA4. Tam se udržuje, tady jen stručně:

- **Fotky** jsou zatím testovací (vodoznak, nízké rozlišení). Schválené
  usazení na desktopu je závazně zapsané v `docs/fotky-umisteni.md` (cílové
  hodnoty + postup + `scripts/photo-metrics.mjs`) — finální fotky usadit
  přesně podle něj. Mobil/tablet se ladí zvlášť.
- Všechny podstránky (`/sluzby` + 5 detailů, `/pristup`, `/recenze`,
  `/o-mne`, `/clanky`, právní stránky, 404) jsou hotové. `/clanky` je
  `noindex` a bez odkazu, dokud nebudou články.
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
- SEO/GEO vrstva (brief §23): favicon, Open Graph / Twitter meta, canonical,
  `sitemap.xml`, `robots.txt`, strukturovaná data (JSON-LD `FinancialService`).
- Právní/regulatorní: registr ČNB, zásady zpracování OÚ, cookies — ověřit dle §8.
- Nahradit `HeroPhotoPlaceholder` a placeholder fotku v AboutSection skutečnými
  fotkami; nahradit zástupné texty v CasesSection a ArticlesSection skutečným
  obsahem (viz `POZOR` komentáře v těch souborech).

**Známé nesrovnalosti k opravě:**

- `StatsBand.astro` zobrazuje „5,0 Google recenze". Brief §7 chce
  „42 recenzí s hodnocením 5★" (počet je silnější důkaz než samotná známka). Sjednotit.
- ~~Přednačítání jen `manrope-latin.woff2`~~ — vyřešeno 24. 9. 2026:
  `BaseLayout.astro` přednačítá i `manrope-latin-ext.woff2` (ř, š, č, ž, ě, ů),
  oba soubory se stahují současně, bez probliknutí náhradního písma.
