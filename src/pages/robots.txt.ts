/**
 * Dynamic robots.txt — generated per build target so the Sitemap URL and
 * Disallow paths always match the actual deploy origin and base path.
 *
 * Why this isn't a static `public/robots.txt`:
 *   The site builds for two hosts with different base paths
 *   (GitHub Pages: /alan-breitler-affiliate-site/, Cloudflare Pages: /).
 *   A single static robots.txt would only be correct for one of them.
 *
 * Astro turns any `.ts` file in `src/pages/` that exports a `GET` handler
 * into a static endpoint at the matching path — so this file is built
 * once at SSG time and served as a plain text file.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  // `site` from the API context is the ORIGIN only (no base path appended)
  // — e.g. "https://jonathanavis96.github.io/" or "https://aifocus.work/".
  // To build a fully-qualified sitemap URL we have to combine it with
  // BASE_URL manually.
  const origin = site?.toString().replace(/\/+$/, '') ?? '';

  // Base path the site is served from (e.g. "/" on Cloudflare, or
  // "/alan-breitler-affiliate-site/" on GH Pages). Astro guarantees
  // this always begins and ends with a slash.
  const basePath = import.meta.env.BASE_URL;

  // Disallow path for affiliate redirect pages — relative to the base.
  // Using basePath ensures we hit the right URL on both deploy targets.
  // Collapses any double slashes (in case basePath is just "/").
  const goDisallow = `${basePath}go/`.replace(/\/+/g, '/');

  // Sitemap URL: origin + base + filename, collapsing the boundary slash.
  const sitemapUrl = `${origin}${basePath}sitemap-index.xml`.replace(
    /([^:])\/\//g,
    '$1/',
  );

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Disallow affiliate redirect URLs from indexing',
    `Disallow: ${goDisallow}`,
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
