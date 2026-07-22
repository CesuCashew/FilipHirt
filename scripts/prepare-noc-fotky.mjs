// Jednorázová konverze osobních nočních fotek (fotkyosobni/) do public/.
// Pořadí = zastávky noci na /mimo-monitor. Spuštění: node scripts/prepare-noc-fotky.mjs
import sharp from "sharp";
import { resolve } from "node:path";

const SHOTS = [
  ["YHKM5086.JPG", "noc-1"],
  ["DINF4568.JPG", "noc-2"],
  ["XQWT6086.JPG", "noc-3"],
  ["ONLU7728.JPG", "noc-4"],
  ["DJKD0857.JPG", "noc-5"],
];

for (const [src, out] of SHOTS) {
  const input = resolve("fotkyosobni", src);
  // ONLU je hero zastávka — nechává se větší
  const width = out === "noc-4" ? 2000 : 1600;
  const info = await sharp(input)
    .rotate() // respektuj EXIF orientaci
    .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(resolve("public", `${out}.webp`));
  console.log(`${src} -> public/${out}.webp (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} kB)`);
}
