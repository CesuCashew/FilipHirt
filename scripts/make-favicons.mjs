// PNG fallbacky z public/favicon.svg: favicon.png 32x32 (se zaoblením)
// a apple-touch-icon.png 180x180 (hranatý full-bleed — rohy si maskuje iOS).
// Spuštění: node scripts/make-favicons.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const svg = readFileSync(resolve("public/favicon.svg"), "utf-8");

// hranatá varianta: bez zaoblení podkladu a bez vnitřního rámečku
const appleSvg = svg
  .replace('rx="118"', 'rx="0"')
  .replace(/<rect x="5".*?opacity="0\.55"\/>/s, "");

const out32 = await sharp(Buffer.from(svg)).resize(32, 32).png().toFile(resolve("public/favicon.png"));
const out180 = await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(resolve("public/apple-touch-icon.png"));
console.log("favicon.png", out32.width + "x" + out32.height, out32.size + "B");
console.log("apple-touch-icon.png", out180.width + "x" + out180.height, out180.size + "B");
