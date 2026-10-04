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

// Google Business Profile — JEDINÉ místo s odkazy na profil (dohledáno
// v Mapách 24. 9. 2026). Dřívější share.google odkazy vedly na vyhledávání
// Google, kde se recenze neotevřou hned a Google často chce ověření „nejsem
// robot“.
// - GOOGLE_REVIEWS_URL: otevře profil rovnou na záložce Recenze — pro
//   všechny viditelné odkazy na webu (recenze, patička).
// - GOOGLE_MAPS_CID_URL: stálý identifikátor místa (CID) — pro `sameAs`
//   ve strukturovaných datech, nezávislý na názvu firmy.
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Patrik+Gajdadzis+%7C+Hypot%C3%A9ky+a+finance/data=!4m8!3m7!1s0x4713e37436aeb17b:0x4be682e02f942c0!8m2!3d49.8290121!4d18.1635271!9m1!1b1!16s%2Fg%2F11sghfvss6';
const GOOGLE_MAPS_CID_URL = 'https://maps.google.com/?cid=341825168554410688';

// Online rezervace úvodní konzultace (Google Kalendář, plán schůzek — hlídá
// obsazené časy) a WhatsApp s předvyplněnou první zprávou. Kontakt + závěrečné
// pásy podstránek.
/**
 * Strukturovaná data FAQPage z TÝCHŽ otázek, které stránka vykresluje
 * (jeden zdroj — text v JSON-LD se nemůže rozejít s viditelným). Typografické
 * znaky (nezlomitelná mezera, word joiner) se převádí na prostý text.
 */
export function faqPage(items: { q: string; a: string }[]) {
  const plain = (text: string) => text.replace(/ /g, ' ').replace(/⁠/g, '');
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: plain(item.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(item.a) },
    })),
  };
}

export const BOOKING_URL = 'https://calendar.app.google/995121nUYKycJ5aNA';
export const WHATSAPP_URL = `https://wa.me/420775217721?text=${encodeURIComponent('Dobrý den, mám zájem o nezávaznou konzultaci.')}`;

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
  sameAs: [GOOGLE_MAPS_CID_URL],
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
