/**
 * Affiliate link redirect handler.
 * Routes like /go/product-name/ redirect to the affiliate destination URL.
 * All affiliate links are served through this handler for:
 * - Centralized link management (update once in affiliates.json)
 * - Clean URLs in content
 * - Future click tracking capability
 *
 * These pages are excluded from sitemap via robots.txt.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import affiliateData from '../../../data/affiliates.json';

export const getStaticPaths: GetStaticPaths = () => {
  return affiliateData.links
    .filter((link) => link.active)
    .map((link) => ({
      params: { slug: link.slug },
      props: { destination: link.destination },
    }));
};

export const GET: APIRoute = ({ props, redirect }) => {
  const { destination } = props as { destination: string };

  // 302 redirect (temporary) - allows changing destination without cache issues
  return redirect(destination, 302);
};
