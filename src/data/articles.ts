/**
 * Společný zdroj článků pro detail článku, /clanky, homepage (ArticlesSection)
 * a RSS. Rozepsané články (`draft: true`) existují jen při vývoji a na náhledu
 * (GitHub Pages, PUBLIC_PREVIEW) — v produkčním buildu (Wedos) se nevytvoří.
 * Ve výpisech (homepage, /clanky, RSS, související) se neukazují nikdy.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'clanky'>;

export const SHOW_DRAFTS = import.meta.env.DEV || Boolean(import.meta.env.PUBLIC_PREVIEW);

const byNewest = (a: Article, b: Article) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime();

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

/** Související: ručně vybrané, pak stejné téma, pak nejnovější (max. `count`). */
export async function getRelated(article: Article, count = 2): Promise<Article[]> {
  const published = (await getPublishedArticles()).filter((a) => a.id !== article.id);
  const picked: Article[] = [];
  const add = (a: Article | undefined) => {
    if (a && !picked.includes(a) && picked.length < count) picked.push(a);
  };
  article.data.related.forEach((id) => add(published.find((a) => a.id === id)));
  published.filter((a) => a.data.category === article.data.category).forEach(add);
  published.forEach(add);
  return picked;
}
