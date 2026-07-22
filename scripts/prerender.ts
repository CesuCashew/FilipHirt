import { chromium } from "playwright";
import { preview } from "vite";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { articles } from "../src/data/articles";

const routes = [
  "/",
  "/cena",
  "/mimo-monitor",
  "/soukromi",
  ...articles.map((a) => `/zurnal/${a.slug}`),
];

async function main() {
  const server = await preview({ preview: { port: 4173, strictPort: false } });
  const base = server.resolvedUrls?.local[0];
  if (!base) throw new Error("[prerender] preview server did not resolve a local URL");

  try {
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();

      for (const route of routes) {
        // "/#now" skips Home's intro counter loader so content mounts instantly
        const navPath = route === "/" ? "/#now" : route;
        const url = new URL(navPath, base).toString();

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForSelector("main, .article-page, .price-page, .noc-page", { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(1200); // let React mount + Helmet write head tags

        const html = await page.content();
        const outFile = resolve(route === "/" ? "dist/index.html" : `dist${route}/index.html`);
        mkdirSync(dirname(outFile), { recursive: true });
        writeFileSync(outFile, html, "utf-8");
        console.log(`[prerender] ${route} -> ${outFile}`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  // Prerendering only enriches SEO meta/HTML for crawlers — the site still
  // works fine off the plain Vite build without it. A missing/broken
  // browser on the build host (e.g. a fresh Netlify image) shouldn't be
  // able to take production down, so warn instead of failing the build.
  console.warn("[prerender] skipped — falling back to the unprerendered build:", err.message || err);
  process.exit(0);
});
