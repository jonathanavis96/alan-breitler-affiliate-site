# Milestone 1 Delivery — Affiliate Marketing Website

## Overview

Milestone 1 covers the foundation of your affiliate website: strategy, design, homepage, core pages, SEO infrastructure, and affiliate link architecture. Everything below is built, functional, and ready to preview.

- **Pages delivered:** 18
- **Build status:** Clean (zero errors)
- **Live preview:** [View the site](https://jonathanavis96.github.io/alan-breitler-affiliate-site/)

---

## 1. Strategy & Sitemap

We defined the complete site structure before writing a single line of code.

### Site Map

```
/                          Homepage
├── /best/                 Best Picks (product roundup)
├── /reviews/              Reviews Index
│   └── /reviews/[product]/   Individual product reviews
├── /guides/               Buying Guides Index
│   └── /guides/[topic]/      Individual guides
├── /about/                About & Methodology
├── /contact/              Contact Form
├── /disclosure/           Affiliate Disclosure (FTC)
├── /privacy/              Privacy Policy
├── /go/[product]/         Affiliate Link Redirects
└── /404                   Error Page
```

### Content Strategy

The site follows a **hub & spoke model** — each content pillar (Best Picks, Reviews, Guides) acts as a hub page linking to individual spokes (product reviews, buying guides). This structure builds topical authority with search engines and gives users clear navigation paths.

- **Hub pages** accumulate authority and rank for broad keywords
- **Spoke pages** target specific product and long-tail keywords
- **Internal links** between hubs and spokes strengthen the overall domain

### Navigation

- **Primary nav (header):** Home, Best Picks, Reviews, Guides, About
- **Footer links:** About, Affiliate Disclosure, Privacy Policy, Contact
- **Mobile:** Bottom navigation bar with 4 quick-access icons

### Centralised Configuration

All site-wide settings (brand name, tagline, colours, navigation links) are controlled from a single config file. When you provide your real brand name, we update one file and it propagates everywhere.

**Why it matters:** A planned content architecture is how affiliate sites build authority with search engines. Random pages don't rank — structured content pillars do.

---

## 2. Design System

A complete, custom visual identity — not a template.

### Typography

| Role | Font | Usage |
|------|------|-------|
| Headlines | Newsreader (serif) | Page titles, section headers — authoritative editorial feel |
| Body text | Plus Jakarta Sans | Paragraphs, descriptions — clean and readable |
| Labels | Inter | Metadata, badges, navigation — precise and technical |

### Colour Palette

| Colour | Hex | Usage |
|--------|-----|-------|
| Primary (Black) | `#000000` | Headlines, primary buttons, header |
| Secondary (Indigo) | `#4B41E1` | Links, accents, interactive elements |
| Tertiary (Burnt Orange) | `#E45405` | Editor's Choice badges, highlights |
| Background | `#F7F9FB` | Page canvas — cool paper white |
| Surface Low | `#F2F4F6` | Section backgrounds |
| Surface High | `#E6E8EA` | Cards, elevated elements |

### Design Principles

- **Sharp corners** — no rounded buttons or cards; conveys authority
- **No visible borders** — sections defined by background colour shifts
- **Glass panels** — frosted overlays on hero images for text legibility
- **Grain texture** — subtle noise on hero and CTA sections for tactile depth
- **Grayscale-to-colour** — product images reveal colour on hover

### Component Library

- Buttons (primary, secondary, outline)
- Product cards with ratings, pros/cons, and affiliate CTAs
- Badge system (Editor's Choice, Best Value)
- Glass panel overlays
- Search overlay (full-screen, keyboard shortcut Ctrl+K)

**Why it matters:** Design is a trust signal. Visitors decide in seconds whether a site is credible. This design system positions the site as an authority, not another generic affiliate template.

---

## 3. Homepage

The main entry point — designed to capture attention and route visitors to content.

### Sections Built

- **Hero** — Animated typewriter headline with editorial photography. The headline cycles through keyword variants to keep the page feeling alive
- **Content discovery grid** — Four bento-style tiles linking to Best Picks, Reviews, Guides, and Methodology. Each tile has its own visual treatment and hover animation
- **Trust section** — "Built on Radical Transparency" showcasing the review methodology with three pillars: Rigorous Benchmarking, Expert Blind Tests, The Unfiltered Report
- **Call-to-action** — Dark panel with category links and browse buttons
- **Scroll animations** — Tiles fade in with staggered timing as you scroll down

### Responsive

Fully tested on mobile, tablet, and desktop. The mobile version includes a bottom navigation bar for quick access.

**Why it matters:** Every section has a job. The hero captures attention, the grid routes users to the right content, the trust section builds confidence, and the CTA converts. No filler.

---

<div style="page-break-before: always;"></div>

## 4. Core Pages

Essential pages that every affiliate website needs from day one.

| Page | Purpose |
|------|---------|
| **About** | Mission statement, editorial process, team information |
| **Affiliate Disclosure** | FTC-compliant disclosure explaining how affiliate links work |
| **Privacy Policy** | Standard privacy policy covering data collection and usage |
| **Contact** | Contact form for reader enquiries |
| **404 Error Page** | Custom page that guides lost visitors back to useful content |

**Why it matters:** The Disclosure page is legally required for affiliate sites (FTC guidelines). About and Privacy build trust. Contact provides a communication channel. These are non-negotiable.

---

## 5. Content Page Framework

Template pages that define how reviews, guides, and product listings will look.

### Best Picks (`/best/`)

Product listing page with 5 real products, complete with:

- Amazon product images (real photos from listings)
- Star ratings and pricing
- Pros and cons for each product
- Expert verdict summary
- "Check Price on Amazon" buttons linking directly to product pages

### Reviews (`/reviews/` and `/reviews/[product]/`)

- **Index page** — Grid layout showing all reviewed products with images and category labels
- **Individual review pages** — Full template with product header, specifications table, pros & cons breakdown, content sections, and purchase CTA

### Guides (`/guides/` and `/guides/[topic]/`)

- **Index page** — List of all guides with descriptions and estimated read times
- **Individual guide pages** — Full template with table of contents, numbered sections, placeholder content blocks, and related product recommendations

### Search

Full-site search overlay that finds products by name, brand, or category. Activated by the search icon or keyboard shortcut (Ctrl+K).

**Why it matters:** These templates define the content system. When real content is added in Milestone 2, it slots into these proven layouts. The 5 real products demonstrate exactly how the final site will look and function.

---

## 6. SEO Foundation

Technical SEO built into every page — not bolted on afterwards.

| Feature | Status |
|---------|--------|
| Unique title & meta description per page | Done |
| Open Graph tags (Facebook/LinkedIn sharing) | Done |
| Twitter Card tags | Done |
| Canonical URLs | Done |
| JSON-LD schema markup (WebSite, Review, Product, Article) | Done |
| XML Sitemap (auto-generated) | Done |
| robots.txt (excludes affiliate redirects) | Done |
| Semantic HTML (proper headings, landmarks, ARIA) | Done |
| Static site generation (pre-rendered HTML) | Done |

**Why it matters:** SEO is how affiliate sites get traffic. Without proper meta tags, schema markup, and a sitemap, search engines can't properly index or feature your content. Pre-rendered HTML means sub-second page loads, which is a direct ranking factor.

---

## 7. Affiliate Link Architecture

A complete link management system — ready for your affiliate accounts.

### How It Works

1. All product links are stored in a single data file (`affiliates.json`)
2. Every affiliate link routes through an internal redirect (`/go/[product-name]/`)
3. When you set up your Amazon Associates account, you update one file and every link across the entire site updates automatically

### Current Products

| Product | Amazon Link | Status |
|---------|-------------|--------|
| Ergotron LX Monitor Arm | Direct product page | Active |
| Keychron Q1 Max Keyboard | Direct product page | Active |
| Autonomous SmartDesk Pro | Direct product page | Active |
| BenQ ScreenBar Halo | Direct product page | Active |
| Logitech MX Master 3S | Direct product page | Active |

### Compliance

- Every affiliate link includes `rel="nofollow sponsored"` as required by search engines and the FTC
- Inline affiliate disclosure banner component available for any content page

**Why it matters:** The redirect system means affiliate links can be swapped from Amazon to any other network without touching any content pages. It also enables future click tracking.

---

## What's Next — Milestone 2

| Deliverable | Description |
|-------------|-------------|
| Content | Real content for all review, guide, and roundup pages |
| On-page SEO | Keyword research, title tag tuning, internal linking |
| Performance | Speed and mobile optimisation (Lighthouse 90+ target) |
| Affiliate links | Real affiliate link population with your Amazon Associates account |
| Testing | Cross-browser and mobile device testing |
| Revisions | Client review and revisions (up to 2 rounds) |
| Launch | Deployment to production hosting and launch support |
