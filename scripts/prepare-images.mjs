import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile, access, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = path.resolve("public/images");
const outputRoot = path.join(imageRoot, "responsive");
const recipe = "rm-webp90-native-v2";
const avifRecipe = "rm-avif-444-native-v2";
// Audited public photographs: only these need the additional delivery sizes/formats.
const optimizedImages = new Set([
  "/images/fast/brand-city-skyline-tight.webp",
  "/images/fast/brand-face-red-nails-framed.webp",
  "/images/fast/brand-salon-front.webp",
  "/images/fast/contact-salon-interior.webp",
  "/images/fast/drive-asian-1.webp",
  "/images/fast/drive-asian-5.webp",
  "/images/fast/drive-brown-1.webp",
  "/images/fast/drive-midtown.webp",
  "/images/fast/service-acrylic-dip-removal-new.webp",
  "/images/fast/service-cat-eye-new.webp",
  "/images/fast/service-chrome-design-new.webp",
  "/images/fast/service-classic-french-new.webp",
  "/images/fast/service-combo-best-friends-new.webp",
  "/images/fast/service-combo-clean-real.webp",
  "/images/fast/service-combo-four-hands-new.webp",
  "/images/fast/service-combo-gel-no-polish-new.webp",
  "/images/fast/service-combo-mens-grooming-new.webp",
  "/images/fast/service-combo-mr-mrs-new.webp",
  "/images/fast/service-combo-natural-care-new.webp",
  "/images/fast/service-combo-no-polish-regular-pedi-new.webp",
  "/images/fast/service-combo-russian-gel-smart-gel-new.webp",
  "/images/fast/service-gel-removal-new.webp",
  "/images/fast/service-hooked-nail-fix-new.webp",
  "/images/fast/service-japanese-clear-new.webp",
  "/images/fast/service-mens-no-polish-new.webp",
  "/images/fast/service-nail-designs-new.webp",
  "/images/fast/service-ombre-design-new.webp",
  "/images/fast/service-one-nail-repair-new.webp",
  "/images/fast/service-removal-hands-new.webp",
  "/images/fast/service-removal-toes-new.webp",
  "/images/fast/service-russian-extensions-new.webp",
  "/images/fast/service-russian-hard-gel-new.webp",
  "/images/fast/service-russian-natural-new.webp",
  "/images/fast/service-smart-gel-pedicure-new.webp",
  "/images/fast/service-smart-pedicure-natural-new.webp",
  "/images/gallery-1346/rm-gallery-01.webp",
  "/images/gallery-1346/rm-gallery-03.webp",
  "/images/gallery-1346/rm-gallery-04.webp",
  "/images/gallery-1346/rm-gallery-05.webp",
  "/images/gallery-1346/rm-gallery-06.webp",
  "/images/gallery-1346/rm-gallery-07.webp",
  "/images/gallery-1346/rm-gallery-08.webp",
  "/images/gallery-1346/rm-gallery-09.webp",
  "/images/gallery-1346/rm-gallery-10.webp",
  "/images/gallery-1346/rm-gallery-11.webp",
  "/images/gallery-1346/rm-gallery-12.webp",
  "/images/gallery-1346/rm-gallery-13.webp",
  "/images/gallery-1346/rm-gallery-14.webp",
  "/images/gallery-1346/rm-gallery-15.webp",
  "/images/gallery-1346/rm-gallery-16.webp",
  "/images/gallery-1346/rm-gallery-17.webp",
  "/images/gallery-1346/rm-gallery-18.webp",
  "/images/gallery-1346/rm-gallery-19.webp",
  "/images/gallery-1346/rm-gallery-20.webp",
  "/images/gallery-1346/rm-gallery-21.webp",
  "/images/gallery-1346/rm-gallery-22.webp",
  "/images/gallery-1346/rm-gallery-23.webp",
  "/images/gallery-1346/rm-gallery-24.webp",
  "/images/gallery-1346/rm-gallery-25.webp",
  "/images/gallery-1346/rm-gallery-26.webp",
  "/images/gallery-1346/rm-gallery-27.webp",
  "/images/gallery-1346/rm-gallery-28.webp",
  "/images/gallery-1346/rm-gallery-29.webp",
  "/images/gallery-1346/rm-gallery-30.webp",
  "/images/gallery-1346/rm-gallery-31.webp",
  "/images/gallery-1346/rm-gallery-32.webp",
  "/images/gallery-1346/rm-gallery-33.webp",
  "/images/gallery-blue-gray.png",
  "/images/gallery-extensions.png",
  "/images/hero-rm-hq.webp",
  "/images/hero-rm-mobile-hq.webp",
  "/images/ref-service-banner.jpg",
  "/images/reviews/booksy-alexa-work.jpeg",
  "/images/reviews/booksy-aryuna-work.jpeg",
  "/images/reviews/booksy-b.jpeg",
  "/images/reviews/booksy-eldor-work.jpeg",
  "/images/reviews/booksy-jacqueline.jpeg",
  "/images/reviews/booksy-lauren.jpeg",
  "/images/reviews/booksy-nikki-work.jpeg",
  "/images/reviews/review-work-01.webp",
  "/images/reviews/review-work-04.webp",
  "/images/reviews/review-work-05.webp",
  "/images/reviews/review-work-06.webp",
  "/images/reviews/review-work-07.webp",
  "/images/reviews/review-work-08.webp",
  "/images/reviews/review-work-09.webp",
  "/images/reviews/review-work-10.webp",
  "/images/rm-hero-editorial.png",
  "/images/rm-salon-interior-green.webp",
  "/images/service-extensions.png",
  "/images/service-fill-in.png",
  "/images/service-hard-gel.png",
  "/images/service-regular-polish.png",
  "/images/service-smart-pedicure.png",
  "/images/service-vip-room.png",
  "/images/work-reel-process.png"
]);
const originalMasters = {
  "/images/hero-rm-mobile-hq.webp": "/images/rm-hero-editorial.png",
  "/images/hero-rm-hq.webp": "/images/rm-hero.png"
};
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
async function originalFor(asset) {
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
  const mapped = assets.find(candidate => candidate.url === originalMasters[asset.url]);
  if (mapped && await sameComposition(asset, mapped)) source = mapped;
  return source;
}
// Derive alias membership from source content on every build. The generated
// manifest is deliberately not an input: a fresh checkout does not contain it.
const sources = new Map();
const optimizedHashes = new Set();
for (const asset of assets) {
  const source = await originalFor(asset);
  sources.set(asset.url, source);
  if (optimizedImages.has(asset.url)) {
    optimizedHashes.add(createHash("sha256").update(recipe).update(await readFile(source.file)).digest("hex").slice(0, 12));
  }
}
for (const asset of assets) {
  const source = sources.get(asset.url);
  const data = await readFile(source.file);
  const originalData = source === asset ? data : await readFile(asset.file);
  const hash = createHash("sha256").update(recipe).update(data).digest("hex").slice(0, 12);
  const optimized = optimizedImages.has(asset.url) || optimizedHashes.has(hash);
  let widths = [...new Set((optimized ? [128, 160, 240, 360, 480, 640, 800, 896, 1080, 1280, 1600, 1920, 2560, 3200, 3840] : [128, 240, 480, 800, 1200, 1600, 1920, 2560, 3200, 3840])
    .filter(width => width < source.width).concat(Math.min(source.width, 3840)))];
  if (optimized && source.width < 1000) widths = widths.filter(width => width === source.width || width < source.width * 0.8);
  // The gallery's existing hero needs ~925px on a 390px/DPR2 phone and
  // ~1387px at DPR3; avoid jumping to unnecessarily larger candidates.
  if (source.name === "rm-gallery-01") {
    widths = [...new Set([...widths, ...[960, 1440].filter(width => width <= source.width)])].sort((a, b) => a - b);
  }
  for (const width of widths) {
    const target = path.join(outputRoot, `${hash}-${width}.webp`);
    try { await access(target); } catch {
      // Native-size ceiling: no invented detail, sharpening, HDR or crop changes.
      await sharp(data).rotate().resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
        .webp({ quality: 90, alphaQuality: 100, smartSubsample: true }).toFile(target);
    }
  }
  // AVIF is optional: retain a complete candidate set only when it saves bytes.
  // Evaluated against resized masters; gallery portraits use the highest AVIF setting.
  let avifHash, mobileAvifHash;
  if (optimized) {
    const servicePhoto = source.name.startsWith("service-") || source.name === "gallery-extensions";
    const avifQuality = asset.url.startsWith("/images/gallery-1346/") ? 80 : servicePhoto ? 70 : 75;
    const candidateHash = createHash("sha256").update(avifQuality === 80 ? "rm-avif80-444-native-v1" : avifQuality === 70 ? "rm-avif70-small75-444-native-v1" : avifRecipe + avifQuality).update(data).digest("hex").slice(0, 12);
    let avifBytes = 0, webpBytes = 0;
    for (const width of widths) {
      const target = path.join(outputRoot, candidateHash + "-" + width + ".avif");
      try { await access(target); } catch {
        await sharp(data).rotate().resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
          .avif({ quality: avifQuality === 70 && width < 800 ? 75 : avifQuality, effort: 4, chromaSubsampling: "4:4:4" }).toFile(target);
      }
      avifBytes += (await stat(target)).size;
      webpBytes += (await stat(path.join(outputRoot, hash + "-" + width + ".webp"))).size;
    }
    if (avifBytes < webpBytes * 0.98) avifHash = candidateHash;
    // This wide hero is heavily clipped on phones. A separately evaluated mobile
    // encode preserves its native resolution without delaying the first paint.
    if (source.name === "ref-service-banner") {
      mobileAvifHash = createHash("sha256").update("rm-mobile-hero-avif50-444-effort6-v1").update(data).digest("hex").slice(0, 12);
      for (const width of widths) {
        const target = path.join(outputRoot, `${mobileAvifHash}-${width}.avif`);
        try { await access(target); } catch {
          await sharp(data).rotate().resize({ width, withoutEnlargement: true, kernel: "lanczos3" })
            .avif({ quality: 50, effort: 6, chromaSubsampling: "4:4:4" }).toFile(target);
        }
      }
    }
    console.log("Image delivery:", asset.url, avifHash ? "AVIF + WebP" : "WebP retained");
  }
  // Keep the original intrinsic geometry and metadata URLs intact.
  manifest[asset.url] = { width: asset.width, height: asset.height, hash, widths,
    ...(optimized ? { sourceWidth: source.width, sourceHeight: source.height, fullSrc: source.url } : {}),
    ...(avifHash ? { avifHash } : {}),
    ...(mobileAvifHash ? { mobileAvifHash } : {}) };
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
