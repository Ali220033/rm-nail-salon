import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = path.resolve("public/images");
const outputRoot = path.join(imageRoot, "responsive");
await mkdir(outputRoot, { recursive: true });
const manifest = {};

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (file !== outputRoot) await visit(file);
      continue;
    }
    if (!/\.(webp|jpe?g|png)$/i.test(entry.name)) continue;
    const data = await readFile(file);
    const metadata = await sharp(data).metadata();
    if (!metadata.width || !metadata.height) continue;
    const url = `/images/${path.relative(imageRoot, file).replaceAll("\\", "/")}`;
    const hash = createHash("sha256").update(data).digest("hex").slice(0, 12);
    const candidates = [];
    const widths = [...new Set([128, 240, 480, 800, 1200, 1920].filter((width) => width < metadata.width).concat(Math.min(metadata.width, 1920)))];
    for (const width of widths) {
      const filename = `${hash}-${width}.webp`;
      const target = path.join(outputRoot, filename);
      try {
        await access(target);
      } catch {
        await sharp(data).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(target);
      }
      candidates.push({ src: `/images/responsive/${filename}`, width });
    }
    manifest[url] = { width: metadata.width, height: metadata.height, candidates };
  }
}

await visit(imageRoot);
await sharp(path.join(imageRoot, "rm-platinum-monogram.webp")).resize(32, 32, { fit: "contain" }).png().toFile("public/favicon.png");
await sharp(path.join(imageRoot, "rm-platinum-monogram.webp")).resize(180, 180, { fit: "contain" }).png().toFile("public/apple-touch-icon.png");
await writeFile("src/imageManifest.json", JSON.stringify(manifest));
console.log(`Prepared responsive, uncropped images for ${Object.keys(manifest).length} assets.`);
