# Milestone 1 Delivery (Updated) — AIfocus

## Overview

Following your direction, the site has been fully rebranded to **AIfocus** — an AI-focused affiliate review site targeting academics. The niche, design, content, and architecture have all been updated to match your vision.

- **Brand:** AIfocus
- **Niche:** AI publications, software, and applications
- **Audience:** Academics and researchers
- **Pages delivered:** 14
- **Build status:** Clean (zero errors)
- **Live preview:** [View the site](https://jonathanavis96.github.io/alan-breitler-affiliate-site/)

---

## 1. Strategy & Sitemap

### Site Map

```
/                              Homepage
├── /top-tools/                Top AI Tools (ranked product listing)
├── /reviews/                  Reviews Index
│   └── /reviews/[product]/       Individual AI tool reviews
├── /resources/                Resources Index
│   └── /resources/[topic]/       Educational guides & tutorials
├── /about/                    About & Methodology
├── /contact/                  Contact & Suggest a Tool
├── /disclosure/               Affiliate Disclosure (FTC)
├── /privacy/                  Privacy Policy
├── /go/[product]/             Affiliate Link Redirects
└── /404                       Error Page (AI-themed)
```

### Content Strategy

The site follows a **hub & spoke model** organised around four AI tool categories:

- **Writing Tools** — AI assistants for drafting, editing, and academic prose
- **Research Assistants** — Tools for literature review, paper discovery, and evidence synthesis
- **Image Generation** — AI image generators for figures, diagrams, and presentation visuals
- **Coding Assistants** — AI coding tools for data analysis, scripting, and computational workflows

### Navigation

- **Primary nav (header):** Home, Top Tools, Reviews, Resources, About, Contact
- **Footer:** Newsletter signup, nav links, legal pages (Disclosure, Privacy)
- **Mobile:** Bottom navigation bar with quick-access icons

### Data Architecture

All site content is driven by centralised data files:

- `site.json` — Brand name, tagline, colour palette, navigation
- `products.json` — AI tool metadata, pricing, scores, categories
- `affiliates.json` — Affiliate link destinations and network info
- `categories.json` — The four tool categories with descriptions

**Why it matters:** Changing any product, link, or brand detail means updating one file — the change propagates across the entire site automatically.

---

## 2. Design System

An ultra-modern dark theme designed for the AI/tech space.

### Typography

| Role | Font | Usage |
|------|------|-------|
| Headlines | Space Grotesk | Page titles, section headers — geometric, modern |
| Body text | IBM Plex Sans | Paragraphs, descriptions — technical, readable |
| Labels | IBM Plex Sans | Metadata, badges, navigation |

All fonts are self-hosted (no third-party requests) for performance and privacy.

### Colour Palette

| Colour | Hex | Usage |
|--------|-----|-------|
| Base | `#0F1115` | Page background — dark graphite |
| Surface | `#171A21` | Cards, elevated sections |
| Primary (Cyan) | `#0AADCF` | Links, buttons, interactive elements |
| Accent (Amber) | `#FFB347` | Highlights, badges, secondary accents |
| Text | `#F3F4F6` | Primary body text — soft off-white |
| Muted | `#A7AFBF` | Secondary text, descriptions |

### Design Principles

- **Dark theme** throughout — premium, focused, distinctly modern
- **Frosted glass panels** — dark translucent overlays for cards and sections
- **Grain texture** — subtle noise overlay for tactile depth
- **Hover glow effects** — cyan and amber glows on interactive elements
- **Animated score counters** — scores animate into view on scroll
- **Scroll-triggered reveals** — content fades in as you scroll

### Component Library

- Product cards with multi-dimensional scores, pricing, pros/cons, and affiliate CTAs
- Comparison table with sortable score columns
- Category cards with Material Symbols icons
- Score counter rings and bars
- Badge system (Editor's Choice, Top Pick, Best Value, Best for Research)
- Newsletter signup (footer)
- Search overlay (full-screen, Ctrl+K shortcut)

---

## 3. Homepage

### Sections Built

1. **Hero** — Bold typographic-only hero (no image). Animated typewriter cycles through "Research", "Writing", "Analysis", "Discovery"
2. **Value proposition grid** — Asymmetric bento layout with "50+ AI Tools Tested" as the hero tile, plus In-Depth Reviews, 4 Categories, and 3-D Scoring
3. **Category browser** — Four-card grid for Writing Tools, Research Assistants, Image Generation, and Coding Assistants
4. **Methodology** — Four numbered evaluation steps: Feature Analysis → Workflow Integration Testing → Academic Use Case Scoring → Value Assessment
5. **Split CTA** — Primary button to /top-tools/ plus secondary newsletter signup

### Responsive

Fully responsive across mobile, tablet, and desktop.

---

<div style="page-break-before: always;"></div>

## 4. Core Pages

| Page | Purpose |
|------|---------|
| **About** | Mission statement, AI evaluation methodology, academic positioning |
| **Contact** | "Suggest a Tool" form + direct email link |
| **Affiliate Disclosure** | FTC-compliant disclosure with SaaS-appropriate language |
| **Privacy Policy** | Standard privacy policy |
| **404 Error** | AI-themed personality ("This Page Hallucinated Itself Out of Existence") |

All pages fully written with the AIfocus brand voice — authoritative, direct, slightly informal.

---

## 5. Content Framework

### Top Tools (`/top-tools/`)

The primary conversion page. Displays all AI tools organised by category with:

- Category-segmented product cards
- Multi-dimensional score bars (Ease of Use, Academic Value, Price-to-Value)
- Master comparison table at the bottom
- Real company logos for each product

### Reviews (`/reviews/` and `/reviews/[product]/`)

- **Index page** — Grid layout showing all reviewed tools
- **Individual reviews** — Template with 5 sections: TL;DR → Deep Dive → Pricing → Who It's For → Final Verdict
- **Demo reviews:** ChatGPT Plus, Claude Pro, Consensus AI

### Resources (`/resources/` and `/resources/[topic]/`)

- **Index page** — List of educational guides
- **Individual resources** — Template with: Introduction → Step-by-step → Tool Recommendations → Key Takeaways
- **Demo resource:** "Getting Started with AI for Research"

### Content Collections (MDX)

Reviews and resources use Astro Content Collections with structured schemas. Adding new content in Milestone 2 means creating a single `.mdx` file with frontmatter — no code changes needed.

### Search

Full-site search overlay across all products and resources. Activated by search icon or Ctrl+K.

---

## 6. Scoring System

A transparent, multi-dimensional scoring system designed for academic decision-making.

| Dimension | What It Measures |
|-----------|-----------------|
| **Ease of Use** | Learning curve, UX quality, onboarding experience |
| **Academic Value** | Fit for scholarly research, writing, and workflows |
| **Price-to-Value** | Cost-effectiveness relative to alternatives |
| **Overall** | Simple average of the three dimensions (out of 10) |

Scores appear on product cards, comparison tables, and review verdict sections.

---

## 7. Placeholder Products

Seven representative AI tools with real company logos, placeholder affiliate links, and sample scores:

| Product | Category | Price | Overall |
|---------|----------|-------|---------|
| ChatGPT Plus (OpenAI) | Writing, Research | $20/mo | 8.0 |
| Claude Pro (Anthropic) | Writing, Research, Coding | $20/mo | 8.7 |
| Consensus | Research | $9.99/mo | 8.7 |
| Elicit | Research, Writing | $10/mo | 9.0 |
| Midjourney | Image Generation | $10/mo | 6.7 |
| GitHub Copilot | Coding | $10/mo | 8.7 |
| Grammarly AI | Writing | $12/mo | 8.0 |

Affiliate links currently point to each product's official site. These will be updated with your real affiliate account links in Milestone 2.

---

## 8. SEO Foundation

| Feature | Status |
|---------|--------|
| Unique title & meta description per page | Done |
| Open Graph tags (social sharing) | Done |
| Twitter Card tags | Done |
| Canonical URLs | Done |
| JSON-LD schema markup | Done |
| XML Sitemap (auto-generated) | Done |
| Semantic HTML | Done |
| Static site generation (pre-rendered) | Done |
| Self-hosted fonts (no third-party CDN) | Done |
| Branded favicon (AI lettermark) | Done |
| OG sharing image | Done |

---

## What's Next — Milestone 2

| Deliverable | Description |
|-------------|-------------|
| Content | Full reviews, resources, and roundup content for all products |
| On-page SEO | Keyword research, title tag tuning, internal linking |
| Performance | Speed and mobile optimisation (Lighthouse 90+ target) |
| Affiliate links | Real affiliate link setup with your account credentials |
| Newsletter | Backend integration for email signup |
| Testing | Cross-browser and mobile device testing |
| Revisions | Client review and revisions (up to 2 rounds) |
| Launch | Production deployment and launch support |
