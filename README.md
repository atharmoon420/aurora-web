# aurora-web — the AURORA application

The four standalone surfaces are now **one Next.js app** (App Router + TypeScript),
sharing data and types. It builds clean (`next build` → 13 static pages) and runs
with no API key or database — it reads the engine's output shape from
`data/articles.json`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verified: compiles, all routes prerender)
```

## Routes

| Route | What it is |
|-------|-----------|
| `/` | Homepage — React Three Fiber 3D hero + latest articles from shared data |
| `/[category]/[slug]` | Article reader — full package, trust layer, embedded `NewsArticle` JSON-LD (statically generated per article) |
| `/admin/review` | Editorial review console — tabs, what-if confidence slider, approve / hold / reject (interactive) |
| `/standards`, `/corrections`, `/ai-disclosure` | Trust pages (required for Google News eligibility) |

## How it's wired

- `lib/articles.ts` is the single source of truth (types + accessors); every route reads from it.
- `data/articles.json` holds articles in the engine's `StructuredArticle` shape. **This is the seam:** point it at the engine's `out/` output, then at Postgres, with no route changes.
- `components/Hero3D.tsx` is the R3F scene, loaded client-only via `next/dynamic`.
- Article pages embed real schema.org JSON-LD and set canonical/OG metadata via `generateMetadata`.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · React Three Fiber + three · global brand CSS.

## Next steps

1. Replace `data/articles.json` with a loader that reads the engine output, then a Prisma/Postgres data layer.
2. Add auth (Clerk/Auth.js) to gate `/admin`.
3. Move the homepage's full cinematic effects (custom cursor, Lenis, GSAP, ticker) over from the standalone `aurora-newsroom.html`.
4. Add translation routes (`hreflang`) for the 12 languages and the sitemap/robots generation.

## Connecting the engine (live data)

The engine and this app share one data contract.

1. In the engine, run the pipeline — it writes `out/web-feed.json`:
   ```bash
   cd ../aurora && npm run pipeline
   ```
2. In this app, pull that feed into `data/articles.json` and rebuild:
   ```bash
   cd ../aurora-web && npm run sync && npm run build
   ```

`npm run sync` overwrites `data/articles.json` with the engine's output. A curated
default ships in the repo so the homepage looks complete before you run the engine;
sync replaces it with whatever the pipeline just produced. (Verified end-to-end:
engine run → sync → `next build` regenerates the article pages from engine data.)
