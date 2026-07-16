# CLAUDE.md — Shamanicca BioPage

This file gives Claude Code complete context about this project. Read it fully before making any changes.

---

## Project Overview

**Shamanicca BioPage** — a link-in-bio style landing page (brand identity, YouTube playlists, book promo, blog articles, upcoming products) linked from Shamanicca's social profiles.

**Stack:** React 18 + Vite 6, Tailwind CSS, Sass, Swiper.js (sliders), Axios, FontAwesome icons.
**Live URL:** `https://shamanicca.com/bioIG`
**This repo is never deployed on its own.** It has no hosting of its own — its production build is vendored into a *different* repo (`web-app-graphql`, the Next.js site that owns the `shamanicca.com` domain on Vercel) and served from there as static files. See **Deployment** below before assuming a `git push` here does anything to production.

---

## Data Sources

- **Blog articles**: WordPress REST API (`wp-json`, not GraphQL) at `https://master.shamanicca.com/wp-json/wp/v2/posts?categories=82` (category 82 = "top-reads"). Fetched client-side in `BlogArticlesSlider.jsx` via `axios`.
- **Meditation / Subliminal audio**: YouTube Data API, by playlist ID, fetched client-side in `MeditationSlider.jsx` / `SubliminalAudioSlider.jsx`. API key and playlist IDs are hardcoded in `App.jsx` (they're YouTube Data API keys scoped to public playlist reads — not a secret credential in the traditional sense, but don't casually rotate/remove without checking the YouTube console first).
- **Brand identity, books, novelties**: static local data in `src/data/*.js` — no API involved.

### WordPress host — read this before touching any URL
- The **only working WordPress host is `master.shamanicca.com`**. The legacy host `shamanicca.com/cms/wp-json/...` returns **403 site-wide** and is dead — do not reintroduce it.
- REST media endpoints need the `/media/` segment: `.../wp-json/wp/v2/media/{id}`, not `.../wp-json/wp/v2/{id}`.
- `master.shamanicca.com` is the **headless WordPress backend only** — it's where content lives and where `wp-json` is queried, but it is not the public reading URL for a post. The public blog is served by the separate `web-app-graphql` Next.js app at `https://shamanicca.com/blog/<slug>` (its `blog/[slug].tsx` page fetches from `master.shamanicca.com` server-side and renders its own page). Any "Read More" / permalink built in this app must point at `shamanicca.com/blog/<slug>`, never at `master.shamanicca.com/<slug>/` directly.
- **CORS gotcha (bit us once already):** `master.shamanicca.com` sits behind a SiteGround cache. The CORS preflight (`OPTIONS`) always returns a correct `Access-Control-Allow-Origin` header, but if a `GET /wp-json/...` response gets cached *before* that header was configured (or from a request that had no `Origin`), the cached response can be served without `Access-Control-Allow-Origin` — which the browser then silently blocks (posts fail to load with no obvious error in this app, since errors are swallowed into the `error` state). If blog posts stop loading again despite a correct URL, **clear the SiteGround cache first** before assuming it's a code bug. A durable fix would be adding `Vary: Origin` or excluding `/wp-json/*` from SiteGround's page/object cache — not yet done.

---

## File Map

```
index.html                          — Vite entry HTML. <base href="/bioIG/"> MUST match vite.config.js `base` and the actual deployed path.
vite.config.js                      — base: '/bioIG/' — controls how built asset URLs (JS/CSS) are prefixed.
src/
├── main.jsx                        — ReactDOM root render
├── App.jsx                         — Single page, renders every section in order. Hardcodes WP_API_URL, YouTube API key + playlist IDs.
├── data/
│   ├── index.js                    — Combines brandData/booksData/noveltiesData into one `data` export
│   ├── brandData.js                — thumb image URL, logo (inline SVG data URI), slogan, social links
│   ├── booksData.js                — Book promo content
│   └── noveltiesData.js            — "Next Novelties" placeholder content
├── components/
│   ├── BrandIdentity.jsx           — Renders brand.thumb + brand.logo + SocialIcons
│   ├── SocialIcons.jsx             — Social links used by BrandIdentity (youtube/twitter/instagram/tiktok, conditionally rendered per brand.social)
│   ├── SocialMediaIcons.jsx        — Similar/older icon component — check before editing which one is actually wired in before assuming it's used
│   ├── MeditationSlider.jsx        — YouTube playlist slider (Swiper)
│   ├── SubliminalAudioSlider.jsx   — YouTube playlist slider (Swiper), same pattern as above
│   ├── BookPromo.jsx               — Single book promo card (Swiper wrapper, one slide)
│   ├── BlogArticlesSlider.jsx      — Fetches WP posts, renders Swiper slider + "Read More" links to master.shamanicca.com
│   └── NoveltiesSlider.jsx         — Static "coming soon" grid, not actually a Swiper despite the name
└── styles/
    ├── _main.scss, _styles.scss, _styles-btn.scss, _styles-swiper.scss — Sass partials
tailwind.config.js                  — Tailwind setup (custom `max-w-screen-bio` class used throughout App.jsx)
public/favicon/                     — Favicon set, referenced via absolute paths in index.html (Vite rewrites these with the `base` prefix at build time)
dist/                               — Build output (gitignored? verify — currently tracked in this repo's history; the folder that actually matters is the COPY of this living in web-app-graphql/public/bioIG/)
```

---

## Deployment (production)

**There is no CI/CD for this repo.** Deploying a change requires a manual build + copy into a sibling repo. Steps, in order:

1. Make your change in this repo (`shamanicca-biolink`), commit, push to `origin/main` — this preserves history but **does not affect production by itself**.
2. Build:
   ```sh
   npm run build
   ```
   This produces `dist/index.html`, `dist/assets/*.js`, `dist/assets/*.css` (content-hashed filenames — they change every build) and copies `public/favicon/*`.
3. Copy the build output into the Next.js app that actually serves `shamanicca.com`:
   ```sh
   rsync -a --delete /path/to/shamanicca-biolink/dist/ /path/to/web-app-graphql/public/bioIG/
   ```
   `--delete` matters — it removes the previous build's stale hashed JS/CSS filenames so you don't end up shipping two versions.
4. In `web-app-graphql`, confirm `next.config.js` still has this rewrite (should already be there — only re-add if it's missing):
   ```js
   async rewrites() {
     return [
       { source: '/bioIG', destination: '/bioIG/index.html' },
     ];
   },
   ```
   This exists because Next.js's static file serving does **not** auto-resolve a bare directory request (`/bioIG`) to `/bioIG/index.html` — without it, the bare path 404s even though the files are physically present.
5. Sanity-check locally before pushing (`next start`, not `next dev` — you're testing the production static-serving behavior):
   ```sh
   npm run build && npm run start
   curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/bioIG
   ```
   If you see a stale response or a 404 for a file you know exists, check for a leftover `next start` process still holding port 3000 from a previous session (`lsof -ti :3000`) before assuming the build is broken.
6. Commit + push `web-app-graphql`'s `public/bioIG/` and `next.config.js` changes. **This push is the one that actually matters** — Vercel's GitHub integration redeploys `web-app-graphql` on push to `main`, and that's what puts the change live at `shamanicca.com/bioIG`.

### Why it's wired this way
`shamanicca.com` used to be served by a traditional Apache host with `.htaccess` rewrites (`/bioIG` served from uploaded static files, `/cms` proxied to WordPress). The domain has since moved entirely to Vercel (the `web-app-graphql` Next.js app). Apache and `.htaccess` are no longer in the request path at all — any `.htaccess` file found in this repo's history is dead and should not be trusted or edited as if it does anything.

---

## Known Gotchas

| Issue | Cause | Fix |
|---|---|---|
| `/bioIG` 404s in production despite files being present | Missing/removed `rewrites()` entry in `web-app-graphql/next.config.js` | Re-add the `/bioIG` → `/bioIG/index.html` rewrite |
| Blog posts silently fail to load, URL is correct | SiteGround cache serving a stale `GET /wp-json/...` response without `Access-Control-Allow-Origin` | Clear SiteGround cache; consider `Vary: Origin` or excluding `/wp-json/*` from cache long-term |
| Brand thumbnail 404s or looks pixelated | WordPress serves multiple sized variants of the same upload (e.g. `-100x100`, `-233x233`); the exact filename must match an existing size | Check available sizes via `curl -I` before hardcoding a new size suffix in `brandData.js` |
| Editing `index.html`'s `<base href>` and it doesn't seem to matter | Every other absolute reference in this app (favicons, API URLs, image URLs) is root-absolute or a full URL, so `<base>` is currently cosmetic/inert | Still keep it in sync with `vite.config.js`'s `base` and the real deployed path — don't leave it stale, even though nothing visibly breaks today |
| Local dev server at `http://localhost:5173/bio/` per old README | README predates the `/bioIG` path migration | Ignore that instruction; the deployed base path is `/bioIG/`, not `/bio/` |
| Image never loads, `og:image`/`twitter:image` broken | `index.html` meta tags reference `/assets/shamanicca-thumbnail.jpg`, which does not exist anywhere in `public/` | Needs an actual image asset added — not yet fixed |

---

## Coding Rules

- Keep `vite.config.js`'s `base` and `index.html`'s `<base href>` in sync with the actual deployed subpath (currently `/bioIG/`) — if this ever changes, both must change together, plus the `next.config.js` rewrite in `web-app-graphql`.
- Any WordPress URL added to this codebase must point at `master.shamanicca.com`, never bare `shamanicca.com` (that host 403s) — verify with `curl -I` before committing a new endpoint.
- This is a single, static, client-fetched page — there's no server-side rendering or build-time data fetching here (unlike the `web-app-graphql` Next.js app). All API calls happen in `useEffect` on mount.
