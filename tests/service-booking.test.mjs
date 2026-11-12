import assert from 'node:assert/strict';
import {test} from 'node:test';
import {getServiceBookingUrl, isBookingDestination} from '../src/serviceBooking.js';

const base = 'https://booksy.com/en-us/1762849_rm-nail-salon-midtown-nyc-russian-manicure_nail-salon_30067_new-york-city';

test('Booksy handoff opens the inline booking screen without navigating to the profile', () => {
  const url = new URL(getServiceBookingUrl('russian-clear', base));
  assert.equal(url.origin, 'https://booksy.com');
  assert.equal(url.pathname, '/widget-2021/index.html');
  assert.equal(url.searchParams.get('id'), '1762849');
  assert.equal(url.searchParams.get('mode'), 'inline');
  assert.equal(url.searchParams.get('variantId'), '20914966');
});

test('missing and unknown Booksy services preserve the original destination exactly', () => {
  for (const id of ['nail-extensions', 'gel-removal-hands', 'unknown', 'toString', '__proto__']) {
    assert.equal(getServiceBookingUrl(id, base), base);
  }
});

test('booking tracking recognizes service links only for the configured salon', () => {
  assert.equal(isBookingDestination(getServiceBookingUrl('gel-removal', base), base), true);
  assert.equal(isBookingDestination(base, base), true);
  assert.equal(isBookingDestination('https://booksy.com/en-us/another-salon', base), false);
  assert.equal(isBookingDestination('https://booksy.com/widget-2021/index.html?id=42', base), false);
  assert.equal(isBookingDestination(base.replace('booksy.com', 'example.com'), base), false);
  assert.equal(isBookingDestination('/services', base), false);
});
