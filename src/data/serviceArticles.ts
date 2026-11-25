/**
 * Články ke stránkám služeb – kapitola „Články“ (implementační plán SEO
 * 25. 11. 2026, A-2; Patrik: „vybírej podle tematické relevance, umožni ručně
 * určit prioritní články, zbytek doplní automatický výběr“).
 *
 * - `priority`: ručně vybrané články v pořadí, v jakém se mají ukázat
 *   (i z jiného tématu, pokud se ke službě hodí). Upravuje se jen tady.
 * - Zbylá místa doplní nejnovější zveřejněné články z kategorie `category`.
 * - Koncept nebo článek s budoucím datem se nezobrazí (getBuildableArticles).
 * - Kapitola je jen na stránkách v `SERVICE_ARTICLES`. Penze zatím nemá žádný
 *   článek: kapitolu přidat na /sluzby/penze s prvním penzijním článkem
 *   (route marker `clanky` + markerTargets + sekce jako na ostatních službách).
 *
 * Opačný směr (článek → služba) zajišťuje SERVICE_BY_TOPIC v articles.ts.
 */
import { getBuildableArticles, type Article } from './articles';

export type ServiceKey = 'hypoteky' | 'pojisteni' | 'investice' | 'financni-plan' | 'penze';

interface ServiceArticlesConfig {
  category: Article['data']['category'];
  priority: string[];
}

export const SERVICE_ARTICLES: Record<ServiceKey, ServiceArticlesConfig> = {
  hypoteky: {
    category: 'Hypotéky a bydlení',
    // na kolik dosáhnu → jak vybrat (sazba nestačí) → refinancování
    priority: ['na-jakou-hypoteku-dosahnu', 'nejnizsi-sazba-hypoteky-neni-nejlevnejsi', 'refinancovani-hypoteky'],
  },
  pojisteni: {
    category: 'Pojištění',
    // kolik pojistit → jak vybrat pojišťovnu → výpadek příjmu
    priority: ['kolik-si-pojistit-zivotni-pojisteni', 'jak-vybrat-pojistovnu-zivotni-pojisteni', 'pojisteni-pracovni-neschopnosti'],
  },
  investice: {
    category: 'Investice',
    // pravidelné investování na dlouhý cíl; jak poznat, z čeho poradce vybírá
    priority: ['investice-pro-deti', 'financni-poradce-bankar-nebo-pojistovak'],
  },
  'financni-plan': {
    category: 'Finanční plánování',
    // výběr poradce, cíl na dlouhou dobu, ochrana příjmu – tři části plánu
    priority: ['financni-poradce-bankar-nebo-pojistovak', 'investice-pro-deti', 'kolik-si-pojistit-zivotni-pojisteni'],
  },
  penze: {
    category: 'Penze',
    priority: [],
  },
};

export async function getServiceArticles(service: ServiceKey, count = 3): Promise<Article[]> {
  const { category, priority } = SERVICE_ARTICLES[service];
  const available = await getBuildableArticles(); // seřazené od nejnovějšího
  const picked: Article[] = [];
  const add = (a: Article | undefined) => {
    if (a && !picked.includes(a) && picked.length < count) picked.push(a);
  };
  priority.forEach((id) => add(available.find((a) => a.id === id)));
  available.filter((a) => a.data.category === category).forEach(add);
  return picked;
}
