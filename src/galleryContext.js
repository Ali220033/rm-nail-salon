// Related services help visitors explore a finish; they do not certify which
// product or treatment was used in a photograph. Keep the supplied description.
export function getGalleryContext(item = {}) {
  const description = [item.title, item.caption, item.alt].filter(Boolean).join(" ");
  const caption = item.caption || item.title || item.alt || "";

  if (/\b(pedicure|toes?|feet)\b/i.test(description)) {
    return {
      caption,
      serviceLabel: "Explore pedicure options",
      servicePath: "/smart-pedicure-nyc"
    };
  }

  if (/\bextensions?\b/i.test(description)) {
    return {
      caption,
      serviceLabel: "Explore nail extension options",
      servicePath: "/gel-extensions-nyc"
    };
  }

  if (/\b(french|cat[ -]?eye|nail art|chrome|ombre|ombré)\b/i.test(description)) {
    return {
      caption,
      serviceLabel: "Explore nail art options",
      servicePath: "/nail-art-nyc"
    };
  }

  return {
    caption,
    serviceLabel: "Explore Russian manicure options",
    servicePath: "/russian-manicure-nyc"
  };
}
