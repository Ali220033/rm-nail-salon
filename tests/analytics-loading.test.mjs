import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { trackBookingConversion, trackDirectionsConversion, trackReviewClick } from "../src/googleAds.js";

const html = await readFile("index.html", "utf8");
const bootstrap = html.match(/<script id="rm-google-tag-bootstrap">([\s\S]*?)<\/script>/)?.[1];
assert.ok(bootstrap, "Local consent bootstrap exists");

function browser({ consent = "", readyState = "loading", idle = true, storageThrows = false } = {}) {
  const scripts = [];
  const listeners = new Map();
  const idleJobs = [];
  const timers = [];
  const window = {
    localStorage: { getItem() { if (storageThrows) throw new Error("unavailable"); return consent; } },
    addEventListener: (name, callback) => listeners.set(name, callback),
    requestIdleCallback: idle ? (callback) => idleJobs.push(callback) : undefined,
    setTimeout: (callback) => timers.push(callback)
  };
  const document = { readyState, createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } };
  runInNewContext(bootstrap, { window, document });
  return { window, scripts, listeners, idleJobs, timers };
}

const accepted = { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" };
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };

test("Google has no eager script and preserves denied-mode measurement after load", () => {
  assert.ok(!/<script[^>]+src="https:\/\/www\.googletagmanager\.com/.test(html));
  for (const consent of ["", "essential"]) {
    const state = browser({ consent, readyState: "complete" });
    assert.equal(state.scripts.length, 0);
    assert.equal(state.idleJobs.length, 1);
    state.idleJobs[0]();
    assert.equal(state.scripts.length, 1);
    assert.equal(state.window.dataLayer[0][0], "consent");
    assert.equal(state.window.dataLayer[0][2].ad_storage, "denied");
  }
});

test("returning opted-in visitors load once after load and idle", () => {
  const state = browser({ consent: "accepted" });
  assert.equal(state.scripts.length, 0);
  assert.equal(state.idleJobs.length, 0);
  state.listeners.get("load")();
  assert.equal(state.scripts.length, 0);
  state.idleJobs[0]();
  assert.equal(state.scripts.length, 1);
  assert.equal(state.scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=AW-18148785181");
  assert.equal(state.scripts[0].async, true);
  state.window.gtag("consent", "update", accepted);
  state.window.gtag("event", "conversion", {});
  assert.equal(state.scripts.length, 1);
});

test("opt-in works even with unavailable storage and queues all existing event IDs", () => {
  const state = browser({ storageThrows: true });
  state.window.gtag("consent", "update", accepted);
  assert.equal(state.scripts.length, 1);
  const previousWindow = global.window;
  global.window = state.window;
  try {
    trackBookingConversion();
    trackDirectionsConversion();
    trackReviewClick();
  } finally {
    if (previousWindow === undefined) delete global.window;
    else global.window = previousWindow;
  }
  const events = state.window.dataLayer.filter((item) => item[0] === "event");
  assert.deepEqual(Array.from(events, (item) => [item[1], item[2].send_to]), [
    ["conversion", "AW-18148785181/d-CkCJGk5s0cEJ34gc5D"],
    ["conversion", "AW-18148785181/dnC3CNi2480cEJ34gc5D"],
    ["review_click", "AW-18148785181"]
  ]);
  const configs = state.window.dataLayer.filter((item) => item[0] === "config");
  assert.equal(configs[1][1], "AW-18148785181/fPcbCK6J480cEJ34gc5D");
  assert.equal(configs[1][2].phone_conversion_number, "346-865-6565");
});

test("a consented conversion starts loading without waiting and is queued exactly once", () => {
  const state = browser({ consent: "accepted", readyState: "complete" });
  state.window.gtag("event", "conversion", { send_to: "booking" });
  assert.equal(state.scripts.length, 1);
  assert.equal(state.window.dataLayer.filter((item) => item[0] === "event").length, 1);
  state.idleJobs[0]();
  assert.equal(state.scripts.length, 1);
});

test("idle fallback preserves denied consent and failed loads can retry", () => {
  const state = browser({ consent: "accepted", readyState: "complete", idle: false });
  state.timers[0]();
  assert.equal(state.scripts.length, 1);
  state.window.gtag("consent", "update", denied);
  assert.equal(state.window.dataLayer.at(-1)[2].ad_storage, "denied");
  state.scripts[0].onerror();
  state.window.gtag("event", "conversion", { send_to: "booking" });
  assert.equal(state.scripts.length, 2);
});

test("meaningful interaction and denied-consent conversions accelerate the same queued tag", () => {
  for (const event of ["pointerdown", "keydown"]) {
    const state = browser();
    state.listeners.get(event)();
    assert.equal(state.scripts.length, 1);
    assert.equal(state.window.dataLayer[0][2].ad_storage, "denied");
  }
  const state = browser({ consent: "essential" });
  state.window.gtag("event", "conversion", { send_to: "booking" });
  assert.equal(state.scripts.length, 1);
  assert.equal(state.window.dataLayer.at(-1)[2].send_to, "booking");
  assert.equal(state.window.dataLayer[0][2].ad_storage, "denied");
});
