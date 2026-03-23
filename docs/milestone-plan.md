# Milestone Plan - Affiliate Website

## Overview

- **Client:** Alan (Upwork)
- **Budget:** $500 (2 x $250 milestones)
- **Timeline:** ~3-4 weeks total

## Milestone 1 — $250 (Due: ~10 April 2026)

### Scope
Strategy, sitemap, design, homepage, core pages, SEO foundation.

### Deliverables

#### Strategy & Planning
- [x] Site strategy document (sitemap.md)
- [x] Page hierarchy and navigation structure
- [x] Content architecture (hub & spoke model)
- [x] Affiliate tracking setup planning (data model in affiliates.json)
- [x] Tech stack decision (Astro + Tailwind + TypeScript)

#### Design Setup
- [x] Color system (primary blue, secondary green, accent amber)
- [x] Typography system (Inter, heading hierarchy)
- [x] Spacing and layout system (Tailwind config)
- [x] Component library (ProductCard, ComparisonTable, Hero, etc.)
- [x] Mobile-first responsive framework

#### Homepage Build
- [x] Hero section with value proposition
- [x] Category navigation cards
- [x] Trust/credibility section ("Why trust us")
- [x] Final CTA section

#### Core Pages
- [x] About page (mission, process, standards)
- [x] Affiliate Disclosure (FTC compliant)
- [x] Privacy Policy
- [x] Contact page with form
- [x] 404 error page

#### SEO Foundation
- [x] Meta tags system (title, description, OG, Twitter)
- [x] JSON-LD schema markup (WebSite, AboutPage, CollectionPage)
- [x] Schema utility library (Review, Article, FAQ, Breadcrumb, ItemList)
- [x] sitemap.xml (via @astrojs/sitemap)
- [x] robots.txt
- [x] Canonical URL support
- [x] Semantic HTML throughout

#### Affiliate Tracking Setup Planning
- [x] Affiliate link data model (affiliates.json)
- [x] Product data model (products.json)
- [x] /go/[slug]/ redirect system (built but using placeholder data)
- [x] Affiliate link utility library (src/lib/affiliates.ts)

### What is NOT in Milestone 1
- Actual product content (reviews, roundups, comparisons)
- Real affiliate links (using placeholders)
- Full on-page SEO optimization
- Performance tuning / Lighthouse optimization
- Blog functionality
- Testing and revisions
- Launch support

---

## Milestone 2 — $250 (Due: ~24 April 2026)

### Scope
Remaining pages, on-page SEO, speed, affiliate links, testing, launch.

### Deliverables

#### Remaining Page Build
- [ ] Individual roundup pages (e.g., /best/[category]/)
- [ ] Individual product review pages (e.g., /reviews/[slug]/)
- [ ] Comparison pages (e.g., /[product-a]-vs-[product-b]/)
- [ ] Buying guide pages (e.g., /guides/[topic]/)
- [ ] Blog section (if needed based on content availability)
- [ ] MDX content templates for each page type

#### On-Page SEO Optimization
- [ ] Keyword research and mapping to pages
- [ ] Optimized title tags and meta descriptions
- [ ] Heading hierarchy optimization (H1-H3)
- [ ] Internal linking strategy implementation
- [ ] Image alt text optimization
- [ ] Schema markup for reviews (Product, Review schemas)
- [ ] FAQ schema on relevant pages

#### Speed & Mobile Improvements
- [ ] Image optimization (WebP/AVIF, lazy loading, sizing)
- [ ] Bundle size optimization
- [ ] Core Web Vitals tuning (LCP, CLS, INP)
- [ ] Lighthouse audit and fixes (target: 90+ all categories)
- [ ] Mobile UX testing and refinement

#### Affiliate Link Implementation
- [ ] Real affiliate links in affiliates.json (pending client's programs)
- [ ] Product data populated with real products
- [ ] Affiliate links in all content pages
- [ ] Click tracking (if desired)

#### Testing & Revisions
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile device testing
- [ ] Form submission testing
- [ ] Broken link check
- [ ] Client review and revisions (up to 2 rounds)

#### Launch Support
- [ ] Domain connection guidance
- [ ] Deployment to production hosting
- [ ] DNS and SSL configuration support
- [ ] Analytics setup (GA4 or alternative)
- [ ] Source code handover
- [ ] Post-launch smoke test
