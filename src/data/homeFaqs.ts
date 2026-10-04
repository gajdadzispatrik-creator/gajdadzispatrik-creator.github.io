// Časté otázky na homepage — vykresluje FaqSection.astro, strukturovaná data
// (FAQPage) z nich staví index.astro. Jeden zdroj pro obojí.
export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: Faq[] = [
  {
    q: 'Kolik stojí spolupráce se mnou?',
    a: 'Konzultace jsou nezávazné a zdarma. Za mou práci mi nic přímo neplatíte.',
  },
  { q: 'Jak dlouho konzultace trvá?', a: 'Úvodní konzultace trvá přibližně 30 minut.' },
  {
    q: 'Musím měnit své současné smlouvy?',
    a: 'Ne. Nejdřív zjistíme, co je nastavené dobře a co má smysl upravit.',
  },
  { q: 'Můžeme vše vyřešit online?', a: 'Ano. Konzultace může proběhnout osobně v Ostravě nebo online.' },
  { q: 'Pomáháte také podnikatelům?', a: 'Ano. Osobní a podnikatelské finance je často potřeba řešit společně.' },
  { q: 'Co si mám připravit?', a: 'Na první konzultaci stačí základní informace o vaší situaci a cílech.' },
];
