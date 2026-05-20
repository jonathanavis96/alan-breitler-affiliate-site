/**
 * Schema markup utilities for JSON-LD structured data.
 *
 * Provides reusable builders for common schema.org types used across the site.
 * Pages import these helpers to construct their JSON-LD objects in frontmatter,
 * then pass them to BaseLayout via the `schema` prop.
 */

import siteData from '../../data/site.json';
import { rankProducts } from './rankProducts';

/** Product data shape from products.json */
interface ProductData {
  slug: string;
  name: string;
  brand: string;
  categories: string[];
  image: string;
  affiliateSlug: string;
  pricing: string;
  freeTier: boolean;
  freeTierNote: string | null;
  badge: string;
  scores: {
    ease_of_use: number;
    academic_value: number;
    price_to_value: number;
  };
  overallScore: number;
  /** Optional pin-to-top weight for sorted lists. See ./rankProducts.ts. */
  displayPriority?: number;
  useCase: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

/** Review frontmatter data shape */
interface ReviewData {
  title: string;
  slug: string;
  description: string;
  productSlug: string;
  categories: string[];
  image?: string;
  publishDate: Date;
  updatedDate?: Date;
  readTime: number;
  scores: {
    easeOfUse: number;
    academicValue: number;
    priceToValue: number;
  };
  overallScore: number;
  verdict: string;
  pricing: string;
  useCase: string;
  pros: string[];
  cons: string[];
  badge?: string;
  affiliateSlug?: string;
  keywords?: string[];
}

/** Resolve the full site URL including the base path */
function getSiteUrl(): string {
  const base = import.meta.env.BASE_URL;
  return `${siteData.url}${base}`;
}

/**
 * Resolve an image path to a fully qualified absolute URL.
 *
 * Handles the base path correctly — raw `new URL('/images/...', siteData.url)`
 * would lose the base path prefix. This helper prepends it first.
 */
function resolveImageUrl(imagePath: string): string {
  const siteUrl = getSiteUrl();
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${siteUrl}${cleanPath}`;
}

/** Organization schema — reusable as publisher/author across pages */
export function organizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@type': 'Organization' as const,
    '@id': `${siteUrl}#organization`,
    name: siteData.name,
    url: siteUrl,
    description: siteData.author.bio,
    logo: {
      '@type': 'ImageObject' as const,
      url: `${siteUrl}favicon.svg`,
      width: 512,
      height: 512,
      caption: siteData.name,
    },
    ...(siteData.social.twitter
      ? { sameAs: [siteData.social.twitter, siteData.social.facebook, siteData.social.instagram].filter(Boolean) }
      : {}),
  };
}

/** WebSite schema — used on the homepage */
export function webSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@type': 'WebSite' as const,
    '@id': `${siteUrl}#website`,
    name: siteData.name,
    url: siteUrl,
    description: siteData.description,
    publisher: { '@id': `${siteUrl}#organization` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction' as const,
      target: {
        '@type': 'EntryPoint' as const,
        urlTemplate: `${siteUrl}top-tools/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Wrap one or more schema objects in a @graph with shared context */
export function schemaGraph(...items: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}

/**
 * Build a BreadcrumbList entity for a given page.
 *
 * @param crumbs Array of { name, url } pairs from root to current page.
 * @param pageUrl The current page URL (used for @id).
 */
export function breadcrumbSchema(
  crumbs: { name: string; url: string }[],
  pageUrl: string,
) {
  return {
    '@type': 'BreadcrumbList' as const,
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Build a WebPage (or subtype) JSON-LD schema for static pages.
 *
 * Generates a @graph containing:
 * - WebPage (or AboutPage, ContactPage, etc.)
 * - BreadcrumbList for navigation context
 * - Organization (AIfocus as publisher)
 *
 * Use this for pages that don't have their own dedicated schema builder
 * (about, contact, disclosure, privacy, reviews index, library index, etc.)
 */
export function staticPageSchema(
  pageType: string,
  pageTitle: string,
  pageDescription: string,
  pageUrl: string,
  breadcrumbName: string,
) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;

  const webPage: Record<string, unknown> = {
    '@type': pageType,
    '@id': pageUrl,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': `${siteUrl}#website` },
    publisher: { '@id': orgId },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
  };

  const breadcrumb = breadcrumbSchema(
    [
      { name: 'Home', url: siteUrl },
      { name: breadcrumbName, url: pageUrl },
    ],
    pageUrl,
  );

  return schemaGraph(organizationSchema(), webPage, breadcrumb);
}

/**
 * Build a CollectionPage JSON-LD schema for index/listing pages.
 *
 * Generates a @graph containing:
 * - CollectionPage with optional ItemList as mainEntity
 * - BreadcrumbList for navigation context
 * - Organization (AIfocus as publisher)
 */
export function collectionPageSchema(
  pageTitle: string,
  pageDescription: string,
  pageUrl: string,
  breadcrumbName: string,
  listItems?: { name: string; url: string }[],
) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;

  const collectionPage: Record<string, unknown> = {
    '@type': 'CollectionPage',
    '@id': pageUrl,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': `${siteUrl}#website` },
    publisher: { '@id': orgId },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
  };

  // If list items provided, add an ItemList as mainEntity
  if (listItems && listItems.length > 0) {
    const itemList = {
      '@type': 'ItemList' as const,
      '@id': `${pageUrl}#itemlist`,
      numberOfItems: listItems.length,
      itemListElement: listItems.map((item, i) => ({
        '@type': 'ListItem' as const,
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    };
    collectionPage.mainEntity = { '@id': `${pageUrl}#itemlist` };
    return schemaGraph(
      organizationSchema(),
      collectionPage,
      itemList,
      breadcrumbSchema(
        [
          { name: 'Home', url: siteUrl },
          { name: breadcrumbName, url: pageUrl },
        ],
        pageUrl,
      ),
    );
  }

  return schemaGraph(
    organizationSchema(),
    collectionPage,
    breadcrumbSchema(
      [
        { name: 'Home', url: siteUrl },
        { name: breadcrumbName, url: pageUrl },
      ],
      pageUrl,
    ),
  );
}

/**
 * Map product category slugs to schema.org application categories.
 * Falls back to "Productivity" for unknown categories.
 */
function mapApplicationCategory(categories: string[]): string {
  const categoryMap: Record<string, string> = {
    'writing-tools': 'BusinessApplication',
    'research-assistants': 'ReferenceApplication',
    'image-generation': 'MultimediaApplication',
    'coding-assistants': 'DeveloperApplication',
  };
  // Use the first category that maps, or fall back
  for (const cat of categories) {
    if (categoryMap[cat]) return categoryMap[cat];
  }
  return 'BusinessApplication';
}

/**
 * Extract numeric price from a pricing string like "$20/mo", "From $10/mo", "$9.99/mo".
 * Returns null if no price can be extracted (e.g. "Free").
 */
function extractPrice(pricing: string): string | null {
  const match = pricing.match(/\$(\d+(?:\.\d{2})?)/);
  return match ? match[1] : null;
}

/** FAQ item shape for structured FAQ schema */
interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Build ItemList JSON-LD schema for roundup / "top tools" pages.
 *
 * Generates a @graph containing:
 * - CollectionPage (the roundup page itself)
 * - ItemList with ListItem entries for each ranked product
 * - BreadcrumbList for navigation context
 * - Organization (AIfocus as publisher)
 * - FAQPage (optional — methodology and common questions)
 *
 * Follows Google's structured data guidelines for list pages:
 * https://developers.google.com/search/docs/appearance/structured-data/carousel
 */
export function itemListSchema(
  products: ProductData[],
  pageTitle: string,
  pageDescription: string,
  pageUrl: string,
  faqItems?: FAQItem[],
) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;

  // Sort products by display priority then overall score (rankProducts helper)
  // so the schema.org ItemList matches the on-page visible ranking. Sending
  // Google a different order than what the user sees would be a mixed signal.
  const ranked = rankProducts(products);

  // Build the ItemList with each product as a ListItem
  const itemList = {
    '@type': 'ItemList' as const,
    '@id': `${pageUrl}#itemlist`,
    name: pageTitle,
    description: pageDescription,
    numberOfItems: ranked.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: ranked.map((product, index) => {
      const reviewUrl = `${siteUrl}reviews/${product.slug}/`;
      const item: Record<string, unknown> = {
        '@type': 'ListItem' as const,
        position: index + 1,
        name: product.name,
        url: reviewUrl,
        item: {
          '@type': 'SoftwareApplication' as const,
          name: product.name,
          applicationCategory: mapApplicationCategory(product.categories),
          operatingSystem: 'Web',
          ...(product.brand ? { brand: { '@type': 'Brand' as const, name: product.brand } } : {}),
          ...(product.image ? { image: resolveImageUrl(product.image) } : {}),
          aggregateRating: {
            '@type': 'AggregateRating' as const,
            ratingValue: product.overallScore,
            bestRating: 10,
            worstRating: 1,
            ratingCount: 1,
          },
          offers: (() => {
            const price = extractPrice(product.pricing);
            if (price) {
              const offer: Record<string, unknown> = {
                '@type': 'Offer' as const,
                price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              };
              // Add subscription pricing detail for monthly plans
              if (product.pricing.toLowerCase().includes('/mo')) {
                offer.priceSpecification = {
                  '@type': 'UnitPriceSpecification' as const,
                  price,
                  priceCurrency: 'USD',
                  unitCode: 'MON',
                  referenceQuantity: {
                    '@type': 'QuantitativeValue' as const,
                    value: 1,
                    unitCode: 'MON',
                  },
                };
              }
              return offer;
            }
            if (product.freeTier) {
              return {
                '@type': 'Offer' as const,
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              };
            }
            return undefined;
          })(),
          description: product.verdict,
        },
      };
      return item;
    }),
  };

  // CollectionPage entity for the roundup page
  const collectionPage: Record<string, unknown> = {
    '@type': 'CollectionPage' as const,
    '@id': pageUrl,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': `${pageUrl}#itemlist` },
    mainEntity: { '@id': `${pageUrl}#itemlist` },
    publisher: { '@id': orgId },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
    datePublished: '2026-04-01T00:00:00.000Z',
    dateModified: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
    keywords: 'best AI tools for academics, AI research tools, AI writing tools, academic productivity, AI tools comparison 2026',
  };

  // Breadcrumb for the roundup page
  const breadcrumb = {
    '@type': 'BreadcrumbList' as const,
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem' as const,
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem' as const,
        position: 2,
        name: 'Top AI Tools for Academics',
        item: pageUrl,
      },
    ],
  };

  // Build the schema graph — optionally include FAQ schema
  const graphItems: Record<string, unknown>[] = [
    organizationSchema(),
    collectionPage,
    itemList,
    breadcrumb,
  ];

  // Add FAQPage schema if FAQ items are provided
  if (faqItems && faqItems.length > 0) {
    graphItems.push({
      '@type': 'FAQPage' as const,
      '@id': `${pageUrl}#faq`,
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question' as const,
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: faq.answer,
        },
      })),
    });
  }

  return schemaGraph(...graphItems);
}

/**
 * Build comprehensive Product + Review JSON-LD schema for review pages.
 *
 * Generates a @graph containing:
 * - WebPage (the review page itself)
 * - SoftwareApplication (the product being reviewed) with Offer and Brand
 * - Review (the editorial review) with Rating
 * - Organization (AIfocus as publisher/author)
 *
 * Follows Google's structured data guidelines for product reviews:
 * https://developers.google.com/search/docs/appearance/structured-data/review
 */
export function productReviewSchema(
  review: ReviewData,
  product: ProductData | undefined,
  pageUrl: string,
) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;

  // Canonical product URL — prefer the review page URL as the product's URL on our site
  const productId = `${pageUrl}#product`;
  const reviewId = `${pageUrl}#review`;

  // Build the SoftwareApplication (product) entity
  const softwareApplication: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    '@id': productId,
    name: product?.name ?? review.productSlug,
    description: product?.verdict ?? review.description,
    applicationCategory: mapApplicationCategory(review.categories),
    operatingSystem: 'Web',
  };

  // Add brand if available from product data
  if (product?.brand) {
    softwareApplication.brand = {
      '@type': 'Brand',
      name: product.brand,
    };
  }

  // Add product image (use resolveImageUrl to include base path)
  if (review.image) {
    softwareApplication.image = resolveImageUrl(review.image);
  } else if (product?.image) {
    softwareApplication.image = resolveImageUrl(product.image);
  }

  // Add URL — link to the review page as the canonical product reference on this site
  softwareApplication.url = pageUrl;

  // Add offers/pricing information
  const price = extractPrice(review.pricing);
  if (price) {
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    };
    // Indicate subscription pricing
    if (review.pricing.toLowerCase().includes('/mo')) {
      offer.priceSpecification = {
        '@type': 'UnitPriceSpecification',
        price,
        priceCurrency: 'USD',
        unitCode: 'MON',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitCode: 'MON',
        },
      };
    }
    softwareApplication.offers = offer;
  } else if (product?.freeTier) {
    softwareApplication.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    };
  }

  // Add aggregate rating from review scores
  softwareApplication.aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: review.overallScore,
    bestRating: 10,
    worstRating: 1,
    ratingCount: 1,
    reviewCount: 1,
  };

  // Add keywords as feature list
  if (product?.pros && product.pros.length > 0) {
    softwareApplication.featureList = product.pros.join(', ');
  }

  // Build the Review entity
  const reviewEntity: Record<string, unknown> = {
    '@type': 'Review',
    '@id': reviewId,
    name: review.title,
    headline: review.title,
    description: review.description,
    reviewBody: review.verdict,
    datePublished: review.publishDate.toISOString(),
    url: pageUrl,
    itemReviewed: { '@id': productId },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.overallScore,
      bestRating: 10,
      worstRating: 1,
    },
    author: { '@id': orgId },
    publisher: { '@id': orgId },
  };

  // Add dateModified if review was updated
  if (review.updatedDate) {
    reviewEntity.dateModified = review.updatedDate.toISOString();
  }

  // Add positive/negative notes for Google review snippets
  if (review.pros.length > 0) {
    reviewEntity.positiveNotes = {
      '@type': 'ItemList',
      itemListElement: review.pros.map((pro, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: pro,
      })),
    };
  }
  if (review.cons.length > 0) {
    reviewEntity.negativeNotes = {
      '@type': 'ItemList',
      itemListElement: review.cons.map((con, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: con,
      })),
    };
  }

  // Build the WebPage entity
  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: review.title,
    description: review.description,
    datePublished: review.publishDate.toISOString(),
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': productId },
    mainEntity: { '@id': reviewId },
    publisher: { '@id': orgId },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
  };

  if (review.updatedDate) {
    webPage.dateModified = review.updatedDate.toISOString();
  }

  // Keywords for the page
  if (review.keywords && review.keywords.length > 0) {
    webPage.keywords = review.keywords.join(', ');
  }

  // Breadcrumb for the review page
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Reviews',
        item: `${siteUrl}reviews/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product?.name ?? review.productSlug,
        item: pageUrl,
      },
    ],
  };

  return schemaGraph(
    organizationSchema(),
    webPage,
    softwareApplication,
    reviewEntity,
    breadcrumb,
  );
}

/** Resource/guide article data shape */
interface ArticleData {
  title: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  imageAlt?: string;
  publishDate: Date;
  updatedDate?: Date;
  readTime: number;
  level: string;
  relatedProducts?: string[];
  keywords?: string[];
}

/**
 * Map resource category slugs to human-readable section names.
 */
function mapArticleSection(category: string): string {
  const sectionMap: Record<string, string> = {
    'getting-started': 'Getting Started',
    'prompt-engineering': 'Prompt Engineering',
    'workflow-guides': 'Workflow Guides',
    'tool-comparisons': 'Tool Comparisons',
  };
  return sectionMap[category] ?? 'Guides';
}

/**
 * Build Article JSON-LD schema for guide and resource pages.
 *
 * Generates a @graph containing:
 * - WebPage (the guide page itself)
 * - Article (the editorial content) with full authorship and metadata
 * - BreadcrumbList for navigation context
 * - Organization (AIfocus as publisher/author)
 *
 * Follows Google's structured data guidelines for articles:
 * https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function articleSchema(
  article: ArticleData,
  pageUrl: string,
) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;
  const articleId = `${pageUrl}#article`;

  // Build the Article entity
  const articleEntity: Record<string, unknown> = {
    '@type': 'Article',
    '@id': articleId,
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate.toISOString(),
    url: pageUrl,
    isPartOf: { '@id': `${siteUrl}#website` },
    author: { '@id': orgId },
    publisher: { '@id': orgId },
    inLanguage: 'en-US',
    mainEntityOfPage: { '@id': pageUrl },
    articleSection: mapArticleSection(article.category),
  };

  // Add dateModified if article was updated
  if (article.updatedDate) {
    articleEntity.dateModified = article.updatedDate.toISOString();
  }

  // Add image if available (use resolveImageUrl to include base path)
  if (article.image) {
    articleEntity.image = {
      '@type': 'ImageObject',
      url: resolveImageUrl(article.image),
      ...(article.imageAlt ? { caption: article.imageAlt } : {}),
    };
  }

  // Add keywords
  if (article.keywords && article.keywords.length > 0) {
    articleEntity.keywords = article.keywords.join(', ');
  }

  // Add word count estimate based on read time (~250 words/min)
  if (article.readTime) {
    articleEntity.wordCount = article.readTime * 250;
  }

  // Add educational level as audience descriptor
  if (article.level) {
    articleEntity.educationalLevel = article.level;
  }

  // Build the WebPage entity
  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: article.title,
    description: article.description,
    datePublished: article.publishDate.toISOString(),
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': articleId },
    mainEntity: { '@id': articleId },
    publisher: { '@id': orgId },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
  };

  if (article.updatedDate) {
    webPage.dateModified = article.updatedDate.toISOString();
  }

  if (article.keywords && article.keywords.length > 0) {
    webPage.keywords = article.keywords.join(', ');
  }

  // Breadcrumb for the resource page
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: `${siteUrl}resources/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  return schemaGraph(
    organizationSchema(),
    webPage,
    articleEntity,
    breadcrumb,
  );
}

/** Book item shape from library.json */
interface LibraryBook {
  slug: string;
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  year: number;
  link: string;
  badge: string | null;
}

/** Article item shape from library.json */
interface LibraryArticle {
  slug: string;
  title: string;
  authors: string;
  journal: string;
  category: string;
  description: string;
  link: string;
  year: number;
  badge: string | null;
}

/**
 * Build Library page JSON-LD schema with Book and ScholarlyArticle items.
 *
 * Generates a @graph containing:
 * - CollectionPage (the library page itself)
 * - ItemList with Book and ScholarlyArticle entries
 * - BreadcrumbList for navigation context
 * - Organization (AIfocus as publisher/curator)
 *
 * Uses schema.org Book type for curated books and ScholarlyArticle type
 * for landmark research papers, giving Google rich context about the
 * library's contents.
 */
export function librarySchema(
  pageTitle: string,
  pageDescription: string,
  pageUrl: string,
  books: LibraryBook[],
  articles: LibraryArticle[],
) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;

  // Build Book items for the ItemList
  const bookItems = books.map((book, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    item: {
      '@type': 'Book' as const,
      name: book.title,
      author: {
        '@type': 'Person' as const,
        name: book.author,
      },
      datePublished: String(book.year),
      description: book.description,
      url: book.link,
      ...(book.image ? { image: resolveImageUrl(book.image) } : {}),
      genre: book.category,
      inLanguage: 'en',
    },
  }));

  // Build ScholarlyArticle items for the ItemList
  const articleItems = articles.map((article, index) => ({
    '@type': 'ListItem' as const,
    position: books.length + index + 1,
    item: {
      '@type': 'ScholarlyArticle' as const,
      name: article.title,
      headline: article.title,
      author: {
        '@type': 'Organization' as const,
        name: article.authors,
      },
      datePublished: String(article.year),
      description: article.description,
      url: article.link,
      isPartOf: {
        '@type': 'Periodical' as const,
        name: article.journal,
      },
      genre: article.category,
      inLanguage: 'en',
    },
  }));

  // Combined ItemList
  const itemList = {
    '@type': 'ItemList' as const,
    '@id': `${pageUrl}#itemlist`,
    name: 'Curated AI Books & Research Papers',
    description: pageDescription,
    numberOfItems: books.length + articles.length,
    itemListElement: [...bookItems, ...articleItems],
  };

  // CollectionPage entity
  const collectionPage: Record<string, unknown> = {
    '@type': 'CollectionPage',
    '@id': pageUrl,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': `${pageUrl}#itemlist` },
    mainEntity: { '@id': `${pageUrl}#itemlist` },
    publisher: { '@id': orgId },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: 'en-US',
  };

  // Breadcrumb
  const breadcrumb = breadcrumbSchema(
    [
      { name: 'Home', url: siteUrl },
      { name: 'Library', url: pageUrl },
    ],
    pageUrl,
  );

  return schemaGraph(
    organizationSchema(),
    collectionPage,
    itemList,
    breadcrumb,
  );
}
