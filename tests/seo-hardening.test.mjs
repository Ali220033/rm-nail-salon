import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { seoPages, buildStructuredData } from "../src/seoData.js";
import { siteConfig, serviceMenu } from "../src/siteConfig.js";
import { getSeoMetadata, renderSeoMetadata } from "../src/seoMetadata.js";

test("built pages and client metadata agree with one complete configuration", async () => {
  const manifest = JSON.parse(await readFile("src/imageManifest.json", "utf8"));
  for (const page of seoPages) {
    const file = page.path === "/" ? "index" : page.path.slice(1);
    const html = await readFile(`dist/${file}.html`, "utf8");
    const head = html.split("</head>")[0];
    const expected = getSeoMetadata(page.path, manifest);
    assert.equal((head.match(/<title>/g) || []).length, 1, page.path);
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1, page.path);
    assert.equal((head.match(/type="application\/ld\+json"/g) || []).length, 1, page.path);
    assert.ok(head.includes(renderSeoMetadata(expected)), `${page.path}: stale or divergent prerender metadata`);
    assert.equal(new Set(expected.meta.map(({ attribute, key }) => `${attribute}:${key}`)).size, expected.meta.length);
    for (const { attribute, key, content } of expected.meta) {
      const occurrence = head.split(`${attribute}="${key}"`).length - 1;
      assert.equal(occurrence, content == null ? 0 : 1, `${page.path}: ${key}`);
    }
  }
});

test("navigation descriptors include fresh Twitter alt and removable optional dimensions", () => {
  const home = getSeoMetadata("/");
  const gallery = getSeoMetadata("/gallery");
  const value = (metadata, key) => metadata.meta.find((item) => item.key === key)?.content;
  assert.notEqual(value(home, "twitter:image:alt"), value(gallery, "twitter:image:alt"));
  assert.equal(value(gallery, "twitter:image:alt"), value(gallery, "og:image:alt"));
  assert.ok(gallery.meta.some((item) => item.key === "og:image:width" && item.content === undefined));
  assert.ok(gallery.meta.some((item) => item.key === "og:image:height" && item.content === undefined));
  const article = getSeoMetadata("/blog/hard-gel-vs-biab");
  assert.equal(value(article, "og:type"), "article");
  assert.equal(value(gallery, "og:type"), "website");
  assert.equal(value(getSeoMetadata("/404"), "robots"), "noindex, follow");
});

test("metadata serialization safely handles attribute and script delimiters", () => {
  const html = renderSeoMetadata({
    title: "A & B <title>", canonical: "https://example.com/",
    meta: [{ attribute: "name", key: "description", content: 'A "quote" & <tag>' }],
    structuredData: { text: "</script><script>unexpected</script>" }
  });
  assert.ok(html.includes("A &amp; B &lt;title&gt;"));
  assert.ok(html.includes("&quot;quote&quot; &amp; &lt;tag&gt;"));
  assert.equal((html.match(/<script/g) || []).length, 1);
  assert.equal((html.match(/<\/script>/g) || []).length, 1);
});

test("business facts stay consistent across every JSON-LD graph", () => {
  for (const page of seoPages) {
    const graph = buildStructuredData(page.path)["@graph"];
    const business = graph.find((node) => node["@type"] === "NailSalon");
    assert.equal(business["@id"], `${siteConfig.siteUrl}/#nailsalon`);
    assert.equal(business.logo, siteConfig.siteUrl + siteConfig.logo);
    assert.equal(business.hasMap, siteConfig.mapUrl);
    assert.deepEqual(business.geo, { "@type": "GeoCoordinates", ...siteConfig.geo });
    assert.deepEqual(business.address, { "@type": "PostalAddress", ...siteConfig.postalAddress });
    assert.deepEqual(business.openingHoursSpecification, siteConfig.openingHours.map(({ dayOfWeek, opens, closes }) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes
    })));
    assert.ok(!JSON.stringify(graph).includes('"aggregateRating"'), "No unsupported self-serving rating markup");
  }
  assert.equal(siteConfig.hours, "Mon-Fri: 9:30 AM - 8:00 PM; Sat-Sun: 10:00 AM - 8:00 PM");
  assert.equal(siteConfig.hoursShort, "Mon-Fri 9:30 AM - 8 PM | Sat-Sun 10 AM - 8 PM");
});

test("all service records have a valid internal destination and the existing Booksy flow", () => {
  const routes = new Set(seoPages.filter((page) => !page.noindex).map((page) => page.path));
  const ids = new Set();
  for (const group of serviceMenu) {
    for (const service of group.services) {
      assert.ok(!ids.has(service.id), service.id);
      ids.add(service.id);
      assert.equal(service.category, group.category);
      assert.equal(service.bookingUrl, siteConfig.bookingUrl);
      assert.ok(routes.has(service.seoPath.split("#")[0]), service.id);
      if (service.seoPath.includes("#")) assert.equal(service.seoPath, `/services#${service.id}`);
    }
  }
});
