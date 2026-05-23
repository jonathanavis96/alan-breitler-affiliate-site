# SEO Meta Tag Audit — AIfocus

**Audit Date:** April 2026
**Auditor:** Development team
**Scope:** All 13 page routes (8 static + 3 dynamic + 1 error + 1 redirect)

---

## Audit Summary

| Category | Status |
|----------|--------|
| Global meta tags (charset, viewport, theme-color) | PASS |
| Title tags (unique, descriptive, branded) | PASS |
| Meta descriptions (unique, under 160 chars) | PASS — 1 minor (404 uses default) |
| Canonical URLs | PASS |
| Open Graph core (title, description, type, url) | PASS |
| Open Graph image (image, image:alt, dimensions) | PASS — all pages have og:image via default fallback |
| Open Graph article tags | FIXED — added article:published_time / modified_time |
| Twitter Card tags | PASS |
| robots/noindex directives | PASS |
| Sitemap inclusion | FIXED — /go/ routes were incorrectly included |
| Schema.org JSON-LD | PASS — all pages have appropriate structured data |

---

## BaseLayout Meta Tag Template

All pages (except /go/ redirects) use `BaseLayout.astro` which renders:

### Always Present
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<meta name="generator" content="Astro v5.18.1">`
- `<meta name="theme-color" content="#0F1115">`
- `<title>{pageTitle} | AIfocus</title>`
- `<meta name="description" content="...">`
- `<link rel="canonical" href="...">`

### Open Graph (Always Present)
- `og:title` — matches `<title>` tag
- `og:description` — matches meta description
- `og:type` — "website" (default) or "article" (reviews/resources)
- `og:url` — matches canonical URL
- `og:image` — absolute URL to OG image (1200x630)
- `og:image:alt` — descriptive alt text
- `og:image:width` — "1200"
- `og:image:height` — "630"
- `og:site_name` — "AIfocus"
- `og:locale` — "en_US"

### Open Graph Article Tags (Article pages only)
- `article:published_time` — ISO 8601 date
- `article:modified_time` — ISO 8601 date (when available)

### Twitter Card (Always Present)
- `twitter:card` — "summary_large_image"
- `twitter:title` — matches `<title>` tag
- `twitter:description` — matches meta description
- `twitter:image` — matches og:image
- `twitter:image:alt` — matches og:image:alt

### Conditional
- `<meta name="robots" content="noindex, nofollow">` — only on 404 and /go/ pages
- `<script type="application/ld+json">` — JSON-LD schema markup (per-page)

---

## Page-by-Page Audit

### 1. Homepage (`/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "AIfocus - Your Academic Edge in AI Tools" | PASS |
| description | "Expert reviews, comparisons, and guides to help academics find the best AI tools..." | PASS |
| canonical | `https://jonathanavis96.github.io/alan-breitler-affiliate-site/` | PASS |
| og:type | website | PASS |
| og:image | og-default.png (absolute URL) | PASS |
| schema | WebSite + Organization @graph | PASS |

### 2. About (`/about/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "About Us \| AIfocus" | PASS |
| description | "Learn about AIfocus — an independent editorial team..." | PASS |
| canonical | auto-generated from Astro.url | PASS |
| og:type | website | PASS |
| og:image | og-default.png | PASS |
| schema | AboutPage | PASS |

### 3. Contact (`/contact/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "Contact \| AIfocus" | PASS |
| description | "Get in touch with AIfocus. Suggest an AI tool..." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | ContactPage | PASS |

### 4. Disclosure (`/disclosure/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "Affiliate Disclosure \| AIfocus" | PASS |
| description | "How AIfocus earns revenue through affiliate partnerships..." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | WebPage | PASS |

### 5. Privacy (`/privacy/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "Privacy Policy \| AIfocus" | PASS |
| description | "How AIfocus handles your data..." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | WebPage | PASS |

### 6. Top Tools (`/top-tools/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "Best AI Tools for Academics (2026) \| AIfocus" | PASS |
| description | "The top AI tools for research, writing, and academic productivity..." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | ItemList + SoftwareApplication + CollectionPage + BreadcrumbList | PASS |

### 7. Reviews Index (`/reviews/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "Reviews \| AIfocus" | PASS |
| description | "In-depth, honest product reviews covering features, performance, and value." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | CollectionPage | PASS |

### 8. Individual Reviews (`/reviews/[slug]/`) — 7 pages

| Tag | Value | Status |
|-----|-------|--------|
| title | "{Review Title} \| AIfocus" (unique per review) | PASS |
| description | Unique per review from MDX frontmatter | PASS |
| canonical | auto-generated | PASS |
| og:type | article | PASS |
| og:image | og-default.png (review-specific images passed when available) | PASS |
| article:published_time | From review publishDate | PASS |
| article:modified_time | From review updatedDate (when set) | PASS |
| schema | SoftwareApplication + Review + WebPage + BreadcrumbList | PASS |

### 9. Resources Index (`/resources/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "Guides & Tutorials for AI in Research \| AIfocus" | PASS |
| description | "Practical guides, prompt engineering tips, and step-by-step tutorials..." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | CollectionPage + ItemList | PASS |

### 10. Individual Resources (`/resources/[slug]/`) — 2 pages

| Tag | Value | Status |
|-----|-------|--------|
| title | "{Resource Title} \| AIfocus" (unique per resource) | PASS |
| description | Unique per resource from MDX frontmatter | PASS |
| canonical | auto-generated | PASS |
| og:type | article | PASS |
| og:image | og-default.png (resource-specific images passed when available) | PASS |
| article:published_time | From resource publishDate | PASS |
| article:modified_time | From resource updatedDate (when set) | PASS |
| schema | Article + WebPage + BreadcrumbList | PASS |

### 11. Library (`/library/`)

| Tag | Value | Status |
|-----|-------|--------|
| title | "AI Library \| AIfocus" | PASS |
| description | "Curated AI books and landmark research articles for academics..." | PASS |
| canonical | auto-generated | PASS |
| og:type | website | PASS |
| schema | CollectionPage | PASS |

### 12. 404 Page

| Tag | Value | Status |
|-----|-------|--------|
| title | "404 — Lost in the Neural Net \| AIfocus" | PASS |
| description | Site default description | INFO — acceptable since noindexed |
| robots | noindex, nofollow | PASS |
| canonical | auto-generated | PASS |
| schema | None | PASS — not needed for error page |

### 13. Affiliate Redirects (`/go/[slug]/`) — 7 pages

These pages use a minimal HTML template (not BaseLayout) since they redirect immediately.

| Tag | Value | Status |
|-----|-------|--------|
| charset | UTF-8 | PASS |
| title | "Redirecting..." | PASS |
| robots | noindex | PASS |
| canonical | Points to affiliate destination URL | PASS |
| meta refresh | 0-second redirect to destination | PASS |
| Sitemap | EXCLUDED via filter | FIXED |

---

## Issues Found and Fixed

### FIXED: /go/ Routes Appearing in Sitemap
**Severity:** Medium
**Description:** The 7 `/go/[slug]/` redirect pages were included in sitemap-0.xml despite having `<meta name="robots" content="noindex">`. The `@astrojs/sitemap` integration doesn't read page-level noindex directives.
**Fix:** Added `filter` option to sitemap integration in `astro.config.mjs` to exclude `/go/` routes.

### FIXED: Missing article:published_time / article:modified_time OG Tags
**Severity:** Medium
**Description:** Review and resource pages set `og:type="article"` but didn't include the article-specific OG protocol tags (`article:published_time`, `article:modified_time`). These are recommended by the Open Graph protocol for article content.
**Fix:** Added conditional article OG tags to BaseLayout.astro, with `publishedTime` and `modifiedTime` props passed from review and resource pages.

### FIXED: Review/Resource ogImage Not Passed
**Severity:** Low
**Description:** Reviews and resources with `image` fields in frontmatter were not passing them as `ogImage` to BaseLayout. All pages fell back to og-default.png.
**Fix:** Updated `[slug].astro` templates to pass `ogImage={review.image || resource.image}` when defined. Falls back to og-default.png when not set.

### INFO: OG Default Image Used Across Most Pages
**Severity:** Informational
**Description:** Most pages use the shared `og-default.png` (1200x630) for social sharing. This is acceptable for a site launch and can be enhanced later with page-specific OG images.

### INFO: 404 Page Uses Default Description
**Severity:** Informational
**Description:** The 404 page doesn't provide a custom meta description, so it inherits the site-wide default. Since the page has `noindex`, this has zero SEO impact.

---

## Canonical URL Verification

All canonical URLs correctly include the GitHub Pages base path:
- Format: `https://jonathanavis96.github.io/alan-breitler-affiliate-site/{path}/`
- Generated automatically by Astro's `Astro.url.href` using the `site` and `base` config
- Verified in built HTML output

## Sitemap Verification

Post-fix sitemap includes all public pages and excludes:
- `/404/` (error page)
- `/go/*` (affiliate redirects — noindexed)

## OG Image Verification

- Default OG image exists at: `public/images/og-default.png`
- Absolute URL resolves to: `https://jonathanavis96.github.io/alan-breitler-affiliate-site/images/og-default.png`
- Dimensions declared: 1200x630 (standard for social sharing)
