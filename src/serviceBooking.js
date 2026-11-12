// Verified public Booksy variants for this salon. Unlisted services keep the original flow.
export const serviceBookingVariants = Object.freeze({
  "russian-clear": 20914966,
  "mens-manicure": 20914967,
  "japanese-manicure": 20914988,
  "russian-hard-gel": 20908336,
  "smart-pedicure": 20908274,
  "smart-gel-pedicure": 20915165,
  "combo-clear": 21605893,
  "hard-gel-smart": 21605843,
  "hard-gel-smart-gel": 21604413,
  "french": 20967191,
  "cat-eye": 20967211,
  "chrome": 20967217,
  "ombre": 20967226,
  "nail-design": 20967247,
  "regular-polish": 20967228,
  "extra-long-nails": 20967230,
  "gel-removal": 20967241,
  "acrylic-removal": 20967244,
  "one-nail-repair": 20967251,
  "hooked-nail-fix": 20967323
});

export function getServiceBookingUrl(serviceId, bookingUrl) {
  if (!Object.hasOwn(serviceBookingVariants, serviceId)) return bookingUrl;
  const url = new URL(bookingUrl);
  url.searchParams.set('do', 'open-widget');
  url.searchParams.set('variantId', String(serviceBookingVariants[serviceId]));
  return url.href;
}

export function isBookingDestination(href, bookingUrl) {
  try {
    const url = new URL(href), base = new URL(bookingUrl);
    return url.origin === base.origin && url.pathname === base.pathname;
  } catch {
    return false;
  }
}
