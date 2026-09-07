import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import { seoPages } from "../src/seoData.js";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5188";
const output = "output/seo-implementation-20260906";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
const failures = [];
const selected = ["/", "/services", "/reviews", "/contact", "/team", "/nail-salon-sutton-place", "/blog/hard-gel-vs-biab", "/404"];

try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, isMobile: width === 390, hasTouch: width === 390 });
    await context.addInitScript(() => localStorage.setItem("rm-cookie-consent", "essential"));
    // Do not generate real advertising or analytics traffic during verification.
    await context.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, (route) => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error" && /hydrat|Minified React|React error/i.test(message.text())) errors.push(message.text()); });
    for (const item of seoPages) {
      errors.length = 0;
      const response = await page.goto(base + item.path, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
          scrollTo({ top: y, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 90));
        }
        scrollTo({ top: 0, behavior: "instant" });
      });
      // Validate assets in off-screen horizontal rails as well as the scrolled page.
      await page.locator("img").evaluateAll((images) => images.forEach((image) => { image.loading = "eager"; }));
      await page.waitForFunction(() => [...document.images].filter((image) => image.getClientRects().length).every((image) => image.complete), null, { timeout: 20000 }).catch(async (error) => {
        console.error(item.path, width, await page.locator("img").evaluateAll((images) => images.filter((image) => !image.complete).map((image) => ({ src: image.src, visible: image.getClientRects().length > 0 }))));
        throw error;
      });
      const state = await page.evaluate(() => {
        const heading = document.querySelector("main h1");
        return {
          title: document.title,
          h1: heading?.textContent,
          h1Count: document.querySelectorAll("h1").length,
          visibleH1: heading && getComputedStyle(heading).opacity !== "0" && heading.getBoundingClientRect().height > 0,
          overflow: document.documentElement.scrollWidth > innerWidth,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          robots: document.querySelector('meta[name="robots"]')?.content,
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
          text: document.querySelector("main")?.innerText
        };
      });
      const result = { width, path: item.path, status: response.status(), ...state, errors: [...errors] };
      results.push(result);
      if (result.status !== (item.noindex ? 404 : 200) || result.h1Count !== 1 || !result.visibleH1 || result.overflow || result.errors.length || result.brokenImages.length) failures.push(result);
      if (selected.includes(item.path)) await page.screenshot({ path: `${output}/${width}-${item.path.replaceAll("/", "_") || "home"}.png`, fullPage: true });
    }
    await context.close();
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await noJs.newPage();
  for (const route of ["/", "/services", "/privacy-policy", "/terms", "/reviews"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    assert.ok((await page.locator("main").innerText()).length > 200, `${route} blank without JavaScript`);
    await page.screenshot({ path: `${output}/no-js-${route.replaceAll("/", "_")}.png`, fullPage: true });
  }
  await noJs.close();
  const consent = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await consent.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, (route) => route.abort());
  const first = await consent.newPage();
  await first.goto(base, { waitUntil: "networkidle" });
  await first.screenshot({ path: `${output}/mobile-first-visit.png` });
  const overlap = await first.evaluate(() => {
    const button = document.querySelector(".hero-actions .gold-cta").getBoundingClientRect();
    const banner = document.querySelector(".cookie-banner").getBoundingClientRect();
    return button.bottom > banner.top && button.top < banner.bottom;
  });
  if (overlap) failures.push({ issue: "Cookie panel overlaps primary hero CTA" });
  await first.getByRole("button", { name: "Essential Only", exact: true }).click();
  assert.equal(await first.locator(".cookie-banner").count(), 0);
  await first.reload({ waitUntil: "networkidle" });
  assert.equal(await first.locator(".cookie-banner").count(), 0);
  await consent.close();
} finally {
  await browser.close();
}

await writeFile(`${output}/qa.json`, JSON.stringify({ base, checkedAt: new Date().toISOString(), results, failures }, null, 2));
console.log(JSON.stringify({ checks: results.length, failures }, null, 2));
assert.equal(failures.length, 0, "See QA report for failures");
