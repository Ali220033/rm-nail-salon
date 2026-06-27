import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.resolve("public/images/fast");
const files = await readdir(imageDir);
const sourceFiles = files.filter((file) => /\.(jpe?g|png)$/i.test(file));

await Promise.all(
  sourceFiles.map(async (file) => {
    const source = path.join(imageDir, file);
    const target = path.join(imageDir, `${path.parse(file).name}.webp`);
    await sharp(source)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(target);
  })
);

console.log(`Converted ${sourceFiles.length} fast images to WebP.`);
