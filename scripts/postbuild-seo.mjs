import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { absoluteImage, absoluteUrl, buildStructuredData, seoPages } from "../src/seoData.js";
import { siteConfig } from "../src/siteConfig.js";
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
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>/g, "")
    .replace(/<meta\s+(?:property|name)="(?:og:|twitter:)[\s\S]*?>/g, "");
  const image = images[page.image];
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${absoluteUrl(page.path)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="${page.datePublished ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${siteConfig.salonName}" />`,
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:url" content="${absoluteUrl(page.path)}" />`,
    `<meta property="og:image" content="${absoluteImage(page.image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(page.imageAlt || page.h1)}" />`,
    image ? `<meta property="og:image:width" content="${image.width}" /><meta property="og:image:height" content="${image.height}" />` : "",
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${absoluteImage(page.image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt || page.h1)}" />`,
    `<script id="rm-jsonld" type="application/ld+json">${JSON.stringify(buildStructuredData(page.path)).replace(/</g, "\\u003c")}</script>`
  ].join("\n");
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

function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
