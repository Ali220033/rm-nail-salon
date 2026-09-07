import test from "node:test";
import assert from "node:assert/strict";
import { serviceMenu } from "../src/siteConfig.js";

// Public Booksy menu checked 2026-09-07. Do not infer prices for unlisted packages.
const verified = [
  ["russian-clear", "$65", "45 min"],
  ["mens-manicure", "$75", "40 min"],
  ["japanese-manicure", "$90", "1 h"],
  ["russian-hard-gel", "$115", "1 h 30 min"],
  ["smart-pedicure", "$95", "1 h"],
  ["smart-gel-pedicure", "$120", "1 h 15 min"],
  ["combo-clear", "$150", "1 h 45 min"],
  ["hard-gel-smart", "$200", "2 h 30 min"],
  ["hard-gel-smart-gel", "$220", "2 h 45 min"],
  ["french", "$25+", "15 min"],
  ["cat-eye", "$20+", "15 min"],
  ["chrome", "$20+", "15 min"],
  ["ombre", "$30+", "20 min"],
  ["nail-design", "$25+", "20 min"],
  ["regular-polish", "$15+", "20 min"],
  ["extra-long-nails", "$20+", "15 min"],
  ["gel-removal", "Varies", "15 min"],
  ["acrylic-removal", "$25+", "20 min"],
  ["one-nail-repair", "$10+", "10 min"],
  ["hooked-nail-fix", "Varies", "10 min"]
];

test("all 20 Booksy-matched menu entries retain accurate prices and durations", () => {
  const menu = serviceMenu.flatMap((group) => group.services);
  for (const [id, price, time] of verified) {
    const service = menu.find((item) => item.id === id);
    assert.equal(service.price, price, id);
    assert.equal(service.time, time, id);
  }
});
