import manifest from "./imageManifest.json";

export function ResponsiveImage({ src, sizes = "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 600px", fullSize = false, ...props }) {
  const asset = manifest[src];
  const candidates = fullSize ? [] : (asset?.widths || []).map((width) => ({ width, src: `/images/responsive/${asset.hash}-${width}.webp` }));
  const fallback = candidates.find((item) => item.width >= 800) || candidates.at(-1);
  return <img width={asset?.width} height={asset?.height} decoding="async" fetchPriority={props.loading === "lazy" ? "low" : undefined}
    src={fallback?.src || src} srcSet={candidates.length ? candidates.map((item) => `${item.src} ${item.width}w`).join(", ") : undefined}
    sizes={candidates.length ? sizes : undefined} {...props} />;
}
