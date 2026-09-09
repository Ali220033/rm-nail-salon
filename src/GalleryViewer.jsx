import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import imageManifest from "./imageManifest.json";

export function GalleryViewer({ items, initialIndex, onClose }) {
  const [index, setIndex] = useState(Math.max(0, initialIndex));
  const activeIndex = useRef(index);
  const track = useRef(null);
  const pointerStart = useRef(null);
  const close = useRef(onClose);
  close.current = onClose;

  useLayoutEffect(() => {
    const element = track.current;
    let width = element.clientWidth;
    const align = () => element.scrollTo({ left: activeIndex.current * element.clientWidth, behavior: "instant" });
    align();
    const observer = new ResizeObserver(() => {
      // Its initial notification must not cancel a swipe or arrow action that
      // started after the first alignment while the photograph was loading.
      if (element.clientWidth === width) return;
      width = element.clientWidth;
      align();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    const focused = document.activeElement;
    const bodyStyle = document.body.getAttribute("style");
    const wasInert = root.inert;
    const y = window.scrollY;
    const x = window.scrollX;
    Object.assign(document.body.style, { position: "fixed", top: `-${y}px`, left: `-${x}px`, width: "100%", overflow: "hidden" });
    root.inert = true;
    track.current.focus({ preventScroll: true });
    const onKeyDown = (event) => {
      if (event.key === "Escape") close.current();
      if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : activeIndex.current + (event.key === "ArrowRight" ? 1 : -1);
        const target = Math.min(items.length - 1, Math.max(0, next));
        activeIndex.current = target;
        setIndex(target);
        track.current.scrollTo({ left: target * track.current.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
      if (event.key === "Tab") {
        event.preventDefault();
        const button = document.querySelector(".gallery-viewer__close");
        (document.activeElement === button ? track.current : button).focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      root.inert = wasInert;
      if (bodyStyle === null) document.body.removeAttribute("style");
      else document.body.setAttribute("style", bodyStyle);
      window.scrollTo({ left: x, top: y, behavior: "instant" });
      focused?.focus({ preventScroll: true });
    };
  }, [items.length]);

  return createPortal(
    <div className="gallery-viewer" role="dialog" aria-modal="true" aria-label="Photo gallery">
      <div className="gallery-viewer__track" ref={track} tabIndex={-1}
        onScroll={(event) => {
          const next = Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth);
          activeIndex.current = next;
          setIndex(next);
        }}
        onPointerDown={(event) => { pointerStart.current = { x: event.clientX, y: event.clientY, target: event.target }; }}
        onClick={(event) => {
          const start = pointerStart.current;
          if (event.target.tagName === "IMG" || !start || start.target !== event.target) return;
          if (Math.hypot(event.clientX - start.x, event.clientY - start.y) < 8) close.current();
        }}>
        {items.map((item, position) => (
          <div key={`${item.image}-${position}`} className="gallery-viewer__slide" aria-hidden={position !== index}>
            {Math.abs(position - index) <= 2 && <ResponsiveImage src={item.image} fullSize
              sizes={`min(calc(100vw - 32px), calc((100dvh - 64px) * ${imageManifest[item.image]?.width / imageManifest[item.image]?.height || 1}))`}
              alt={item.alt || `${item.title} manicure close-up`} loading={position === index ? "eager" : "lazy"} draggable={false} />}
          </div>
        ))}
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">Photo {index + 1} of {items.length}: {items[index]?.title}</span>
      <button type="button" className="gallery-viewer__close sr-only" onClick={onClose}>Close gallery</button>
    </div>, document.body
  );
}
