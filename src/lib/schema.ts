/**
 * JSON-LD Schema markup generators for SEO.
 * Each function returns a schema object ready for JSON.stringify().
 */

import siteData from '../../data/site.json';

export interface ProductReviewSchema {
  name: string;
  description: string;
  image?: string;
  rating: number;
  author?: string;
  datePublished: string;
  dateModified?: string;
}

export interface ArticleSchema {
  title: string;
  description: string;
  image?: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateProductReviewSchema(review: ProductReviewSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: review.name,
    description: review.description,
    ...(review.image && { image: review.image }),
    author: {
      '@type': 'Organization',
      name: review.author || siteData.name,
    },
    datePublished: review.datePublished,
    ...(review.dateModified && { dateModified: review.dateModified }),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    publisher: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.url,
    },
  };
}

export function generateArticleSchema(article: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    ...(article.image && { image: article.image }),
    author: {
      '@type': 'Organization',
      name: article.author || siteData.name,
    },
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.url,
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateItemListSchema(
  name: string,
  items: { name: string; url: string; position: number }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

export function generateFAQSchema(
  questions: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
