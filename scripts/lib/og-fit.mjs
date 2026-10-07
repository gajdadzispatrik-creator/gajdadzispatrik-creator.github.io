// Pravidlo pro obrázky ke sdílení s fotkou (6. 10. 2026): text nesmí být
// blíž než MIN_GAP px ke skutečnému obrysu postavy (ne k obdélníku fotky —
// ruka a rameno sahají různě daleko). Ve výšce každého textového řádku se
// z průhlednosti fotky změří nejlevější bod postavy; je-li text blíž,
// zmenšuje se písmo nadpisu po 2 px, dokud mezera nesedí.
export const MIN_GAP = 96;
export const MIN_FOOTER_GAP = 32; // nadpis → patička (svisle)

export async function fitTextToPhoto(page, { title = '[data-og-title]', photo = '[data-og-photo] img', texts = '[data-og] p, [data-og] h1, [data-og] footer span', minSize = 36, footer = '[data-og] footer' } = {}) {
  return page.evaluate(async ({ title, photo, texts, minGap, minSize, footer, minFooterGap }) => {
    const img = document.querySelector(photo);
    if (!img) return { ok: true, note: 'bez fotky' };
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    const ir = img.getBoundingClientRect();
    const sx = c.width / ir.width, sy = c.height / ir.height;
    // nejlevější neprůhledný bod postavy v pásu y0–y1 (souřadnice stránky)
    const leftEdge = (y0, y1) => {
      let best = Infinity;
      for (let y = Math.max(0, Math.floor((y0 - ir.top) * sy)); y < Math.min(c.height, Math.ceil((y1 - ir.top) * sy)); y += 2) {
        for (let x = 0; x < c.width; x++) if (data[(y * c.width + x) * 4 + 3] > 40) { best = Math.min(best, ir.left + x / sx); break; }
      }
      return best;
    };
    const worstGap = () => {
      let worst = Infinity, what = '';
      for (const el of document.querySelectorAll(texts)) {
        const rg = document.createRange(); rg.selectNodeContents(el);
        for (const q of rg.getClientRects()) {
          if (q.width < 2) continue;
          const gap = leftEdge(q.top, q.bottom) - q.right;
          if (gap < worst) { worst = gap; what = el.textContent.trim().slice(0, 40); }
        }
      }
      return { worst, what };
    };
    const t = document.querySelector(title);
    const f = document.querySelector(footer);
    const footGap = () => (t && f ? f.getBoundingClientRect().top - t.getBoundingClientRect().bottom : Infinity);
    let g = worstGap(), size = t ? parseFloat(getComputedStyle(t).fontSize) : 0;
    while (t && (g.worst < minGap || footGap() < minFooterGap) && size > minSize) {
      size -= 2; t.style.fontSize = size + 'px';
      await new Promise((r) => requestAnimationFrame(r));
      g = worstGap();
    }
    const fg = footGap();
    return { ok: g.worst >= minGap && fg >= minFooterGap, gap: Math.round(g.worst), footerGap: Math.round(fg), size, what: g.worst < minGap ? g.what : 'nadpis nad patičkou' };
  }, { title, photo, texts, minGap: MIN_GAP, minSize, footer, minFooterGap: MIN_FOOTER_GAP });
}
