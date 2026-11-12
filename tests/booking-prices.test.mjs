import test from "node:test";
import assert from "node:assert/strict";
import { serviceMenu } from "../src/siteConfig.js";

// Names and prices observed in the public Booksy catalog on November 11, 2026.
const observed = [
  ["russian-clear","Russian Manicure (clear/no polish)","$65.00","$58.50","45 min"],
  ["mens-manicure","Men's Manicure (no polish)","$75.00","$67.50","40 min"],
  ["japanese-manicure","Japanese Manicure (clear)","$90.00","$81.00","1 h"],
  ["russian-hard-gel","Russian Manicure (Hard gel)","$115.00","$103.50","1 h 30 min"],
  ["smart-pedicure","Russian Smart Pedicure (w/without) reg polish","$95.00","$85.50","1 h"],
  ["smart-gel-pedicure","Russian Smart Gel Pedicure","$120.00","$108.00","1 h 15 min"],
  ["combo-clear","Combo Russian Mani(clear)+Pedi(NO/with reg polish)","$150.00","$135.00","1 h 45 min"],
  ["hard-gel-smart","Russian Gel Manicure + Pedicure NO/With peg polish","$200.00","$180.00","2 h 30 min"],
  ["hard-gel-smart-gel","Combo Russian Gel Manicure + Smart Gel Pedicure","$220.00","$198.00","2 h 45 min"],
  ["french","French tips","$25.00+","$22.50+","15 min"],
  ["cat-eye","Cat eye","$20.00+","$18.00+","15 min"],
  ["chrome","Chrome","$20.00+","$18.00+","15 min"],
  ["ombre","Ombre","$30.00+","$27.00+","20 min"],
  ["nail-design","Nail Design","$25.00+","$22.50+","20 min"],
  ["regular-polish","Regular polish (add-on)","$15.00+","$13.50+","20 min"],
  ["extra-long-nails","Extra Long Nails","$20.00+","$18.00+","15 min"],
  ["gel-removal","Gel Removal","Varies",null,"15 min"],
  ["acrylic-removal","Acrylic/Dip/Extensions removal","$25.00+","$22.50+","20 min"],
  ["one-nail-repair","One nail fix","$10.00+","$9.00+","10 min"],
  ["hooked-nail-fix","Hooked Nail Lift (per 1 nail)","Varies",null,"10 min"],
  ["junior-hard-gel","Junior Russian Hard Gel Manicure (short nails)","$70.00",null,"1 h 30 min"],
  ["junior-clear","Junior Russian Manicure (clear/regular polish)","$40.00",null,"1 h"],
  ["junior-japanese","Junior Japanese Manicure (clear)","$50.00",null,"1 h 10 min"],
  ["junior-mens","Junior Men's Manicure (clear/no polish)","$50.00",null,"50 min"],
  ["one-nail-extension","One nail extension","Varies",null,"15 min"]
];

test("Booksy menu matches the observed services, standard prices and promotions", () => {
  const services = serviceMenu.flatMap(group => group.services);
  assert.equal(services.length, observed.length);
  for (const [id, name, price, promotionPrice, time] of observed) {
    const service = services.find(item => item.id === id);
    assert.ok(service, id);
    assert.equal(service.name, name, id);
    assert.equal(service.price, price, id);
    assert.equal(service.promotionPrice ?? null, promotionPrice, id);
    assert.equal(service.time, time, id);
    assert.equal(service.topTech, null, id);
  }
  for (const id of ["nail-extensions","fill-in","natural-care-combo","mens-grooming-combo","vip-room","best-friends-combo","mr-mrs-combo","four-hands-combo","gel-removal-toes","gel-removal-hands"]) {
    assert.ok(!services.some(service => service.id === id), id);
  }
});
