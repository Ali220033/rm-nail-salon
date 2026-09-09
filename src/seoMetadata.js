import { absoluteImage, absoluteUrl, buildStructuredData, getSeoPage } from "./seoData.js";
import { siteConfig } from "./siteConfig.js";

// Shared by prerendering and client navigation, including optional fields that
// must be removed when the next page does not supply them.
export function getSeoMetadata(path, imageManifest = {}) {
  const page = getSeoPage(path);
  const image = imageManifest[page.image];
  const imageAlt = page.imageAlt || page.h1 || page.title;
  const meta = [
    ["name", "description", page.description],
    ["name", "robots", page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["property", "og:type", page.datePublished ? "article" : "website"],
    ["property", "og:site_name", siteConfig.salonName],
    ["property", "og:locale", "en_US"],
    ["property", "og:url", absoluteUrl(page.path)],
    ["property", "og:image", absoluteImage(page.image)],
    ["property", "og:image:alt", imageAlt],
    ["property", "og:image:width", image?.width],
    ["property", "og:image:height", image?.height],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
    ["name", "twitter:image", absoluteImage(page.image)],
    ["name", "twitter:image:alt", imageAlt]
  ].map(([attribute, key, content]) => ({ attribute, key, content }));
  return { title: page.title, canonical: absoluteUrl(page.path), meta, structuredData: buildStructuredData(page.path) };
}

export function renderSeoMetadata(metadata) {
  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`,
    ...metadata.meta.filter(({ content }) => content !== undefined && content !== null && content !== "")
      .map(({ attribute, key, content }) => `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`),
    `<script id="rm-jsonld" type="application/ld+json">${JSON.stringify(metadata.structuredData).replace(/</g, "\\u003c")}</script>`
  ].join("\n");
}

function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
