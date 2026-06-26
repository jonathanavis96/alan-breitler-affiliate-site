# Tier 3 Milestone 2 Delivery — AIfocus

## Delivery Summary

Tier 3 Milestone 2 is **complete and live on aifocus.work**. This milestone added the content and revenue layer on top of the launched site: four new in-depth reviews, a working newsletter with a five-email welcome sequence, an outreach starter pack for building visibility, and a 30-day post-launch review plan. Quick top-line:

- **4 new in-depth reviews** — QuillBot, Otter.ai, Scite.ai, and Perplexity Pro, each fully scored and integrated into the rankings
- **Newsletter signup live** — wired to your Buttondown account and deployed; signups flow straight in
- **5-email welcome sequence** — written and ready to load into Buttondown's automation
- **Outreach starter pack** — audience map, pitch templates, guest-post angles, and a 90-day plan
- **30-day check-in plan** — a structured review of what to measure and decide around the one-month mark
- **On-page polish** — internal cross-linking, an SEO meta audit, newsletter conversion tracking in GA4, and a new workflow resource article
- **Additional scope delivered** — two live affiliate tools you sourced (Submagic and Everneed AI) were fully reviewed and built in at no extra charge (detailed in section 7)
- **Bonus additions** — a few extras added during the build because they complemented the work (detailed in section 6)

The site now stands at 39 pages, 13 reviewed tools, 13 affiliate redirects, and 3 resource articles.

---

## 1. Four New In-Depth Reviews

Four new tools have been researched, written up, and fully integrated — each with a product card, ranking placement, `/go/` affiliate redirect, and schema.org markup for rich results. The reviews match the existing editorial style: a clear score across ease of use, academic value, and price-to-value, an honest account of where each tool falls short, and free-tier guidance for budget-conscious academics.

| Review | Score | Positioned as | URL |
|--------|-------|---------------|-----|
| QuillBot | 8.0 | Best for Revision | https://aifocus.work/reviews/quillbot/ |
| Otter.ai | 8.3 | Best for Transcription | https://aifocus.work/reviews/otter-ai/ |
| Scite.ai | 8.0 | Best for Citation Analysis | https://aifocus.work/reviews/scite-ai/ |
| Perplexity Pro | 8.3 | Best Answer Engine | https://aifocus.work/reviews/perplexity-pro/ |

Each tool was also added to `data/products.json` and `data/affiliates.json`, so it appears in the rankings, comparison surfaces, and reviews index automatically. The four new tools were chosen specifically because they have accessible affiliate programs, which makes them part of the revenue engine rather than traffic-only pages.

---

## 2. Newsletter Signup + Welcome Sequence

### Signup form (live)

The newsletter signup is live on the site and wired to your Buttondown account. The form appears in the homepage hero section and the footer, and any signups flow straight into Buttondown. It is built to be provider-agnostic, so moving to a different email tool later is a one-line change rather than a rebuild.

Behind the scenes, each form submission carries a hidden `source` tag (homepage, footer, and so on) so you can see which placement converts best, and a `newsletter_signup` event fires to Google Analytics on every signup. There is also a honeypot field that silently discards bot submissions.

### 5-email welcome sequence

A five-email welcome sequence is written and ready to load into Buttondown's automation. It runs over the first 14 days of a subscriber's life:

| # | Subject | Day | Focus |
|---|---------|-----|-------|
| 1 | Welcome — your AI shortlist is inside | 0 | Orientation + top tools |
| 2 | The 30-minute literature review workflow | 2 | Elicit + Consensus |
| 3 | The interview transcript that wrote itself | 5 | Otter.ai |
| 4 | Tools we use every day (and what they replaced) | 9 | Claude Pro, Grammarly, QuillBot, Perplexity |
| 5 | What's coming next + a small ask | 14 | Relationship + feedback (no affiliate push) |

The drafts are plain-text, paste-ready, and written in the site's editorial voice. Each carries a single affiliate link maximum and a one-line affiliate disclosure. The full set lives in `docs/email-sequences/welcome/`, and `docs/buttondown-setup.md` is a 10-minute guide to loading them into Buttondown's automation.

---

## 3. Outreach Starter Pack

`docs/outreach-starter-pack.md` is a practical playbook for getting AIfocus in front of academic audiences over its first few months. It contains:

- **An audience map** — five tiers of contacts (AI-for-academics newsletters, university library blogs, faculty development centres, academic forums, and journalists), ranked by likelihood of linking, with named real-world starting points in each tier
- **Four pitch templates** — cold newsletter pitch, library/CTL pitch, reciprocal-resource pitch, and guest-post offer
- **Five guest-post angles** — content offers framed the way an editor would commission them
- **Response handlers** — what to say when someone says yes, no, or doesn't reply
- **A tracking schema** — a simple spreadsheet structure that scales to a hundred contacts
- **A 90-day plan** — a realistic week-by-week sequence aimed at 3-5 durable backlinks and 1-2 published guest posts in the first quarter

The tone throughout is matched to the academic audience: evidence-based, no hype, no pressure tactics.

---

## 4. 30-Day Post-Launch Check-In

`docs/30-day-check-in.md` is a structured review to run around one month after launch. It sets out exactly what data to gather from Search Console, Analytics, Cloudflare, the newsletter, and the affiliate redirects; the questions that data should answer; and a single decision to make at the end — whether the next month should focus on indexing/traffic, conversion, or content depth. It also lists what *not* to do at the 30-day mark, to avoid over-reacting to early noise.

---

## 5. On-Page Polish

A handful of smaller improvements were made across the site as part of this milestone:

- **Internal cross-linking** — every review now links to at least one related review, which helps both readers and search-engine crawl depth
- **SEO meta audit** — meta descriptions on the new reviews were trimmed to Google's display cap; schema.org Review markup, Open Graph images, and image alt text were verified across the new pages
- **GA4 conversion tracking** — the newsletter signup fires a tracked event so signups are measurable per source
- **New resource article** — *AI tools for qualitative research* (https://aifocus.work/resources/ai-tools-qualitative-research/) walks through a practical workflow and adds another internal link path to five of the reviewed tools

---

## 6. Bonus Additions (Included, Not Billed)

The following were added during the build because they complemented the milestone work, not because they were part of the contracted scope. They are flagged here so the scope stays clear:

- **AI Library expanded to 18 books** — the reading-list page grew from 8 to 18 titles, each with an editorial rating, an honest one-paragraph review, and a price. The page gained sorting (by category, price, or rating) and click-to-expand cards.
- **Weekly book-price refresh** — an automated job refreshes the library prices every week, so the page never shows a stale figure.
- **Inbound email for aifocus.work** — Cloudflare Email Routing is set up so mail to any `@aifocus.work` address forwards to a real inbox. (Final destination is being switched to your address — see below.)
- **Outbound email setup guide** — a written walkthrough for sending *as* `@aifocus.work` later, via a free Zoho Mail mailbox, if you ever want that.

These are yours to keep at no extra cost. They are noted as extras simply so the milestone accounting stays honest.

---

## 7. Additional Scope Delivered — Affiliate Tools Added at No Charge

Beyond the contracted milestone work, two live affiliate tools you sourced were fully reviewed and built into the site at no extra charge. Both sit a little outside the site's original focus (AI tools for academic research and writing), but since each carries a live affiliate link earning you commission, they were added in full so the revenue starts flowing right away:

| Tool | Review | Positioned as | Earning |
|------|--------|---------------|---------|
| Submagic | https://aifocus.work/reviews/submagic/ | Best for Short-Form Video | Live affiliate link, per click / sign-up |
| Everneed AI | https://aifocus.work/reviews/everneed-ai/ | Best for Bulk Content | Live affiliate link, 50% recurring |

Each received the same full treatment as every other tool: an honest, scored review page, a product card in the rankings, a `/go/` affiliate redirect carrying your live tracking link, a logo, and `rel="nofollow sponsored"` on the outbound link. Submagic also introduced a new "Video & Media" category to house it. These two are the first genuinely earning affiliate links on the site, ahead of the network approvals still in progress below.

---

## 8. Outstanding — Items From Your Side

None of these block the milestone. Each one simply unlocks a bit more value as it comes through, and I'm happy to handle them for you after the milestone closes:

- **Affiliate tracking IDs** — the in-scope tools (Consensus, Grammarly, QuillBot, Otter.ai, Scite.ai, and Perplexity) are already built and live, sitting on placeholder redirects and waiting only on your network approvals. As Impact, PartnerStack, and ShareASale approve you, forward each ID and I'll wire it straight into the live redirect at no charge. (Dub.co, which covers Perplexity, declined for now; the reapply window opens at the end of June.)
- **Buttondown welcome series** — the signup form is already live and collecting subscribers. When you're ready, load the five welcome emails into a Buttondown automation (guide in `docs/buttondown-setup.md`), and set the newsletter name to "AIfocus" and the From name to "Alan" under Settings → Newsletter.

The Amazon Associates tag and the `@aifocus.work` email destination you sent earlier are both already wired in and live.

---

## Support & Revisions

This milestone includes **up to 2 rounds of revisions**. If anything needs adjusting, just let me know and I'll get it sorted.

For day-to-day reference, the repo includes `docs/deployment.md` (deploy and hosting), `docs/buttondown-setup.md` (newsletter activation), and `docs/30-day-check-in.md` (the post-launch review plan).
