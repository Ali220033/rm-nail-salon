import { mkdir, writeFile } from "node:fs/promises";

const root = "public/fonts";
await mkdir(root, { recursive: true });
const response = await fetch("https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=Playfair+Display:ital,wght@0,400..600;1,400..500&display=swap", {
  headers: { "User-Agent": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" }
});
if (!response.ok) throw new Error(`Font CSS: ${response.status}`);
const css = await response.text();
const blocks = css.match(/\/\* latin \*\/[\s\S]*?\}/g);
if (blocks?.length !== 3) throw new Error("Expected three Latin font faces");
const local = [];
for (const block of blocks) {
  const family = block.includes("'Inter'") ? "inter" : "playfair";
  const style = block.includes("font-style: italic") ? "italic" : "normal";
  const url = block.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error("Missing font URL");
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font download: ${font.status}`);
  const filename = `rm-${family}-${style}-latin.woff2`;
  await writeFile(`${root}/${filename}`, Buffer.from(await font.arrayBuffer()));
  local.push(block.replace(url, `/fonts/${filename}`));
}
await writeFile(`${root}/site-fonts.css`, local.join("\n\n") + "\n");
for (const family of ["inter", "playfairdisplay"]) {
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if (!license.ok) throw new Error(`Font license: ${license.status}`);
  await writeFile(`${root}/${family}-OFL.txt`, await license.text());
}
console.log("Self-hosted Inter and Playfair Display with their OFL licenses.");
