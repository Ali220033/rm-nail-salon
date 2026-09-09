import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = path.resolve("public/images");
const outputRoot = path.join(imageRoot, "responsive");
const recipe = "rm-webp90-native-v2";
await mkdir(outputRoot, { recursive: true });
const manifest = {};
const assets = [];
const audit = [];
async function visit(directory) {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (file !== outputRoot) await visit(file);
    } else if (/\.(webp|jpe?g|png)$/i.test(entry.name)) {
      const metadata = await sharp(file).metadata();
      if (!metadata.width || !metadata.height) continue;
      const oriented = metadata.autoOrient || metadata;
      assets.push({ file, name: path.parse(file).name, format: metadata.format,
        width: oriented.width, height: oriented.height,
        url: `/images/${path.relative(imageRoot, file).replaceAll("\\", "/")}` });
    }
  }
}
await visit(imageRoot);
const fingerprints = new Map();
async function fingerprint(asset) {
  if (!fingerprints.has(asset.file)) fingerprints.set(asset.file,
    await sharp(asset.file).rotate().resize(40, 40, { fit: "fill" }).removeAlpha().raw().toBuffer());
  return fingerprints.get(asset.file);
}
async function sameComposition(a, b) {
  // Only select an original counterpart when both its framing and colors match.
  if (Math.abs((a.width / a.height) / (b.width / b.height) - 1) > 0.002) return false;
  const [left, right] = await Promise.all([fingerprint(a), fingerprint(b)]);
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let i = 0; i < left.length; i++) difference += Math.abs(left[i] - right[i]);
  return difference / left.length < 3.5;
}
for (const asset of assets) {
  let source = asset;
  // Prefer a matching original over a previously compressed /fast/ derivative.
  if (asset.url.startsWith("/images/fast/")) {
    const alternatives = assets.filter(candidate => candidate.name === asset.name &&
      !candidate.url.startsWith("/images/fast/") && candidate.width >= asset.width)
      .sort((a, b) => b.width - a.width || Number(b.format === "png") - Number(a.format === "png"));
    for (const candidate of alternatives) {
      if (await sameComposition(asset, candidate)) { source = candidate; break; }
    }
  }
  const data = await readFile(source.file);
  const originalData = source === asset ? data : await readFile(asset.file);
  const hash = createHash("sha256").update(recipe).update(data).digest("hex").slice(0, 12);
  const widths = [...new Set([128, 240, 480, 800, 1200, 1600, 1920, 2560, 3200, 3840]
    .filter(width => width < source.width).concat(Math.min(source.width, 3840)))];
  for (const width of widths) {
    const target = path.join(outputRoot, `${hash}-${width}.webp`);
    try { await access(target); } catch {
      // Native-size ceiling: no invented detail, sharpening, HDR or crop changes.
      await sharp(data).rotate().resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
        .webp({ quality: 90, alphaQuality: 100, smartSubsample: true }).toFile(target);
    }
  }
  // Keep intrinsic layout geometry and full-size URLs identical to the original.
  manifest[asset.url] = { width: asset.width, height: asset.height, hash, widths };
  audit.push({ image: asset.url, source: source.url, width: asset.width, height: asset.height,
    sourceWidth: source.width, sourceHeight: source.height, widths,
    originalSha256: createHash("sha256").update(originalData).digest("hex") });
}
// Existing favicon identity remains outside this header-only brand update.
await sharp(path.join(imageRoot, "rm-platinum-monogram.webp")).resize(32, 32, { fit: "contain" }).png().toFile("public/favicon.png");
await sharp(path.join(imageRoot, "rm-platinum-monogram.webp")).resize(180, 180, { fit: "contain" }).png().toFile("public/apple-touch-icon.png");
await writeFile("src/imageManifest.json", JSON.stringify(manifest));
await mkdir("output/image-quality", { recursive: true });
await writeFile("output/image-quality/audit.json", JSON.stringify({ recipe, assets: audit }, null, 2));
console.log(`Prepared ${assets.length} image sources; ${audit.filter(a => a.source !== a.image).length} use verified original counterparts. Originals preserved; no artificial upscaling.`);
