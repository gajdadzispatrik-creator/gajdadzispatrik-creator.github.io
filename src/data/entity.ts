/**
 * Jediný zdroj pravdy pro strukturovaná data (JSON-LD) sdílená napříč webem.
 * Zdroj: úkol „Předspouštěcí P0 technické dotažení“, §10–§11.
 *
 * Person má jedno stabilní `@id` (`#person`) a používá se na KAŽDÉ stránce
 * (viz BaseLayout.astro) — nikdy se nevytváří druhá Person entita s jiným
 * `@id`. Pole obsahují jen fakta ověřená proti `src/data/legal/regulatory.ts`
 * a `src/components/SiteFooter.astro` (kontakt, sociální profily) — žádná
 * domněnka, žádný vymyšlený počet let praxe, žádná akreditace/certifikace,
 * žádný vztah k BEplan finanční plánování s.r.o. (regulovaný vázaný
 * zástupce — nejednoznačná právní kategorie pro schema.org `worksFor`,
 * záměrně vynechána, viz report úkolu).
 */
export const SITE_URL = 'https://patrikgajdadzis.cz';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personEntity = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Patrik Gajdadzis',
  url: `${SITE_URL}/`,
  telephone: '+420775217721',
  email: 'patrik@mintfinance.cz',
  jobTitle: 'Finanční poradce',
  worksFor: {
    '@type': 'Organization',
    name: 'MINT reality a finance s.r.o.',
    url: 'https://www.mintreality.cz/',
  },
  areaServed: { '@type': 'City', name: 'Ostrava' },
  knowsAbout: ['Hypotéky', 'Finanční plánování', 'Pojištění', 'Investice', 'Penzijní plánování'],
  sameAs: [
    'https://www.facebook.com/patrik.gajdadzis/',
    'https://www.instagram.com/patrikgajdadzis/',
    'https://share.google/cjOKhgPI7p1vA2HI9',
  ],
};

export const websiteEntity = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'Patrik Gajdadzis',
  publisher: { '@id': PERSON_ID },
};

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
