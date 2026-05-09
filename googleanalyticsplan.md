# Google Analytics Integration Plan

## Status: Complete

## What Was Implemented

### GA4 Scripts — `src/app/layout.tsx`
Added two `<Script strategy="afterInteractive">` tags guarded by `NEXT_PUBLIC_GA_MEASUREMENT_ID`:
- Loads the gtag.js library from Google
- Initialises the GA4 property via `gtag('config', 'G-HRMTT5HVLV')`

### Page View Tracking — `src/components/GoogleAnalytics.tsx`
New client component using `usePathname()` to fire a `page_view` event on every client-side navigation, with a 100ms delay to allow Next.js to update `document.title` before reading it. Skips the initial render (handled by the automatic `gtag('config')` call).

### Post Page Titles — `src/app/posts/[slug]/page.tsx`
Added `generateMetadata` so each post sets its own `<title>` tag (e.g. `"Adding DeepSeek to VS Code | Neil Haddley"`), which is what GA4 records as the page title.

### On-Site Search Tracking — `src/components/PostsPageWithSearch.tsx`
Added a debounced `useEffect` (500ms) that fires a `search` event with `search_term` whenever a visitor types in the search box. Uses GA4's recommended `search` event name so results appear automatically under Reports → Engagement → Events.

### TypeScript Declaration — `src/types/gtag.d.ts`
Declares `window.gtag` and `window.dataLayer` so TypeScript doesn't error on the global references.

### GitHub Actions — `.github/workflows/deploy.yml`
Build step passes `NEXT_PUBLIC_GA_MEASUREMENT_ID` from a repository variable so the Measurement ID is baked into the static export on deployment.

## Measurement ID
`G-HRMTT5HVLV` (stored in `.env.local` locally; set as a GitHub Actions repository variable for production deploys)

## To Activate on Production
1. Go to GitHub repo → Settings → Variables → Actions
2. Add repository variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-HRMTT5HVLV`
3. Push to `main` — the deploy workflow will bake the ID into the static export

## What You Can See in GA4
- **Realtime** — active users, live page views, search events as they happen
- **Reports → Engagement → Events** — `page_view`, `search` (with `search_term`), `user_engagement`, `session_start`
- **Reports → Engagement → Pages and screens** — views per post, with correct post titles
- **Reports → Acquisition** — traffic sources (organic search, direct, referral)
