import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright-core";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:5188";
const output = process.env.QA_OUTPUT || "output/page-entry";
await mkdir(output, { recursive: true });
const results = [];

for (const engine of [chromium, webkit]) {
  const browser = await engine.launch({
    headless: true,
    ...(engine === chromium ? { channel: "msedge" } : {}),
    ...(engine === webkit && process.env.QA_WEBKIT_PATH ? { executablePath: process.env.QA_WEBKIT_PATH } : {})
  });
  try {
    for (const width of [390, 440, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width < 500 ? 766 : 1000 },
        isMobile: width < 500, hasTouch: width < 500
      });
      await context.addInitScript(() => localStorage.setItem("rm-cookie-consent", "essential"));
      await context.route(/googletagmanager|google-analytics|googleadservices|doubleclick/, r => r.abort());
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const assertTop = async () => {
        const state = await page.evaluate(() => {
          const header = document.querySelector(".nav");
          const box = header.getBoundingClientRect();
          return { y: scrollY, top: box.top, height: box.height,
            visible: header.contains(document.elementFromPoint(20, 20)) };
        });
        assert.equal(state.y, 0);
        assert.equal(state.top, 0);
        assert.ok(state.height > 50 && state.visible, "Complete header must be visible");
      };
      await page.goto(base, { waitUntil: "networkidle" });
      await assertTop();

      // Reproduce the old-position flash with React deliberately held back.
      await page.evaluate(() => scrollTo({ top: 112, behavior: "instant" }));
      let release;
      const gate = new Promise(resolve => { release = resolve; });
      const delayModules = async route => { await gate; await route.continue(); };
      await page.route(/\/assets\/.*\.js$/, delayModules);
      try {
        await page.reload({ waitUntil: "commit" });
        await page.locator(".nav").waitFor();
        await page.waitForTimeout(600);
        await assertTop();
      } finally { release(); }
      await page.waitForLoadState("networkidle");
      await page.unroute(/\/assets\/.*\.js$/, delayModules);
      await assertTop();
      await page.screenshot({ path: `${output}/${engine.name()}-${width}.png` });

      // A normal visit stays scrollable; only a restored document resets.
      await page.evaluate(() => scrollTo({ top: 350, behavior: "instant" }));
      await page.waitForTimeout(250);
      assert.equal(await page.evaluate(() => scrollY), 350);
      await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
      await assertTop();

      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(base + "/#reviews", { waitUntil: "networkidle" });
      await page.waitForFunction(() => scrollY > 500);
      const anchorY = await page.evaluate(() => scrollY);
      await page.evaluate(() => dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
      assert.ok(Math.abs(await page.evaluate(() => scrollY) - anchorY) < 2, "Explicit section link must stay in place");

      await page.goto(base + "/gallery", { waitUntil: "networkidle" });
      const photo = page.getByRole("button", { name: /View photo:/ }).nth(2);
      await photo.scrollIntoViewIfNeeded();
      const galleryY = await page.evaluate(() => scrollY);
      await photo.click();
      await page.getByRole("dialog", { name: "Photo gallery" }).waitFor();
      await page.keyboard.press("Escape");
      await page.getByRole("dialog", { name: "Photo gallery" }).waitFor({ state: "detached" });
      assert.ok(Math.abs(await page.evaluate(() => scrollY) - galleryY) < 2, "Closing gallery must preserve scroll");
      assert.deepEqual(errors, []);
      results.push({ engine: engine.name(), width, passed: true });
      await context.close();
    }
  } finally { await browser.close(); }
}
await writeFile(`${output}/qa.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
