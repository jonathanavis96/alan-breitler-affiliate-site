# Tier 3 Milestone 1 Delivery — AIfocus

## Delivery Summary

Tier 3 Milestone 1 is **complete and live on aifocus.work**. The site has been migrated to its production hosting on Cloudflare, the custom domain is active with SSL, analytics and Search Console are recording, the ranking page has been restructured for fastest monetisation, and the affiliate signup walkthrough is in your inbox. Quick top-line:

- **Custom domain live:** [aifocus.work](https://aifocus.work) — Cloudflare Pages, automatic SSL, global CDN
- **Google Analytics 4 active:** Measurement ID `G-Q5LHXC4TQH`, firing on every page
- **Google Search Console set up:** sitemap submitted and accepted (Status: Success, 22 May 2026)
- **Top Tools ranking restructured:** Grammarly and Consensus pinned to the top of every product list
- **Affiliate signup walkthrough:** step-by-step PDF guide delivered 21 May
- **Bonus — edge security:** Cloudflare WAF custom rule blocking 18 known scanner / probe paths

---

## 1. Cloudflare Hosting & Custom Domain

The site is now live on Cloudflare Pages, served from `aifocus.work` with an automatically-provisioned SSL certificate and Cloudflare's global edge network. The previous GitHub Pages URL is retained as a fallback so nothing breaks if Cloudflare ever has an outage. Every push to the `main` branch now deploys to both targets automatically.

| Item | Value |
|------|-------|
| Primary URL | https://aifocus.work |
| Hosting | Cloudflare Pages |
| SSL certificate | Automatic (Cloudflare-managed, auto-renewing) |
| CDN | Cloudflare global edge network |
| Fallback URL | jonathanavis96.github.io/alan-breitler-affiliate-site/ |
| Hosting cost | $0/month |
| Deploy trigger | Auto-deploy on push to `main` branch |

A `docs/deployment.md` reference doc is in the repo covering deploy commands, environment variables, and the do-not list for safe operation.

---

## 2. Google Analytics 4 + Search Console

### Google Analytics 4

GA4 is recording data on every page of `aifocus.work`. The Measurement ID `G-Q5LHXC4TQH` is wired into the site via the Cloudflare Pages environment, so every future redeploy keeps the tag firing automatically.

You'll see real visitor data populate in the GA4 dashboard over the next 24-48 hours. For context, the site has been seeing roughly 20-30 real human visitors per day in the last 48 hours. The rest of the traffic visible in Cloudflare analytics is bots and crawlers, which is normal background noise for any site on the public internet.

### Google Search Console

Search Console is now set up as a **Domain property** (`sc-domain:aifocus.work`), which covers every subdomain automatically. No need to re-verify if you add `www`, `blog`, or similar in future.

| Item | Status |
|------|--------|
| Property type | Domain (covers all subdomains) |
| Verification | Complete |
| Sitemap submitted | `https://aifocus.work/sitemap-index.xml` |
| Sitemap status | **Success** (22 May 2026) |
| Pages discovered (so far) | Index file parsed; page-level discovery on next crawl pass |
| Performance data | Will populate over 24-48h |

---

## 3. Top Tools Ranking Restructure

The product ranking has been restructured to maximise commission potential as affiliate approvals come through. Grammarly and Consensus are now pinned to the top two positions in every product list across the site: homepage discovery panel, `/top-tools/` category groups, comparison table, reviews index, and the schema.org `ItemList` markup that feeds Google's rich snippets.

The reason: these two tools have the most accessible affiliate programs (ShareASale and PartnerStack respectively), which means they're the fastest path to live commission once the signup process is complete. Locking them into the top positions across every surface means the highest-converting traffic flows to the tools you can actually earn from first.

The remaining product order is preserved by score, so the ranking still feels honest and editorial rather than purely commercial.

| Position | Tool | Network | Why pinned |
|----------|------|---------|-----------|
| 1 | Grammarly | ShareASale | Highest accessibility, fastest approval |
| 2 | Consensus | PartnerStack | Best fit with academic audience, fast approval |
| 3+ | All others | (various) | Sorted by editorial score |

The change is centralised in `src/lib/rankProducts.ts` via a `displayPriority` field on each product, so it's easy to re-tune later without touching individual pages.

---

## 4. Affiliate Signup Walkthrough

A step-by-step PDF guide was emailed through on 21 May covering signup instructions for every affiliate network referenced on the site. Each section includes:

- The network the program runs on (Impact, PartnerStack, ShareASale, or direct)
- A direct link to the signup page
- What to put in each field of the application (audience description, traffic source, tracking method)
- Typical approval timeline
- Where to find your tracking link / affiliate ID once approved

As programs approve you, forward the IDs through and they'll be wired into `data/affiliates.json` and deployed. This is the first piece of Milestone 2 work and can run in parallel with the rest of M2.

---

## 5. Bonus — Edge-Level Security Hardening

A Cloudflare WAF custom rule has been added that blocks 18 known scanner and probe paths at the edge before they reach the site. These are the standard URLs used by automated vulnerability scanners (WordPress admin panels, environment files, version control directories, common config probes). Blocking them at the edge keeps the origin clean and stops them from cluttering the GA4 and Cloudflare analytics with noise.

This sits on top of Cloudflare's default DDoS and bot protection, which run automatically and don't need any configuration. Bot Fight Mode and AI bot blocking are left **off** intentionally to preserve the AI-citation referral channel, which matters for a site that reviews AI tools.

| Item | Status |
|------|--------|
| WAF custom rule | 1 of 5 free-plan slots used |
| Paths blocked at edge | 18 known scanner / probe URLs |
| Default DDoS protection | Active (Cloudflare-managed) |
| Bot Fight Mode | Off (preserves AI-citation traffic) |

---

## 6. What Happens Next

Tier 3 Milestone 2 picks up here with the content and revenue layer:

- **4 new in-depth reviews:** QuillBot, Otter.ai, Scite.ai, Perplexity Pro — full 800+ word reviews, product cards, ranking integration
- **Affiliate tracking wired in:** as you forward IDs from the signup process, each one gets wired into the redirect system and deployed live
- **Newsletter signup + welcome sequence:** Mailchimp or ConvertKit free tier with a 5-email welcome series
- **Outreach starter pack:** 5 academic communities to target, with template emails ready to send
- **30-day post-launch check-in:** indexing review, broken-link sweep, one SEO improvement report

No action needed from you to start Milestone 2. I'll begin on the new reviews now and integrate affiliate IDs as they come through.

---

## Support & Revisions

This milestone includes **up to 2 rounds of revisions**. If anything needs adjusting, just let me know and I'll get it sorted.

For day-to-day reference, `docs/deployment.md` in the repo covers deploy commands and the GA4 / Cloudflare setup. The affiliate signup walkthrough (sent 21 May) covers the network signups end-to-end.
