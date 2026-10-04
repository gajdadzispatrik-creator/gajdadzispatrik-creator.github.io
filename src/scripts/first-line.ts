/**
 * Svislý střed PRVNÍHO řádku textu v prvku (souřadnice okna, px).
 *
 * Tečka na trase s textem vedle sebe leží vždy v ose prvního řádku názvu
 * nebo popisku — ne na středu celého bloku, ne na horní hraně + odhad.
 * Jedno pravidlo pro všechny sekce i podstránky (CLAUDE.md „Konvence:
 * velikost teček a délka zářezů", zavedeno 4. 10. 2026). Měří se skutečné
 * řádky textu (Range na textových uzlech), takže to sedí i při zalomení
 * názvu na víc řádků nebo jiném písmu/velikosti.
 */
export function firstLineCenterY(el: Element): number {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let first: DOMRect | null = null;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent?.trim()) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const r of Array.from(range.getClientRects())) {
      if (r.width > 0 && r.height > 0 && (!first || r.top < first.top - 1)) first = r;
    }
  }
  if (!first) {
    const r = el.getBoundingClientRect();
    return r.top + r.height / 2;
  }
  return first.top + first.height / 2;
}
