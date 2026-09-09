import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright-core";
import { galleryItems } from "../src/siteConfig.js";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5188";
const output = process.env.QA_OUTPUT || "output/scroll-choreography";
await mkdir(output, { recursive: true });
assert.equal(galleryItems.length, 32);
assert.ok(!galleryItems.some(item => item.image.includes("rm-gallery-02.")));
const results = [];

for (const engine of [chromium, webkit]) {
  const browser = await engine.launch({ headless: true,
    ...(engine === chromium ? { channel: "msedge" } : {}),
    ...(engine === webkit && process.env.QA_WEBKIT_PATH ? { executablePath: process.env.QA_WEBKIT_PATH } : {})
  });
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: width < 500, hasTouch: width < 500 });
      await context.addInitScript(() => localStorage.setItem("rm-cookie-consent", "essential"));
      await context.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, r => r.abort());
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const go = async path => {
        await page.goto(base + path, { waitUntil: "networkidle" });
        assert.equal(await page.evaluate(() => scrollY), 0);
        assert.equal(await page.locator(".nav").evaluate(e => e.getBoundingClientRect().top), 0);
      };
      const enter = async selector => {
        await page.locator(selector).evaluate(e => scrollTo({ top: scrollY + e.getBoundingClientRect().top - innerHeight * 0.4, behavior: "instant" }));
        await page.waitForFunction(selector => document.querySelector(selector).dataset.scrollState === "playing", selector);
      };
      const freeze = async () => page.evaluate(() => {
        document.getAnimations().filter(a => a.id.startsWith("rm-scroll-")).forEach(a => { a.pause(); a.currentTime = 230; });
      });
      const finish = async () => {
        await page.evaluate(() => document.getAnimations().filter(a => a.id.startsWith("rm-scroll-")).forEach(a => a.finish()));
        await page.waitForTimeout(50);
      };

      // Alternating service direction and real intermediate animation frames.
      for (const index of [1, 2]) {
        await go("/");
        assert.equal(await page.getByRole("button", { name: "View photo: Precision Cuticle Work" }).count(), 0);
        const selector = `.service-line:nth-child(${index})`;
        await enter(selector);
        await freeze();
        const state = await page.locator(selector).evaluate(e => {
          const animation = e.getAnimations().find(a => a.id === "rm-scroll-service");
          return { first: animation.effect.getKeyframes()[0].transform, transform: getComputedStyle(e).transform,
            nested: e.querySelector("img").getAnimations().some(a => a.id === "rm-scroll-service") };
        });
        assert.ok(index === 1 ? /translate3d\(-/.test(state.first) : !/translate3d\(-/.test(state.first));
        assert.notEqual(state.transform, "none");
        assert.ok(state.nested, "Service photograph must move independently");
        if (index === 1) await page.screenshot({ path: `${output}/${engine.name()}-${width}-service-in-motion.png` });
        await page.locator(selector).dispatchEvent("pointerdown", { pointerType: "mouse" });
        assert.ok(await page.locator(selector).evaluate(e => e.getAnimations().every(a => a.playState === "paused")));
        await page.evaluate(() => document.dispatchEvent(new PointerEvent("pointerup", { bubbles: true })));
        assert.ok(await page.locator(selector).evaluate(e => e.getAnimations().some(a => a.playState === "running")), "Releasing outside a card must not leave it paused");
        await finish();
        const box = await page.locator(selector).boundingBox();
        assert.ok(box.x >= -1 && box.x + box.width <= width + 1);
      }

      await go("/gallery");
      assert.equal(await page.getByRole("button", { name: /View photo:/ }).count(), 32);
      const photo = ".masonry-item:first-child";
      await enter(photo);
      await freeze();
      const shutter = await page.locator(`${photo} img`).evaluate(e => ({ clip: getComputedStyle(e).clipPath,
        frames: e.getAnimations().find(a => a.id === "rm-scroll-gallery").effect.getKeyframes().map(f => f.clipPath) }));
      assert.ok(shutter.clip.startsWith("polygon"));
      assert.notEqual(shutter.clip, shutter.frames[0]);
      assert.notEqual(shutter.clip, shutter.frames.at(-1));
      await page.screenshot({ path: `${output}/${engine.name()}-${width}-gallery-in-motion.png` });
      // Focusing a moving target immediately settles it for keyboard/touch use.
      await page.locator(photo).focus();
      assert.equal(await page.locator(photo).evaluate(e => e.dataset.scrollState), "complete");
      await finish();
      await page.locator(photo).click();
      await page.getByRole("dialog", { name: "Photo gallery" }).waitFor();
      assert.equal(await page.locator(".gallery-viewer__slide").count(), 32);
      await page.keyboard.press("Escape");
      await page.getByRole("dialog", { name: "Photo gallery" }).waitFor({ state: "detached" });

      for (const [path, selector] of [["/services", ".catalog-service"], ["/about", ".values-flow > article"],
        ["/blog", ".blog-card"], ["/russian-manicure-nyc", ".decision-columns > article"],
        ["/contact", ".contact-concierge-card"], ["/sterilization-process", ".sterile-timeline > article"]]) {
        await go(path);
        assert.ok(await page.locator(`${selector}[data-scroll-style]`).count(), `${path}: missing choreography`);
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.75) {
            scrollTo({ top: y, behavior: "instant" });
            await new Promise(resolve => setTimeout(resolve, 30));
          }
        });
        await finish();
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path);
      }

      await go("/");
      await enter(".service-line:first-child");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => !document.getAnimations().some(a => a.id.startsWith("rm-scroll-")));
      assert.equal(await page.locator("[data-scroll-style]").count(), 0);
      await go("/services");
      assert.equal(await page.locator("[data-scroll-style]").count(), 0);
      assert.deepEqual(errors, []);
      await context.close();

      const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 844 } });
      const staticPage = await noJs.newPage();
      await staticPage.goto(base + "/gallery");
      assert.equal(await staticPage.getByRole("button", { name: /View photo:/ }).count(), 32);
      assert.equal(await staticPage.locator("[data-scroll-style]").count(), 0);
      await noJs.close();
      results.push({ engine: engine.name(), width, passed: true });
    }
  } finally { await browser.close(); }
}
await writeFile(`${output}/qa.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
