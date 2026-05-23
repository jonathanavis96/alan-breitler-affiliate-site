# Zoho Mail Setup — Outbound for `@aifocus.work`

**Use this when:** Alan asks "how do I reply *from* alan@aifocus.work?" — i.e. he wants the recipient to see `alan@aifocus.work` as the sender, not his personal Gmail.

**Why Zoho:** Cloudflare Email Routing handles inbound only (covered in `email-routing-setup.md`). Zoho Mail Free gives a full inbox with both inbound and outbound at no cost for 1 user on a custom domain.

**Cost:** $0/month forever (Forever Free plan — 1 user, 5 GB mailbox, custom domain).
**Time:** ~30 minutes (Alan signs up + we swap MX records).

---

## Decision Tree — Before Starting

Ask Alan:

1. **How often will you actually send email *as* `@aifocus.work`?**
   - "Rarely / for replies only" → Zoho Free is overkill. Just use Gmail's "Send mail as" feature with an SMTP relay (see Appendix A). Simpler, no MX swap.
   - "Regularly / it's my main work address" → Zoho Free is the right choice.

2. **Do you need a webmail interface, or do you want everything in Gmail?**
   - Webmail (separate Zoho login) → Zoho Free, default setup.
   - Everything in Gmail → Zoho Free + connect via IMAP/SMTP to Gmail (Alan adds the Zoho account in Gmail settings).

3. **Does Alan have a Microsoft/Outlook account he'd prefer?**
   - Outlook.com (free) also supports custom-domain aliases via a $1/year Microsoft 365 trick, but it's fiddlier than Zoho. Recommend Zoho unless he insists on Outlook.

---

## Migration Plan — Zoho Free with Cloudflare Email Routing Already Live

Cloudflare Email Routing is currently active on aifocus.work (catch-all → Jonathan's Gmail, soon → Alan's email). Moving to Zoho means **disabling** Cloudflare Email Routing first (or it conflicts at the MX level).

### Step 1 — Alan signs up at Zoho Mail

1. Alan goes to <https://www.zoho.com/mail/zohomail-pricing.html>.
2. Scroll to **Forever Free Plan** column → click **Sign Up Now**.
3. Choose **"I want to sign up with my domain"** → enter `aifocus.work`.
4. Create his Zoho account (username, password). Note: this is the master admin account, doesn't have to be `alan@aifocus.work` yet.
5. Zoho asks for domain verification — pick **TXT record** method. He'll get a TXT value like `zoho-verification=zb12345678.zmverify.zoho.com`.
6. **Send that TXT value to us** so we can add it to Cloudflare DNS (Alan's DNS lives there, so he can't add it himself unless we grant him access).

### Step 2 — We add the verification TXT in Cloudflare

1. Sign in to Cloudflare dash → aifocus.work zone → DNS → Records.
2. Add: **TXT** | name `@` | value (paste Zoho's `zoho-verification=...` string) | TTL Auto.
3. Save. Tell Alan it's live; have him click **Verify** in Zoho.

### Step 3 — Disable Cloudflare Email Routing (CRITICAL — do not skip)

If we leave Email Routing on, the MX records will conflict with Zoho's. Order matters: disable Cloudflare's MX first, then add Zoho's.

1. Cloudflare dash → aifocus.work → Email → Email Routing → Settings → **Disable**.
2. Confirm. Cloudflare removes the `route1/2/3.mx.cloudflare.net` MX records and the SPF/DKIM TXT records it added.
3. Confirm via `dig aifocus.work MX` from terminal — should return empty or nothing Cloudflare-related.

**Warning to Alan:** During this window (~5 minutes), inbound mail to `*@aifocus.work` will bounce. Schedule the swap for a low-traffic moment.

### Step 4 — Add Zoho's DNS records

Zoho will display a list of records to add. Add each one in Cloudflare DNS:

| Type | Name | Value | Priority |
|------|------|-------|----------|
| MX   | @ | `mx.zoho.com` | 10 |
| MX   | @ | `mx2.zoho.com` | 20 |
| MX   | @ | `mx3.zoho.com` | 50 |
| TXT  | @ | `v=spf1 include:zoho.com ~all` | — |
| TXT  | `zoho._domainkey` | (long DKIM key Zoho provides) | — |

(Exact values come from Zoho's setup screen — don't copy from this doc, use theirs.)

### Step 5 — Create Alan's inbox

1. Back in Zoho admin → **Users** → **Add User**.
2. Email: `alan@aifocus.work`. Set a password (or have Alan do it).
3. Optionally add `hello@`, `press@`, `partnerships@` as **aliases** to that same mailbox (no extra cost).

### Step 6 — Alan reads + sends

Two options:

**A) Zoho webmail** — Alan signs in at <https://mail.zoho.com> with `alan@aifocus.work`. Standard inbox UI.

**B) Pull into Gmail** — Alan's preferred path if he lives in Gmail:
   1. Gmail → Settings → Accounts → **Check mail from other accounts** → Add → `alan@aifocus.work`, server `imap.zoho.com:993` SSL.
   2. Gmail → Settings → Accounts → **Send mail as** → Add → use SMTP `smtp.zoho.com:465` SSL with `alan@aifocus.work` + the password set in Step 5.
   3. Now in Gmail, replies to mail sent to `alan@aifocus.work` will go out *as* `alan@aifocus.work`. Inbox stays unified.

### Step 7 — Test end-to-end

1. From another inbox, send a test to `alan@aifocus.work`. Confirm it arrives in Zoho (or Gmail, if Step 6B done).
2. Reply from `alan@aifocus.work`. Confirm the recipient sees that as the sender (not Alan's personal Gmail).
3. Check Zoho admin → **Spam Score** dashboard for the test, should be clean if SPF+DKIM are set.

---

## Re-enabling Cloudflare Email Routing Later

Zoho and Cloudflare Email Routing can't both serve the same domain — only one set of MX records wins. If Alan ever wants to switch back to "just forward to my Gmail" (e.g. he stops using `@aifocus.work` actively), reverse Step 3-4: delete Zoho MX records, re-enable Cloudflare Email Routing, accept its new MX records.

---

## Appendix A — Simpler Alternative: Gmail "Send mail as" with SMTP Relay

If Alan rarely sends as `@aifocus.work` and just wants the option to reply that way occasionally, skip Zoho entirely. Use an SMTP relay service:

- **Brevo (free)** — 300 emails/day free, SMTP credentials work as a relay.
- **Mailgun (pay-as-you-go)** — $0.80 per 1000 emails after free trial, cleaner deliverability.
- **SendGrid Free** — 100 emails/day free indefinitely.

Setup:
1. Alan signs up for one of the above.
2. He gets SMTP host/port/user/pass.
3. In Gmail → Settings → Accounts → **Send mail as** → Add `alan@aifocus.work` → paste SMTP credentials.
4. Gmail verifies via a one-time code (sent to `alan@aifocus.work`, which Cloudflare forwards to his Gmail — circular but works).
5. Done. Replies from `alan@aifocus.work` go out via Brevo/Mailgun/SendGrid, Cloudflare keeps handling inbound.

**Cloudflare Email Routing stays on** in this setup. No MX swap needed. Cleanest for low-volume outbound.

---

## Recommendation Summary

| Alan's situation | Recommended setup |
|---|---|
| "I just want to read mail to @aifocus.work in my Gmail." | Cloudflare Email Routing only (already done). No further action. |
| "I want to reply *as* @aifocus.work occasionally." | Cloudflare Email Routing + Brevo/SendGrid SMTP relay in Gmail (Appendix A). $0, no MX swap. |
| "I want a real inbox at @aifocus.work as my main work address." | Switch to Zoho Free (full plan above). |
| "I want multiple addresses (alan@, hello@, press@) routed to me." | Either path works — Zoho handles aliases natively; Cloudflare Email Routing lets you set custom rules per address. |
