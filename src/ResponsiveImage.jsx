import { useEffect, useRef, useState } from "react";
import manifest from "./imageManifest.json";

const defaultSizes = "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 600px";

const pendingMeasurements = new Map();
let nearViewportObserver;

function measureWhenNear(image, start) {
  if (typeof IntersectionObserver === "undefined") {
    start();
    return () => {};
  }
  if (!nearViewportObserver) {
    nearViewportObserver = new IntersectionObserver((entries, observer) => {
      if (observer !== nearViewportObserver) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const activate = pendingMeasurements.get(entry.target);
        pendingMeasurements.delete(entry.target);
        observer.unobserve(entry.target);
        activate?.();
      }
      if (!pendingMeasurements.size) {
        observer.disconnect();
        nearViewportObserver = undefined;
      }
    }, { rootMargin: "400px" });
  }
  pendingMeasurements.set(image, start);
  nearViewportObserver.observe(image);
  return () => {
    pendingMeasurements.delete(image);
    nearViewportObserver?.unobserve(image);
    if (!pendingMeasurements.size && nearViewportObserver) {
      nearViewportObserver.disconnect();
      nearViewportObserver = undefined;
    }
  };
}

function candidates(src, asset, format, fullSize) {
  if (!asset) return undefined;
  const hash = format === "avif" ? asset.avifHash : asset.hash;
  if (!hash) return undefined;
  return asset.widths.map(width => {
    const url = fullSize && format === "webp" && width === (asset.sourceWidth || asset.width)
      ? asset.fullSrc || src : `/images/responsive/${hash}-${width}.${format}`;
    return `${url} ${width}w`;
  }).join(", ");
}

export function ResponsiveImage({ src, sizes = defaultSizes, fullSize = false, sources = [], ref: forwardedRef, ...props }) {
  const asset = manifest[src];
  const imageRef = useRef(null);
  const [measuredSizes, setMeasuredSizes] = useState(null);
  const sourceKey = sources.map(source => `${source.media}:${source.src}`).join("|");

  useEffect(() => {
    const image = imageRef.current;
    // The lightbox already supplies its exact viewport-constrained contain size.
    // Keep that selection stable while WebKit is snapping between slides.
    if (!image || !asset || fullSize) return;
    // Cover can scale a photograph beyond its element width before clipping it.
    // Measure the existing content box; never change its crop or geometry.
    const measure = () => {
      const selected = sources.find(source => window.matchMedia(source.media).matches);
      const metadata = manifest[selected?.src || src];
      const ratio = (metadata?.sourceWidth || metadata?.width) / (metadata?.sourceHeight || metadata?.height);
      const style = getComputedStyle(image);
      const width = image.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const height = image.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      if (!width || !height || !ratio) return;
      const effectiveWidth = style.objectFit === "cover" ? Math.max(width, height * ratio)
        : style.objectFit === "contain" ? Math.min(width, height * ratio) : width;
      const next = `${Math.ceil(effectiveWidth)}px`;
      setMeasuredSizes(previous => previous === next ? previous : next);
    };
    let observer;
    let active = false;
    const start = () => {
      if (active) return;
      active = true;
      measure();
      observer = new ResizeObserver(measure);
      observer.observe(image);
      image.addEventListener("load", measure);
      window.addEventListener("resize", measure, { passive: true });
    };
    // Keep the supplied cover-aware SSR sizes until a lazy image approaches the
    // viewport. Eager images still measure immediately for the first screen.
    let stopWaiting = () => {};
    if (props.loading === "lazy") stopWaiting = measureWhenNear(image, start);
    else start();
    return () => {
      stopWaiting();
      observer?.disconnect();
      image.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, [src, sourceKey, fullSize, props.loading]);

  const widths = asset?.widths || [];
  const fallbackWidth = widths.find(width => width >= 800) || widths.at(-1);
  const sourceSizes = measuredSizes || sizes;
  const image = <img width={asset?.width} height={asset?.height} decoding="async"
    fetchPriority={props.loading === "lazy" ? "low" : undefined}
    src={fullSize ? asset?.fullSrc || src : fallbackWidth ? `/images/responsive/${asset.hash}-${fallbackWidth}.webp` : src}
    srcSet={candidates(src, asset, "webp", fullSize)} sizes={asset ? sourceSizes : undefined}
    {...props} ref={element => { imageRef.current = element; if (typeof forwardedRef === "function") forwardedRef(element); else if (forwardedRef) forwardedRef.current = element; }} />;
  if (!asset?.avifHash && !sources.length) return image;
  return <picture className="responsive-image" style={{ display: "contents" }}>
    {sources.flatMap(source => {
      const entry = manifest[source.src];
      return [entry?.avifHash && <source key={`${source.media}-avif`} media={source.media} type="image/avif"
        srcSet={candidates(source.src, entry, "avif", fullSize)} sizes={measuredSizes || source.sizes || sizes}
        width={entry.sourceWidth || entry.width} height={entry.sourceHeight || entry.height} />,
      <source key={`${source.media}-webp`} media={source.media} type="image/webp"
        srcSet={candidates(source.src, entry, "webp", fullSize) || source.src} sizes={measuredSizes || source.sizes || sizes}
        width={entry?.sourceWidth || entry?.width} height={entry?.sourceHeight || entry?.height} />];
    })}
    {!fullSize && asset?.mobileAvifHash && <source media="(max-width: 819px)" type="image/avif"
      srcSet={candidates(src, { ...asset, avifHash: asset.mobileAvifHash }, "avif", false)} sizes={sourceSizes} />}
    {asset?.avifHash && <source type="image/avif" srcSet={candidates(src, asset, "avif", fullSize)} sizes={sourceSizes} />}
    {image}
  </picture>;
}
