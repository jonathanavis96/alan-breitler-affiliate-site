# Affiliate Signup Guide — AIfocus

This guide walks you through signing up for the four affiliate networks
that cover the AI tools currently on AIfocus, plus the four new tools
launching with the next content update.

You only need to sign up to the **networks**, not to each tool
individually — once you're approved on a network, you apply to specific
tool programs from inside that network's dashboard.

**Total time:** ~30 minutes to submit all four applications. Approvals
take 1–7 days depending on the network.

---

## Why these four networks

The seven tools currently on the site, and the four launching with the
next content drop, run their affiliate programs through one of:

| Network        | Tools it covers                              |
| -------------- | -------------------------------------------- |
| Impact         | Grammarly, Otter.ai                          |
| PartnerStack   | Consensus, QuillBot                          |
| ShareASale     | Scite.ai                                     |
| Dub.co         | Perplexity Pro                               |

A handful of tools on the site (ChatGPT, Claude, Midjourney, GitHub
Copilot, Elicit) don't currently offer a public affiliate program —
they're kept on the site for SEO and discovery, but they're not part
of the revenue plan. See the "Tools without programs" section at the
end of this doc.

---

## Before you start

You'll need:

- A bank account or PayPal account (most networks pay out by ACH /
  bank transfer; some support PayPal)
- A US tax form (W-9 if US resident, W-8BEN if not) — networks will
  prompt you to upload this during signup
- The site URL: **<https://aifocus.work>**
- A brief description of the site, e.g.:
  > "AIfocus is an independent review site for AI tools used in academic
  > research, writing, and analysis. We score tools across ease of use,
  > academic value, and price-to-value to help researchers, students,
  > and educators pick the right tools."
- Approximate monthly traffic — even "new site, ramping up" is fine

When asked for the **promotional method**, pick "content site" or
"review site". Some forms ask for "website" vs "social" — pick
website / content.

---

## 1. Impact — Grammarly + Otter.ai

**Signup URL:** <https://app.impact.com/secure/sign-up>

**Approval bar:** Easy. Usually approved in 1–5 days.

### Steps

1. Go to the signup URL above. Click **"Sign up as a publisher"**.
2. Fill in the basic account details (name, email, password).
3. On the company-details screen, enter:
   - Company name: your name or business name
   - Website: `https://aifocus.work`
   - Country: your country
4. Verify your email via the link Impact sends.
5. Once inside the dashboard, go to **Brands → Find brands** (left
   sidebar) and search for **"Grammarly"**. Click "Apply".
6. Search for **"Otter.ai"** and click "Apply".

### After approval

For each tool, Impact will issue a unique tracking link. Send those to
Jonathan and they get plugged into `data/affiliates.json`:

```json
"grammarly-ai": {
  "destination": "https://imp.i123456.net/abc123...",
  "network": "impact",
  "active": true
}
```

### Commission detail

- **Grammarly:** $20 per premium signup, $0.20 per free signup, 90-day
  cookie, $50 minimum payout. Volume bonuses up to $800/mo.
- **Otter.ai:** ~20–25% per sale, 30-day cookie, $10 minimum payout,
  NET30 (paid 30 days after the month ends).

---

## 2. PartnerStack — Consensus + QuillBot

**Signup URL:** <https://market.partnerstack.com/>

**Approval bar:** Easy. Usually approved in ~1 week.

### Steps

1. Go to the signup URL. Click **"Become a partner"** or
   **"Sign up"** (whichever is visible).
2. Choose **"Marketing partner"** or **"Affiliate"** when prompted.
3. Fill in the partner profile:
   - Name / company name
   - Website: `https://aifocus.work`
   - Audience description: short paragraph about academic readers
   - Promotional methods: tick "website" / "content"
4. Verify your email.
5. From the PartnerStack dashboard, click **"Marketplace"** in the
   left sidebar. Search for and apply to:
   - **Consensus** (filed under "Consensus NLP" or "Consensus")
   - **QuillBot**

### Commission detail

- **Consensus:** 30% recurring commission for 12 months. Roughly $36
  per paying signup at current pricing.
- **QuillBot:** 10–20% recurring (up to ~$20 per subscriber), 30-day
  cookie. Commission tier scales with subscriber plan.

---

## 3. ShareASale — Scite.ai

**Signup URL:** <https://www.shareasale.com/info/affiliates/>

**Approval bar:** Easy. Usually approved in 1–3 days.

### Steps

1. Click **"Start"** or **"Affiliate sign up"**.
2. Choose a unique username — this becomes part of your tracking
   links, so something professional (e.g. `aifocus-jonathan`).
3. Fill in personal / business details and verify your email.
4. ShareASale will ask for your website + tax form (W-9 or W-8BEN).
   Upload both.
5. Once your account is approved (you'll get an email), log in and
   search the merchant list for **"scite"**. Click "Join program".

### Commission detail

- **Scite.ai:** 20% per sale, 30-day cookie (default).

---

## 4. Dub.co — Perplexity Pro

**Signup URL:** <https://partners.dub.co/perplexity/register>

**Approval bar:** Near-instant. Some applicants are approved within
minutes.

### Steps

1. Open the signup URL above (it's the Perplexity-specific Dub.co
   referral programme — not the generic Dub.co signup).
2. Enter your email + create a password.
3. Fill in basic profile: name, website (`https://aifocus.work`),
   country, audience description.
4. You'll get an immediate tracking link or short approval review.

### Commission detail

- **Perplexity Pro:** $10 flat per Pro signup + 10% recurring; $2
  bonus per Comet trial. Link-attributed (no traditional cookie —
  Dub.co tracks by short link click).

---

## After all approvals — sending tracking URLs to Jonathan

For each approved program, you'll be given a unique tracking URL that
looks something like:

- Impact: `https://imp.i123456.net/abc123XYZ`
- PartnerStack: `https://partnerstack.consensus.app/?ps_partner_key=...`
- ShareASale: `https://www.shareasale.com/r.cfm?b=12345&u=abc&m=...`
- Dub.co: `https://refer.perplexity.ai/abc123`

Send **all four URLs in a single message** to Jonathan with the tool
each belongs to. Jonathan will plug them into `data/affiliates.json`,
commit, push, and within ~2 minutes the live site at
**<https://aifocus.work>** will redirect through the new tracking links.

The existing in-content "go to tool" buttons all use the
`/go/<slug>/` redirect URL pattern (e.g. `/go/grammarly-ai/`) so the
content side never needs updating — just the redirect destinations.

---

## Tools without affiliate programs (for context)

Five tools on the site don't currently have a public affiliate
program. They're kept for SEO and brand recognition value — readers
search for these tools by name, land on AIfocus, and then convert on
the *other* tools that do have programs. Don't waste time hunting for
links to these:

| Tool             | Status                                                        |
| ---------------- | ------------------------------------------------------------- |
| ChatGPT / OpenAI | No public program. Enterprise partner intake only.            |
| Claude / Anthropic | No public program. Mar 2026 launched an enterprise consulting partner network, not affiliate. |
| Midjourney       | No cash program. Referral system pays existing Pro users in GPU hours, not commission. |
| GitHub Copilot   | No affiliate. Their Partner Programme is for tech extensions, not commissions. |
| Elicit           | Programme closed 12 May 2025. Not accepting new affiliates.   |

---

## Timeline expectation

If you start all four signups today:

- **Day 1:** Dub.co (Perplexity) link is live within an hour
- **Days 1–3:** ShareASale approval (Scite.ai)
- **Days 1–5:** Impact approval (Grammarly + Otter.ai)
- **Days 5–7:** PartnerStack approval (Consensus + QuillBot)

Worst-case, you'll have all six tracking URLs in hand within a week.
The site is ready to plug them in the moment they arrive.

---

## If a network rejects you

Rare on these four — they're all fairly easy approval bars for a
content site. If it happens:

- Most rejections cite "insufficient traffic" or "site not ready".
  Reply to the rejection email with a screenshot of the live site,
  emphasise it's a new but professionally produced review site, and
  ask for reconsideration. Approval after appeal is common.
- If a hard "no", let Jonathan know and we'll consider alternative
  networks (e.g. CJ Affiliate or Awin sometimes carry overlapping
  brands).

---

*Last updated: 2026-05-21*
