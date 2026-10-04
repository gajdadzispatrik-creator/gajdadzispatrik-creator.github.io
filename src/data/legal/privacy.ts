import { type LegalPageData, link } from './types';

/**
 * Obsah stránky /zpracovani-osobnich-udaju.
 *
 * NÁVRH — vychází z GDPR (čl. 13, 14) a zákona č. 110/2019 Sb. o zpracování
 * osobních údajů. Odstavec o předání dat mimo EU (`lawyer-review` blok) byl
 * na žádost uživatele (25. 8. 2026) ze sekce „Komu údaje předávám“
 * odstraněn. Sekce „Jak dlouho je uchovávám“ a věta o právu na stížnost u
 * ÚOOÚ byly mezitím smazané a pak na žádost uživatele vráceny zpět (čl. 13
 * odst. 2 písm. a) a d) GDPR je běžně vyžadují). Konkrétní lhůty uchování
 * (6 měsíců / 10 let / 14 měsíců) potvrdil Patrik 24. 9. 2026 podle mého
 * doporučení. 10 let u dokumentace ke zprostředkovanému produktu odpovídá
 * lhůtě zákona č. 253/2008 Sb. (AML, § 16) — přesnou lhůtu ověřit u
 * compliance BEplanu; 14 měsíců u Google Analytics je nutné nastavit
 * v GA4 (Správce → Uchovávání dat), až se bude měření zapínat. Před nasazením musí projít právní kontrolou celá stránka (viz
 * úkol „právní podstránky“, §2).
 */
export const privacyPage: LegalPageData = {
  metaTitle: 'Zpracování osobních údajů - Patrik Gajdadzis',
  metaDescription:
    'Jaké osobní údaje zpracovávám, proč, jak dlouho a jaká máte práva podle GDPR.',
  heading: 'Zpracování osobních údajů',
  sections: [
    {
      id: 'kdo-zpracovava',
      title: 'Kdo údaje zpracovává',
      blocks: [
        {
          type: 'p',
          content: [
            'Správcem osobních údajů, které mi svěříte přes tento web, je Patrik Gajdadzis jako podnikající fyzická osoba. Kontaktní údaje správce jsou:',
          ],
        },
        {
          type: 'identity',
          label: 'Správce osobních údajů',
          lines: [
            ['Patrik Gajdadzis'],
            ['IČO 09214526'],
            ['Telefon: ', link('tel:+420775217721', '+420 775 217 721')],
            ['E-mail: ', link('mailto:patrik@mintfinance.cz', 'patrik@mintfinance.cz')],
          ],
        },
        {
          type: 'p',
          content: [
            'Tato stránka popisuje, jaké údaje zpracovávám, když přes web vyplníte kontaktní formulář nebo mi zavoláte, a jaká v souvislosti s tím máte práva.',
          ],
        },
      ],
    },
    {
      id: 'jake-udaje',
      title: 'Jaké údaje a proč',
      blocks: [
        {
          type: 'p',
          content: [
            'Kontaktní formulář sbírá jen údaje potřebné k tomu, abych se vám mohl ozvat a připravit se na konzultaci.',
          ],
        },
        {
          type: 'p',
          content: [
            'Formulář nesbírá žádné citlivé osobní údaje (např. o zdravotním stavu) ani konkrétní finanční údaje (čísla účtů, výše příjmů, stav úvěrů). Ty si řekneme až osobně na konzultaci, pokud to bude potřeba.',
          ],
        },
        {
          type: 'p',
          content: [
            'Na ochranu formuláře před zneužitím (hromadné odesílání) uchovávám nejvýše jednu hodinu otisk IP adresy, ze které byl formulář odeslán, ne adresu samotnou. Důvodem je oprávněný zájem na zabezpečení webu (čl. 6 odst. 1 písm. f) GDPR); po hodině se otisk automaticky maže.',
          ],
        },
        {
          type: 'table',
          caption: 'Údaje sbírané kontaktním formulářem a účel jejich zpracování',
          columns: ['Údaj', 'Účel'],
          rows: [
            [['Jméno a příjmení'], ['Vím, s kým mluvím, a mohu vás oslovit.']],
            [['Telefon'], ['Nejrychlejší způsob, jak se vám ozvat a domluvit termín.']],
            [['E-mail'], ['Písemné potvrzení termínu a navazující komunikace.']],
            [['Oblast zájmu'], ['Připravím se na konzultaci podle tématu, které vás zajímá.']],
            [
              ['Preferovaný způsob kontaktu'],
              ['Ozvu se způsobem, který vám vyhovuje: telefonicky, e-mailem nebo přes WhatsApp.'],
            ],
            [
              ['Popis situace (nepovinné)'],
              ['Pomůže mi rychleji se zorientovat ještě před tím, než se poprvé ozvu.'],
            ],
          ],
        },
      ],
    },
    {
      id: 'pravni-zaklad',
      title: 'Právní základ',
      blocks: [
        {
          type: 'p',
          content: [
            'Údaje z kontaktního formuláře zpracovávám na základě opatření přijatých na vaši žádost před případným uzavřením smlouvy (čl. 6 odst. 1 písm. b) GDPR). Vyplněním formuláře mě žádáte, abych vás kontaktoval ohledně konzultace. Pokud z poptávky nakonec nevznikne spolupráce, uchovávám údaje po přiměřenou dobu na základě oprávněného zájmu vyřídit váš dotaz a reagovat na případné navazující otázky.',
          ],
        },
        {
          type: 'p',
          content: [
            'Web používá Google Analytics 4 k měření návštěvnosti. Toto zpracování je založené výhradně na vašem souhlasu uděleném přes cookie lištu. Bez souhlasu se analytické cookies nenastaví. Podrobnosti jsou na stránce ',
            link('/cookies', 'Cookies'),
            '.',
          ],
        },
      ],
    },
    {
      id: 'prijemci',
      title: 'Komu údaje předávám',
      blocks: [
        {
          type: 'p',
          content: [
            'Údaje zásadně nepředávám k marketingovým účelům žádné třetí straně. K vašim údajům mohou mít přístup:',
          ],
        },
        {
          type: 'list',
          items: [
            ['Poskytovatel hostingu a e-mailu tohoto webu (WEDOS Internet, a.s.), přes kterého se poptávka z formuláře odesílá.'],
            ['Poskytovatel e-mailové schránky, do které poptávky přicházejí (Google Workspace, Google Ireland Limited).'],
            [
              'Google Analytics, jen pokud udělíte souhlas s analytickými cookies.',
            ],
          ],
        },
      ],
    },
    {
      id: 'doba-uchovani',
      title: 'Jak dlouho je uchovávám',
      blocks: [
        {
          type: 'p',
          content: ['Doba uchování se liší podle toho, jestli z poptávky vznikne spolupráce:'],
        },
        {
          type: 'list',
          items: [
            [
              'Poptávka, ze které nevznikne spolupráce: uchovávám ji po dobu nutnou k vyřízení, nejdéle 6 měsíců od poslední komunikace.',
            ],
            [
              'Dokumentace ke zprostředkovanému finančnímu produktu: uchovávám po dobu, kterou mi ukládají právní předpisy pro zprostředkovatele finančních produktů (zejména zákon proti praní peněz), zpravidla 10 let od ukončení smluvního vztahu.',
            ],
            [
              'Data v Google Analytics: uchovávám po dobu 14 měsíců od vaší poslední interakce s webem, podle nastavení účtu Google Analytics.',
            ],
          ],
        },
      ],
    },
    {
      id: 'vase-prava',
      title: 'Vaše práva',
      blocks: [
        {
          type: 'p',
          content: ['V souvislosti se zpracováním vašich osobních údajů máte právo:'],
        },
        {
          type: 'list',
          items: [
            ['zjistit, jaké údaje o vás zpracovávám, a získat jejich kopii,'],
            ['nechat opravit údaje, které jsou nepřesné nebo neúplné,'],
            ['požádat o výmaz údajů, pokud už pro jejich zpracování není důvod,'],
            ['požádat o omezení zpracování,'],
            ['získat údaje ve strukturovaném, strojově čitelném formátu a předat je jinam,'],
            ['vznést námitku proti zpracování založenému na oprávněném zájmu,'],
            [
              'kdykoli odvolat souhlas, pokud je na něm zpracování založené; tím není dotčena zákonnost zpracování před jeho odvoláním.',
            ],
          ],
        },
      ],
    },
    {
      id: 'kontakt-stiznost',
      title: 'Kontakt a stížnost',
      blocks: [
        {
          type: 'p',
          content: [
            'Kterékoli z těchto práv můžete uplatnit e-mailem na ',
            link('mailto:patrik@mintfinance.cz', 'patrik@mintfinance.cz'),
            ' nebo telefonicky na ',
            link('tel:+420775217721', '+420 775 217 721'),
            '.',
          ],
        },
        {
          type: 'p',
          content: [
            'Pokud máte pocit, že s vašimi osobními údaji nezacházím v souladu s právními předpisy, můžete podat stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7.',
          ],
        },
      ],
    },
  ],
};
