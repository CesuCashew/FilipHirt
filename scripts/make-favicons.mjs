// PNG/ICO fallbacky z public/favicon.svg — vždy regenerovat po úpravě loga,
// ať favicon-*.png, android-chrome-*.png a favicon.ico neusnou na starém
// designu (Google Search a Android home-screen ikony na SVG nedají).
// Spuštění: node scripts/make-favicons.mjs
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const svg = readFileSync(resolve("public/favicon.svg"), "utf-8");

// hranatá varianta: bez zaoblení podkladu a bez vnitřního rámečku
const appleSvg = svg
  .replace('rx="118"', 'rx="0"')
  .replace(/<rect x="5".*?opacity="0\.55"\/>/s, "");

const png = (size, file) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(resolve("public", file));

const out16 = await png(16, "favicon-16x16.png");
const out32 = await png(32, "favicon-32x32.png");
const out48 = await png(48, "favicon-48x48.png");
const out192 = await png(192, "android-chrome-192x192.png");
const out512 = await png(512, "android-chrome-512x512.png");
const out180 = await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(resolve("public/apple-touch-icon.png"));

const ico = await pngToIco([
  resolve("public/favicon-16x16.png"),
  resolve("public/favicon-32x32.png"),
  resolve("public/favicon-48x48.png"),
]);
writeFileSync(resolve("public/favicon.ico"), ico);

for (const [name, info] of [
  ["favicon-16x16.png", out16],
  ["favicon-32x32.png", out32],
  ["favicon-48x48.png", out48],
  ["android-chrome-192x192.png", out192],
  ["android-chrome-512x512.png", out512],
  ["apple-touch-icon.png", out180],
]) {
  console.log(name, info.width + "x" + info.height, info.size + "B");
}
console.log("favicon.ico", ico.length + "B");
