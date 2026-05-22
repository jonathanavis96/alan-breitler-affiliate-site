# AIfocus — 5-Email Welcome Sequence

A drip sequence sent to every new newsletter subscriber over their first 14 days.
The goal of the sequence is three-fold:

1. **Establish trust** — show subscribers the editorial voice and the genuine usefulness
   of the recommendations before asking for anything in return.
2. **Drive first affiliate clicks** — the first revenue from a subscriber typically
   happens within the first 30 days or not at all. Each email surfaces one
   high-conviction tool with a clear use-case framing.
3. **Set up the long-term relationship** — by email 5, subscribers know what to
   expect from the weekly newsletter and have a reason to stay opted in.

## Sequence at a glance

| # | Subject line (draft) | Day | Primary CTA | Tools surfaced |
|---|---|---|---|---|
| 1 | Welcome — your AI shortlist is inside | Day 0 (immediate) | Read the top-tools rankings | All 11, with focus on top 3 |
| 2 | The 30-minute literature review workflow | Day 2 | Try Elicit free | Elicit + Consensus |
| 3 | The interview transcript that wrote itself | Day 5 | Try Otter free | Otter + Perplexity |
| 4 | Tools we use every day (and what they replaced) | Day 9 | Browse reviews | Claude Pro + Grammarly + QuillBot |
| 5 | What's coming next + a small ask | Day 14 | Reply with a tool to review | (No affiliate push) |

## Format conventions

- **Plain text** — no HTML chrome. Each email reads like a thoughtful one-to-one
  message. This is deliberate: research shows plain text drives higher engagement
  and lower spam rates for academic audiences than designer-template emails.
- **No clickbait** — subject lines are descriptive, not sensational. Open rates
  from this audience are driven by perceived utility, not curiosity gaps.
- **One affiliate link per email maximum** — keeps the trust-to-monetisation ratio
  honest. Email 5 has no affiliate at all.
- **British English** — matches the editorial voice on the site.
- **Always sign off as "The AIfocus team"** with a real-looking person's first name
  (e.g. "Sarah, AIfocus") — never an anonymous brand voice.

## How to load these into an email tool

Each `email-X-*.md` file is a paste-ready draft. The header block at the top of
each file lists:

- `subject:` — exact subject line
- `delay:` — when to send (relative to signup)
- `from:` — recommended sender
- `tags:` — useful for segmentation later

The body below the `---` line is the email content itself. Find-and-replace
`{{FIRST_NAME}}` with your email tool's first-name variable (Buttondown uses
`{{ subscriber.first_name }}`, ConvertKit uses `{{ subscriber.first_name }}`,
Mailchimp uses `*|FNAME|*`).

## Compliance notes

- Every email includes a one-line affiliate disclosure when an affiliate link is
  present. This satisfies FTC, ASA, and ICO guidance for affiliate marketing
  emails.
- The unsubscribe link is added automatically by every credible email provider —
  do not hand-write one.
- The first email asks no personal questions and includes only the affiliate
  disclosure plus the unsubscribe footer. This minimises GDPR exposure.

## When to revise

Review and refresh this sequence every 6 months. The dated content (specific
prices, model names, feature comparisons) ages fastest. The structural advice
(workflows, use cases) ages slowest.
