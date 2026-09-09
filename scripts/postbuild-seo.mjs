import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { absoluteUrl, seoPages } from "../src/seoData.js";
import { siteConfig } from "../src/siteConfig.js";
import { getSeoMetadata, renderSeoMetadata } from "../src/seoMetadata.js";
import { render } from "../.ssr/entry-server.js";

const dist = path.resolve("dist");
let template = await readFile(path.join(dist, "index.html"), "utf8");
assert.ok(template.includes('<div id="root"></div>'), "Run the client build before prerendering; never reuse an already-rendered homepage as the page template.");
const images = JSON.parse(await readFile("src/imageManifest.json", "utf8"));
const renderedPages = [];
const titles = new Set();
const descriptions = new Set();

for (const page of seoPages) {
  const body = render(page.path);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/<meta\s+name="(?:description|robots)"\s+content="[\s\S]*?"\s*\/?>/g, "")
    .replace(/<script\s+id="rm-jsonld"[\s\S]*?<\/script>/g, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>/g, "")
    .replace(/<meta\s+(?:property|name)="(?:og:|twitter:)[\s\S]*?>/g, "");
  const tags = renderSeoMetadata(getSeoMetadata(page.path, images));
  html = html.replace("</head>", () => tags + "\n</head>")
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="true">${body}</div>`);
  const target = path.join(dist, page.path === "/" ? "index.html" : page.path.slice(1) + ".html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  assert.equal((body.match(/<h1(?:\s|>)/g) || []).length, 1, `${page.path}: expected one H1`);
  assert.ok(body.includes("875 3rd Ave") && body.includes(siteConfig.phone), `${page.path}: missing contact information`);
  assert.ok(!html.includes("seo-static-snapshot"), `${page.path}: hidden duplicate content`);
  assert.ok(!titles.has(page.title), `${page.path}: duplicate title`);
  assert.ok(!descriptions.has(page.description), `${page.path}: duplicate description`);
  assert.ok(body.includes(siteConfig.bookingUrl), `${page.path}: no booking link`);
  titles.add(page.title);
  descriptions.add(page.description);
  renderedPages.push({ path: page.path, body });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoPages.filter((page) => !page.noindex).map((page) =>
  `  <url><loc>${absoluteUrl(page.path)}</loc>${page.dateModified ? `<lastmod>${page.dateModified}</lastmod>` : ""}</url>`
).join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n`);

const linked = new Set(renderedPages.flatMap(({ body }) =>
  [...body.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1])
));
for (const page of seoPages.filter((page) => !page.noindex)) {
  assert.ok(linked.has(page.path), `${page.path}: no incoming internal link`);
}
assert.ok(!sitemap.includes("<loc>" + absoluteUrl("/404") + "</loc>"));
console.log(`Prerendered and validated ${seoPages.length} actual React pages. Sitemap contains ${seoPages.filter((page) => !page.noindex).length} indexable URLs.`);
