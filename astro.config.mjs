import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

/**
 * Dual-target build configuration.
 *
 * This site is deployed to TWO hosts in parallel during the Cloudflare Pages
 * migration window:
 *
 *   1. GitHub Pages (default — when DEPLOY_TARGET is unset)
 *      - URL: https://jonathanavis96.github.io/alan-breitler-affiliate-site/
 *      - Requires a non-root `base` so internal links resolve correctly
 *        under the project-page sub-path. GitHub Pages serves project
 *        repos at `/<repo-name>/`, never at root.
 *      - Triggered by `.github/workflows/deploy.yml` on push to main.
 *
 *   2. Cloudflare Pages (custom domain: https://aifocus.work)
 *      - Requires `base: '/'` because the custom domain serves from root.
 *      - Triggered by Cloudflare's GitHub integration on push to main.
 *      - In the Cloudflare Pages project settings, the environment variable
 *        DEPLOY_TARGET=cloudflare is set so this config switches modes.
 *
 * If you ever want to keep ONLY one of the two targets, you can hard-code
 * the site/base values and drop the env-var branch — nothing else in the
 * codebase depends on this conditional. Both internal-link helpers
 * (`src/lib/base.ts`) read `import.meta.env.BASE_URL`, which Astro derives
 * from the `base` setting below, so everything downstream "just works"
 * when this single switch is flipped.
 *
 * Local dev:
 *   - `npm run dev` uses the GH Pages base by default (matches origin/main).
 *   - To preview the Cloudflare build locally:
 *       DEPLOY_TARGET=cloudflare npm run build && npm run preview
 */
const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

export default defineConfig({
  site: isCloudflare
    ? 'https://aifocus.work'
    : 'https://jonathanavis96.github.io',
  base: isCloudflare
    ? '/'
    : '/alan-breitler-affiliate-site/',
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
