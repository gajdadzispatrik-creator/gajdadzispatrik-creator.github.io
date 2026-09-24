/**
 * Datový model obsahu právních stránek (LegalLayout.astro).
 *
 * `id`/`title` sekce jsou JEDINÝ zdroj pravdy pro nadpis (`<h2 id>`) i pro
 * odkaz v obsahu stránky (`<nav aria-label="Obsah stránky">`) — LegalLayout.astro
 * z nich generuje oboje, takže se nemůžou rozejít.
 *
 * `doplnit(text)` označuje neznámý fakt (viz úkol „právní podstránky“, §2) —
 * LegalLayout.astro ho vykreslí jako `<mark class="legal-mark">[DOPLNIT: …]</mark>`.
 * Nikdy nepsat neznámý fakt jako obyčejný string.
 */

export type InlineSegment =
  | string
  | { doplnit: string }
  | { href: string; label: string; external?: boolean };

export type Block =
  | { type: 'p'; content: InlineSegment[] }
  | { type: 'h3'; id: string; text: string }
  | { type: 'list'; items: InlineSegment[][] }
  | { type: 'identity'; label: string; lines: InlineSegment[][] }
  | {
      type: 'table';
      caption: string;
      columns: [string, string];
      rows: [InlineSegment[], InlineSegment[]][];
    }
  | { type: 'cookie-settings-button'; label: string }
  /*
   * Text existuje a je hotový, jen čeká na schválení právníkem — na rozdíl
   * od `doplnit()` (neznámý fakt) tohle není chybějící údaj. Vlastní
   * vizuální značka (tenká --emerald svislice + popisek), typografie
   * odstavce stejná jako `p`. Zavedeno pro odstavec o předání dat mimo EU
   * (Google Analytics) — viz úkol „doplnění právních stránek“, §3.
   */
  | { type: 'lawyer-review'; content: InlineSegment[] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface LegalPageData {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  sections: LegalSection[];
}

export const doplnit = (text: string): { doplnit: string } => ({ doplnit: text });

export const link = (href: string, label: string, external = false): InlineSegment => ({
  href,
  label,
  external,
});
