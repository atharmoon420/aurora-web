# Deploying aurora-web (the site + console)

## Vercel (recommended)
1. Push this folder to a Git repo and import it in Vercel (it auto-detects Next.js).
2. Set environment variables in the Vercel dashboard:
   - `ADMIN_PASSWORD` — gate for the `/admin` console
   - `NEXT_PUBLIC_SITE_URL` — your production domain
3. Deploy. `/admin/*` is `noindex` (see vercel.json) and gated by middleware.

## Data
Out of the box the site reads `data/articles.json`. To publish live engine output:
```bash
(cd ../aurora && npm run pipeline)   # or: npm run serve  (continuous)
npm run sync                          # engine feed -> data/articles.json
```
In production, replace the JSON read in `lib/articles.ts` with a fetch from your
database (the engine's Postgres store), and trigger redeploys/ISR on new content.

## Auth
The included gate is a single shared password (middleware + cookie) — fine to start.
For real editorial teams, swap to Auth.js or Clerk with per-user accounts and roles;
the only files to change are `middleware.ts` and `app/api/admin/*`.
