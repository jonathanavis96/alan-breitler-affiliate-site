# Deployment

The site is deployed to **two hosts in parallel** during the Cloudflare Pages
migration. They serve identical content from the same `main` branch but
under different URLs and base paths.

## At a glance

| Target            | Public URL                                                | Trigger                             | Base path                          |
| ----------------- | --------------------------------------------------------- | ----------------------------------- | ---------------------------------- |
| Cloudflare Pages  | `https://aifocus.work`                                    | Push to `main` (Cloudflare GitHub)  | `/`                                |
| GitHub Pages      | `https://jonathanavis96.github.io/alan-breitler-affiliate-site/` | Push to `main` (`.github/workflows/deploy.yml`) | `/alan-breitler-affiliate-site/`   |

Cloudflare Pages is the **primary** production target (the custom domain
`aifocus.work` points there). GitHub Pages is kept as a working fallback
in case the Cloudflare deployment ever needs to be turned off — both can
be live simultaneously without conflict because they serve under
different hostnames.

## How the dual-target build works

`astro.config.mjs` reads the `DEPLOY_TARGET` environment variable:

```js
const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

site: isCloudflare ? 'https://aifocus.work' : 'https://jonathanavis96.github.io',
base: isCloudflare ? '/'                    : '/alan-breitler-affiliate-site/',
```

- **Cloudflare Pages** sets `DEPLOY_TARGET=cloudflare` as a project-level
  environment variable in the Pages dashboard. Every CF build picks this
  up and emits root-relative URLs.
- **GitHub Pages** sets nothing. The default branch (no env var) builds
  with the project-page base path, which is what GitHub Pages needs to
  serve `https://<user>.github.io/<repo>/`.

Internal links throughout the codebase use the `url()` helper from
`src/lib/base.ts`, which reads `import.meta.env.BASE_URL` (auto-populated
by Astro from the `base` setting above). So every internal link
resolves correctly for whichever target it was built for, with no
per-page changes needed.

The sitemap (`@astrojs/sitemap`) and robots.txt
(`src/pages/robots.txt.ts`) both use the `site` config too, so their
URLs are also target-correct.

## Cloudflare Pages — project configuration

When the Pages project was created (via Workers & Pages → Create → Pages
→ Connect to Git), the following settings were applied:

| Setting              | Value                                  |
| -------------------- | -------------------------------------- |
| Repository           | `jonathanavis96/alan-breitler-affiliate-site` |
| Production branch    | `main`                                 |
| Framework preset     | Astro                                  |
| Build command        | `npm run build`                        |
| Build output dir     | `dist`                                 |
| Root directory       | `/` (repo root)                        |

### Environment variables (Pages → Settings → Environment variables)

Set under **Production** (Preview can mirror them or be left empty):

| Variable                    | Value                  | Why                                                    |
| --------------------------- | ---------------------- | ------------------------------------------------------ |
| `DEPLOY_TARGET`             | `cloudflare`           | Switches `astro.config.mjs` to root-base, aifocus.work site |
| `NODE_VERSION`              | `20`                   | Matches `.github/workflows/deploy.yml`                 |
| `PUBLIC_GA_MEASUREMENT_ID`  | `G-XXXXXXXXXX` *(when supplied by client)* | Enables GA4 — see "Google Analytics" below |

After changing any environment variable, trigger a redeploy
(Deployments tab → ⋯ on the latest deployment → "Retry deployment").
Environment variables are read at **build time**, not request time, so
existing deployed assets won't pick up the new value until a new build
runs.

## Custom domain

`aifocus.work` is attached to the Pages project under **Custom domains**.
Because the domain's DNS zone lives in the same Cloudflare account as
the Pages project, Cloudflare auto-creates the CNAME / proxy record
during attachment. No manual DNS entries are needed.

If the custom domain is ever removed or moved:

1. Pages project → Custom domains → Add → enter the hostname.
2. Cloudflare prompts to create the DNS record automatically — accept.
3. SSL provisioning is automatic (~5 minutes to "Active").

## Google Analytics (GA4)

The site has a GA4 skeleton wired in at `src/components/GoogleAnalytics.astro`,
included in `src/layouts/BaseLayout.astro`. **It renders nothing unless
the `PUBLIC_GA_MEASUREMENT_ID` environment variable is set at build time.**

### To enable GA4 (once the client provides the Measurement ID)

1. In Cloudflare Pages dashboard → project → Settings → Environment
   variables → **Production**, click **Add variable**:
   - **Name:** `PUBLIC_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (the real ID from the GA4 property —
     find it under GA Admin → Data Streams → Web → click the stream)
2. Save.
3. Redeploy: Deployments tab → ⋯ on latest → "Retry deployment".
4. Verify: open `https://aifocus.work` in DevTools → Network tab, filter
   `collect`, you should see requests to `google-analytics.com/g/collect`.
   GA4 → Reports → Realtime should also show 1 active user within ~30s.

### Why `PUBLIC_` prefix

Astro only exposes env vars to the browser if they're prefixed with
`PUBLIC_`. The GA Measurement ID is a public identifier (every site
running GA exposes it in every page), so this is correct. Never use
`PUBLIC_` for API keys or secrets.

### Affiliate click tracking — not done yet

The GA snippet covers all content pages but NOT the `/go/<slug>/`
affiliate redirect pages. Those are bare meta-refresh pages with no
layout, and adding GA to them is unreliable (the redirect can fire
before gtag.js loads, so the event would be lost).

**Recommended next step (Tier 3 follow-on work):** Convert
`src/pages/go/[slug].astro` to a Cloudflare Pages Function at
`functions/go/[slug].ts`. A Pages Function can:

1. Receive the request server-side at the edge.
2. POST a click event to GA4 via the Measurement Protocol API
   (`https://www.google-analytics.com/mp/collect?measurement_id=...&api_secret=...`).
3. Return a `Response.redirect(destination, 302)` to send the user on
   their way.

This is the only reliable way to track affiliate clicks because it
runs *before* the redirect, on the server, immune to ad-blockers and
fast clickers. Requires a GA4 Measurement Protocol API secret (created
under Admin → Data Streams → API secrets), which would also be set as
an env var in Cloudflare Pages.

## Local development

```bash
# Default — builds for GitHub Pages (matches origin/main behaviour)
npm run dev
npm run build

# Build for Cloudflare locally (to preview the production build)
DEPLOY_TARGET=cloudflare npm run build && npm run preview

# Build with GA4 enabled locally (use a test ID, not the real one)
PUBLIC_GA_MEASUREMENT_ID=G-TEST123456 DEPLOY_TARGET=cloudflare npm run build && npm run preview
```

For local-only env vars, create `.env.local` (gitignored):

```env
PUBLIC_GA_MEASUREMENT_ID=G-TEST123456
```

## Important — do NOT

- **Do not delete the GitHub Pages workflow** (`.github/workflows/deploy.yml`).
  It remains the fallback deploy. If Cloudflare ever has issues, the
  github.io URL is the safety net.
- **Do not hardcode the GA Measurement ID** into source. Always go
  through the env var so it can be rotated / removed without a code
  change.
- **Do not change `base` or `site` in `astro.config.mjs` directly** to
  fix a single deploy. The dual-target logic depends on the env-var
  branch staying intact. If you only need one target, remove the
  conditional entirely (see the long comment in `astro.config.mjs`).
- **Do not remove the `_headers` file in `public/`.** It sets cache
  and security headers on Cloudflare Pages. (GitHub Pages ignores it,
  so it's harmless there.)
- **Do not add the GA snippet directly to `BaseLayout.astro`** —
  always go through the `GoogleAnalytics` component so the env-var
  guard remains the single source of truth.

## Files touched by the migration (for reference)

- `astro.config.mjs` — dual-target site/base
- `src/components/GoogleAnalytics.astro` — GA4 skeleton (new file)
- `src/layouts/BaseLayout.astro` — includes `<GoogleAnalytics />`
- `src/pages/robots.txt.ts` — dynamic robots.txt (new file)
- `public/robots.txt` — removed (replaced by the dynamic endpoint)
- `docs/deployment.md` — this file
