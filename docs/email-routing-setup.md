# Email Routing Setup — `aifocus.work`

**Goal:** Any email sent to any address `@aifocus.work` (e.g. `alan@aifocus.work`, `hello@aifocus.work`, `press@aifocus.work`) gets forwarded into a real inbox.

**Service:** Cloudflare Email Routing (free, inbound-only).
**Time:** ~5 minutes.
**Cost:** $0 forever.

---

## Why Cloudflare Email Routing

- Domain is already on Cloudflare → zero DNS migration.
- Inbound mail forwarding is the only thing we need right now (Alan reads & replies from his existing personal Gmail inbox).
- It can't *send* as `@aifocus.work`. If Alan later wants to reply *from* the aifocus.work address showing as the sender, we'd upgrade to Zoho Mail Free (separate doc, separate day).

---

## Setup Steps

### 1. Enable Email Routing on the zone

1. Sign in to Cloudflare → select the `aifocus.work` zone.
2. Left sidebar → **Email** → **Email Routing**.
3. Click **Get Started** (or **Enable Email Routing** if shown).
4. Cloudflare will auto-add the required MX and TXT records to DNS. Click **Add and enable Email Routing**.
5. You should now see the Email Routing dashboard.

### 2. Add a destination address (temporary: your own Gmail)

Until Alan sends us his preferred destination email, route to your own inbox so nothing bounces.

1. Email Routing → **Destination addresses** tab → **Add destination address**.
2. Enter `jonathanavis96@gmail.com`.
3. Cloudflare sends a verification email to that inbox.
4. Open the verification email → click the verify link.
5. The destination should now show as ✅ Verified.

### 3. Set the catch-all rule

1. Email Routing → **Routing rules** tab → scroll to **Catch-all address** at the bottom.
2. Toggle **Catch-all address** ON.
3. Action: **Send to an email**.
4. Destination: select `jonathanavis96@gmail.com`.
5. Click **Save**.

### 4. Test it

1. From **a different account** (NOT the destination Gmail), send a test email to `hello@aifocus.work`.
2. It should arrive in your destination Gmail inbox within ~30 seconds.
3. The `From` line will show the original sender; the `To` line shows `hello@aifocus.work`.

**Gotcha:** If you send the test *from* the same Gmail address you're routing *to*, Gmail will silently de-duplicate the message and you'll never see it in the inbox. Cloudflare actually detects this and sends a "Are you missing an email?" notification explaining the situation — receiving that notification is itself proof the routing works. To do a real test, use a different sender address (a different Gmail account, a personal address, etc.).

If the test fails for any other reason:

- Wait 2-3 minutes for MX record propagation, retry.
- Check that the destination address is ✅ Verified.
- Check Email Routing → **Activity Log** tab for any error messages.
- Verify DNS records show as `Locked` (not `Missing`) on the Settings tab.

---

## Swapping in Alan's Email (later)

Once Alan sends his preferred destination email (likely his personal Gmail or similar):

1. Email Routing → **Destination addresses** → **Add destination address**.
2. Enter Alan's email → he'll get a verification email from Cloudflare.
3. **Tell Alan to click the verify link** in that email. (Until he does, mail won't route there.)
4. Once verified, edit the Catch-all rule (Routing rules tab) → change destination from `jonathanavis96@gmail.com` to Alan's address.
5. Save. Done — all future mail to `*@aifocus.work` goes to Alan.

If Alan wants multiple addresses to go to different inboxes (e.g. `press@` and `partnerships@` to different recipients), use **Custom addresses** instead of/alongside catch-all. Same dashboard.

---

## What This Does NOT Do

- **Doesn't let Alan send email *as* `@aifocus.work`.** Inbound only. If he wants outbound, we set up Zoho Mail Free (free for 1 user, full inbox, MX swap).
- **Doesn't store mail on Cloudflare's side.** It's pure forwarding — if his Gmail is unreachable, mail bounces back to sender.
- **Doesn't replace Buttondown.** Newsletter signups still flow through Buttondown's own infrastructure; this is just for human-to-human email.

---

## Sender Authentication (optional, recommended later)

Once Alan's address is plugged in and a few real emails have flowed, consider adding:

- **SPF** — already auto-handled by Cloudflare's MX records.
- **DKIM** — auto-handled.
- **DMARC** — Cloudflare Email Routing → DMARC Management offers a one-click `p=none` policy to start. Useful if Alan starts sending newsletter blasts or transactional mail from `@aifocus.work` later.

Not urgent. Catch-all forwarding works without any of this.
