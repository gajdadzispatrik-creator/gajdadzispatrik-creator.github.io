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
export const BUSINESS_ID = `${SITE_URL}/#business`;

// Kancelář, kde probíhají konzultace — potvrzeno uživatelem 24. 9. 2026 jako
// jediná adresa pro web a Google Business Profile (ne registrované sídlo
// z regulatory.ts, to slouží jinému účelu). Musí sedět s viditelnou adresou
// v SiteFooter.astro a ContactSection.astro.
const OFFICE_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '17. listopadu 599/30',
  addressLocality: 'Ostrava-Poruba',
  postalCode: '708 00',
  addressCountry: 'CZ',
};

// Google Business Profile odkaz — patří firmě (profilu na Mapách), ne osobě.
const GOOGLE_PROFILE_URL = 'https://share.google/cjOKhgPI7p1vA2HI9';

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
  workLocation: { '@id': BUSINESS_ID },
  knowsAbout: ['Hypotéky', 'Finanční plánování', 'Pojištění', 'Investice', 'Penzijní plánování'],
  sameAs: [
    'https://www.facebook.com/patrik.gajdadzis/',
    'https://www.instagram.com/patrikgajdadzis/',
  ],
};

/**
 * Místní firma = Google Business Profile. Název 1:1 podle profilu
 * (screenshot od uživatele 24. 9. 2026), aby Google spároval web s profilem
 * (název + adresa + telefon). Záměrně BEZ `aggregateRating`: Google hvězdičky
 * z vlastního hodnocení firmy na jejím webu nezobrazuje a značkuje to jako
 * „self-serving reviews". Otevírací dobu doplnit, až bude známá celá
 * (`openingHoursSpecification`).
 */
export const businessEntity = {
  '@type': 'FinancialService',
  '@id': BUSINESS_ID,
  name: 'Patrik Gajdadzis | Hypotéky a finance',
  url: `${SITE_URL}/`,
  telephone: '+420775217721',
  email: 'patrik@mintfinance.cz',
  address: OFFICE_ADDRESS,
  areaServed: { '@type': 'City', name: 'Ostrava' },
  founder: { '@id': PERSON_ID },
  sameAs: [GOOGLE_PROFILE_URL],
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
