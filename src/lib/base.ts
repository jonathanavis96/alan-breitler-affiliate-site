/**
 * Prepend the Astro base URL to a path.
 * In development or production with base="/": returns the path as-is.
 * On GitHub Pages with base="/alan-breitler-affiliate-site/": prepends the base.
 *
 * Usage:
 *   import { url } from '../lib/base';
 *   <a href={url('/top-tools/')}>Top Tools</a>
 *   <img src={url('/images/hero.jpg')} />
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  // BASE_URL already has trailing slash, path starts with /
  // Avoid double slashes
  if (base === '/' || base === '') {
    return path;
  }
  // Remove leading slash from path since base already ends with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}

/**
 * Build an absolute canonical URL for a page path.
 * Combines the configured site origin with the base path and the given path
 * to produce a fully-qualified URL suitable for <link rel="canonical">,
 * og:url, and schema.org references.
 *
 * Ensures trailing slash consistency and avoids double slashes.
 *
 * Usage:
 *   import { canonicalUrl } from '../lib/base';
 *   const pageCanonical = canonicalUrl('/reviews/consensus-ai/');
 *   // → "https://jonathanavis96.github.io/alan-breitler-affiliate-site/reviews/consensus-ai/"
 */
export function canonicalUrl(path: string = '/'): string {
  const site = import.meta.env.SITE || 'https://jonathanavis96.github.io';
  const basePath = url(path);
  // Combine site origin (no trailing slash) with the base-prefixed path
  const origin = site.replace(/\/+$/, '');
  return `${origin}${basePath}`;
}
