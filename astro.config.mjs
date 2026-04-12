import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jonathanavis96.github.io',
  base: '/alan-breitler-affiliate-site/',
  compressHTML: true,
  build: {
    // Content-hash asset filenames for long-lived caching
    assets: '_astro',
    inlineStylesheets: 'auto',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/go/'),
    }),
    tailwind({
      // Disable auto-injected base styles — global.css already handles
      // @tailwind base/components/utilities directives, preventing duplicate CSS
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
