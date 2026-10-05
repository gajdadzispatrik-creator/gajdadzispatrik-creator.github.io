/**
 * Typografie článků (CLAUDE.md „Konvence: nezlomitelná mezera") — automaticky,
 * aby autor článku nemusel psát &nbsp; ručně:
 * - za krátkými předložkami a spojkami (a, i, k, o, s, u, v, z, do, ke, na,
 *   od, po, pro, se, ve, za, ze),
 * - mezi číslem a tím, k čemu patří (30 minut, 12 měsíců, 5 000 Kč),
 * - před pomlčkou a oddělovačem „·" (nesmí začínat řádek),
 * - spojovník v místním názvu (Ostrava-Poruba) dostane word joiner.
 * Prochází jen textové uzly (ne kód, ne atributy).
 */
const NBSP = '\u00A0';
const SHORT = 'a|i|k|o|s|u|v|z|do|ke|na|od|po|pro|se|ve|za|ze';
// `(?=\S|$)` — i na konci textového uzlu před odkazem/tučným textem
// („a <strong>penzi</strong>").
const SHORT_RE = new RegExp(`(?<=^|[\\s\\u00A0(„"\\[/])(${SHORT})\\s+(?=\\S|$)`, 'gi');
const NUMBER_RE = /(?<=\d)\s+(?=(?:\d{3}(?!\d))|[^\s\d])/g;
const DASH_RE = /\s+(?=[—–·]\s)/g;
const PLACE_RE = /(Ostrav[a-zě]*)-(?=\p{Lu})/gu;

export function czechNbsp(text) {
  return text
    .replace(SHORT_RE, (_m, word) => word + NBSP)
    .replace(NUMBER_RE, NBSP)
    .replace(DASH_RE, NBSP)
    .replace(PLACE_RE, '$1-\u2060');
}

// Čísla jen před slovem/jednotkou nebo trojicí číslic (5 000) — ne mezi
// dvěma samostatnými čísly v textu.
const SKIP = new Set(['code', 'pre', 'script', 'style']);

const textOf = (node) =>
  node.type === 'text' ? node.value : Array.isArray(node.children) ? node.children.map(textOf).join('') : '';

/** Kotva nadpisu bez diakritiky („Kolik stojí pojištění?" → kolik-stoji-pojisteni). */
export function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function rehypeCzechNbsp() {
  const walk = (node) => {
    if (node.type === 'element' && SKIP.has(node.tagName)) return;
    // Kotvy nadpisů dřív, než se do textu vloží nezlomitelné mezery
    // (jinak by v adrese kotvy skončilo %C2%A0).
    if (node.type === 'element' && /^h[2-6]$/.test(node.tagName)) {
      node.properties = node.properties ?? {};
      if (!node.properties.id) node.properties.id = slugify(textOf(node));
    }
    if (node.type === 'text' && typeof node.value === 'string') {
      node.value = czechNbsp(node.value);
      return;
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}
