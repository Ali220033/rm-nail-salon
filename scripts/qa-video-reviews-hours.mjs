import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright-core";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5193";
const output = process.env.QA_OUTPUT || "output/video-reviews-hours";
await mkdir(output, { recursive: true });
const results = [];
for (const engine of [chromium, webkit]) {
  const browser = await engine.launch({ headless: true,
    ...(engine === chromium ? { channel: "msedge" } : {}),
    ...(engine === webkit && process.env.QA_WEBKIT_PATH ? { executablePath: process.env.QA_WEBKIT_PATH } : {})
  });
  try {
    for (const width of [320, 390, 440, 1280, 1920]) {
      console.log(`Checking ${engine.name()} at ${width}px`);
      const context = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 1080 }, isMobile: width < 500, hasTouch: width < 500 });
      await context.addInitScript(() => localStorage.setItem("rm-cookie-consent", "essential"));
      await context.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, route => route.abort());
      const page = await context.newPage();
      const errors = [];
      const requests = [];
      page.on("pageerror", e => errors.push(e.message));
      page.on("request", request => { if (request.url().includes("/videos/")) requests.push(request.url()); });
      await page.goto(base, { waitUntil: "networkidle" });
      await page.waitForTimeout(200);
      assert.equal(requests.length, 0, "Video competes with initial page load");
      assert.equal(await page.evaluate(() => scrollY), 0);
      assert.equal(await page.locator(".nav").evaluate(e => e.getBoundingClientRect().top), 0);
      const video = page.locator("video");
      if (engine === chromium && width === 390) {
        const cdp = await context.newCDPSession(page);
        await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 90, downloadThroughput: 375000, uploadThroughput: 125000 });
      }
      // Buffer while still more than a screen below the fold, then measure arrival.
      await video.evaluate(e => scrollTo({ top: scrollY + e.getBoundingClientRect().top - innerHeight - 1000, behavior: "instant" }));
      await page.waitForFunction(() => document.querySelector("video").readyState >= 3, { timeout: 20000 });
      assert.equal(await video.evaluate(e => e.paused), true);
      assert.ok(await video.evaluate(e => e.getBoundingClientRect().top > innerHeight));
      const startupMs = await video.evaluate(e => new Promise(resolve => {
        const start = performance.now();
        e.addEventListener("playing", () => resolve(Math.round(performance.now() - start)), { once: true });
        scrollTo({ top: scrollY + e.getBoundingClientRect().top - innerHeight + 20, behavior: "instant" });
      }));
      assert.ok(startupMs < 800, `Buffered startup took ${startupMs}ms`);
      await page.waitForFunction(() => document.querySelector("video").currentTime > 0.1);
      assert.equal(await video.evaluate(e => getComputedStyle(e).opacity), "1");
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForFunction(() => document.querySelector("video").paused);
      if (engine === chromium && width === 390) {
        const cdp = await context.newCDPSession(page);
        await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
      }
      await page.locator(".google-review-shell").evaluate(e => scrollTo({ top: scrollY + e.getBoundingClientRect().top - 100, behavior: "instant" }));
      const group = page.locator(".review-loop-group").first();
      assert.equal(await group.locator(".google-review-card").count(), 5);
      const names = await group.locator(".google-review-head strong").allTextContents();
      assert.equal(new Set(names).size, 5);
      assert.equal(await group.getByText("Review summary", { exact: true }).count(), 5);
      assert.equal(await group.locator('img[src="/images/reviews/booksy-b.jpeg"]').count(), 1);
      for (const avatar of await group.locator(".review-avatar").all()) {
        const box = await avatar.boundingBox();
        assert.ok(box.width >= 55 && Math.abs(box.width - box.height) < 1, "Avatar collapsed");
      }
      const repeat = await page.locator(".review-marquee").evaluate(e => {
        const animation = e.getAnimations()[0];
        const duration = animation.effect.getTiming().duration;
        animation.pause();
        const states = [0, 0.99999, 1, 99.5].map(phase => {
          animation.currentTime = phase * duration;
          const shell = e.parentElement.getBoundingClientRect();
          return [...e.querySelectorAll(".google-review-card")].some(card => {
            const b = card.getBoundingClientRect();
            return b.right > shell.left && b.left < shell.right;
          });
        });
        animation.currentTime = 0;
        animation.play();
        return { duration, states };
      });
      assert.equal(repeat.duration, width <= 640 ? 56000 : 64000);
      assert.ok(repeat.states.every(Boolean), "Empty review loop frame");
      const rail = page.locator(".review-marquee");
      const before = await rail.evaluate(e => e.getAnimations()[0].currentTime);
      await page.waitForTimeout(150);
      assert.ok(await rail.evaluate((e, before) => e.getAnimations()[0].currentTime > before, before));
      await page.locator(".hours-lines").first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      const hours = await page.locator(".visit-info-card .hours-lines p").evaluateAll(es => es.map(e => {
        const b = e.getBoundingClientRect();
        return { y: b.y, width: b.width, overflow: e.scrollWidth > e.clientWidth, text: e.innerText };
      }));
      assert.equal(hours.length, 2);
      assert.ok(Math.abs(hours[0].y - hours[1].y) < 1, "Hours stack vertically");
      assert.ok(hours.every(h => !h.overflow));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      if (width === 390 && engine === chromium) await page.screenshot({ path: `${output}/hours-mobile.png` });
      await page.goto(base + "/reviews", { waitUntil: "networkidle" });
      assert.equal(await page.locator(".review-orbit-card, .review-proof-card").count(), 8);
      await page.evaluate(async () => {
        for (const img of document.images) { img.loading = "eager"; await img.decode().catch(() => {}); }
      });
      const broken = await page.locator("img").evaluateAll(es => es.filter(e => !e.naturalWidth).map(e => e.src));
      assert.deepEqual(broken, []);
      assert.deepEqual(errors, []);
      results.push({ engine: engine.name(), width, startupMs, videoInitialRequests: 0, reviews: 5, reviewPage: 8, hours: "side by side", loop: "continuous with no empty seam" });
      await context.close();
    }
  } finally { await browser.close(); }
}
await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
