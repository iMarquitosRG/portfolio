// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://marcosrivera.design',
  integrations: [sitemap()],
  // English only for v1. Spanish (v2) = add 'es' here and a src/pages/es folder.
  i18n: { locales: ['en'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } },
  prefetch: { defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
});
