import { type LegalPageData, link } from './types';

/**
 * Obsah stránky /regulatorni-informace.
 *
 * NEJVYŠŠÍ RIZIKO CHYBY ZE VŠECH TŘÍ STRÁNEK — jde o regulovanou činnost
 * (zprostředkování spotřebitelského úvěru dle zákona č. 257/2016 Sb.,
 * distribuce pojištění dle zákona č. 170/2018 Sb., případně investiční
 * služby). Právní status potvrdil přímo Patrik (24. 8. 2026): je vázaný
 * zástupce společnosti BEplan finanční plánování s.r.o., registrovaný
 * u České národní banky, a obchodně působí v rámci týmu MINT reality
 * a finance s.r.o. (jiná společnost — ta drží komerční/týmovou vazbu,
 * BEplan finanční plánování s.r.o. drží regulatorní registraci). Doložil také
 * čtyři osvědčení VECTOR Certifikace s.r.o. o odborné zkoušce/vzdělávání pro
 * spotřebitelský úvěr, distribuci pojištění, investiční služby a
 * zprostředkování pojištění pojistníkem (sekce „Odborná způsobilost“) — tato
 * čísla osvědčení (250423021/250423213/250507025/FLO 3021) NEJSOU registrační
 * čísla v registru ČNB, jsou to jen doklady zkoušky od akreditované osoby.
 * Data vydání těchto osvědčení na stránce záměrně NEJSOU (rozhodnutí
 * 25. 8. 2026, stejný důvod jako u registrace ČNB níže) — na stránce se
 * nezveřejňuje žádné datum.
 *
 * Registrační číslo a datum registrace vědomě NEJSOU na stránce — ČNB u
 * vázaných zástupců v JERRS žádné samostatné „registrační číslo“ nevede (jen
 * datum zápisu a dobu trvání), a Patrik navíc výslovně nechce zveřejňovat
 * datum/dobu trvání registrace (rozhodnutí 24. 8. 2026). Tabulka „Oprávnění
 * k jednotlivým regulovaným činnostem“ proto uvádí jen postavení (vázaný
 * zástupce BEplan finanční plánování s.r.o.) s odkazem, že aktuální stav lze
 * ověřit přímo ve veřejném registru ČNB (sekce „Registr ČNB“) — to je jediný
 * místo, kde by měly žít proměnlivé údaje jako datum/platnost, ne tahle
 * stránka. Přesto MUSÍ celá stránka projít kontrolou právníka/osoby znalé
 * přesného stavu registrace před zveřejněním — viz souhrn úkolu
 * „právní podstránky“, §14 bod 4.
 *
 * Členství v další (dobrovolné) instituci pro mimosoudní řešení sporů mimo
 * Finančního arbitra Patrik vyloučil (24. 8. 2026) — sekce „Stížnosti“ proto
 * už neobsahuje `doplnit`. Stránka aktuálně nemá ŽÁDNÝ zbývající `[DOPLNIT]`.
 */
export const regulatoryPage: LegalPageData = {
  metaTitle: 'Regulatorní informace - Patrik Gajdadzis',
  metaDescription:
    'Informace o mé registraci a oprávnění ke zprostředkování finančních produktů, odměňování a mimosoudním řešení sporů.',
  heading: 'Regulatorní informace',
  sections: [
    {
      id: 'kdo-jsem',
      title: 'Kdo jsem',
      blocks: [
        {
          type: 'identity',
          label: 'Identifikace',
          lines: [
            ['Patrik Gajdadzis'],
            ['IČO 09214526'],
            ['Hlavní třída 568/73, 708 00 Ostrava'],
            ['Telefon: ', link('tel:+420775217721', '+420 775 217 721')],
          ],
        },
        {
          type: 'p',
          content: [
            'Konzultace poskytuji na adrese 17. listopadu 599/30, 708 00 Ostrava-⁠Poruba, nebo online. Jsem ředitelem a obchodně působím v rámci týmu společnosti MINT reality a finance s.r.o. Regulovanou finanční činnost (viz níže) vykonávám jako vázaný zástupce společnosti BEplan finanční plánování s.r.o., registrovaný u České národní banky.',
          ],
        },
      ],
    },
    {
      id: 'opravneni-k-cinnosti',
      title: 'Oprávnění k činnosti',
      blocks: [
        {
          type: 'p',
          content: [
            'Zprostředkování finančních produktů je regulovaná činnost. Ve všech níže uvedených oblastech jsem vázaným zástupcem společnosti BEplan finanční plánování s.r.o., registrovaným u České národní banky. Aktuální stav registrace si můžete kdykoli ověřit ve veřejném registru ČNB, viz níže.',
          ],
        },
        {
          type: 'table',
          caption: 'Oprávnění k jednotlivým regulovaným činnostem',
          columns: ['Činnost', 'Postavení'],
          rows: [
            [
              ['Zprostředkování spotřebitelského úvěru (hypotéky)'],
              ['Vázaný zástupce společnosti BEplan finanční plánování s.r.o. (zákon č. 257/2016 Sb.).'],
            ],
            [
              ['Distribuce pojištění'],
              ['Vázaný zástupce společnosti BEplan finanční plánování s.r.o. (zákon č. 170/2018 Sb.).'],
            ],
            [
              ['Investice'],
              [
                'Vázaný zástupce společnosti BEplan finanční plánování s.r.o. (zákon č. 256/2004 Sb., o podnikání na kapitálovém trhu).',
              ],
            ],
          ],
        },
      ],
    },
    {
      id: 'odborna-zpusobilost',
      title: 'Odborná způsobilost',
      blocks: [
        {
          type: 'p',
          content: [
            'Odbornou způsobilost pro jednotlivé regulované činnosti jsem doložil zkouškami u společnosti VECTOR Certifikace s.r.o., akreditované osoby zapsané v příslušném registru vedeném Českou národní bankou:',
          ],
        },
        {
          type: 'table',
          caption: 'Osvědčení o odborné zkoušce a vzdělávání',
          columns: ['Oblast', 'Osvědčení'],
          rows: [
            [
              ['Spotřebitelský úvěr'],
              [
                'Zkouška dle zákona č. 257/2016 Sb., skupina odbornosti IV. (úvěr na bydlení i jiný spotřebitelský úvěr). Osvědčení č. 250423021, VECTOR Certifikace s.r.o.',
              ],
            ],
            [
              ['Distribuce pojištění'],
              [
                'Zkouška dle zákona č. 170/2018 Sb., skupina odbornosti IX. (životní pojištění a pojištění velkých pojistných rizik). Osvědčení č. 250423213, VECTOR Certifikace s.r.o.',
              ],
            ],
            [
              ['Investiční služby'],
              [
                'Zkouška dle zákona č. 256/2004 Sb., skupina odbornosti II. (investiční nástroje dle § 3 odst. 1). Osvědčení č. 250507025, VECTOR Certifikace s.r.o.',
              ],
            ],
            [
              ['Zprostředkování pojištění pojistníkem'],
              [
                'Doplňkové vzdělávání dle zákona č. 170/2018 Sb. Osvědčení č. FLO 3021, VECTOR Certifikace s.r.o.',
              ],
            ],
          ],
        },
        {
          type: 'p',
          content: [
            'Tato osvědčení dokládají odbornou způsobilost pro danou oblast; nejsou to registrační čísla v registru ČNB, ta jsou uvedená výše.',
          ],
        },
      ],
    },
    {
      id: 'registr-cnb',
      title: 'Registr ČNB',
      blocks: [
        {
          type: 'p',
          content: [
            'Registrované osoby v oblasti distribuce finančních produktů eviduje Česká národní banka ve svém veřejném registru ',
            link('https://www.cnb.cz/cnb/jerrs', 'JERRS - Seznamy regulovaných a registrovaných subjektů finančního trhu', true),
            '.',
          ],
        },
      ],
    },
    {
      id: 'jak-jsem-odmenovan',
      title: 'Jak jsem odměňován',
      blocks: [
        {
          type: 'p',
          content: [
            'Konzultace jsou nezávazné. Za zprostředkování finančních produktů jsem odměňován provizí.',
          ],
        },
        {
          type: 'p',
          content: [
            'Za samotnou konzultaci neplatíte nic. Provize je součástí nákladů, které finanční instituci platí až za sjednaný produkt. Nejde o částku navíc nad rámec toho, co byste za produkt platili tak jako tak.',
          ],
        },
      ],
    },
    {
      id: 'stiznosti',
      title: 'Stížnosti a mimosoudní řešení sporů',
      blocks: [
        {
          type: 'p',
          content: ['Pokud budete s mými službami nespokojeni, obraťte se prosím nejdřív přímo na mě.'],
        },
        {
          type: 'p',
          content: [
            'Spory týkající se finančních služeb lze mimosoudně řešit u Finančního arbitra, Legerova 1581/69, 110 00 Praha 1.',
          ],
        },
      ],
    },
    {
      id: 'upozorneni-na-rizika',
      title: 'Upozornění na rizika',
      blocks: [
        {
          type: 'p',
          content: [
            'U investičních produktů platí, že minulé výnosy nejsou zárukou budoucích výnosů a hodnota investice může v čase klesat i stoupat; může se stát, že zpět nezískáte celou vloženou částku.',
          ],
        },
      ],
    },
  ],
};
