# 30-Day Check-In — AIfocus M2 Post-Launch Review

**For:** Alan
**Target date:** ~30 days after M2 delivery (week of 2026-06-22)
**Time required:** ~45 minutes to gather data, ~30 minutes to discuss

This is the structured review of how AIfocus has performed since the M2 launch.
The point is not to celebrate success or react to noise — it is to identify
which assumptions held up, which did not, and what to prioritise next.

The 30-day mark is deliberate. Earlier than that, the data is mostly noise.
Later than that, course-corrections become harder to make.

---

## What to gather before the meeting

### 1. Google Search Console — what is Google doing with the site?

Log in at https://search.google.com/search-console (jonathanavis96@gmail.com).
Select `aifocus.work`.

Capture screenshots / numbers for:

- **Performance → Last 28 days** — total clicks, total impressions, average
  CTR, average position. Compare to Day 0 (which was all zeros). Note the
  top 5 queries by impressions.
- **Pages → Indexing** — how many of the 18 sitemap-discovered URLs are
  actually indexed vs "Discovered – currently not indexed"? Target by day 30:
  all 18 indexed, or a specific reason listed for each unindexed page.
- **Sitemaps** — confirm `https://aifocus.work/sitemap-index.xml` still shows
  Status: Success and the discovered pages count matches what we expect (18
  at minimum — more if any roundup or resource pages were added).
- **Insights** — read whatever Google Insights highlights without re-running
  it ourselves. Sometimes useful, sometimes not.

### 2. Google Analytics 4 — who is actually visiting?

Once Alan has shared GA4 admin access (currently blocked — see milestone
notes), log in and capture:

- **Reports → Engagement → Pages and screens** — top 10 pages by views over
  the last 28 days. The expectation is the homepage dominates, with the
  top-tools and the highest-ranking reviews next. If any review is unusually
  popular, that's a signal worth investing in.
- **Reports → Acquisition → Traffic acquisition** — split by Direct, Organic
  Search, Referral, Social. At day 30 we expect Direct + a small Organic
  Search number. Referral and Social numbers tell us if any outreach work has
  paid off.
- **Reports → Engagement → Events** — look for `newsletter_signup` events if
  the form is live by then, and `select_content` / outbound clicks on the
  `/go/` redirects (manual click events are not auto-tracked; if we want
  these, we will need to add them in M3).
- **Real-time** — useful for sanity-checking visitor presence in the moment.
  Not for the report itself.

### 3. Cloudflare — is the WAF still doing its job and is the site healthy?

Log in at https://dash.cloudflare.com (jonathanavis96@gmail.com → Alan's
account → aifocus.work).

- **Analytics → HTTP Traffic → 30 days** — Total requests, unique visitors,
  bandwidth. Compare to the launch-day baseline (Day 0: 4.6k requests / 229
  unique IPs in 24h, mostly bots).
- **Security → Analytics → 30 days** — Total mitigated requests, top blocked
  paths (should still be the same probe paths we blocked on Day 0 — wp-admin,
  cgi-bin, etc.). If you see new top-blocked paths, that's a signal we may
  need to expand the WAF rule.
- **Security → Security Rules → Block common scanner probe paths** — confirm
  the rule is still Active and has fired a healthy number of times (>500 in
  30 days is normal for a public domain).

### 4. Newsletter (if live by day 30)

If Alan has signed up for Buttondown and the form has been live for any
meaningful time:

- **Total subscribers** — Buttondown dashboard.
- **Subscriber sources** — Buttondown captures the `source` parameter we
  embed in the form (homepage, footer, etc.). Which placement converts best?
- **Welcome sequence performance** — open rates on each of the 5 emails.
  Anything below 30% open rate suggests a subject-line problem; anything below
  10% click rate on the affiliate link suggests the affiliate placement needs
  revision.
- **Replies received** — every welcome email asks for replies. Tracking what
  subscribers actually ask about is the highest-signal source of next-content
  ideas.

### 5. Affiliate clicks (per /go/ slug)

For each of the 11 tools, find:

- **Direct outbound clicks** — Cloudflare logs the `/go/<slug>/` redirects.
  Pull the request count per slug from Cloudflare's Log Explorer for the
  last 30 days. Top 3 clicked slugs tell us where the buying intent is.
- **Conversions** (if available) — once affiliate networks (Impact,
  PartnerStack, ShareASale) start reporting, log into each and check whether
  any of the click traffic converted to signups. The conversion-to-click
  ratio per network is the most important M3 input.

---

## Questions to answer at the meeting

These are the questions the data should answer. Print them, walk through them
in order, take notes on the answer for each one.

### Traffic & visibility

1. Did Google index all the sitemap URLs? If not, which ones are stuck and
   why?
2. What is the highest-ranking query that surfaces aifocus.work in Google
   results? Is it on-brand (academic + AI tools)?
3. Which review pages are getting impressions but not clicks? (Low CTR = bad
   title or description, fixable easily.)
4. Has Direct traffic grown beyond Alan, Jonathan, and known testers? (If
   yes, where is it coming from? Newsletter? Referrals?)

### Conversion

5. If the newsletter form is live, what is the visitor → subscriber rate?
   (Industry baseline for content sites: 1-2% of homepage visitors. <0.5% =
   form needs work; >3% = excellent.)
6. Which /go/ slug has the most clicks? Does it match Alan's expectation of
   which tool should dominate?
7. Has any affiliate program reported conversions? If yes, what's the
   click-to-signup ratio per network?

### Content & cross-linking

8. Which reviews have the most engagement (lowest bounce rate, longest time
   on page)? Are they the same ones we expected?
9. Of the 5 most-clicked internal links across the site, are any pointing to
   pages we have not built yet (and would be worth building)?

### Issues & maintenance

10. Has Cloudflare's WAF rule blocked new attack patterns we didn't anticipate?
11. Any 404s in Cloudflare's logs that suggest broken internal links or stale
    backlinks pointing in?
12. Has the site stayed up the whole 30 days? Any Cloudflare incidents or
    GitHub Pages outages?

---

## Decisions to make at the meeting

Based on what the data shows, pick **one** primary focus for the next 30
days. Resist the urge to commit to all three.

### Option A: Push for indexing + organic traffic

If pages are still slow to index or if rankings are weak, the next 30 days
should be spent on backlink-building from the outreach starter pack (see
`docs/outreach-starter-pack.md`). Focus: 5-10 pitches per week, 1-2 published
guest posts, 3-5 library/CTL link adds.

Right call when: search traffic is below 50 clicks/month at day 30 and
indexing coverage is below 70%.

### Option B: Push for affiliate conversion

If pages are indexed and getting some traffic but the /go/ clicks are not
converting, the next 30 days should be spent on:

- Affiliate program approvals chased to closure (replace remaining placeholder
  tracking IDs)
- A/B test the CTA copy on the highest-traffic reviews
- Add comparison pages ("X vs Y") for the top-clicked tools

Right call when: traffic is healthy (>500 page views/month) but conversion is
below network averages.

### Option C: Push for content depth

If everything's flat — traffic, conversion, signups — the answer may be that
11 reviews is below the threshold where SEO authority compounds. Next 30
days: add 4-6 more reviews of tools in adjacent categories (citation
managers, AI detection tools, AI-enabled note-taking apps), plus 2-3
"workflow guide" resource articles that surface the existing reviews
naturally.

Right call when: indexing is fine, individual pages perform well, but the
site as a whole is not gaining momentum.

---

## What we should NOT do at day 30

- **Do not redesign the site.** The visual design and information
  architecture are not the bottleneck at this stage. Traffic and conversion
  are.
- **Do not abandon Buttondown for a more expensive tool.** 100 subscribers is
  not a deliverability problem yet.
- **Do not chase new social platforms.** Reddit + LinkedIn engagement
  (mentioned in the outreach pack) is enough surface area for the first 90
  days.
- **Do not panic-add affiliate links to text.** The current placement is
  conservative on purpose — it preserves trust. Adding more affiliate links
  per page may dent the trust-to-monetisation ratio for a small short-term
  gain.

---

## How to capture this meeting

A short written summary, dated and saved to `docs/check-ins/30-day-YYYY-MM-DD.md`.
One paragraph per question, then the decision picked and one paragraph on why.

This document then becomes the input to the 60-day check-in (which would use
the same template structure).
