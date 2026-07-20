import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { articles } from "../src/data/articles";

const SITE_URL = "https://filiphirt.cz";
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
  ...articles.map((a) => ({
    loc: `${SITE_URL}/zurnal/${a.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(process.cwd(), "dist/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`[sitemap] wrote ${urls.length} URLs to ${outPath}`);
