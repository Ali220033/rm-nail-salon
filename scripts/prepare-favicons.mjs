import assert from "node:assert/strict";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Use the same owner-approved Tiffany artwork as the header. Never rebuild
// favicons from the older platinum/glass monograms.
const source = "public/brand/rm-raised-256.webp";
const metadata = await sharp(source).metadata();
assert.equal(metadata.width, metadata.height, "The approved RM logo must be square.");
assert.ok(metadata.width >= 256, "Use native artwork large enough for all logo exports.");
await mkdir("public/brand", { recursive: true });
const png = (size) => sharp(source).resize(size, size, { fit: "contain" }).png().toBuffer();
const logo = await png(256);
await writeFile("public/brand/rm-tiffany-logo.png", logo);
await writeFile("public/brand/rm-tiffany-favicon.png", await png(96));
await writeFile("public/brand/rm-tiffany-apple-touch-icon.png", await png(180));
await copyFile("public/brand/rm-tiffany-favicon.png", "public/favicon.png");
await copyFile("public/brand/rm-tiffany-apple-touch-icon.png", "public/apple-touch-icon.png");

// Keep the legacy SVG URL consistent too, without redrawing the supplied logo
// or relying on external resources to render a browser icon.
await writeFile("public/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><image width="256" height="256" href="data:image/png;base64,${logo.toString("base64")}"/></svg>\n`);
console.log("Prepared Tiffany RM browser, touch and business-logo assets.");
