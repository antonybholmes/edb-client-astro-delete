// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';

// @ts-ignore
import remarkSectionize from "remark-sectionize"

// https://astro.build/config
export default defineConfig({
  site: "https://edb.rdf-lab.org",
  compressHTML: true,
  server: {
    port: 8000,
  },
  //base: '/',
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkSectionize],
  },
  integrations: [tailwind(), react(), sitemap(), mdx(), partytown()],
});