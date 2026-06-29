import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  absoluteImage,
  absoluteUrl,
  buildStructuredData,
  getDecisionDetails,
  getDecisionFaqs,
  getRelatedSeoPages,
  getServiceById,
  reviewSummary,
  seoPages
} from "../src/seoData.js";
import { featuredServices, galleryItems, proofBlocks, serviceMenu, siteConfig } from "../src/siteConfig.js";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");
const template = await readFile(indexPath, "utf8");

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
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.salonName)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${absoluteUrl(page.path)}" />`,
    `<meta property="og:image" content="${absoluteImage(page.image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(page.imageAlt || page.h1 || page.title)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="1600" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${absoluteImage(page.image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt || page.h1 || page.title)}" />`,
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
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = seoPages
    .map((page) => {
      return [
        "  <url>",
        `    <loc>${absoluteUrl(page.path)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
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
  if (page.path === "/") return buildHomeSnapshot(page);
  if (page.path === "/services") return buildServicesSnapshot(page);

  const relatedPages = getRelatedSeoPages(
    page.related || ["/services", "/russian-manicure-nyc", "/hard-gel-manicure-nyc", "/smart-pedicure-nyc"]
  ).filter((related) => related.path !== page.path);
  const serviceItems = (page.serviceIds || []).map(getServiceById).filter(Boolean);
  const decisionFaqs = getDecisionFaqs(page);
  const decision = page.serviceIds?.length ? getDecisionDetails(page) : null;
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
            `<li><img src="${service.image}" alt="${escapeHtml(service.name)} at RM Nail Salon" loading="lazy" /><h3>${escapeHtml(
              service.name
            )}</h3><p>${escapeHtml(service.description)}</p><strong>${escapeHtml(service.price || "")} / ${escapeHtml(
              service.time || ""
            )}</strong><a href="${siteConfig.bookingUrl}">Book ${escapeHtml(service.shortName || service.name)}</a></li>`
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

  const decisionHtml = decision
    ? [
        '<section aria-label="Service decision guide">',
        "<h2>Before your appointment</h2>",
        `<p>${escapeHtml(decision.maintenance)}</p>`,
        `<p>${escapeHtml(decision.aftercare)}</p>`,
        "</section>"
      ].join("")
    : "";

  const faqHtml = decisionFaqs.length
    ? [
        '<section aria-label="Service FAQs">',
        "<h2>Service questions</h2>",
        ...decisionFaqs.map(
          ([question, answer]) => `<article><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></article>`
        ),
        "</section>"
      ].join("")
    : "";

  const relatedHtml = relatedPages.length
    ? [
        '<nav aria-label="Related RM Nail Salon pages">',
        "<h2>Plan your RM appointment</h2>",
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
    decisionHtml,
    servicesHtml,
    faqHtml,
    relatedHtml,
    "</main>"
  ].join("");
}

function buildHomeSnapshot(page) {
  return [
    '<main class="seo-static-snapshot seo-static-home">',
    '<section aria-label="RM Nail Salon hero">',
    `<img src="${page.image}" alt="${escapeHtml(page.imageAlt || page.h1)}" loading="eager" />`,
    `<p>${escapeHtml(siteConfig.specialty)}</p>`,
    `<h1>${escapeHtml(page.h1)}</h1>`,
    `<p>${escapeHtml(page.description)}</p>`,
    `<a href="${siteConfig.bookingUrl}">Book Appointment</a>`,
    "</section>",
    '<section aria-label="RM Nail Salon trust bar">',
    `<h2>${escapeHtml(reviewSummary.ratingValue)} ${escapeHtml(reviewSummary.source)} rating near Midtown Manhattan</h2>`,
    `<p>${escapeHtml(siteConfig.address)}. ${escapeHtml(siteConfig.hours)}.</p>`,
    "</section>",
    '<section aria-label="Signature RM Nail Salon services">',
    "<h2>Signature services with starting prices</h2>",
    '<ul class="seo-static-services">',
    ...featuredServices.slice(0, 6).map(renderStaticService),
    "</ul>",
    '<a href="/services">View full service menu</a>',
    "</section>",
    '<section aria-label="Gallery preview">',
    "<h2>Russian manicure gallery preview</h2>",
    '<ul class="seo-static-gallery">',
    ...galleryItems.slice(0, 8).map(
      (item) =>
        `<li><img src="${item.image}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy" /><h3>${escapeHtml(
          item.title
        )}</h3><p>${escapeHtml(item.caption)}</p></li>`
    ),
    "</ul>",
    "</section>",
    '<section aria-label="Why clients choose RM Nail Salon">',
    "<h2>Why clients choose RM Nail Salon</h2>",
    ...proofBlocks
      .slice(0, 5)
      .map(([title, copy]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></article>`)
      .join(""),
    "</section>",
    '<section aria-label="Booksy client proof">',
    `<h2>${escapeHtml(reviewSummary.ratingValue)} rating from ${escapeHtml(
      reviewSummary.reviewCount
    )} Booksy client reviews</h2>`,
    ...reviewSummary.reviews
      .map((review) => `<blockquote><p>${escapeHtml(review.reviewBody)}</p><cite>${escapeHtml(review.author)}</cite></blockquote>`)
      .join(""),
    `<a href="${siteConfig.bookingUrl}">Read reviews and book on Booksy</a>`,
    "</section>",
    '<section aria-label="RM Nail Salon location and booking">',
    "<h2>Visit RM Nail Salon in Midtown NYC</h2>",
    `<p>${escapeHtml(siteConfig.address)}</p>`,
    `<p>${escapeHtml(siteConfig.hours)}. Phone: ${escapeHtml(siteConfig.phone)}. Instagram: ${escapeHtml(
      siteConfig.instagramHandle
    )}.</p>`,
    `<a href="${siteConfig.bookingUrl}">Book Appointment</a>`,
    `<a href="${siteConfig.mapUrl}">Open map</a>`,
    "</section>",
    "</main>"
  ].join("");
}

function buildServicesSnapshot(page) {
  return [
    '<main class="seo-static-snapshot seo-static-services-page">',
    `<img src="${page.image}" alt="${escapeHtml(page.imageAlt || page.h1)}" loading="eager" />`,
    `<p>${escapeHtml(page.label || "Service Menu")}</p>`,
    `<h1>${escapeHtml(page.h1)}</h1>`,
    `<p>${escapeHtml(page.description)}</p>`,
    '<section aria-label="Full RM Nail Salon service menu">',
    "<h2>Full service menu with starting prices</h2>",
    ...serviceMenu
      .map(
        (group) => `
          <section>
            <h3>${escapeHtml(group.category)}</h3>
            <p>${escapeHtml(group.note)}</p>
            <ul class="seo-static-services">
              ${group.services.map(renderStaticService).join("")}
            </ul>
          </section>`
      )
      .join(""),
    "</section>",
    '<section aria-label="Book RM Nail Salon">',
    "<h2>Ready to book?</h2>",
    `<p>Choose your service, date, and time on Booksy. RM Nail Salon is located at ${escapeHtml(siteConfig.address)}.</p>`,
    `<a href="${siteConfig.bookingUrl}">Book Appointment</a>`,
    "</section>",
    "</main>"
  ].join("");
}

function renderStaticService(service) {
  return `<li id="${escapeHtml(service.id)}"><img src="${service.image}" alt="${escapeHtml(
    service.name
  )} at RM Nail Salon" loading="lazy" /><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(
    service.description
  )}</p><strong>${escapeHtml(service.price || "")} / ${escapeHtml(service.time || "")}</strong><a href="${
    siteConfig.bookingUrl
  }">Book this service</a></li>`;
}

function jsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
