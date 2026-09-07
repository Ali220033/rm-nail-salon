import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { readFile } from "node:fs/promises";
import { seoPages, blogArticlePages, geoLandingPages, buildStructuredData, reviewSummary } from "../src/seoData.js";
import { siteConfig, serviceMenu } from "../src/siteConfig.js";
import { trackBookingConversion, trackDirectionsConversion, trackReviewClick } from "../src/googleAds.js";
import { directionsFrom } from "../src/arrivalGuides.js";
import { server } from "../scripts/preview.mjs";

let base;
before(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise((resolve) => server.close(resolve)); });

test("all declared URLs serve the real page with correct status and canonical", async () => {
  for (const page of seoPages) {
    const response = await fetch(base + page.path);
    assert.equal(response.status, page.noindex ? 404 : 200, page.path);
    const html = await response.text();
    assert.ok(html.includes('data-prerendered="true"'), page.path);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, page.path);
    assert.ok(html.includes(`href="${siteConfig.siteUrl}${page.path}"`), page.path);
    assert.ok(!html.includes("seo-static-snapshot"));
    assert.ok(html.includes("875 3rd Ave") && html.includes(siteConfig.phone));
    JSON.parse(html.match(/<script id="rm-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  }
});

test("unknown URLs are branded 404 responses, never homepage successes", async () => {
  for (const route of ["/not-a-real-rm-page", "/SERVICES", "/unknown/nested", "/assets/missing.js"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404, route);
    const html = await response.text();
    assert.ok(html.includes('content="noindex, follow"'));
    assert.ok(html.includes("Page Not Found"));
  }
});

test("URL aliases permanently normalize and preserve query strings", async () => {
  for (const [route, destination] of [["/services/", "/services"], ["/services/index.html", "/services"], ["/services.html", "/services"], ["/index.html", "/"], ["/blog/hard-gel-vs-biab/index.html", "/blog/hard-gel-vs-biab"]]) {
    const response = await fetch(base + route + "?utm_source=test", { redirect: "manual" });
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), destination + "?utm_source=test");
  }
});

test("Vercel routes cover every page without a homepage catch-all", async () => {
  const config = JSON.parse(await readFile("vercel.json", "utf8"));
  const pageRule = config.routes.find((rule) => rule.dest === "/$1.html");
  const pattern = new RegExp(pageRule.src);
  for (const page of seoPages.filter((page) => page.path !== "/" && !page.noindex)) assert.ok(pattern.test(page.path), page.path);
  assert.equal(pattern.test("/SERVICES"), false);
  assert.equal(config.routes.at(-1).status, 404);
  assert.equal(config.routes.at(-1).dest, "/404.html");
  assert.ok(!config.rewrites);
});

test("sitemap excludes errors and does not invent daily modification dates", async () => {
  const xml = await readFile("dist/sitemap.xml", "utf8");
  assert.equal((xml.match(/<loc>/g) || []).length, seoPages.filter((page) => !page.noindex).length);
  assert.ok(!xml.includes("/404"));
  assert.ok(!xml.includes("<priority>") && !xml.includes("<changefreq>"));
  assert.equal((xml.match(/<lastmod>/g) || []).length, blogArticlePages.length);
});

test("verified review excerpts and dates use one source", () => {
  assert.equal(reviewSummary.source, "Booksy");
  assert.equal(reviewSummary.sourceUrl, siteConfig.bookingUrl);
  assert.equal(reviewSummary.reviewCount, "8");
  assert.equal(reviewSummary.checkedAt, "2026-09-06");
  assert.equal(reviewSummary.reviews.find((review) => review.author === "Nikki").reviewBody, "Great service! Love my nails");
});

test("review reading is not an advertising conversion; the existing IDs remain intact", () => {
  const events = [];
  global.window = { gtag: (...args) => events.push(args) };
  try {
    trackBookingConversion();
    trackDirectionsConversion();
    trackReviewClick();
    assert.equal(events[0][2].send_to, "AW-18148785181/d-CkCJGk5s0cEJ34gc5D");
    assert.equal(events[1][2].send_to, "AW-18148785181/dnC3CNi2480cEJ34gc5D");
    assert.equal(events.filter((event) => event[1] === "conversion").length, 2);
    assert.equal(events[2][1], "review_click");
  } finally { delete global.window; }
});

test("nearby directions always end at the single approved Midtown address", () => {
  for (const page of geoLandingPages) {
    const url = new URL(directionsFrom(page.area));
    assert.equal(url.searchParams.get("destination"), siteConfig.address);
    assert.ok(url.searchParams.get("origin").includes(page.area));
    assert.equal(url.searchParams.get("api"), "1");
  }
});

test("reconciled combo prices and durations are shared by pages and structured data", () => {
  const services = serviceMenu.flatMap((group) => group.services);
  for (const [id, price, duration] of [["combo-clear", "$150", "1 h 45 min"], ["hard-gel-smart", "$200", "2 h 30 min"], ["hard-gel-smart-gel", "$220", "2 h 45 min"]]) {
    const service = services.find((item) => item.id === id);
    assert.equal(service.price, price);
    assert.equal(service.time, duration);
    assert.equal(service.topTech, null);
  }
  assert.ok(JSON.stringify(buildStructuredData("/services")).includes("rm-platinum-monogram.webp"));
});

test("all article updates include sources and real modification dates", () => {
  for (const article of blogArticlePages) {
    assert.ok(article.sections.length >= 5, article.path);
    assert.ok(article.sources.length, article.path);
    assert.equal(article.dateModified, "2026-09-06");
  }
});

test("homepage service summaries use the shared menu values", async () => {
  const html = await readFile("dist/index.html", "utf8");
  for (const id of ["russian-clear", "russian-hard-gel", "nail-extensions", "smart-pedicure", "smart-gel-pedicure", "nail-design"]) {
    const service = serviceMenu.flatMap((group) => group.services).find((item) => item.id === id);
    const escapedPrice = service.price.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(html, new RegExp(`<strong>${escapedPrice}<small>${service.time}</small></strong>`), id);
  }
  assert.ok(!html.includes("7 Booksy client reviews"));
});

test("review stars and gallery actions have accurate accessible labels", async () => {
  const home = await readFile("dist/index.html", "utf8");
  assert.ok(home.includes('class="google-stars" role="img" aria-label="5 star review"'));
  assert.ok(!home.includes("Book this look"));
  assert.ok(home.includes("View photo"));
  assert.ok(!home.includes('class="masonry-caption"'));
  assert.ok(!home.includes('aria-label="Open Pearl Line Detail gallery photo"'));
});

test("standalone service links describe their destination", async () => {
  const html = await readFile("dist/services.html", "utf8");
  const links = [...html.matchAll(/class="service-learn-link"[^>]*>(.*?)<\/a>/g)];
  assert.ok(links.length > 0);
  for (const [, label] of links) assert.ok(label.includes("details") && !/^Learn more$/i.test(label));
});
