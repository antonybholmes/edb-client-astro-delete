// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

import sitemap from '@astrojs/sitemap'

import mdx from '@astrojs/mdx'

//import partytown from '@astrojs/partytown'

// @ts-ignore
import remarkSectionize from 'remark-sectionize'

// https://astro.build/config
export default defineConfig({
  site: 'https://edb.rdf-lab.org',
  compressHTML: true,
  server: {
    port: 8000,
  },
  //base: '/',
  output: 'static',
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en'],
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  markdown: {
    // Applied to .md and .mdx files
    remarkPlugins: [remarkSectionize],
  },
  integrations: [
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.scss`.
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx(),
    //partytown(),
  ],
  // vite: {
  //   css: {
  //     transformer: "lightningcss",
  //   },
  // },
})
