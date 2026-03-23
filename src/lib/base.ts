/**
 * Prepend the Astro base URL to a path.
 * In development or production with base="/": returns the path as-is.
 * On GitHub Pages with base="/alan-breitler-affiliate-site/": prepends the base.
 *
 * Usage:
 *   import { url } from '../lib/base';
 *   <a href={url('/best/')}>Best Picks</a>
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
