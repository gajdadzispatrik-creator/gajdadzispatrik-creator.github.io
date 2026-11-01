// Doplní skrytá pole formuláře údaji o zdroji kliknutí (gclid, UTM).
// Údaje vrací window.pgAttribution() z CookieConsent.astro, a to jen při
// marketingovém souhlasu; bez souhlasu zůstanou pole prázdná.
// Návrh: docs/navrhy/zdroj-kampan-navrh.md (schváleno Patrikem 1. 11. 2026).
const FIELDS = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign'] as const;

export function fillAttribution(form: HTMLFormElement): void {
  const read = (window as unknown as { pgAttribution?: () => Record<string, string> }).pgAttribution;
  const values = read?.() ?? {};
  FIELDS.forEach((name) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | null;
    if (input) input.value = values[name] ?? '';
  });
}
