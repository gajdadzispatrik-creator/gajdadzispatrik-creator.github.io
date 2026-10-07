// Automatická pojistka pro CLAUDE.md „Konvence: nezlomitelná mezera za
// krátkými předložkami/spojkami" — hledá ve VYKRESLENÉM textu místa, kde je
// zlomitelná mezera (nebo spojovník) tam, kde se řádek zlomit nesmí:
// osamocená předložka na konci řádku, číslo odtržené od jednotky, rozdělený
// telefon/PSČ/datum, právní odkaz („č. 257/2016 Sb.", „§ 3"), pomlčka nebo
// oddělovač „·" na začátku řádku, „Ostrava-Poruba" zlomená u spojovníku.
//
// Kontroluje text, ne šířky obrazovky — nezlomitelná mezera platí na všech
// zařízeních, takže stačí jeden průchod. Text s `white-space: nowrap` se
// přeskakuje (nezalomí se vůbec).
//
// Stránky se nehledají podle seznamu, ale PROCHÁZENÍM ODKAZŮ od homepage —
// každá nová podstránka nebo článek, na který web odkazuje, se zkontroluje
// automaticky. Navíc stránky, na které se neodkazuje (`EXTRA_PATHS`).
//
// Vzniklo 24. 9. 2026 po celowebové ruční opravě (asi 40 míst).
//
// Spuštění: dev server musí běžet (npm run dev), pak `npm run check:typo`.
// Exit kód 0 = vše v pořádku, 1 = nalezen problém (detaily ve výpisu).

import { chromium, webkit, firefox } from '@playwright/test';
// BROWSER=webkit|firefox npm run check:… — stejná pravidla v jádru Safari / Firefoxu.
const engine = { chromium, webkit, firefox }[process.env.BROWSER || 'chromium'];

const ORIGIN = (process.env.AUDIT_URL || 'http://localhost:4321').replace(/\/$/, '');

// Stránky bez odkazu z webu (noindex `/clanky`, stránka 404). Rozepsaný
// článek (koncept, zatím bez odkazu) přidej přes EXTRA=/clanky/<soubor>.
const EXTRA_PATHS = ['/clanky', '/neexistujici-stranka-404', ...(process.env.EXTRA ? process.env.EXTRA.split(',') : [])];

// Pravidla běží v prohlížeči — proto jako zdrojové texty regexů.
// W = zlomitelná mezera (včetně zalomení řádku ve zdrojové šabloně).
const W = '[ \\t\\n\\r]+';
const PREPOSITIONS = 'a|i|k|o|s|u|v|z|do|ke|na|od|po|pro|se|ve|za|ze';
const RULES = [
  {
    name: 'osamocená předložka/spojka',
    source: `(?<![\\p{L}\\d])(${PREPOSITIONS})${W}(?=\\S)`,
    flags: 'giu',
  },
  {
    // Číslo + slovo, ke kterému patří („30 minut", „17. listopadu").
    // Výjimky, kde zlom nevadí: číslo s čárkou za sebou („3021, VECTOR"),
    // letopočet („v roce 2020 jsem"), následuje předložka („4 k měření")
    // nebo další článek právního odkazu („čl. 6 odst. 1").
    name: 'číslo odtržené od slova',
    // Rok (i s tečkou na konci věty, „v roce 2026. Další…") se nehlásí.
    source: `(?<![\\p{L}\\d/])(?!(?:19|20)\\d\\d\\.?${W})\\d[\\d+%]*(?:[,.]\\d+)*\\.?${W}(?!(?:${PREPOSITIONS}|odst\\.|písm\\.)[\\s\\u00a0])(?=[\\p{L}%€])`,
    flags: 'gu',
  },
  {
    name: 'rozdělené číslo (telefon, PSČ, datum)',
    source: `\\d\\.?${W}(?=[\\d+])`,
    flags: 'gu',
  },
  {
    name: 'zkratka odtržená od čísla (§, č., čl., odst., písm.)',
    source: `(?<![\\p{L}])(§|čl\\.|odst\\.|písm\\.|č\\.|str\\.)${W}(?=[\\d\\p{L}])`,
    flags: 'gu',
  },
  { name: 'číslo zákona odtržené od „Sb."', source: `\\d${W}(?=Sb\\.)`, flags: 'gu' },
  { name: 'pomlčka na začátku řádku', source: `\\S${W}(?=[–—]${W})`, flags: 'gu' },
  { name: 'oddělovač „·" na začátku řádku', source: `\\S${W}(?=·${W})`, flags: 'gu' },
  {
    // Za spojovník patří word joiner U+2060 (Manrope nemá U+2011).
    name: 'místní název zlomitelný u spojovníku',
    source: `\\p{Lu}\\p{Ll}+-(?!\\u2060)\\p{Lu}\\p{Ll}+`,
    flags: 'gu',
  },
];

function scanPage(rules) {
  const compiled = rules.map((r) => ({ name: r.name, re: new RegExp(r.source, r.flags) }));
  const blockOf = (el) => {
    while (el && el !== document.body) {
      const d = getComputedStyle(el).display;
      if (!d.startsWith('inline') && d !== 'contents') return el;
      el = el.parentElement;
    }
    return document.body;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || p.closest('script,style,noscript,svg,.sr-only,astro-dev-toolbar')) return NodeFilter.FILTER_REJECT;
      if (getComputedStyle(p).whiteSpace.startsWith('nowrap')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  // Text se skládá po blocích (odstavec, položka seznamu…), aby pravidla
  // viděla i mezeru na hranici <a>/<strong> uvnitř věty.
  const groups = [];
  let cur = null;
  for (let n; (n = walker.nextNode()); ) {
    const b = blockOf(n.parentElement);
    if (!cur || cur.block !== b) groups.push((cur = { block: b, text: '' }));
    cur.text += n.data;
  }
  const out = [];
  for (const { text } of groups) {
    for (const { name, re } of compiled) {
      re.lastIndex = 0;
      for (let m; (m = re.exec(text)); ) {
        const s = Math.max(0, m.index - 30);
        const e = Math.min(text.length, m.index + m[0].length + 30);
        out.push({ rule: name, snippet: text.slice(s, e).replace(/[ \t\n\r]+/g, ' ').replace(/ /g, '·').trim() });
      }
    }
  }
  return out;
}

function collectLinks(origin) {
  return [...document.querySelectorAll('a[href]')]
    .map((a) => new URL(a.getAttribute('href'), location.href))
    .filter((u) => u.origin === origin && !u.pathname.startsWith('/api/'))
    .map((u) => u.pathname.replace(/\/$/, '') || '/');
}

const browser = await engine.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const queue = ['/', ...EXTRA_PATHS];
const seen = new Set(queue);
const findings = new Map(); // pravidlo|úryvek → { rule, snippet, pages }

try {
  while (queue.length) {
    const path = queue.shift();
    await page.goto(ORIGIN + path, { waitUntil: 'networkidle' });
    for (const link of await page.evaluate(collectLinks, ORIGIN)) {
      if (!seen.has(link)) {
        seen.add(link);
        queue.push(link);
      }
    }
    for (const f of await page.evaluate(scanPage, RULES)) {
      const key = `${f.rule}|${f.snippet}`;
      if (!findings.has(key)) findings.set(key, { ...f, pages: [] });
      findings.get(key).pages.push(path);
    }
  }
} catch (err) {
  console.error(`Nepodařilo se načíst ${ORIGIN} — běží dev server (npm run dev)?\n${err.message}`);
  await browser.close();
  process.exit(1);
}
await browser.close();

console.log(`Zkontrolováno ${seen.size} stránek: ${[...seen].join(', ')}\n`);
if (findings.size === 0) {
  console.log('Typografie v pořádku: žádné nevhodné místo pro zalomení řádku.');
  process.exit(0);
}
console.log('· = nezlomitelná mezera (už správně). Oprava: &nbsp; v šabloně, U+00A0 v JS řetězci — viz CLAUDE.md.\n');
for (const f of findings.values()) {
  const where = f.pages.length > 3 ? `${f.pages.length} stránek` : f.pages.join(', ');
  console.log(`FAIL  ${f.rule} [${where}]\n      …${f.snippet}…`);
}
console.log(`\n${findings.size} nález(ů).`);
process.exit(1);
