/**
 * Společný zdroj článků pro detail článku, /clanky, homepage (ArticlesSection)
 * a RSS. Rozepsané články (`draft: true`) existují jen při vývoji a na náhledu
 * (GitHub Pages, PUBLIC_PREVIEW) — v produkčním buildu (Wedos) se nevytvoří.
 * Ve výpisech (homepage, /clanky, RSS, související) se neukazují nikdy.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'clanky'>;

export const SHOW_DRAFTS = import.meta.env.DEV || Boolean(import.meta.env.PUBLIC_PREVIEW);

// Nejnovější první; při stejném datu podle názvu souboru (stabilní pořadí).
const byNewest = (a: Article, b: Article) =>
  b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.id.localeCompare(b.id);

/** Všechny články, které se mají sestavit jako stránka (vč. konceptů na náhledu). */
export async function getBuildableArticles(): Promise<Article[]> {
  const all = await getCollection('clanky');
  return all.filter((a) => SHOW_DRAFTS || !a.data.draft).sort(byNewest);
}

/** Zveřejněné články pro výpisy — nejnovější první. */
export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getCollection('clanky');
  return all.filter((a) => !a.data.draft).sort(byNewest);
}

export const articleHref = (a: Article) => `/clanky/${a.id}`;

/**
 * Služba k tématu článku — odkaz pod článkem (čtenář pokračuje na stránku
 * služby, Google vidí souvislost článek → služba). Název a věta = schválené
 * texty detailů služeb (SERVICE_NAME / SERVICE_DESCRIPTION v src/pages/sluzby).
 */
export const SERVICE_BY_TOPIC: Record<Article['data']['category'], { href: string; name: string; text: string }> = {
  'Hypotéky a bydlení': {
    href: '/sluzby/hypoteky',
    name: 'Hypotéky a financování bydlení',
    text: 'Pomohu vám zjistit, na jakou nemovitost dosáhnete, vyřídit hypotéku, refinancování, výstavbu nebo rekonstrukci.',
  },
  'Finanční plánování': {
    href: '/sluzby/financni-plan',
    name: 'Finanční plánování',
    text: 'Pomohu vám dát finance do souvislostí, určit priority a nastavit další kroky.',
  },
  Investice: {
    href: '/sluzby/investice',
    name: 'Investiční poradenství a plánování',
    text: 'Pomohu vám nastavit nebo zkontrolovat investice podle vašich cílů, času a rizika.',
  },
  Pojištění: {
    href: '/sluzby/pojisteni',
    name: 'Pojištění příjmu, rodiny a majetku',
    text: 'Pomohu vám nastavit nebo zkontrolovat životní a majetkové pojištění podle skutečných finančních rizik.',
  },
  Penze: {
    href: '/sluzby/penze',
    name: 'Plánování penze a důchodu',
    text: 'Pomohu vám spočítat, jaký majetek budete potřebovat na penzi a jak ho postupně vytvářet.',
  },
};

/** Doba čtení v minutách: text + „V kostce" + časté otázky, ~180 slov za minutu. */
export function readingMinutes(article: Article): number {
  const { summary, faq } = article.data;
  const text = [article.body ?? '', ...summary, ...faq.flatMap((f) => [f.q, f.a])]
    .join(' ')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    .replace(/[#*_>`|=[\]{}'"-]/g, ' ');
  const words = text.split(/\s+/).filter((w) => /\p{L}|\d/u.test(w)).length;
  return Math.max(1, Math.ceil(words / 180));
}

/** „5. října 2026" — s nezlomitelnými mezerami (CLAUDE.md, datum). */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(date)
    .replace(/ /g, ' ');
}

/**
 * Související: ručně vybrané, pak stejné téma, pak nejnovější (max. `count`).
 * Z článků, které se sestaví — na náhledu i koncepty (ať jde projít
 * propojení), na webu jen zveřejněné.
 */
export async function getRelated(article: Article, count = 2): Promise<Article[]> {
  const published = (await getBuildableArticles()).filter((a) => a.id !== article.id);
  const picked: Article[] = [];
  const add = (a: Article | undefined) => {
    if (a && !picked.includes(a) && picked.length < count) picked.push(a);
  };
  article.data.related.forEach((id) => add(published.find((a) => a.id === id)));
  published.filter((a) => a.data.category === article.data.category).forEach(add);
  published.forEach(add);
  return picked;
}
