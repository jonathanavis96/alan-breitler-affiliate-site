# Affiliate Link Setup Guide — AIfocus

This guide explains how to set up and manage affiliate links on your AIfocus website. No coding experience is needed — you only need to edit one file.

---

## How Affiliate Links Work on Your Site

Every "Try [Product]" button on the site redirects through a special URL:

```
yoursite.com/go/product-name/ → affiliate tracking URL → product website
```

This approach gives you three benefits:

1. **One place to update** — Change a link once, and it updates everywhere on the site
2. **Clean URLs** — Visitors see `/go/chatgpt-plus/` instead of a long tracking URL
3. **Easy to manage** — No need to hunt through pages to find and update links

All affiliate links automatically include the required `rel="nofollow sponsored"` attribute for FTC/search engine compliance. The redirect pages are hidden from search engines.

---

## Where to Make Changes

All affiliate links are controlled by a single file:

```
data/affiliates.json
```

Open this file in any text editor (Notepad, VS Code, TextEdit, etc.).

---

## Step-by-Step: Updating an Affiliate Link

### Step 1: Sign Up for the Affiliate Program

Each product uses a different affiliate network. Here's where to sign up:

| Product | Network | Where to Sign Up |
|---------|---------|-----------------|
| **ChatGPT Plus** | Impact | [app.impact.com](https://app.impact.com) — search for "OpenAI" |
| **GitHub Copilot** | Impact | [app.impact.com](https://app.impact.com) — search for "GitHub" |
| **Consensus** | PartnerStack | [partnerstack.com](https://partnerstack.com) — search for "Consensus" |
| **Elicit** | PartnerStack | [partnerstack.com](https://partnerstack.com) — search for "Elicit" |
| **Grammarly** | ShareASale | [shareasale.com](https://www.shareasale.com) — search for "Grammarly" |
| **Midjourney** | Direct | Contact Midjourney directly (no public affiliate program at time of writing) |
| **Claude Pro** | Direct | Contact Anthropic directly (no public affiliate program at time of writing) |

### Step 2: Get Your Tracking URL

Once approved by a network, you'll get a unique tracking URL from their dashboard. It typically looks something like:

- **Impact:** `https://openai.sjv.io/c/YOUR_ID/YOUR_CAMPAIGN/openai`
- **PartnerStack:** `https://consensus.app/?via=YOUR_PARTNER_KEY`
- **ShareASale:** `https://www.shareasale.com/r.cfm?b=XXXXX&u=YOUR_ID&m=XXXXX`
- **Direct:** The company will provide a custom URL with your tracking code

### Step 3: Update the File

In `data/affiliates.json`, find the product you want to update. For example, to update ChatGPT Plus:

**Before (placeholder):**
```json
{
  "slug": "chatgpt-plus",
  "name": "ChatGPT Plus (OpenAI)",
  "destination": "https://chat.openai.com/upgrade?ref=REPLACE_WITH_YOUR_TRACKING_ID",
  "network": "impact",
  "placeholder": true,
  "active": true
}
```

**After (your real link):**
```json
{
  "slug": "chatgpt-plus",
  "name": "ChatGPT Plus (OpenAI)",
  "destination": "https://openai.sjv.io/c/12345/67890/openai",
  "network": "impact",
  "placeholder": false,
  "active": true
}
```

What changed:
- `destination` — replaced with your real tracking URL
- `placeholder` — changed from `true` to `false`

### Step 4: Rebuild and Deploy

After saving the file, rebuild the site:

```bash
npm run build
```

Then deploy the updated `dist/` folder to your hosting provider.

### Step 5: Test Your Links

Visit each redirect URL on your live site to confirm it goes to the right place:

| Test URL | Should Redirect To |
|----------|-------------------|
| `yoursite.com/go/chatgpt-plus/` | Your ChatGPT Plus affiliate URL |
| `yoursite.com/go/consensus-ai/` | Your Consensus affiliate URL |
| `yoursite.com/go/midjourney/` | Your Midjourney affiliate URL |
| `yoursite.com/go/github-copilot/` | Your GitHub Copilot affiliate URL |
| `yoursite.com/go/elicit-ai/` | Your Elicit affiliate URL |
| `yoursite.com/go/grammarly-ai/` | Your Grammarly affiliate URL |
| `yoursite.com/go/claude-pro/` | Your Claude Pro affiliate URL |

---

## Field Reference

Each link in `affiliates.json` has these fields:

| Field | What It Does | Can You Change It? |
|-------|--------------|--------------------|
| `slug` | URL identifier (e.g., `chatgpt-plus` creates `/go/chatgpt-plus/`) | **No** — must match `products.json` |
| `name` | Product name for your reference | Optional — doesn't appear on site |
| `destination` | Where visitors are redirected | **Yes** — this is the main thing to update |
| `network` | Which affiliate network | Optional — for your reference |
| `placeholder` | Whether this is still a placeholder link | **Yes** — set to `false` after adding your real URL |
| `active` | Whether the link is live | **Yes** — set to `false` to disable a link |

---

## Common Scenarios

### "I don't have an affiliate account for a product yet"

Leave the link as-is. The placeholder URL sends visitors directly to the product's website — they just won't be tracked for commissions. Update it when you're approved.

### "I want to temporarily disable a product's affiliate link"

Set `"active": false` for that product. The "Try" button will still appear on the site, but it won't link anywhere until you re-enable it.

### "I want to add a new product"

Adding a new product requires creating entries in both `products.json` and `affiliates.json`, plus writing a review. Contact your developer for help with this.

### "I updated the file but the links didn't change"

You need to rebuild the site after making changes:

```bash
npm run build
```

Then redeploy the `dist/` folder. The site is statically generated, so changes to data files only take effect after a rebuild.

---

## Quick Reference: All Affiliate Slugs

| Slug | Product | Site URL |
|------|---------|----------|
| `chatgpt-plus` | ChatGPT Plus | `/go/chatgpt-plus/` |
| `consensus-ai` | Consensus | `/go/consensus-ai/` |
| `midjourney` | Midjourney | `/go/midjourney/` |
| `github-copilot` | GitHub Copilot | `/go/github-copilot/` |
| `elicit-ai` | Elicit | `/go/elicit-ai/` |
| `grammarly-ai` | Grammarly with AI | `/go/grammarly-ai/` |
| `claude-pro` | Claude Pro | `/go/claude-pro/` |

---

## Need Help?

If you run into any issues updating your affiliate links, the key things to check are:

1. The JSON file is valid (no missing commas or quotes) — use [jsonlint.com](https://jsonlint.com) to verify
2. The `slug` values haven't been changed
3. The site has been rebuilt after saving changes
4. Your affiliate tracking URL is complete and correct (test it in your browser first)
