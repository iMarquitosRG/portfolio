import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const media = z.object({
  label: z.string(),
  /** File name inside src/assets/cases/ (optional until real screenshots exist). */
  src: z.string().optional(),
  /** Optional light-theme version of the same image. */
  srcLight: z.string().optional(),
  alt: z.string().optional(),
  height: z.enum(['sm', 'md', 'lg']).default('md'),
  tint: z.boolean().default(true),
  /** Soft fill behind images with a transparent background (multi-device shots). */
  backdrop: z.boolean().optional(),
});

const block = z.discriminatedUnion('type', [
  z.object({ type: z.literal('facts'), items: z.array(z.object({ value: z.string(), label: z.string() })) }),
  z.object({ type: z.literal('statement'), label: z.string(), text: z.string() }),
  z.object({ type: z.literal('paragraphs'), items: z.array(z.string()) }),
  z.object({
    type: z.literal('cards'),
    items: z.array(z.object({ eyebrow: z.string(), title: z.string(), text: z.string() })),
  }),
  z.object({
    type: z.literal('decisions'),
    items: z.array(
      z.object({ eyebrow: z.string(), title: z.string(), text: z.string(), before: media.optional(), after: media }),
    ),
  }),
  z.object({ type: z.literal('rounds'), items: z.array(z.object({ label: z.string(), text: z.string() })) }),
  z.object({ type: z.literal('quotes'), items: z.array(z.object({ quote: z.string(), role: z.string() })) }),
  z.object({ type: z.literal('media') }).merge(media),
  z.object({ type: z.literal('gallery'), items: z.array(media) }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  z.object({ type: z.literal('link'), label: z.string(), href: z.string() }),
]);

const cases = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/cases' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    bigWord: z.string(),
    tint: z.enum(['purple', 'slate', 'sand', 'brand']),
    tag: z.string(),
    description: z.string(),
    card: z.object({ description: z.string(), context: z.string(), highlight: z.string() }),
    tldr: z.object({ role: z.string(), timeline: z.string(), platforms: z.string(), outcome: z.string() }),
    next: reference('cases'),
    nextSummary: z.string(),
    seoDescription: z.string(),
    // Real screens for the device mockups (files in src/assets/cases). Placeholders when missing.
    mockups: z.object({ screen: z.string(), phone: z.string(), screenLight: z.string().optional(), phoneLight: z.string().optional() }).optional(),
    sections: z.array(
      z.object({
        id: z.string(),
        nav: z.string(),
        label: z.string(),
        title: z.string(),
        lead: z.string().optional(),
        blocks: z.array(block).default([]),
      }),
    ),
  }),
});

export const collections = { cases };
