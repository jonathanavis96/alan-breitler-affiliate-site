# Sitemap - Company Name

## Site Structure

```text
/                          Homepage
├── /best/                 Best Picks (roundup index)
│   ├── /best/[category]/  Category-specific roundups (M2)
│   └── ...
├── /reviews/              Reviews (index)
│   ├── /reviews/[slug]/   Individual product reviews (M2)
│   └── ...
├── /guides/               Buying Guides (index)
│   ├── /guides/[slug]/    Individual guides (M2)
│   └── ...
├── /about/                About page
├── /contact/              Contact form
├── /disclosure/           Affiliate disclosure (FTC required)
├── /privacy/              Privacy policy
├── /go/[slug]/            Affiliate redirects (noindex, nofollow)
└── /404                   Error page
```

## Navigation Structure

### Primary Navigation (Header)
1. Home
2. Best Picks
3. Reviews
4. Guides
5. About

### Footer Links
1. About
2. Affiliate Disclosure
3. Privacy Policy
4. Contact

## Milestone Mapping

### Milestone 1 (Current)
- [x] Homepage
- [x] About
- [x] Disclosure
- [x] Privacy Policy
- [x] Contact
- [x] Best Picks index (placeholder)
- [x] Reviews index (placeholder)
- [x] Guides index (placeholder)
- [x] 404 page
- [x] SEO foundation (schema, meta, sitemap.xml, robots.txt)

### Milestone 2 (Next)
- [ ] Individual roundup pages (/best/[category]/)
- [ ] Individual review pages (/reviews/[slug]/)
- [ ] Individual guide pages (/guides/[slug]/)
- [ ] Comparison pages (/[product-a]-vs-[product-b]/)
- [ ] Blog posts (/blog/[slug]/)
- [ ] Affiliate link implementation
- [ ] Content population
- [ ] On-page SEO optimization
- [ ] Performance tuning

## Content Architecture (Hub & Spoke)

Each content pillar follows a hub-and-spoke model:

```text
Pillar Hub (e.g., /best/)
├── Roundup: "Best [Products] for [Use Case]"    ← money page
├── Review: "[Product] Review"                     ← spoke
├── Review: "[Product] Review"                     ← spoke
├── Comparison: "[Product A] vs [Product B]"       ← spoke
└── Guide: "How to Choose a [Product]"             ← informational spoke
```

## URL Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Roundup | `/best/[category]/` | `/best/standing-desks/` |
| Review | `/reviews/[product-slug]/` | `/reviews/ergotron-lx/` |
| Comparison | `/[product-a]-vs-[product-b]/` | `/ergotron-lx-vs-amazonbasics/` |
| Guide | `/guides/[topic]/` | `/guides/how-to-choose-standing-desk/` |
| Blog | `/blog/[slug]/` | `/blog/home-office-setup-tips/` |
| Affiliate redirect | `/go/[slug]/` | `/go/ergotron-lx/` |

## Notes

- All URLs use trailing slashes for consistency
- Affiliate redirects (/go/) are excluded from sitemap and search indexing
- Niche and categories TBD pending client input
