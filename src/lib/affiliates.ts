/**
 * Affiliate link management utilities.
 * Reads from data/affiliates.json and provides helpers for link generation.
 */

import affiliateData from '../../data/affiliates.json';

export interface AffiliateLink {
  slug: string;
  name: string;
  destination: string;
  network: string;
  active: boolean;
}

/**
 * Get an affiliate link by slug.
 * Returns undefined if not found or inactive.
 */
export function getAffiliateLink(slug: string): AffiliateLink | undefined {
  return affiliateData.links.find(
    (link) => link.slug === slug && link.active,
  );
}

/**
 * Get the internal redirect URL for a product.
 * This is the URL used in content (e.g., /go/product-name/).
 */
export function getAffiliateUrl(slug: string): string {
  return `/go/${slug}/`;
}

/**
 * Get the destination URL for an affiliate slug.
 * Used by the /go/[slug] redirect handler.
 */
export function getAffiliateDestination(slug: string): string | undefined {
  const link = getAffiliateLink(slug);
  return link?.destination;
}

/**
 * Get all active affiliate links.
 */
export function getAllAffiliateLinks(): AffiliateLink[] {
  return affiliateData.links.filter((link) => link.active);
}
