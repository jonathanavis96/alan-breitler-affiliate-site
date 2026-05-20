/**
 * Centralised product sort order used across the site.
 *
 * Order: displayPriority DESC, then overallScore DESC.
 *
 *   - `displayPriority` is an optional field in `data/products.json` (default 0).
 *     Higher values pin a product to the top of every sorted list — used to
 *     keep revenue-generating tools (e.g. Grammarly, Consensus) above
 *     non-monetisable ones regardless of review score.
 *   - When two products share the same priority (including the default 0),
 *     the tie-breaker is `overallScore` (highest first).
 *
 * Pulled into a helper so the same rule applies in:
 *   - homepage discovery / "top picks" highlight (src/pages/index.astro)
 *   - top-tools category groups       (src/pages/top-tools/index.astro)
 *   - reviews index                   (src/pages/reviews/index.astro)
 *   - comparison tables               (src/components/ComparisonTable.astro)
 *   - schema.org ItemList ranking     (src/lib/schema.ts)
 *
 * If we ever change the ranking semantics (e.g. add a tertiary tie-breaker
 * on freeTier, or split rankings by category), this is the one place
 * to update it.
 */

/** Minimal shape needed for ranking. Real product objects have many more fields. */
export interface RankableProduct {
  overallScore: number;
  displayPriority?: number;
}

/**
 * Comparator suitable for `Array.prototype.sort`.
 * Higher priority first; ties broken by higher overall score.
 */
export function compareProductRank<T extends RankableProduct>(a: T, b: T): number {
  const priorityDiff = (b.displayPriority ?? 0) - (a.displayPriority ?? 0);
  if (priorityDiff !== 0) return priorityDiff;
  return b.overallScore - a.overallScore;
}

/**
 * Returns a NEW array sorted by the ranking rule. Does not mutate input.
 */
export function rankProducts<T extends RankableProduct>(products: readonly T[]): T[] {
  return [...products].sort(compareProductRank);
}
