# Manish Beniwal — Shape-360 portfolio

Personal + agency portfolio for Manish Beniwal, Founder of Shape-360.
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · next-themes.

## Setup

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                   # http://localhost:3000
npm run build && npm start    # production
```

Requires Node 20+. TypeScript is pinned to 5.x (Next 15's config loader does not support TypeScript 7 yet).

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact-form emails via [Resend](https://resend.com). **Without it** the API returns 501 and the form opens a pre-filled `mailto:` instead. |
| `CONTACT_TO` | Inbox that receives enquiries (default `manish@shape360ai.com`). |
| `CONTACT_FROM` | Verified Resend sender, e.g. `Shape-360 <hello@shape360ai.com>`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and JSON-LD. |

## Editing content

All copy lives in `/content` — components contain no hard-coded copy.

| File | What it holds |
|---|---|
| `site.ts` | Identity, contact details, **social links** (fill the empty `href`s), availability badge, `showTestimonials` flag |
| `projects.ts` | All projects, filters, featured flag |
| `services.ts` | Services list, prices, FAQ |
| `resume.ts` | Experience, education, certifications, values |
| `stats.ts` | Counters + 3-step process |
| `tools.ts` | Favourite tools grid, free tools strip |
| `testimonials.ts` | **Placeholders only.** Replace with real quotes, then set `showTestimonials: true` in `site.ts` |

Search the codebase for `TODO verify` / `TODO add` to find every unconfirmed fact.

### Add a project

1. Add an entry to `content/projects.ts` using `make({...})` — `slug`, `title`, `client`, `category`, `filter` (`saas` | `ecommerce` | `business` | `landing`), `country`, `year`, `url`, `summary`, `challenge`, `solution`, `highlights`, `tags`, `headline`, `featured`. Add `results` only with real numbers.
2. Generate its images: `npm run screenshots -- <slug>`
   (writes `public/projects/<slug>/cover.webp` 1600×1000 and `mobile.webp` 390×844; falls back to a branded placeholder if the site is down or has no URL).
3. Featured projects (`featured: true`) appear in the home stack, marquee, footer and the "Next project" loop.

The detail page `/work/<slug>` is generated automatically (static params + metadata).

### Replace placeholder assets

- `public/me.jpg` — portrait (4:5 works best)
- `public/Manish-Beniwal-CV.pdf` — CV for the "Download CV" buttons

## Scripts

| Command | |
|---|---|
| `npm run screenshots` | Re-capture every project (`-- <slug> <slug>` for some, `-- --placeholders` for offline placeholders). Run `npx playwright install chromium` once first. |
| `npx tsx scripts/placeholder-assets.ts` | Regenerates the portrait/CV placeholders (overwrites them!). |

## Motion & accessibility notes

- Preloader runs once per session (sessionStorage) and is skipped under `prefers-reduced-motion`.
- Reduced motion also disables Lenis, SplitText reveals, marquees, pinning and the horizontal process scroll.
- Custom cursor, image cursor-trail and magnetic buttons only run on fine pointers (`hover: hover` and `pointer: fine`).
- Add `data-cursor="LABEL"` to any element to show a label in the cursor ring.

## Fonts

The display face is **Syne** (via `next/font/google`, self-hosted at build). To use Clash Display / General Sans from Fontshare, download the woff2 files into `app/fonts/`, load them with `next/font/local` in `app/layout.tsx`, and keep the `--f-display` variable name.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel (framework preset: Next.js, no build settings to change).
3. Add the environment variables above under Project → Settings → Environment Variables.
4. Deploy. Point your domain at the project and update `NEXT_PUBLIC_SITE_URL`.

Fully static export (`output: "export"`) is possible if you drop `app/api/contact` (use the mailto fallback) and set `images.unoptimized = true`.
