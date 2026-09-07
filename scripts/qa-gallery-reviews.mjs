import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5188";
const output = "output/gallery-performance-20260907";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
try {
  for (const width of [390, 320, 430, 1440]) {
    const mobile = width < 500;
    const context = await browser.newContext({ viewport: { width, height: mobile ? 844 : 1000 }, isMobile: mobile, hasTouch: mobile });
    await context.addInitScript(() => localStorage.setItem("rm-cookie-consent", "essential"));
    await context.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, (route) => route.abort());
    const page = await context.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    const rail = page.locator(".review-marquee");
    await page.waitForFunction(() => document.querySelector(".review-marquee").getAnimations().length > 0);
    assert.equal(await rail.evaluate((e) => e.getAnimations()[0].playState), "paused");
    assert.equal(await rail.evaluate((e) => e.getAnimations()[0].currentTime), 0);
    await page.locator(".google-review-shell").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".review-marquee").getAnimations()[0].playState === "running");
    const before = await rail.evaluate((e) => getComputedStyle(e).transform);
    const bounds = await page.locator(".google-review-shell").boundingBox();
    if (mobile) await page.touchscreen.tap(width / 2, bounds.y + 50);
    else await page.mouse.move(bounds.x + 80, bounds.y + 60);
    await page.waitForTimeout(350);
    assert.notEqual(await rail.evaluate((e) => getComputedStyle(e).transform), before, "Touch/hover stopped rotation");
    for (const phase of [0, 0.5, 0.999, 1, 1.5, 2.999, 10.999, 99.5, 100]) {
      await rail.evaluate((e, phase) => { const a = e.getAnimations()[0]; a.currentTime = a.effect.getTiming().duration * phase; }, phase);
      await page.waitForTimeout(30);
      const visible = await page.locator(".google-review-shell").evaluate((e) => {
        const box = e.getBoundingClientRect();
        return [...e.querySelectorAll("article")].filter((card) => { const r = card.getBoundingClientRect(); return r.right > box.left + 24 && r.left < box.right - 24 && r.height > 50; }).length;
      });
      assert.ok(visible > 0, `Empty review loop at iteration ${phase}, ${width}px`);
    }
    await page.screenshot({ path: `${output}/reviews-${width}.png` });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForFunction(() => document.querySelector(".review-marquee").getAnimations()[0].playState === "paused");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".google-review-shell").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector(".review-marquee").getAnimations()[0].playState === "running");
    await page.emulateMedia({ reducedMotion: "no-preference" });

    await page.goto(base + "/gallery", { waitUntil: "networkidle" });
    assert.equal(await page.locator(".masonry-caption").count(), 0);
    const photo = page.getByRole("button", { name: /View photo:/ }).nth(2);
    await photo.scrollIntoViewIfNeeded();
    const scroll = await page.evaluate(() => scrollY);
    await photo.click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    const active = () => dialog.locator('.gallery-viewer__slide[aria-hidden="false"] img');
    await active().evaluate((e) => e.decode());
    assert.equal(await dialog.locator(".modal-close").count(), 0);
    const first = await active().getAttribute("src");
    await active().click();
    assert.ok(await dialog.isVisible(), "Photo tap closed viewer");
    const cdp = await context.newCDPSession(page);
    async function swipe(direction) {
      const start = direction === "left" ? width * 0.82 : width * 0.18;
      const end = width - start;
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: start, y: 420 }] });
      for (let step = 1; step <= 12; step++) {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: start + (end - start) * step / 12, y: 420 }] });
        await page.waitForTimeout(14);
      }
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await page.waitForTimeout(400);
    }
    const count = await dialog.locator(".gallery-viewer__slide").count();
    if (mobile) {
      await swipe("left");
      assert.notEqual(await active().getAttribute("src"), first, "Left swipe failed");
      await swipe("right");
      assert.equal(await active().getAttribute("src"), first, "Back swipe failed");
      if (width === 390) {
        await page.keyboard.press("Home");
        await page.waitForTimeout(600);
        for (let index = 1; index < count; index++) {
          await swipe("left");
          assert.equal(await dialog.locator('.gallery-viewer__slide[aria-hidden="false"]').evaluate((e) => [...e.parentElement.children].indexOf(e)), index);
        }
        for (let index = count - 2; index >= 0; index--) {
          await swipe("right");
          assert.equal(await dialog.locator('.gallery-viewer__slide[aria-hidden="false"]').evaluate((e) => [...e.parentElement.children].indexOf(e)), index);
        }
      }
    } else {
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(500);
      assert.notEqual(await active().getAttribute("src"), first);
      await page.keyboard.press("ArrowLeft");
      await page.waitForTimeout(500);
      assert.equal(await active().getAttribute("src"), first);
    }
    await page.waitForFunction(() => { const e = document.querySelector('.gallery-viewer__track'); return Math.abs(e.scrollLeft / e.clientWidth - Math.round(e.scrollLeft / e.clientWidth)) < 0.001; });
    await active().evaluate((e) => e.decode());
    await page.screenshot({ path: `${output}/gallery-${width}.png` });
    const imageBox = await active().boundingBox();
    assert.ok(imageBox.x >= 15 && imageBox.x + imageBox.width <= width - 15, `Photo edges cropped: ${JSON.stringify(imageBox)}`);
    assert.ok(imageBox.y >= 31 && imageBox.y + imageBox.height <= (mobile ? 844 : 1000) - 31);
    await page.screenshot({ path: `${output}/gallery-${width}.png` });
    if (mobile) await page.touchscreen.tap(4, 10);
    else await page.mouse.click(4, 10);
    await dialog.waitFor({ state: "hidden" });
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - scroll) < 2, "Gallery scroll position was lost");
    assert.equal(await photo.evaluate((e) => document.activeElement === e), true, "Focus was not restored");
    await photo.click();
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    results.push({ width, gallery: "swipe/keyboard, backdrop, full frame, focus and scroll restored", photos: count, reviews: "near-viewport start; touch/hover uninterrupted; 100 loop boundaries nonblank" });
    console.log(JSON.stringify(results.at(-1)));
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(`${output}/interactions.json`, JSON.stringify(results, null, 2));
