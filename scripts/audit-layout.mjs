// Automated pojistka pro pravidla v CLAUDE.md (§ „Konvence: kontinuální
// linka, tečky a text") — kontroluje, že text u dekorativní SVG trasy drží
// konstantní odstup od tečky/osy na celém rozsahu jednoho stupně (ne jen na
// kalibrační šířce), že sekce na sebe navazují švem 0 px, že tečky leží
// přímo na vykreslené křivce a že se hlavní bloky nepřekrývají.
//
// Zachycuje přesně třídu chyb nalezenou 23. 8. 2026 (FaqSection, Reviews,
// Benefits, AboutSection): pevný px místo procentuálního odsazení, nebo
// špatná základna `%` uvnitř `grid-template-columns`.
//
// DOPLNĚNO 2. 9. 2026: audit dřív běžel jen na homepage — `/sluzby`,
// `/sluzby/hypoteky` a `/sluzby/financni-plan` neměly ŽÁDNOU automatickou
// regresní kontrolu (CLAUDE.md „Konvence: kontinuální linka, tečky a text"
// to výslovně vyžaduje u každé sekce s trasou, ale při stavbě těchto tří
// stránek se to opomnělo). Skript teď běží nad POLEM stránek — při přidání
// další podstránky s trasou přidej nový záznam do `PAGES` níže, ne jen
// řádek do `ANCHORED_CHECKS` homepage.
//
// Spuštění: dev server musí běžet (npm run dev), pak `npm run check:layout`.
// Exit kód 0 = vše v pořádku, 1 = nalezen problém (detaily ve výpisu).

import { chromium } from '@playwright/test';

const ORIGIN = (process.env.AUDIT_URL || 'http://localhost:4321').replace(/\/$/, '');
const DRIFT_TOLERANCE_PX = 2;
const SEAM_TOLERANCE_PX = 1;

// Dvě šířky na stupeň: kalibrační + posunutá o cca 100–170 px. Chyba typu
// „drift" se na kalibrační šířce nikdy neprojeví — proto je posunutá šířka
// to hlavní, co tenhle audit hlídá.
const TIER_WIDTH_PAIRS = [
  { tier: 'mobil (0–767)', widths: [390, 500] },
  { tier: 'tablet (768–1199)', widths: [834, 1000] },
  { tier: 'notebook (1200–1399)', widths: [1366, 1300] },
  { tier: 'desktop (1400+)', widths: [1440, 1700] },
];

/*
 * Wide-desktop stage kontrola (CLAUDE.md „Konvence: wide desktop a
 * centrované designové plátno“, --stage-max: 1760px, tokens.css). Obě
 * šířky výše (1440/1700) leží POD --stage-max — sekce tam ještě rostou
 * s viewportem beze stropu, takže reálná pozice fixních-px kotev (typicky
 * `left: 120px` vázané na kraj sekce) v tomhle rozsahu zůstává konstantní
 * i beze stropu. To je ale JINÝ typ konstantnosti než FLAT_CHECKS níže testuje
 * obecně (ta zůstává platná v celém 1400+ pásmu jen NÁHODOU, dokud test
 * nepřekročí --stage-max) — nad 1760px se stejná kotva začne posouvat spolu
 * s `stageOffset = (viewport − 1760) / 2`, což je ŽÁDOUCÍ chování (celá
 * stránka se centruje), ne regrese. WIDE_STAGE_CHECKS proto neporovnává
 * konstantnost, ale přímo ověřuje, že reálná pozice = capnutá šířka sekce
 * (min(viewport, 1760)) vydělená kalibračním viewBoxem krát lokální
 * souřadnice, PLUS stageOffset — přesně vzorec z popisu úkolu
 * (`stageOffset = max((100vw - var(--stage-max)) / 2, 0px)`).
 */
const WIDE_STAGE_WIDTHS = [1440, 1920, 2048, 2560];

// Povinná kontrola švu — přesně tyto šířky vyžaduje každé zadání sekce
// v tomto projektu (viz claude-code-task-*.md, bod „Kontrola před
// dokončením").
const SEAM_WIDTHS = [390, 768, 834, 1024, 1180, 1200, 1280, 1366, 1399, 1400, 1440, 1920];

// ---------------------------------------------------------------------------
// Konfigurace stránek — při vytvoření další podstránky s trasou sem přidej
// nový záznam (path + jednotlivé kontroly). Prázdné/chybějící pole kontrol
// se prostě přeskočí, nemusí být vyplněné všechny kategorie.
// ---------------------------------------------------------------------------

// Sekce Články na homepage je schovaná, dokud nevyjde první článek
// (index.astro `showArticles`) — přepnout spolu s ním.
const HAS_ARTICLES = false;

const HOME_PAGE = {
  label: 'Homepage',
  path: '/',
  anchoredChecks: [
    { name: 'About — nadpis vs. tečka', routeSel: '.about__route', dotSel: '.about__dot', textSel: '.about__heading' },
    ...(HAS_ARTICLES ? [{ name: 'Articles — nadpis vs. vstup trasy', routeSel: '.articles__route', pathEntrySel: '.articles__route-path', textSel: '.articles__heading' }] : []),
    { name: 'FAQ — otázky vs. tečka (dělítko)', routeSel: '.faq__route', dotSel: '.faq__dot', textSel: '.faq__question' },
    { name: 'Reviews — sloupec citací vs. tečka', routeSel: '.reviews__route', dotSel: '.reviews__dot', textSel: '.reviews__list' },
    {
      name: 'Benefits — seznam přínosů vs. osa dělítka',
      routeSel: '.benefits__route',
      textSel: '.benefits__list',
      // Tečka v Benefits sedí na zářezu (offset od osy), ne přímo na ose —
      // proto se osa udává napevno podle šířky viewBoxu aktivní trasy.
      axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 890, 1440: 940 },
    },
    {
      // Doplňková kontrola k předchozí — ta měří odstup text↔OSA (vždy
      // v pořádku, osa je procentuální). Tahle měří odstup text↔TEČKA/ZÁŘEZ,
      // což je jiné číslo, pokud má zářez odsazení od osy v lokálních SVG
      // jednotkách (roste s roztažením SVG mimo kalibrační šířku, zatímco
      // text má odsazení pevné v px) — přesně chyba nalezená 25. 8. 2026
      // v BenefitsSection.astro/CasesSection.astro (viz CLAUDE.md bod 6):
      // na 1920 px mezera klesla z cílových 20 px na ~8 px. `dotSel` čte
      // SKUTEČNOU (JS dopočítanou) pozici první tečky, ne pevnou osu.
      name: 'Benefits — seznam přínosů vs. tečka (ne osa)',
      routeSel: '.benefits__route',
      dotSel: '.benefits__dot',
      textSel: '.benefits__list',
    },
    { name: 'Process — pos-1 (Poznám vaši situaci) vs. tečka', routeSel: '.process__route', dotSel: '.process__dot--pos-1', textSel: '.process__step--pos-1 .process__name' },
    {
      // Na mobilu je pos-1 na svislém úseku trasy s --ox v jednotkách SVG
      // (ne v pevných px) — odstup se tam ZÁMĚRNĚ škáluje s trasou (stejná
      // zdokumentovaná konvence jako RouterSection.astro, viz komentář
      // „prostoru jako SVG" v RouterSection.astro). Na tabletu/notebooku/
      // desktopu je pos-1 na vodorovném úseku, flush s tečkou (--ox: 0),
      // tam už drift být nesmí.
      name: 'Connections — pos-1 (Rezerva) vs. tečka',
      routeSel: '.connections__route',
      dotSel: 'circle[cx]',
      textSel: '.connections__area--pos-1',
      skipTiers: ['mobil (0–767)'],
    },
    { name: 'Cases — nadpis vs. osa', routeSel: '.cases__route', textSel: '.cases__heading', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
    { name: 'Cases — seznam studií vs. osa', routeSel: '.cases__route', textSel: '.cases__list', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
    {
      // Viz komentář u „Benefits — seznam přínosů vs. tečka (ne osa)" výše —
      // stejný princip, tady pro CasesSection.
      name: 'Cases — seznam studií vs. tečka (ne osa)',
      routeSel: '.cases__route',
      dotSel: '.cases__dot',
      textSel: '.cases__list',
    },
    { name: 'Kontakt — nadpis vs. osa', routeSel: '.kontakt__route', textSel: '.kontakt__heading', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
    {
      // Na mobilu je pás záměrně celošířkový (`left:0`, §4/§9 „pás je
      // celošířkový") — neleží na ose jako na ostatních stupních, proto se
      // tam tato kontrola vynechává (stejný princip jako `skipTiers` u
      // Connections pos-1 výše).
      name: 'Kontakt — pás vs. osa',
      routeSel: '.kontakt__route',
      textSel: '.kontakt__band',
      axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 },
      skipTiers: ['mobil (0–767)'],
    },
    { name: 'Kontakt — postranní sloupec/formulář vs. osa', routeSel: '.kontakt__route', textSel: '.kontakt__body', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
    { name: 'Footer — pásmo 1 vs. osa', routeSel: '.footer__route', textSel: '.footer__top', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
    { name: 'Footer — pásmo 2 vs. osa', routeSel: '.footer__route', textSel: '.footer__columns', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
    { name: 'Footer — pásmo 3 vs. osa', routeSel: '.footer__route', textSel: '.footer__bottom', axisLocalByViewBoxWidth: { 390: 24, 834: 40, 1366: 96, 1440: 120 } },
  ],
  // „flat": nadpis NESOUSEDÍ s žádnou trasou (jen běžný levý okraj) — musí
  // proto na celém stupni sedět na úplně STEJNÉ reálné souřadnici, ne jen na
  // konstantním odstupu od něčeho. Přesně tahle kontrola by odhalila bug ve
  // FaqSection.astro, kde měl nadpis na desktopu/notebooku omylem procentuální
  // left místo pevného.
  flatChecks: [
    { name: 'Connections — nadpis (pevný okraj)', sel: '.connections__heading' },
    { name: 'Reviews — nadpis (pevný okraj)', sel: '.reviews__heading' },
    { name: 'Benefits — nadpis (pevný okraj)', sel: '.benefits__heading' },
    { name: 'FAQ — nadpis (pevný okraj, jen notebook/desktop)', sel: '.faq__heading', minWidth: 1200 },
  ],
  // Švy mezi sekcemi, které na sebe musí navazovat (výstup jedné == vstup
  // druhé). Řetězec ověřený a zdokumentovaný v této relaci (23.–24. 8. 2026).
  seamChain: [
    { from: '.benefits__route', to: '.cases__route', label: 'Benefity → Případové studie' },
    { from: '.cases__route', to: '.about__route', label: 'Případové studie → O mně' },
    ...(HAS_ARTICLES
      ? [
          { from: '.about__route', to: '.articles__route', label: 'O mně → Články' },
          { from: '.articles__route', to: '.faq__route', label: 'Články → Časté otázky' },
        ]
      : [{ from: '.about__route', to: '.faq__route', label: 'O mně → Časté otázky' }]),
    { from: '.faq__route', to: '.kontakt__route', label: 'Časté otázky → Kontakt' },
    { from: '.kontakt__route', to: '.footer__route', label: 'Kontakt → Footer' },
  ],
  // Bloky, které se v žádné sekci nesmí navzájem překrývat.
  overlapChecks: [
    // `.about__photo` záměrně vynechaná (28. 9. 2026): je to výřez postavy
    // s průhledným okrajem, na přání uživatele vytažený nahoru k nadpisu
    // a posunutý doleva — obdélník rámu tak zasahuje do obdélníku nadpisu,
    // samotná postava ale od textu nadpisu odstup drží (ručně změřeno
    // 36–37 px na 1280/1440 px). Obdélníkové porovnání by hlásilo falešný
    // překryv.
    { name: 'About', sel: '.about__heading, .about__text' },
    ...(HAS_ARTICLES ? [{ name: 'Articles', sel: '.articles__heading, .articles__lead, .articles__topics, .articles__list, .articles__actions' }] : []),
    { name: 'FAQ', sel: '.faq__heading, .faq__offer, .faq__question, .faq__answer' },
    { name: 'Cases', sel: '.cases__heading, .cases__lead, .cases__item, .cases__cta' },
    { name: 'Kontakt', sel: '.kontakt__heading, .kontakt__text, .kontakt__band, .kontakt__side, .kontakt__form' },
    { name: 'Footer', sel: '.footer__identity, .footer__contact, .footer__col--nav, .footer__col--services, .footer__col--projects, .footer__col--legal, .footer__social, .footer__copyright' },
  ],
  wideStageChecks: [
    { name: 'Header — logo vs. Hero H1 (stejná osa)', selA: '.brand', selB: '.hero__title' },
    { name: 'Hero H1 vs. StatsBand — stejná osa', selA: '.hero__title', selB: '.stats-band__item' },
    { name: 'ConnectionsSection vs. BenefitsSection — nadpis na stejné ose', selA: '.connections__heading', selB: '.benefits__heading' },
    { name: 'BenefitsSection vs. FaqSection — nadpis na stejné ose', selA: '.benefits__heading', selB: '.faq__heading' },
    { name: 'RouterSection vs. SiteFooter — značka na stejné ose (osa+56px)', selA: '.router__heading', selB: '.footer__brand' },
    { name: 'SiteFooter vs. CasesSection — na stejné ose (osa+56px)', selA: '.footer__brand', selB: '.cases__heading' },
  ],
};

// Sdílená pomocná funkce — u `/sluzby`, `/sluzby/hypoteky` a
// `/sluzby/financni-plan` je vzor „popisek pruhu kapitoly vs. jeho tečka"
// vždy stejný: `[data-marker="klíč"] .PREFIX__dot` a `[data-route-target
// ="klíč"] p` (nebo `h2` u prvního pruhu na `/sluzby`, který nese `<h2>`
// místo `<p>`). Sdílí i routeSel (`.PREFIX__route-svg`, 4 tiery přímo jako
// <svg>, ne wrapper div) a seam do SiteFooter.
function chapterBarChecks(prefix, markers, { textTag = 'p' } = {}) {
  return markers.map(({ key, name, tag }) => ({
    name: `${name} — popisek vs. tečka`,
    routeSel: `.${prefix}__route-svg`,
    dotSel: `[data-marker="${key}"] .${prefix}__dot`,
    textSel: `[data-route-target="${key}"] ${tag || textTag}`,
  }));
}

const SLUZBY_PAGE = {
  label: '/sluzby',
  path: '/sluzby',
  anchoredChecks: chapterBarChecks('sluzby', [
    { key: 'rozcestnik', name: 'Rozcestník', tag: 'h2' },
    { key: 'hypoteky', name: 'Hypotéky' },
    { key: 'plan', name: 'Finanční plán' },
    { key: 'areas', name: 'Další oblasti' },
  ]),
  seamChain: [{ from: '.sluzby__route-svg', to: '.footer__route', label: '/sluzby → Footer' }],
};

const HYPOTEKY_PAGE = {
  label: '/sluzby/hypoteky',
  path: '/sluzby/hypoteky',
  anchoredChecks: chapterBarChecks('hyp', [
    { key: 'faze', name: 'Fáze' },
    { key: 'rozhodnuti', name: 'Rozhodnutí' },
    { key: 'oblasti', name: 'Oblasti' },
    { key: 'prubeh', name: 'Průběh' },
    { key: 'souvislosti', name: 'Souvislosti' },
    { key: 'otazky', name: 'Otázky' },
  ]),
  seamChain: [{ from: '.hyp__route-svg', to: '.footer__route', label: '/sluzby/hypoteky → Footer' }],
};

const FINANCNI_PLAN_PAGE = {
  label: '/sluzby/financni-plan',
  path: '/sluzby/financni-plan',
  anchoredChecks: chapterBarChecks('fp', [
    { key: 'souvislosti', name: 'Souvislosti' },
    { key: 'situace', name: 'Situace' },
    { key: 'priority', name: 'Priority' },
    { key: 'propojeni', name: 'Propojení' },
    { key: 'prubeh', name: 'Průběh' },
    { key: 'rozsah', name: 'Rozsah' },
    { key: 'otazky', name: 'Otázky' },
  ]),
  seamChain: [{ from: '.fp__route-svg', to: '.footer__route', label: '/sluzby/financni-plan → Footer' }],
};

const POJISTENI_PAGE = {
  label: '/sluzby/pojisteni',
  path: '/sluzby/pojisteni',
  anchoredChecks: chapterBarChecks('poj', [
    { key: 'dopad', name: 'Dopad' },
    { key: 'prijem', name: 'Příjem' },
    { key: 'majetek', name: 'Majetek' },
    { key: 'kontrola', name: 'Kontrola' },
    { key: 'prubeh', name: 'Průběh' },
    { key: 'pece', name: 'Péče' },
    { key: 'otazky', name: 'Otázky' },
  ]),
  seamChain: [{ from: '.poj__route-svg', to: '.footer__route', label: '/sluzby/pojisteni → Footer' }],
};

const INVESTICE_PAGE = {
  label: '/sluzby/investice',
  path: '/sluzby/investice',
  anchoredChecks: chapterBarChecks('inv', [
    { key: 'cil', name: 'Cíl' },
    { key: 'rozpocet', name: 'Rozpočet' },
    { key: 'riziko', name: 'Riziko' },
    { key: 'portfolio', name: 'Portfolio' },
    { key: 'prubeh', name: 'Průběh' },
    { key: 'souvislosti', name: 'Souvislosti' },
    { key: 'otazky', name: 'Otázky' },
  ]),
  seamChain: [{ from: '.inv__route-svg', to: '.footer__route', label: '/sluzby/investice → Footer' }],
};

const PENZE_PAGE = {
  label: '/sluzby/penze',
  path: '/sluzby/penze',
  anchoredChecks: chapterBarChecks('pen', [
    { key: 'castka', name: 'Částka' },
    { key: 'prijem', name: 'Příjem' },
    { key: 'zdroje', name: 'Zdroje' },
    { key: 'role', name: 'Role' },
    { key: 'kontrola', name: 'Kontrola' },
    { key: 'prubeh', name: 'Průběh' },
    { key: 'vyuziti', name: 'Využití' },
    { key: 'otazky', name: 'Otázky' },
  ]),
  seamChain: [{ from: '.pen__route-svg', to: '.footer__route', label: '/sluzby/penze → Footer' }],
};

const PRISTUP_PAGE = {
  label: '/pristup',
  path: '/pristup',
  anchoredChecks: chapterBarChecks('pri', [
    { key: 'zacatek', name: 'Začátek' },
    { key: 'vstup', name: 'Vstup' },
    { key: 'doporuceni', name: 'Doporučení' },
    { key: 'realizace', name: 'Realizace' },
    { key: 'pece', name: 'Péče' },
    { key: 'otazky', name: 'Otázky' },
  ]),
  seamChain: [{ from: '.pri__route-svg', to: '.footer__route', label: '/pristup → Footer' }],
};

const RECENZE_PAGE = {
  label: '/recenze',
  path: '/recenze',
  anchoredChecks: chapterBarChecks('rec', [
    { key: 'recenze', name: 'Recenze' },
    { key: 'pristup', name: 'Přístup' },
  ]),
  seamChain: [{ from: '.rec__route-svg', to: '.footer__route', label: '/recenze → Footer' }],
};

const CLANKY_PAGE = {
  label: '/clanky',
  path: '/clanky',
  anchoredChecks: chapterBarChecks('cla', [
    { key: 'clanky', name: 'Články' },
    { key: 'sluzby', name: 'Služby' },
  ]),
  seamChain: [{ from: '.cla__route-svg', to: '.footer__route', label: '/clanky → Footer' }],
};

// Osm kotev — poznámka: velký standalone statement mezi Klienti a
// Souvislosti (`.om-statement-big`) nemá pruh ani kotvu (zadání §6), proto
// tu záměrně chybí jako devátý záznam.
const OMNE_PAGE = {
  label: '/o-mne',
  path: '/o-mne',
  anchoredChecks: chapterBarChecks('om', [
    { key: 'zacatek', name: 'Začátek' },
    { key: 'mint', name: 'Mint' },
    { key: 'klienti', name: 'Klienti' },
    { key: 'souvislosti', name: 'Souvislosti' },
    { key: 'duvera', name: 'Důvěra' },
    { key: 'projekt', name: 'Projekt' },
    { key: 'role', name: 'Role' },
    { key: 'recenze', name: 'Recenze' },
  ]),
  seamChain: [{ from: '.om__route-svg', to: '.footer__route', label: '/o-mne → Footer' }],
};

const PAGES = [HOME_PAGE, SLUZBY_PAGE, HYPOTEKY_PAGE, FINANCNI_PLAN_PAGE, POJISTENI_PAGE, INVESTICE_PAGE, PENZE_PAGE, PRISTUP_PAGE, RECENZE_PAGE, CLANKY_PAGE, OMNE_PAGE];

// ---------------------------------------------------------------------------

const results = [];
function report(ok, label, detail) {
  results.push({ ok, label, detail });
  const mark = ok ? '  OK ' : 'FAIL ';
  console.log(`${mark} ${label}${detail ? ' — ' + detail : ''}`);
}

async function getActiveSvgPoint(page, routeSel, { dotSel, pathEntrySel, axisLocal }) {
  return page.evaluate(
    ({ routeSel, dotSel, pathEntrySel, axisLocal }) => {
      const svg = Array.from(document.querySelectorAll(routeSel)).find(
        (s) => s.tagName.toLowerCase() === 'svg' && getComputedStyle(s).display !== 'none'
      );
      if (!svg) return null;
      const r = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      if (r.width === 0 || vb.width === 0) return null;
      const scaleX = r.width / vb.width;
      let localX;
      if (axisLocal != null) {
        localX = axisLocal;
      } else if (dotSel) {
        const dot = svg.querySelector(dotSel);
        if (!dot) return null;
        localX = parseFloat(dot.getAttribute('cx'));
      } else if (pathEntrySel) {
        const path = svg.querySelector(pathEntrySel);
        if (!path) return null;
        localX = path.getPointAtLength(0).x;
      } else {
        return null;
      }
      return { real: r.left + localX * scaleX, vbWidth: vb.width };
    },
    { routeSel, dotSel: dotSel ?? null, pathEntrySel: pathEntrySel ?? null, axisLocal: axisLocal ?? null }
  );
}

async function getRouteExit(page, routeSel) {
  // Nejhlubší (max-Y) koncový bod mezi VŠEMI <path> v aktivní SVG — funguje
  // jak pro jednoduché sekce (jedna cesta), tak pro polici v ArticlesSection
  // (víc cest, exit je ta nejnižší).
  return page.evaluate((routeSel) => {
    const svg = Array.from(document.querySelectorAll(routeSel)).find(
      (s) => s.tagName.toLowerCase() === 'svg' && getComputedStyle(s).display !== 'none'
    );
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scaleX = r.width / vb.width;
    const paths = Array.from(svg.querySelectorAll('path'));
    let best = null;
    let bestY = -Infinity;
    for (const p of paths) {
      const len = p.getTotalLength();
      if (len === 0) continue;
      const end = p.getPointAtLength(len);
      if (end.y > bestY) {
        bestY = end.y;
        best = end;
      }
    }
    if (!best) return null;
    return r.left + best.x * scaleX;
  }, routeSel);
}

async function getRouteEntry(page, routeSel) {
  return page.evaluate((routeSel) => {
    const svg = Array.from(document.querySelectorAll(routeSel)).find(
      (s) => s.tagName.toLowerCase() === 'svg' && getComputedStyle(s).display !== 'none'
    );
    if (!svg) return null;
    const path = svg.querySelector('path');
    if (!path) return null;
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const scaleX = r.width / vb.width;
    const start = path.getPointAtLength(0);
    return r.left + start.x * scaleX;
  }, routeSel);
}

async function setWidth(page, width) {
  await page.setViewportSize({ width, height: 1800 });
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await page.waitForTimeout(150);
  // Druhý resize dispatch — na `/sluzby(-*)` stránkách používá `syncRoute()`
  // procentuální `axisScaled`/`--*-shift` přepočet, který po jediném
  // dispatchi hned po `setViewportSize` občas zůstane na hodnotě z
  // PŘEDCHOZÍ šířky (stejný přechodový stav zjištěný ručním laděním
  // 2. 9. 2026 u financni-plan.astro). Druhý dispatch po krátké pauze to
  // spolehlivě dorovná.
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await page.waitForTimeout(150);
}

async function auditPage(page, cfg) {
  await page.goto(`${ORIGIN}${cfg.path}`, { waitUntil: 'networkidle' });
  const prefix = cfg.label;

  // --- 1) Anchored: odstup text↔tečka/osa se nesmí měnit uvnitř stupně ---
  for (const check of cfg.anchoredChecks || []) {
    for (const { tier, widths } of TIER_WIDTH_PAIRS) {
      if (check.skipTiers && check.skipTiers.includes(tier)) continue;
      const offsets = [];
      let skip = false;
      for (const w of widths) {
        await setWidth(page, w);
        const point = await getActiveSvgPoint(page, check.routeSel, {
          dotSel: check.dotSel,
          pathEntrySel: check.pathEntrySel,
          axisLocal: check.axisLocalByViewBoxWidth
            ? await page.evaluate(
                (sel) => {
                  const svg = Array.from(document.querySelectorAll(sel)).find(
                    (s) => s.tagName.toLowerCase() === 'svg' && getComputedStyle(s).display !== 'none'
                  );
                  return svg ? svg.viewBox.baseVal.width : null;
                },
                check.routeSel
              ).then((vbw) => (vbw != null ? check.axisLocalByViewBoxWidth[vbw] : null))
            : null,
        });
        // Range přes obsah prvku, ne `boundingBox()` na prvku samotném —
        // element box začíná PŘED jeho vlastním `padding-left`u, takže by
        // se u `.hyp-chapter__bar p`/`.sluzby-chapter__bar p`/`.fp-chapter
        // __bar p` (padding-left nese celý odstup od tečky) měřilo o celý
        // ten padding vedle, ne skutečný začátek textu (stejná past jako
        // CLAUDE.md „Konvence: pruh + obsah vedle sebe" popisuje pro šířku
        // pruhu — tady ve stejné rodině chyby, jen pro OFFSET místo šířky).
        const textX = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const range = document.createRange();
          range.selectNodeContents(el);
          return range.getBoundingClientRect().left;
        }, check.textSel);
        if (!point || textX == null) {
          skip = true;
          break;
        }
        offsets.push(textX - point.real);
      }
      if (skip) {
        report(false, `${prefix}: ${check.name} [${tier}]`, 'prvek nenalezen na testované šířce — zkontroluj selektory');
        continue;
      }
      const drift = Math.max(...offsets) - Math.min(...offsets);
      report(
        drift <= DRIFT_TOLERANCE_PX,
        `${prefix}: ${check.name} [${tier}]`,
        `odstup ${offsets.map((o) => o.toFixed(1)).join(' → ')} px (rozdíl ${drift.toFixed(1)} px, šířky ${widths.join('/')} )`
      );
    }
  }

  // --- 2) Flat: nadpis bez sousední trasy musí sedět na stejné souřadnici ---
  for (const check of cfg.flatChecks || []) {
    for (const { tier, widths } of TIER_WIDTH_PAIRS) {
      if (check.minWidth && Math.min(...widths) < check.minWidth) continue;
      const lefts = [];
      for (const w of widths) {
        await setWidth(page, w);
        const el = await page.$(check.sel);
        if (!el) {
          lefts.length = 0;
          break;
        }
        const box = await el.boundingBox();
        lefts.push(box.x);
      }
      if (lefts.length === 0) continue;
      const drift = Math.max(...lefts) - Math.min(...lefts);
      report(
        drift <= DRIFT_TOLERANCE_PX,
        `${prefix}: ${check.name} [${tier}]`,
        `left ${lefts.map((l) => l.toFixed(1)).join(' → ')} px (rozdíl ${drift.toFixed(1)} px)`
      );
    }
  }

  // --- 3) Šev mezi sekcemi (exit == entry) na všech povinných šířkách ---
  for (const link of cfg.seamChain || []) {
    for (const w of SEAM_WIDTHS) {
      await setWidth(page, w);
      const exit = await getRouteExit(page, link.from);
      const entry = await getRouteEntry(page, link.to);
      if (exit == null || entry == null) {
        report(false, `${prefix}: ${link.label} @ ${w}px`, 'trasa nenalezena');
        continue;
      }
      const diff = Math.abs(exit - entry);
      report(diff <= SEAM_TOLERANCE_PX, `${prefix}: ${link.label} @ ${w}px`, `výstup ${exit.toFixed(2)} / vstup ${entry.toFixed(2)} (rozdíl ${diff.toFixed(2)} px)`);
    }
  }

  // --- 4) Překryv hlavních bloků ---
  for (const check of cfg.overlapChecks || []) {
    for (const { tier, widths } of TIER_WIDTH_PAIRS) {
      for (const w of widths) {
        await setWidth(page, w);
        const boxes = await page.$$eval(check.sel, (els) =>
          els.map((el) => {
            const r = el.getBoundingClientRect();
            return { x: r.left, y: r.top, r: r.right, b: r.bottom };
          })
        );
        let overlapPair = null;
        for (let i = 0; i < boxes.length && !overlapPair; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            if (!(a.r <= b.x || b.r <= a.x || a.b <= b.y || b.b <= a.y)) {
              overlapPair = [i, j];
              break;
            }
          }
        }
        report(!overlapPair, `${prefix}: ${check.name} — bez překryvu [${tier} @ ${w}px]`, overlapPair ? `bloky #${overlapPair[0]} a #${overlapPair[1]} se překrývají` : null);
      }
    }
  }

  // --- 5) Wide-desktop stage: sekce ležící na stejné ose musí zůstat na
  // stejné reálné souřadnici i NAD --stage-max (1920/2048/2560px), ne jen na
  // kalibrační 1440 — přesně regrese nalezená a opravená 25. 8. 2026 (viz
  // komentář u WIDE_STAGE_WIDTHS výše).
  for (const check of cfg.wideStageChecks || []) {
    const lefts = [];
    let skip = false;
    for (const w of WIDE_STAGE_WIDTHS) {
      await setWidth(page, w);
      const [elA, elB] = await Promise.all([page.$(check.selA), page.$(check.selB)]);
      if (!elA || !elB) {
        skip = true;
        break;
      }
      const [boxA, boxB] = await Promise.all([elA.boundingBox(), elB.boundingBox()]);
      lefts.push({ w, a: boxA.x, b: boxB.x, diff: boxB.x - boxA.x });
    }
    if (skip) {
      report(false, `${prefix}: ${check.name}`, 'prvek nenalezen — zkontroluj selektory');
      continue;
    }
    const diffs = lefts.map((l) => l.diff);
    const drift = Math.max(...diffs) - Math.min(...diffs);
    report(
      drift <= DRIFT_TOLERANCE_PX,
      `${prefix}: ${check.name}`,
      `odstup mezi prvky ${lefts.map((l) => `${l.diff.toFixed(1)}@${l.w}px`).join(' / ')} (rozdíl ${drift.toFixed(1)} px)`
    );
  }
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const cfg of PAGES) {
    console.log(`\n=== ${cfg.label} (${cfg.path}) ===`);
    await auditPage(page, cfg);
  }

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log('');
  console.log(`Audit hotov: ${results.length - failed.length}/${results.length} kontrol v pořádku.`);
  if (failed.length) {
    console.log(`${failed.length} problém(ů) nalezeno — viz FAIL řádky výše.`);
    process.exit(1);
  }
  process.exit(0);
}

run().catch((err) => {
  console.error('Audit selhal s chybou:', err);
  process.exit(1);
});
