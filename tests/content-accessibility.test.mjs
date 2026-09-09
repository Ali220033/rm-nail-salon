import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { seoPages, serviceLandingPages, geoLandingPages, getDecisionFaqs, reviewSummary } from "../src/seoData.js";
import { faqs, galleryItems } from "../src/siteConfig.js";
import { getGalleryContext } from "../src/galleryContext.js";
import { getVisitorContent } from "../src/visitorContent.js";

const htmlFor = (path) => readFile(`dist/${path === "/" ? "index" : path.slice(1)}.html`, "utf8");
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");

test("every FAQ answer is in the page body and every control has a panel", async () => {
  const pages = [
    ["/faq", faqs.map(({ question, answer }) => [question, answer])],
    ...serviceLandingPages.map((page) => [page.path, getDecisionFaqs(page)]),
    ...geoLandingPages.map((page) => [page.path, getVisitorContent(page.path).faqs])
  ];
  for (const [path, answers] of pages) {
    const body = (await htmlFor(path)).split("</head>")[1];
    for (const [, answer] of answers) assert.ok(body.includes(escape(answer)), `${path}: missing answer ${answer}`);
    for (const [, id] of body.matchAll(/aria-controls="((?:service-faq|faq-answer)-[^"]+)"/g)) {
      assert.equal(body.split(`id="${id}"`).length - 1, 1, `${path}: unconnected FAQ ${id}`);
    }
  }
});

test("homepage has five semantic reviews and the restored booking presentation", async () => {
  const html = await htmlFor("/");
  assert.equal((html.match(/class="google-review-card"/g) || []).length, 5);
  assert.equal((html.match(/class="review-loop-group"/g) || []).length, 1);
  assert.equal((html.match(/class="review-source-link"/g) || []).length, 5);
  for (const review of reviewSummary.reviews.slice(0, 5)) assert.equal(html.split(escape(review.reviewBody)).length - 1, 1);
  for (const page of seoPages) {
    const body = await htmlFor(page.path);
    const hasMainBooking = page.path === "/" || serviceLandingPages.some(item => item.path === page.path) || geoLandingPages.some(item => item.path === page.path);
    assert.equal((body.match(/Ready for perfect nails\?/g) || []).length, hasMainBooking ? 2 : 1, page.path);
    assert.ok(body.includes('id="main-content" tabindex="-1"'), page.path);
    assert.ok(body.includes('class="skip-link"'), page.path);
  }
});

test("gallery keeps its ordered photos and exposes factual captions and service links", async () => {
  const html = await htmlFor("/gallery");
  const notes = html.split('class="gallery-portfolio-notes"')[1];
  assert.ok(notes);
  let position = 0;
  for (const item of galleryItems) {
    const context = getGalleryContext(item);
    const next = notes.indexOf(escape(item.title), position);
    assert.ok(next >= position, item.title);
    position = next + item.title.length;
    assert.ok(notes.includes(escape(item.caption)));
    assert.ok(notes.includes(`href="${context.servicePath}"`));
  }
  assert.equal((html.match(/class="masonry-item /g) || []).length, galleryItems.length);
});
