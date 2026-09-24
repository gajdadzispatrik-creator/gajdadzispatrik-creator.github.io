# Hero Implementation Spec

**Projekt:** patrikgajdadzis.cz
**Verze:** 1.0 — schválený stav
**Zdroj pravdy pro vizuál:** `design-exploration/financial-architecture/FA-02 Final.dc.html`
**Kontext:** `docs/brand-experience-brief.md`, `docs/content-homepage.md`, `docs/design-direction.md`, `docs/art-direction-financial-architecture.md`

Tento dokument popisuje **pouze horní část homepage**. Hodnoty jsou závazné. Pokud návrh a tento dokument nesouhlasí, platí návrh v `FA-02 Final.dc.html` a rozpor je potřeba nahlásit, ne dořešit vlastním rozhodnutím.

---

## 1. Rozsah implementace

Implementuje se výhradně:

1. header a navigace (desktop + notebook),
2. tabletová a mobilní navigace včetně otevíracího menu,
3. hero sekce,
4. H1,
5. podnadpis,
6. primární CTA `Nezávazná konzultace`,
7. telefonní akce `+420 775 217 721` (`tel:+420775217721`),
8. prostor pro fotografii Patrika (dočasný placeholder),
9. kontinuální linka,
10. statistický pás,
11. **pouze viditelný začátek** sekce „Neřeším produkty. Řeším souvislosti.“ — nadpis + doprovodný odstavec, nic dalšího.

Mimo rozsah: zbytek homepage, formulář, footer, podstránky, cookie lišta, analytika, deploy.

### Texty — kopírovat přesně, nepřepisovat

| Prvek | Text |
|---|---|
| Značka | `PG` + `Patrik Gajdadzis` |
| Navigace | `Služby`, `Přístup`, `Recenze`, `O mně`, `Články` |
| CTA v navigaci | `Konzultace` |
| H1 | `Finance` / `se nemají řešit` / `po částech.` (tři pevné řádky) |
| Podnadpis | `Bydlení, ochranu, investice a penzi propojuji do jednoho plánu.` / `Aby dával smysl dnes i za několik let.` (dva pevné řádky na desktopu, notebooku a tabletu) |
| Primární CTA | `Nezávazná konzultace` |
| Telefon | `+420 775 217 721` |
| Statistiky | `150+` / `osobních klientů` · `5,0` / `Google recenze` · `Od 2020` / `Ve financích` |
| Nadpis další sekce | `Neřeším produkty. Řeším souvislosti.` |
| Text další sekce | `Hypotéka, rezerva, pojištění i investice se navzájem ovlivňují. Proto se na vaše finance dívám jako na jeden celek.` |

Pevná zalomení H1 a podnadpisu se řeší elementem `<br>` obaleným tak, aby na mobilu nezasahovalo (viz §3.4) — nikoli `&nbsp;` ani ručním rozdělením do více elementů.

---

## 2. Design tokeny

### 2.1 Barvy

| Token | Hodnota | Použití |
|---|---|---|
| `--navy` | `#0F2747` | hlavní text, statistický pás, tmavé plochy |
| `--navy-ink` | `#1C3555` | sekundární nadpisy |
| `--bg` | `#F8FAFC` | hlavní pozadí, header |
| `--white` | `#FFFFFF` | text na tmavém, plochy |
| `--emerald` | `#1E7A5C` | primární CTA, akcenty, nájezd linky |
| `--emerald-hover` | `#155F47` | hover primárního CTA |
| `--emerald-light` | `#8FD3B9` | hover telefonu na tmavém podkladu |
| `--line` | `#1B4A8A` | kontinuální linka na světlém |
| `--line-on-dark` | `#9CB6D4` | kontinuální linka na tmavém hero (mobil) |
| `--text` | `#31445B` | běžný text |
| `--text-nav` | `#44586F` | odkazy v navigaci |
| `--text-muted` | `#52657D` | wordmark, popisky |
| `--text-quiet` | `#7A8AA0` | pomocné popisky |
| `--border` | `#CBD5DF` | okraje sekundárních prvků |
| `--rule` | `#E4E9EF` | vlasové linky na světlém |
| `--rule-soft` | `#DDE4EC` | vlasové linky v obsahu |

Placeholder fotografie (dočasné tóny, viz §4):
`#C4D2E4`, `#A2B6CE`, `#8AA1BF` (hlava) · `#B6C7DC`, `#96ACC7`, `#7F97B7` (torzo) · `#9CB1CB`, `#8299B9` (šíje) · rim light `rgba(143,211,185, .28–.30)` · key light `rgba(255,255,255, .30–.34)`.

### 2.2 Průhlednosti

- kontinuální linka: `opacity: .18` (světlé pozadí), `.34` (tmavé mobilní hero)
- popisky statistik: `rgba(255,255,255,.46)` desktop/notebook/tablet, `rgba(255,255,255,.62)` mobil
- dělič řádků v pásu (mobil): `rgba(255,255,255,.12)`
- podnadpis na mobilu: `rgba(255,255,255,.78)`
- popisek placeholderu na tmavém: `rgba(255,255,255,.72)`

### 2.3 Gradienty

**Nájezd linky (všechny šířky, `userSpaceOnUse` podél vodorovného úseku):**
`#1E7A5C @0 (opacity 0)` → `#1E7A5C @18–20 % (opacity .5–.8)` → `#255E77 @55–60 % (.28–.3)` → `#1B4A8A @100 % (.18)`
Délka nájezdu: desktop 270 px, notebook 250 px, tablet 200 px, mobil 180 px.

**Sestup linky pod pásem (desktop/notebook):** `#1B4A8A .18` → `#1B4A8A .06` směrem dolů.

**Světelný akcent hero (desktop/notebook):** `radial-gradient(56% 44% at 86% 16%, rgba(46,152,115,.06), transparent 72%)`.

**Mobilní modrý přechod fotografie do pásu** (jediná vrstva, začíná v úrovni ramen):

```

linear-gradient(180deg, rgba(120,152,193,0) 0%, rgba(92,127,172,.42) 16%, rgba(58,92,138,.68) 40%, rgba(32,62,104,.86) 62%, rgba(19,45,80,.96) 80%, #0F2747 94%, #0F2747 100%)

```
Plocha: od úrovně ramen (viz §3.4) po horní hranu statistického pásu. Nad ramena nesmí zasahovat — hlava zůstává nezakrytá.

### 2.4 Stíny

- header: `0 12px 28px rgba(15,39,71,.08)` (desktop, notebook, tablet `0 10px 24px`, mobil `0 10px 22px`)
- statistický pás: `0 18px 44px rgba(15,39,71,.16)` (tablet `0 16px 38px`, mobil `0 16px 36px`)
- jinde žádné stíny. Fotografie ani tlačítka stín nemají.

### 2.5 Radiusy

| Prvek | Radius |
|---|---|
| štítky | 8 px |
| formulářová pole (mimo rozsah, pro konzistenci) | 12 px |
| CTA v navigaci | 13 px |
| primární CTA, sekundární tlačítka | 14 px |
| tmavé/obsahové panely | 20–22 px |
| **lomy kontinuální linky** | 28 px desktop a notebook, 22 px tablet, 18 px mobil |

### 2.6 Linky

- kontinuální linka: `stroke-width: 1`, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`
- vlasové linky v obsahu: `1px solid` (`--rule`, `--rule-soft`)
- svislý dělič ve značce: `1px × 16px` (mobil `14px`), barva `--emerald`

### 2.7 Typografie

Manrope, řezy **400, 500, 600, 700**, znaková sada **latin + latin-ext** (české diakritiky jsou povinné). Self-host jako `woff2`, `font-display: swap`, preload pouze řezu 700 pro H1. Žádný druhý font, žádné systémové fallbacky v designu (fallback stack pouze technicky: `'Manrope', system-ui, sans-serif`).

| Role | Velikost / line-height / řez / letter-spacing |
|---|---|
| H1 desktop | 92 / 0.96 / 700 / −0.05em, `text-indent: -0.035em` |
| H1 notebook | 84 / 0.96 / 700 / −0.05em |
| H1 tablet | 56 / 0.98 / 700 / −0.05em |
| H1 mobil | 42 / 0.99 / 700 / −0.05em |
| Podnadpis desktop | 20 / 1.6 / 400 |
| Podnadpis notebook | 19 / 1.6 / 400 |
| Podnadpis tablet | 16.5 / 1.6 / 400 |
| Podnadpis mobil | 16.5 / 1.6 / 400 |
| Navigace desktop/notebook | 13 / 1 / 600 / 0.08em, uppercase |
| Wordmark | 13 (mobil 11.5) / 600 / 0.1em, uppercase |
| Monogram PG | 20 (mobil 18) / 700 / 0.14em |
| CTA | 16 (notebook 15.5) / 1 / 600 |
| Telefonní číslo | 17 (notebook 16.5, tablet a mobil 16) / 600, `font-variant-numeric: tabular-nums` |
| Statistika — číslo | 34 desktop (`Od 2020` 30) / 32 notebook (`Od 2020` 28) / 28 tablet (`Od 2020` 25) / 26 mobil, vždy 700 / −0.04em / `line-height: 1` / tabular-nums |
| Statistika — popisek | 10.5 (mobil 11.5) / 1 / 500 / 0.14em (mobil 0.1em), uppercase |
| Nadpis další sekce | 52 desktop / 48 notebook / 40 tablet / 30 mobil, 1.06–1.12 / 700 / −0.04em |
| Text další sekce | 18.5 desktop / 18 notebook / 16.5 tablet / — mobil (na mobilu se nezobrazuje) / 1.65 / 500 |

Minimální velikost běžného textu na mobilu: **16 px**. Popisky statistik nesmí být pod **11 px**.

### 2.8 Stavy

| Prvek | Hover | Focus-visible | Active |
|---|---|---|---|
| Primární CTA | `background: --emerald-hover`, 180 ms | `outline: 2px solid --emerald; outline-offset: 3px` | `transform: translateY(1px)` |
| Telefonní akce (světlé pozadí) | `color: --emerald` (číslo i ikona přes `currentColor`), 180 ms | stejné jako výše | bez posunu |
| Telefonní akce (tmavý podklad, mobil) | `color: --emerald-light` | `outline: 2px solid --emerald-light; outline-offset: 3px` | — |
| Odkaz v navigaci | `color: --navy` | `outline: 2px solid --navy; outline-offset: 4px` | — |
| CTA v navigaci | `background: rgba(30,122,92,.08)` | jako primární CTA | — |
| Tlačítko mobilního menu | `opacity: .8` | `outline: 2px solid --navy; outline-offset: 2px` | — |

Přechody pouze na `color`, `background-color`, `opacity`, `transform`; 150–220 ms, `ease-out`. Žádný hover jako jediný nositel informace.

---

## 3. Responzivní specifikace

Breakpointy (mobile-first, `min-width`):

| Breakpoint | Hodnota | Role |
|---|---|---|
| base | 0 | mobil 390 px |
| `--bp-tablet` | 768 px | tabletová kompozice (návrh kalibrován na 834 px) |
| `--bp-laptop` | 1200 px | notebook (kalibrováno na 1366 px) |
| `--bp-desktop` | 1400 px | desktop (kalibrováno na 1440 px) |

Mezi šířkami se rozměry plynule interpolují (`clamp()`), skoková změna je povolená jen tam, kde se mění kompozice (navigace, poloha fotografie, layout CTA). Návrh musí fungovat i mezi breakpointy — hodnoty níže jsou kotvy, ne jediné funkční šířky.

### 3.1 Desktop 1440 px

| Parametr | Hodnota |
|---|---|
| Hlavní kontejner | obsah zarovnán na okraje 120 px → obsahová šířka 1200 px (max 1240 px) |
| Header | výška 96 px, `background: --bg`, stín §2.4, `padding: 0 120px`, sticky |
| Značka | PG + dělič 1×16 + wordmark, gap 14 px |
| Navigace | odkazy gap 30 px, skupina odkazů ↔ CTA gap 38 px, CTA 42 px vysoké, `padding: 0 20px` |
| H1 | levý okraj 120 px, horní hrana 184 px (88 px pod headerem), měřítko bloku 820 px, 3 pevné řádky |
| Podnadpis | horní hrana 534 px = **85 px pod účařím H1**, šířka bloku **620 px** (drží dvouřádkové zalomení i při 1280 px) |
| H1 → podnadpis | 85 px |
| Podnadpis → CTA | 50 px (CTA horní hrana 648 px) |
| Primární CTA | výška 58 px, `padding: 0 30px`, radius 14 px |
| Telefonní akce | vpravo od CTA, gap 40 px, výška 58 px (zarovnáno na střed s CTA), ikona 19 px + číslo, gap 11 px |
| Fotografie | blok `left: 944px; top: 104px; width: 500px; height: 700px`, spodní hrana **přesně na horní hraně pásu (804 px)**, `overflow: hidden` |
| Bezpečná oblast fotografie | obličej a ramena musí ležet v horních 45 % bloku a nesmí přesáhnout vlevo za 944 px (kolize s H1) |
| Statistický pás | horní hrana 804 px, výška 96 px, `padding: 0 120px`, tři stejné třetiny (`grid-template-columns: 1fr 1fr 1fr`), každá položka vycentrovaná, číslo nad popiskem, gap 7–8 px |
| Kontinuální linka | vodorovný úsek na `y = 492` (41 px pod účařím H1), lom vpravo na `x = 1180`, návrat na `y = 740`, sestup na `x = 120`; radius lomů 28 px |
| Začátek další sekce | pás končí 900 px; nadpis a text vedle sebe, celý blok vycentrovaný na osu stránky, gap 80 px, nadpis 560 px, text 300 px, obojí na stejné první účaří (`padding-top: 5px` u textu) |

### 3.2 Notebook 1366 px

Mění se: okraje **96 px**, header **92 px**, H1 **84 px** (blok 780 px, horní hrana 176 px), podnadpis blok **590 px** (horní hrana 520 px), CTA horní hrana 626 px, primární CTA výška **56 px** / `padding: 0 28px`, telefon ikona 18 px / číslo 16.5 px, gap CTA↔telefon 36 px, fotografie `left: 900; top: 104; width: 466; height: 688`, pás horní hrana **792 px** / výška 96 px / `padding: 0 96px`, čísla 32 px (`Od 2020` 28 px), nadpis další sekce 48 px, text 290 px / 18 px, linka: úsek `y = 480`, lom `x = 1124`, návrat `y = 728`, sestup `x = 96`, radius 28 px.

Nemění se: struktura navigace, pevná zalomení, pořadí obsahu, radiusy tlačítek, typografická hierarchie pásu.

### 3.3 Tablet 834 px

| Parametr | Hodnota |
|---|---|
| Okraje | 40 px |
| Header | výška 72 px, `padding: 0 40px`; **odkazy se skrývají**, zůstává CTA `Konzultace` (40 px vysoké, `padding: 0 16px`) + tlačítko menu 48×48 px |
| H1 | 56 px, blok 470 px, horní hrana 128 px, **stejné zalomení jako desktop** |
| Podnadpis | 16.5 px, blok **520 px**, horní hrana 372 px, dva pevné řádky |
| CTA | horní hrana 470 px, **CTA a telefon vedle sebe**, gap 32 px; CTA 56 px / `padding: 0 28px`; telefon výška 48 px |
| Fotografie | `left: 560px; top: 72px; width: 312px; height: 584px`, spodní hrana na horní hraně pásu (656 px); fotografie začíná už pod headerem |
| Statistický pás | horní hrana 656 px, výška 100 px, `padding: 0 40px`, tři sloupce, čísla 28 px (`Od 2020` 25 px), popisky 10 px |
| Kontinuální linka | stejné vedení jako desktop, jen v menším měřítku: úsek `y = 318`, lom `x = 684` (sestup **za fotografií**), návrat `y = 600`, sestup `x = 40`; radius 22 px |
| Začátek další sekce | obsah odsazen na `left: 80px` (40 px odstup od sestupu linky), `right: 40px`, horní hrana 832 px, nadpis 40 px / blok 380 px, text 238 px / 16.5 px |

### 3.4 Mobil 390 px

Mobil **není zmenšený desktop**. Hero je navrženo na jednu obrazovku: končí na `828 px`, takže při viewportu 844 px je nad ohybem vidět už jen horní hrana statistického pásu.

| Parametr | Hodnota |
|---|---|
| Odsazení | vlevo 24 px, vpravo **32 px** (pravý okraj obsahu = 358 px) |
| Header | výška 64 px, `padding: 0 24px`, PG 18 px + dělič + wordmark 11.5 px, tlačítko menu 48×48 px (dva tahy 26×1.5 navy a 16×1.5 emerald) |
| Fotografie | vrstva na **plnou šířku**, `top: 64px`, výška 764 px, postava vycentrovaná, hlava začíná hned pod headerem, spodek splývá s pásem |
| Modrý přechod | jediná vrstva od úrovně ramen (`y = 250`) do horní hrany pásu (`828 px`), gradient §2.3 |
| H1 | 42 px, blok 334 px, horní hrana **404 px**, bílý, stejné zalomení jako desktop |
| Podnadpis | 16.5 px, blok 300 px, horní hrana 556 px, `rgba(255,255,255,.78)`, zalomení volné |
| CTA | horní hrana 676 px, sloupec, gap 12 px; primární **přes celou šířku**, výška 56 px, radius 14 px |
| Telefonní akce | pod CTA, samostatná, výška 52 px, vycentrovaná, ikona 18 px + číslo 16 px, bílá (leží na tmavém přechodu) |
| Odstup CTA ↔ pás | 32 px |
| Statistický pás | horní hrana 828 px, výška 252 px, `padding: 0 28px`, tři řádky po 84 px, položky vycentrované, číslo 26 px nad popiskem 11.5 px, gap 8 px, mezi řádky dělič `rgba(255,255,255,.12)` |
| Kontinuální linka | zjednodušená: vstup z levého okraje **v úrovni ramen** (`y = 270`), jeden oblouk (radius 18 px) na `x = 378`, svislice dolů; **prochází za neprůhlednou postavou**, na tmavém podkladu barva `--line-on-dark` |
| Začátek další sekce | nadpis 30 px vycentrovaný, doprovodný text se na mobilu **nezobrazuje** |
| Horizontální posouvání | zakázané — žádný prvek nesmí přetékat mimo `overflow-x: hidden` obal hero |

### 3.5 Co se mezi zařízeními skutečně mění

1. **Navigace:** desktop a notebook mají plné odkazy; od tabletu dolů zůstává CTA + tlačítko menu.
2. **Fotografie:** desktop/notebook/tablet = samostatný blok vpravo dosedající na pás; mobil = pozadí celé hero sekce na plnou šířku s modrým přechodem.
3. **Barva textu hero:** světlé pozadí a navy text na desktopu/notebooku/tabletu; bílý text na mobilu (fotografie s tmavým přechodem).
4. **Layout CTA:** vedle sebe (desktop, notebook, tablet) vs. pod sebou na plnou šířku (mobil).
5. **Statistiky:** tři sloupce vs. tři řádky, jiná velikost čísel i popisků.
6. **Kontinuální linka:** tři lomy → dva lomy (tablet) → jeden oblouk (mobil).
7. **Podnadpis:** pevné dvouřádkové zalomení do tabletu, volné zalomení na mobilu.
8. **Doprovodný text další sekce:** na mobilu se vypouští.
9. **Vertikální ukotvení:** na mobilu je obsah zarovnaný ke spodní hraně hero (tlačítka nad pásem), jinde k horní.

---

## 4. Fotografie — dočasný placeholder

Skutečná fotografie **není k dispozici**. Placeholder musí:

- **nepředstavovat smyšlenou podobu Patrika** — žádná tvář, žádné rysy, žádný fotobankový portrét, žádná AI generovaná osoba; jen tónová plocha s obrysem hlavy, šíje a ramen;
- ukazovat pouze potřebnou oblast a rozměry podle §3;
- nést viditelný popisek `FOTO PATRIKA — PLACEHOLDER` (11 px desktop / 10 px tablet a mobil, `600–700`, `letter-spacing: .16–.18em`, barva `--text-muted` na světlém, `rgba(255,255,255,.72)` na tmavém);
- být bez rámečku, karty, stínu a bez glassmorphismu.

**Konstrukce (jen do doby dodání fotografie):** tři plochy v jednom kontejneru — torzo (`clip-path` se svažujícími rameny), šíje, hlava; poměr šířky hlavy k ramenům **1 : 2,2–2,4**, překryv hlavy s torzem **30–34 px**, ramena dosáhnou plné šířky do **9,5 % výšky torza**. Světlo: key light `rgba(255,255,255,.30–.34)` ze 118°, rim light `rgba(143,211,185,.28–.30)` z 256°.

**Nahrazení fotografií:** kontejner musí být jediné místo, kde se placeholder vyměňuje. Rozhraní:

```

<div class="hero-photo" data-photo="placeholder"> … </div> ```

* `hero-photo` drží pouze polohu a rozměry (§3), placeholder je jeho obsah;
* po dodání fotografie se obsah nahradí `<img>` / `<picture>` s `object-fit: cover` a `object-position` nastavitelným samostatně pro desktop, tablet a mobil přes CSS custom properties `--photo-pos-desktop`, `--photo-pos-tablet`, `--photo-pos-mobile`;
* tři samostatné zdroje (desktopový, tabletový, mobilní ořez) přes `<picture><source media>`;
* rozměry bloku ani okolní layout se výměnou nesmí změnit;
* `alt`: `Patrik Gajdadzis, finanční poradce` (u placeholderu `alt=""` + `role="presentation"`).

5. Interakce
Pouze následující, nic víc:

1. Sticky header — `position: sticky; top: 0`, stín podle §2.4 je trvalý (nezjevuje se až po scrollu), `z-index` nad hero, bez změny výšky a bez blur efektu.
2. Mobilní / tabletové menu — otevření tlačítkem 48×48 px, jednoduchý plný panel pod headerem, jednoúrovňový seznam odkazů + CTA. Zavírá se tlačítkem, `Esc` a kliknutím mimo. Bez animace delší než 200 ms.
3. Hover CTA a telefonu — podle §2.8.
4. Jemné zobrazení H1 — po řádcích, `opacity 0→1` + `translateY(14px→0)`, 400–500 ms, odstup řádků 90 ms.
5. Jemné odhalení fotografie — maska/opacita zdola nahoru, 600 ms, `ease-out`, jednorázově.
6. Vykreslení kontinuální linky — `stroke-dashoffset` z plné délky na 0, 600–700 ms, spouští se se vstupem hero; volitelně pokračování při scrollu (bez parallaxu).
7. `prefers-reduced-motion: reduce` — všechny výše uvedené animace se vypnou (obsah je okamžitě ve finálním stavu, linka plně vykreslená). Zůstávají jen barevné přechody stavů.

Zakázané: parallax, loader, animovaný kurzor, nekonečné animace, animace po písmenech, carousel, animace nutná k přečtení obsahu.
6. Přístupnost
Pořadí obsahu v DOM (jedno pro všechny šířky)

1. `<a class="skip-link" href="#hero">` (přeskočit na obsah)
2. `<header>` → `<a>` značka (odkaz na `/`) → `<nav aria-label="Hlavní navigace">` s `<ul><li><a>` → CTA `<a href="/kontakt">Konzultace</a>` → `<button>` menu (jen pod 1200 px)
3. `<main>` → `<section id="hero">` → `<h1>` → podnadpis `<p>` → skupina akcí (`<a>` primární CTA, `<a href="tel:+420775217721">`) → obrázek/placeholder → dekorativní SVG linka
4. `<section>` statistiky: `<ul>` se třemi `<li>`, v každém číslo (`<strong>` nebo `<span>` s vizuální dominancí) a popisek
5. `<section>` začátek další sekce: `<h2>` + `<p>`

Fotografie je v DOM až za textem a CTA (na mobilu je vizuálně na pozadí, ale v pořadí čtení nesmí předbíhat H1). Dekorativní SVG: `aria-hidden="true"`, `focusable="false"`.
Elementy

* jeden `<h1>` na stránce, nadpis další sekce jako `<h2>`
* CTA a telefon jsou odkazy (`<a>`), nikdy `<div>` s `onclick`
* menu je `<button aria-expanded="false" aria-controls="mobile-menu">`, panel `<nav id="mobile-menu" hidden>`; `aria-expanded` se přepíná, `hidden` se odebírá
* statistiky nejsou tabulka; číslo a popisek jsou v jednom `<li>` a čtou se jako jeden údaj

Focus, dotyk, kontrast

* `:focus-visible` viditelný na všech interaktivních prvcích (§2.8), nikdy `outline: none` bez náhrady
* pořadí tabulátoru odpovídá DOM, žádné `tabindex > 0`
* minimální dotyková plocha 48×48 px (telefonní akce na mobilu 52 px, tlačítko menu 48×48 px)
* kontrast: `--navy` na `--bg` ≈ 14:1; bílá na `--emerald` ≈ 4.6:1; bílý H1 na mobilním přechodu ≥ 3:1 (velký text); podnadpis na mobilu ≥ 4.5:1; popisky statistik `rgba(255,255,255,.62)` na `--navy` ≥ 4.5:1. Popisky statistik na desktopu (`.46`) jsou doplňkové — nesmí nést informaci, která není jinde; pokud audit vyžaduje vyšší kontrast, zvyšuje se krytí, ne velikost.
* barva není jediným nositelem významu

Bez JavaScriptu

* header, hero, H1, podnadpis, CTA, telefon, fotografie, linka i statistiky jsou plně viditelné a funkční
* animace §5 startují z finálního stavu (žádné `opacity: 0` v CSS bez JS fallbacku — použít `@media (prefers-reduced-motion)` a `.no-js` třídu nebo animovat až po přidání třídy skriptem)
* navigační odkazy fungují; mobilní menu bez JS zobrazí odkazy jako statický seznam (`<details>`/`<summary>` nebo `:target` je přijatelné řešení)

7. Acceptance checklist
Implementace je přijatelná pouze při splnění všech bodů.
Rozsah a obsah

* Implementován pouze rozsah §1; žádná další sekce homepage nevznikla.
* Všechny texty odpovídají tabulce §1 znak po znaku, včetně `5,0`, `Od 2020` a `150+`.
* H1 má na desktopu, notebooku i tabletu tři řádky `Finance / se nemají řešit / po částech.`
* Podnadpis má na desktopu, notebooku a tabletu právě dva řádky; zalomení drží i při 1280 px.
* Navigace obsahuje `Služby, Přístup, Recenze, O mně, Články` + `Konzultace`.

Rozměry a responzivita

* Kotevní hodnoty §3.1–§3.4 odpovídají do ±2 px.
* Šířky 1440, 1366, 834 a 390 px vypadají jako schválený návrh.
* Layout je funkční i na mezilehlých šířkách (1024, 1180, 1280, 1536) — nic se nepřekrývá.
* Na mobilu není horizontální posouvání a hero končí na horní hraně pásu (viditelná je jen hrana pásu při viewportu 844 px).
* Fotografie na desktopu, notebooku i tabletu dosedá spodní hranou přesně na horní hranu pásu.
* Statistický pás má správnou výšku i typografii pro danou šířku.

Linka

* Barva `#1B4A8A`, krytí 18 %, tloušťka 1 px, zaoblené lomy (28/22/18 px) a zaoblená zakončení.
* Smaragdová je pouze v nájezdu (≤ 10 % délky).
* Linka nikde nepřekrývá písmena; minimální odstup od dotažnic H1 ≥ 20 px (desktop ≥ 40 px).
* Na mobilu prochází za postavou, ne přes ni.

Tokeny

* Žádná barva, radius, stín ani font mimo §2.
* Manrope 400/500/600/700, latin-ext, self-hosted, `font-display: swap`.
* Žádný Tailwind ani UI framework; pouze čisté CSS.

Fotografie

* Placeholder nepředstavuje podobu žádné osoby a nese popisek `FOTO PATRIKA — PLACEHOLDER`.
* Výměna za `<picture>` je možná bez zásahu do layoutu; ořez je nastavitelný zvlášť pro desktop, tablet a mobil.
* Fotografie nemá rámeček, kartu ani stín.

Interakce a přístupnost

* Sticky header funguje a nemění výšku.
* Mobilní menu: `aria-expanded`, `aria-controls`, zavření `Esc` i klikem mimo, dotyková plocha 48 px.
* Animace odpovídají §5 a při `prefers-reduced-motion: reduce` se nespouštějí.
* Vypnutý JavaScript: veškerý obsah je viditelný a odkazy fungují.
* Focus je viditelný na všech interaktivních prvcích, pořadí tabulátoru odpovídá DOM.
* Kontrasty podle §6 ověřeny měřením.
* Telefonní odkaz je `tel:+420775217721`.

Technika

* `npm run build` proběhne bez chyb a bez varování v konzoli.
* Žádný deploy, žádný push, žádná změna dokumentů ve `docs/` ani v `design-exploration/`.

