import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Review frontmatter schema for AI tool reviews.
 *
 * Each review covers a single AI product with multi-dimensional
 * scoring designed for academic users evaluating tools for
 * research, writing, coding, and visual workflows.
 */
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/reviews' }),
  schema: z.object({
    /** Display title, e.g. "Consensus Review: AI-Powered Research Discovery" */
    title: z.string(),

    /** URL-safe slug matching the product slug in products.json */
    slug: z.string(),

    /** One-line SEO meta description (≤ 160 chars recommended) */
    description: z.string(),

    /** Product slug reference into products.json */
    productSlug: z.string(),

    /** Category slugs matching categories.json (supports multi-category assignment) */
    categories: z.array(z.enum([
      'writing-tools',
      'research-assistants',
      'image-generation',
      'coding-assistants',
    ])).min(1),

    /** Hero/thumbnail image path relative to public/ */
    image: z.string().optional(),

    /** Alt text for the hero image */
    imageAlt: z.string().optional(),

    /** ISO 8601 publication date */
    publishDate: z.coerce.date(),

    /** ISO 8601 last-updated date */
    updatedDate: z.coerce.date().optional(),

    /** Estimated reading time in minutes */
    readTime: z.number().int().positive(),

    /**
     * Multi-dimensional scores (0–10 scale).
     * Three scoring dimensions for academic AI tool evaluation:
     *   - easeOfUse: learning curve, UX quality, and onboarding experience
     *   - academicValue: fit for scholarly research, writing, and academic workflows
     *   - priceToValue: cost-effectiveness relative to alternatives
     * Overall is the simple average of the three dimensions.
     */
    scores: z.object({
      easeOfUse: z.number().min(0).max(10),
      academicValue: z.number().min(0).max(10),
      priceToValue: z.number().min(0).max(10),
    }),

    /** Overall score — simple average of easeOfUse + academicValue + priceToValue */
    overallScore: z.number().min(0).max(10),

    /** One-sentence editorial verdict */
    verdict: z.string(),

    /** Pricing model label, e.g. "Freemium", "From $20/mo", "Free" */
    pricing: z.string(),

    /** Primary use-case tag for filtering, e.g. "Literature Review" */
    useCase: z.string(),

    /** List of notable strengths */
    pros: z.array(z.string()).min(1),

    /** List of notable weaknesses */
    cons: z.array(z.string()).min(1),

    /** Optional badge, e.g. "Editor's Choice", "Best Value", "Best for Research" */
    badge: z.string().optional(),

    /** Whether the review is published (false = draft) */
    draft: z.boolean().default(false),

    /** Affiliate slug reference into affiliates.json */
    affiliateSlug: z.string().optional(),

    /** SEO keywords for this review */
    keywords: z.array(z.string()).optional(),
  }),
});

/**
 * Resource frontmatter schema for guides, tutorials, and tips.
 *
 * Resources are practical, educational articles aimed at helping
 * academics integrate AI tools into their workflows — covering
 * prompt engineering, tool comparisons, workflow optimisation, etc.
 */
const resources = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/resources' }),
  schema: z.object({
    /** Display title, e.g. "Prompt Engineering for Literature Reviews" */
    title: z.string(),

    /** URL-safe slug used in /resources/[slug]/ routes */
    slug: z.string(),

    /** One-line SEO meta description (≤ 160 chars recommended) */
    description: z.string(),

    /** Resource category for grouping and filtering */
    category: z.enum([
      'getting-started',
      'prompt-engineering',
      'workflow-guides',
      'tool-comparisons',
    ]),

    /** Hero/thumbnail image path relative to public/ */
    image: z.string().optional(),

    /** Alt text for the hero image */
    imageAlt: z.string().optional(),

    /** ISO 8601 publication date */
    publishDate: z.coerce.date(),

    /** ISO 8601 last-updated date */
    updatedDate: z.coerce.date().optional(),

    /** Estimated reading time in minutes */
    readTime: z.number().int().positive(),

    /** Difficulty / audience level */
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),

    /** Related product slugs referencing products.json */
    relatedProducts: z.array(z.string()).optional(),

    /** Whether the resource is published (false = draft) */
    draft: z.boolean().default(false),

    /** SEO keywords for this resource */
    keywords: z.array(z.string()).optional(),
  }),
});

export const collections = {
  reviews,
  resources,
};
