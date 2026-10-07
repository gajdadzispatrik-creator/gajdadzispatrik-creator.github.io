/**
 * Články (/clanky/<soubor>) — jeden článek = jeden soubor .mdx ve složce
 * src/content/clanky. Název souboru = adresa článku. Co se vyplňuje nahoře
 * v souboru (frontmatter), hlídá schéma níže — build spadne, když něco chybí.
 * Postup psaní: docs/clanky-navod.md.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Témata — stejná taxonomie jako homepage a /clanky (content-homepage.md §10). */
export const ARTICLE_TOPICS = ['Hypotéky a bydlení', 'Finanční plánování', 'Investice', 'Pojištění', 'Penze'] as const;

const clanky = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/clanky' }),
  schema: () =>
    z.object({
      title: z.string(),
      /** Kratší nadpis jen pro kartu na homepage, když se plný nevejde na 2 řádky. */
      homeTitle: z.string().optional(),
      /** Krátký nadpis na obrázek pro sdílení (2–3 řádky velkým písmem); plný nadpis
       *  sociální sítě vypíšou pod obrázek samy. Chybí-li, použije se `title`. */
      shareTitle: z.string().max(60).optional(),
      /** Perex pod nadpisem a zároveň popis pro Google a sdílení (do ~160 znaků). */
      description: z.string().max(200),
      category: z.enum(ARTICLE_TOPICS),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      /** Rozepsaný článek: vidět jen na náhledu (GitHub), na webu se nevytvoří. */
      draft: z.boolean().default(false),
      /** „V kostce" — 3 hlavní myšlenky hned pod úvodem. */
      summary: z.array(z.string()).min(2).max(4),
      /** Časté otázky na konci článku (i jako FAQPage pro Google). */
      faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
      /** Volitelně ručně vybrané související články (názvy souborů bez .mdx). */
      related: z.array(z.string()).default([]),
    }),
});

export const collections = { clanky };
