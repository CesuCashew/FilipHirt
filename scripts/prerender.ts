import { chromium } from "playwright";
import { preview } from "vite";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { articles } from "../src/data/articles";

const routes = [
  "/",
  "/cena",
  "/soukromi",
  ...articles.map((a) => `/zurnal/${a.slug}`),
];

async function main() {
  const server = await preview({ preview: { port: 4173, strictPort: false } });
  const base = server.resolvedUrls?.local[0];
  if (!base) throw new Error("[prerender] preview server did not resolve a local URL");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    // "/#now" skips Home's intro counter loader so content mounts instantly
    const navPath = route === "/" ? "/#now" : route;
    const url = new URL(navPath, base).toString();

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("main, .article-page, .price-page", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1200); // let React mount + Helmet write head tags

    const html = await page.content();
    const outFile = resolve(route === "/" ? "dist/index.html" : `dist${route}/index.html`);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, "utf-8");
    console.log(`[prerender] ${route} -> ${outFile}`);
  }

  await browser.close();
  await server.close();
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
