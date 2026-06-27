import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  absoluteImage,
  absoluteUrl,
  buildStructuredData,
  getRelatedSeoPages,
  getServiceById,
  seoPages
} from "../src/seoData.js";
import { siteConfig } from "../src/siteConfig.js";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const template = await readFile(indexPath, "utf8");
const buildDate = new Date().toISOString();

for (const page of seoPages) {
  const html = injectSeo(template, page);
  const targetPath = page.path === "/" ? indexPath : path.join(distDir, page.path.slice(1), "index.html");
  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, html);
}

await writeFile(path.join(distDir, "robots.txt"), buildRobots());
await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap());

console.log(`Generated SEO HTML, sitemap, and robots for ${seoPages.length} routes.`);

function injectSeo(html, page) {
  let output = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(page.description)}" />`
    );

  output = output.replace(/<link\s+rel="canonical"[\s\S]*?>/g, "");
  output = output.replace(/<meta\s+(?:property|name)="(?:og:|twitter:)[\s\S]*?>/g, "");
  output = output.replace(/<script id="rm-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  const tags = [
    `<link rel="canonical" href="${absoluteUrl(page.path)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${absoluteUrl(page.path)}" />`,
    `<meta property="og:image" content="${absoluteImage(page.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${absoluteImage(page.image)}" />`,
    `<script id="rm-jsonld" type="application/ld+json">${jsonForHtml(buildStructuredData(page.path))}</script>`
  ].join("\n    ");

  output = output.replace("</head>", () => `    ${tags}\n  </head>`);
  return output.replace('<div id="root"></div>', () => `<div id="root">${buildStaticSnapshot(page)}</div>`);
}

function buildRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteConfig.siteUrl}/sitemap.xml`,
    ""
  ].join("\n");
}

function buildSitemap() {
  const urls = seoPages
    .map((page) => {
      return [
        "  <url>",
        `    <loc>${absoluteUrl(page.path)}</loc>`,
        `    <lastmod>${buildDate}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        `    <priority>${page.priority || "0.6"}</priority>`,
        "  </url>"
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    ""
  ].join("\n");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildStaticSnapshot(page) {
  const relatedPages = getRelatedSeoPages(
    page.related || ["/services", "/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/smart-pedicure-nyc"]
  ).filter((related) => related.path !== page.path);
  const serviceItems = (page.serviceIds || []).map(getServiceById).filter(Boolean);
  const supportingTitle = page.introTitle || page.label || "Premium Russian manicure studio in Midtown NYC";
  const supportingText = page.intro || page.heroCopy || page.description;
  const detailCards = page.highlights || [
    ["Midtown NYC location", "Visit RM Nail Salon at 875 3rd Ave, Concourse Level, close to Grand Central and Midtown East."],
    ["Russian manicure precision", "Detailed cuticle care, refined shaping, and long-lasting polish work are central to the studio experience."],
    ["Easy online booking", "Book Russian manicures, hard gel, smart pedicures, extensions, nail art, removal, and repair online."]
  ];

  const servicesHtml = serviceItems.length
    ? [
        '<section aria-label="Related services">',
        "<h2>Service options</h2>",
        '<ul class="seo-static-services">',
        ...serviceItems.map(
          (service) =>
            `<li><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.description)}</p><a href="/services#${escapeHtml(
              service.id
            )}">View ${escapeHtml(service.shortName || service.name)}</a></li>`
        ),
        "</ul>",
        "</section>"
      ].join("")
    : "";

  const articleHtml = page.sections?.length
    ? [
        '<section aria-label="Article guide">',
        ...page.sections.map(
          ([heading, copy]) => `<article><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(copy)}</p></article>`
        ),
        "</section>"
      ].join("")
    : "";

  const relatedHtml = relatedPages.length
    ? [
        '<nav aria-label="Related RM Nail Salon pages">',
        "<h2>Continue exploring RM Nail Salon</h2>",
        ...relatedPages
          .slice(0, 4)
          .map((related) => `<a href="${related.path}">${escapeHtml(related.navLabel || related.h1)}</a>`)
          .join(""),
        `<a href="${siteConfig.bookingUrl}">Book RM Nail Salon on Booksy</a>`,
        "</nav>"
      ].join("")
    : "";

  return [
    '<main class="seo-static-snapshot">',
    `<img src="${page.image}" alt="${escapeHtml(page.imageAlt || page.h1)}" loading="eager" />`,
    `<p>${escapeHtml(page.label || siteConfig.specialty)}</p>`,
    `<h1>${escapeHtml(page.h1)}</h1>`,
    `<h2>${escapeHtml(supportingTitle)}</h2>`,
    `<p>${escapeHtml(supportingText)}</p>`,
    '<section aria-label="Why clients choose RM Nail Salon">',
    ...detailCards
      .slice(0, 3)
      .map((item) => `<article><h3>${escapeHtml(item[0])}</h3><p>${escapeHtml(item[1])}</p></article>`)
      .join(""),
    "</section>",
    articleHtml,
    servicesHtml,
    relatedHtml,
    "</main>"
  ].join("");
}

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
