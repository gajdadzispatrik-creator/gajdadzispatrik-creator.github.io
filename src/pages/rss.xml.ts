/**
 * RSS kanál článků (/rss.xml) — jen zveřejněné, nejnovější první.
 * Poslouží pro měsíční e-mail klientům s novým článkem (prelaunch úkol 18b).
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articleHref, getPublishedArticles } from '../data/articles';

export async function GET(context: APIContext) {
  const articles = await getPublishedArticles();
  return rss({
    title: 'Patrik Gajdadzis — články o financích',
    description: 'Praktické články o hypotékách, finančním plánování, pojištění, investicích a penzi.',
    site: context.site ?? 'https://patrikgajdadzis.cz',
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.publishedAt,
      link: articleHref(a),
      categories: [a.data.category],
    })),
    customData: '<language>cs-cz</language>',
  });
}
