# Newsletter Setup — Buttondown

This guide is for Alan. Following it takes about 10 minutes and turns the
"Coming soon" newsletter form on aifocus.work into a fully working signup that
captures real subscribers.

We recommend **Buttondown** because it has the simplest setup, the lowest cost
($9/month for the first 1,000 subscribers), is built for plain-text newsletters
(which matches the AIfocus editorial voice better than designer-template tools
like Mailchimp), and has a single embed endpoint that "just works" without any
JavaScript or form-builder UI.

The site is already pre-wired to accept Buttondown — you only need to do two
things: sign up, then paste your username into one config file.

---

## Step 1 — Sign up for Buttondown

1. Go to **https://buttondown.com/signup**
2. Sign up with your aifocus.work email address (or another address you control).
3. Pick a username. **Make a note of this — you'll need it in Step 3.**
   - Recommended: use `aifocus` if available, otherwise `aifocus-work` or `alanbreitler`.
   - The username appears in the embed URL — keep it short and on-brand.
4. Pick the Free plan to start (100 subscribers, fully functional). You can
   upgrade to Standard ($9/mo) when you cross 100 subscribers.
5. Confirm your email when the verification email arrives.

That's the whole signup. No need to design a form, customise a template, or set
up tags — the site does all of that already.

---

## Step 2 — (Optional but recommended) Customise your sender details

In the Buttondown dashboard:

1. Go to **Settings → Newsletter**.
2. Set the **Newsletter name** to `AIfocus`.
3. Set the **From name** to `Alan` (or `Alan, AIfocus`).
4. Set the **From email** to an address you check — `hello@aifocus.work`,
   `alan@aifocus.work`, or your real address.
5. Optionally, write a short newsletter description that appears on the
   public profile page.

Skip the colour customisation and welcome email — the welcome sequence we built
(in `docs/email-sequences/welcome/`) replaces Buttondown's default welcome.

---

## Step 3 — Wire the form into the site

Open the file `data/site.json` in the project. Find the `newsletter` section
near the bottom — it looks like this:

```json
"newsletter": {
  "provider": "placeholder",
  "endpoint": "",
  ...
}
```

Change two values:

```json
"newsletter": {
  "provider": "buttondown",
  "endpoint": "https://buttondown.email/api/emails/embed-subscribe/YOUR-USERNAME-HERE",
  ...
}
```

Replace `YOUR-USERNAME-HERE` with the username you picked in Step 1. So if your
username is `aifocus`, the endpoint becomes:

```
https://buttondown.email/api/emails/embed-subscribe/aifocus
```

Save the file.

---

## Step 4 — Push the change

Commit and push the change to `main`:

```bash
git add data/site.json
git commit -m "Activate Buttondown newsletter signup"
git push origin main
```

Cloudflare Pages will rebuild and redeploy automatically within ~60 seconds.

---

## Step 5 — Test the form

1. Visit https://aifocus.work/ — scroll down to the "Join the Newsletter"
   block in the section above the footer.
2. The "Coming soon" label should now be replaced with "Subscribe."
3. Enter a test email (your own is fine).
4. Click Subscribe. A new tab opens with Buttondown's confirmation page.
5. Check your inbox — you'll get a "Please confirm your subscription" email
   from Buttondown.
6. Click the confirmation link in that email.
7. You're now subscribed. Confirm by checking the **Subscribers** page in your
   Buttondown dashboard — your email should appear there.

If anything doesn't work, the most common issue is a typo in the username in
`site.json`. Double-check it matches your Buttondown username exactly (no
trailing slash, no spaces).

---

## Step 6 — Set up the welcome sequence

You have 5 pre-written welcome emails in `docs/email-sequences/welcome/` ready
to load into Buttondown. To set them up:

1. In Buttondown, go to **Automations → New automation**.
2. Trigger: **Subscriber confirms subscription**.
3. Add 5 emails in sequence with the following delays:

| # | File | Delay after signup |
|---|---|---|
| 1 | `email-1-welcome.md` | Immediate (0 days) |
| 2 | `email-2-literature-review-workflow.md` | 2 days |
| 3 | `email-3-interview-transcription.md` | 5 days |
| 4 | `email-4-daily-tools.md` | 9 days |
| 5 | `email-5-whats-next.md` | 14 days |

For each email:

1. Copy the **subject line** from the file's header (the `subject:` field
   inside the `---` block at the top).
2. Copy the **body** (everything below the closing `---`).
3. Paste both into the new automation email.
4. Replace `{{FIRST_NAME}}` with Buttondown's first-name variable:
   `{{ subscriber.first_name }}`
   (the exact syntax is in Buttondown's docs — they use Jinja-style merge tags).
5. Set the delay per the table above.
6. Activate the automation.

Test by signing up again with a fresh email — you should receive email 1
immediately, email 2 in two days, and so on.

---

## Cost summary

| Tier | Subscribers | Price/month |
|---|---|---|
| Free | 0–100 | $0 |
| Standard | 101–1,000 | $9 |
| Plus | 1,001–10,000 | $29 |
| Pro | 10,001+ | $79 |

The Free tier is enough to validate everything works and to start collecting
your first hundred subscribers. Upgrade when you cross 100.

---

## Switching to a different provider later

The site is built so that switching providers is a one-line change in
`data/site.json`. If you ever want to move to ConvertKit, Mailchimp, or
something else:

1. Change `"provider": "buttondown"` to `"provider": "convertkit"` (or
   `"mailchimp"`).
2. Update the `endpoint` to the new provider's URL.
3. Commit and push.

That's it. No code changes needed.

---

## Troubleshooting

**"Coming soon" is still showing after I changed site.json.**
The Cloudflare Pages rebuild may take a minute. Hard-refresh the page
(Ctrl+Shift+R). If still showing after 5 minutes, check the Cloudflare Pages
deploy log for build errors.

**Confirmation email isn't arriving.**
Check spam. If still missing, check Buttondown's "Sender reputation" — first
emails sometimes go through a delivery delay while Buttondown warms up your
domain.

**Form opens Buttondown's site in a new tab — can it stay on aifocus.work?**
The current setup opens Buttondown's confirmation in a new tab and shows
an in-page success message on aifocus.work. This is intentional — it lets
Buttondown handle the GDPR-compliant double opt-in flow without us having to
build a separate confirmation page. The behaviour is standard for Buttondown
embed forms.

**Can I A/B test different newsletter copy?**
Yes, via the `source` parameter on the NewsletterSignup component. Each
instance of the form on the site already sends a different `source` value
(homepage, footer, etc.) — Buttondown captures these and you can segment
subscribers in the dashboard.
