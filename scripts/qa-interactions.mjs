import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5188";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, isMobile: width === 390, hasTouch: width === 390 });
    await context.addInitScript(() => localStorage.setItem("rm-cookie-consent", "essential"));
    await context.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, (route) => route.abort());
    const page = await context.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    const video = page.locator("video");
    assert.equal(await video.evaluate((element) => element.paused), true, "Video starts before arrival");
    assert.equal(await video.getAttribute("poster"), null, "Old poster reintroduced");
    await video.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => { const video = document.querySelector("video"); return !video.paused && video.currentTime > 0.1; }, { timeout: 20000 });
    const time = await video.evaluate((element) => element.currentTime);
    await page.waitForTimeout(400);
    assert.ok((await video.evaluate((element) => element.currentTime)) > time, "Video does not advance");
    await page.locator(".reviews-section").scrollIntoViewIfNeeded();
    if (width === 390) {
      const rail = page.locator(".review-marquee");
      const before = await rail.evaluate((element) => getComputedStyle(element).transform);
      const bounds = await page.locator(".google-review-shell").boundingBox();
      await page.touchscreen.tap(Math.min(bounds.x + 120, 300), Math.min(bounds.y + 80, 700));
      await page.waitForTimeout(500);
      const after = await rail.evaluate((element) => getComputedStyle(element).transform);
      assert.notEqual(before, after, "Review rotation stopped after touch");
      assert.equal(await page.locator(".google-review-card a").count(), 0);
    }
    await page.evaluate(() => scrollTo(0, 0));
    if (width === 390) await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.locator("#mobile-navigation").getByRole("link", { name: "Services", exact: true }).click();
    await page.waitForURL("**/services");
    assert.ok((await page.locator("h1").innerText()).length > 0);
    if (width === 390) assert.equal(await page.getByRole("button", { name: "Open navigation menu" }).getAttribute("aria-expanded"), "false");
    await page.goto(base + "/gallery", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /View photo/i }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible" });
    const image = dialog.locator("img");
    await image.evaluate((element) => element.decode());
    assert.ok(!(await image.getAttribute("src")).includes("/responsive/"), "Gallery no longer opens original photo");
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    await page.goto(base + "/faq", { waitUntil: "networkidle" });
    const question = page.locator(".faq-item button").nth(1);
    await question.click();
    assert.equal(await question.getAttribute("aria-expanded"), "true");
    await page.goto(base + "/reviews", { waitUntil: "networkidle" });
    await page.evaluate(() => { window.testEvents = []; window.gtag = (...args) => window.testEvents.push(args); });
    await page.locator(".review-score-panel .outline-cta").evaluate((element) => { element.addEventListener("click", (event) => event.preventDefault()); element.click(); });
    const events = await page.evaluate(() => window.testEvents);
    assert.equal(events.filter((event) => event[1] === "conversion").length, 0, "Review click triggered an ad conversion");
    assert.ok(events.some((event) => event[1] === "review_click"));
    await page.locator(".review-score-panel .gold-cta").evaluate((element) => { element.addEventListener("click", (event) => event.preventDefault()); element.click(); });
    const booking = await page.evaluate(() => window.testEvents.filter((event) => event[1] === "conversion"));
    assert.equal(booking.length, 1, "Booking click should record exactly once");
    assert.equal(booking[0][2].send_to, "AW-18148785181/d-CkCJGk5s0cEJ34gc5D");
    results.push({ width, video: "plays on arrival without poster", reviewTouch: width === 390 ? "continues" : "not applicable", navigation: "pass", gallery: "original image, Escape closes", faq: "pass", tracking: "review separated; booking once" });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile("output/seo-implementation-20260906/interactions.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
