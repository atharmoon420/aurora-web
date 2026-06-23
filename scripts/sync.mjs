// Sync the engine's published feed into the web app's data file.
// Usage: npm run sync            (reads ../aurora/out/web-feed.json)
//        npm run sync -- /path/to/web-feed.json
//        ENGINE_FEED=/path npm run sync
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = process.argv[2] || process.env.ENGINE_FEED || resolve(here, "../../aurora/out/web-feed.json");
const dest = resolve(here, "../data/articles.json");

if (!existsSync(src)) {
  console.error(`\n  Engine feed not found at:\n    ${src}\n\n  Run the engine first:  (cd ../aurora && npm run pipeline)\n`);
  process.exit(1);
}

const data = JSON.parse(readFileSync(src, "utf8"));
if (!Array.isArray(data) || data.length === 0) {
  console.error("  Engine feed is empty — nothing to sync.");
  process.exit(1);
}
writeFileSync(dest, JSON.stringify(data, null, 2) + "\n");
console.log(`\n  Synced ${data.length} article(s) from the engine -> data/articles.json`);
console.log(`  Rebuild the site to publish them:  npm run build\n`);
