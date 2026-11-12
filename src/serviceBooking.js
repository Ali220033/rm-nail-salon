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
  "hooked-nail-fix": 20967323,
  "junior-hard-gel": 22635408,
  "junior-clear": 22635421,
  "junior-japanese": 22635426,
  "junior-mens": 22635433,
  "one-nail-extension": 20967321
});

export function getServiceBookingUrl(serviceId, bookingUrl) {
  if (!Object.hasOwn(serviceBookingVariants, serviceId)) return bookingUrl;
  // Open Booksy's inline booking experience directly, with no profile-page hop.
  const url = new URL('/widget-2021/index.html', bookingUrl);
  url.search = new URLSearchParams({
    id: '1762849',
    country: 'us',
    lang: 'en',
    mode: 'inline',
    theme: 'default',
    variantId: String(serviceBookingVariants[serviceId])
  }).toString();
  return url.href;
}

export function isBookingDestination(href, bookingUrl) {
  try {
    const url = new URL(href), base = new URL(bookingUrl);
    return url.origin === base.origin && (
      url.pathname === base.pathname ||
      (url.pathname === '/widget-2021/index.html' && url.searchParams.get('id') === '1762849')
    );
  } catch {
    return false;
  }
}
