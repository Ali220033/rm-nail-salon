import { useEffect } from "react";

// Quiet entrances only where they help introduce services or studio imagery.
// Gallery photos reveal through a soft mask, with their geometry unchanged.
// Headings, reading content, utilities and the footer stay independent.
const scenes = [
  ["service", ".service-line, .catalog-service, .seo-service-card"],
  ["gallery", ".masonry-item"],
  ["detail", ".values-flow > article, .artist-card"],
  ["image", ".salon-preview-card, .about-luxury-collage > img, .service-image-story > article"]
];
// The user explicitly kept the existing homepage motion from the video onward.
const preservedHomeScenes = [
  ["heading", ".work-reel-copy, .booking-copy", true],
  ["step", ".visit-info-card", true],
  ["image", ".salon-preview-card", true]
];

export function useScrollChoreography(route) {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Map();
    const targets = new Map();
    let observer;
    let preservedObserver;
    const preservedStart = route === "/" ? main.querySelector(".work-reel-section") : null;
    const isPreserved = element => Boolean(preservedStart &&
      (preservedStart.contains(element) ||
        (preservedStart.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING)));

    const settle = (element) => {
      active.get(element)?.forEach(animation => animation.cancel());
      active.delete(element);
      element.dataset.scrollState = "complete";
    };
    const settleAll = () => [...active.keys()].forEach(settle);

    const play = (owner, element, from, duration, delay = 0, to = {}) => {
      if (!element) return;
      const style = getComputedStyle(element);
      const end = { ...Object.fromEntries(Object.keys(from).map(key => [key, style[key]])), ...to };
      if (from.clipPath && end.clipPath === "none") end.clipPath = "inset(0 0 0 0)";
      const animation = element.animate([from, end], {
        duration, delay, fill: "both", easing: targets.get(owner).preserved
          ? "cubic-bezier(0.22, 1, 0.36, 1)" : "cubic-bezier(0.22, 0.61, 0.36, 1)"
      });
      animation.id = `rm-scroll-${targets.get(owner).kind}`;
      if (!active.has(owner)) active.set(owner, new Set());
      active.get(owner).add(animation);
      animation.onfinish = () => {
        animation.cancel(); // Release the layer and restore existing hover styles.
        active.get(owner)?.delete(animation);
        if (!active.get(owner)?.size) {
          active.delete(owner);
          owner.dataset.scrollState = "complete";
        }
      };
    };

    const enter = (element, { kind, index, preserved }) => {
      element.dataset.scrollState = "playing";
      const direction = index % 2 === 0 ? -1 : 1;
      if (preserved) {
        const delay = (index % 3) * 65;
        if (kind === "heading") {
          [...element.children].filter(child => child.matches("p, h2, h3")).forEach((child, i) => {
            play(element, child, {
              transform: `translate3d(${i === 0 ? -26 : 0}px, ${i === 0 ? 0 : 36}px, 0) skewY(${i === 1 ? 2 : 0}deg)`,
              clipPath: "inset(0 0 100% 0)"
            }, 900, i * 90);
          });
        } else if (kind === "image") {
          play(element, element, {
            transform: `translate3d(${direction * 36}px, 28px, 0) scale(0.96)`,
            clipPath: direction < 0 ? "inset(0 90% 12% 0)" : "inset(12% 0 0 90%)"
          }, 1200, delay);
        } else {
          play(element, element, {
            transform: `perspective(900px) translate3d(${direction * 28}px, ${48 + (index % 3) * 20}px, 0) rotateX(9deg) rotateZ(${direction * 1.2}deg)`
          }, 1000, delay);
          play(element, element.querySelector(":scope > img"), { transform: "scale(1.06)" }, 1150, delay);
        }
        return;
      }
      const distance = innerWidth < 820 ? 12 : 18;
      const delay = (index % 3) * 40;
      if (kind === "service") {
        play(element, element, {
          opacity: 0.18,
          transform: `translate3d(${direction * distance}px, 12px, 0)`
        }, 850, delay);
      } else if (kind === "gallery") {
        // A broad gradient edge travels diagonally over the image. The photo
        // and button never move, crop, rotate or scale during this entrance.
        const mask = "linear-gradient(135deg, #000 40%, transparent 60%)";
        const feather = CSS.supports("mask-image", mask) ? {
          maskImage: mask, maskSize: "250% 250%", maskRepeat: "no-repeat"
        } : {};
        play(element, element.querySelector("img"), {
          opacity: 0.65, ...feather,
          ...(feather.maskImage ? { maskPosition: "100% 100%" } : {})
        }, 1300, delay, {
          opacity: 1, ...feather,
          ...(feather.maskImage ? { maskPosition: "0% 0%" } : {})
        });
      } else if (kind === "image") {
        play(element, element, {
          opacity: 0.3,
          transform: `translate3d(${direction * 10}px, 14px, 0)`
        }, 950, delay);
      } else {
        play(element, element, {
          opacity: 0.25,
          transform: "translate3d(0, 12px, 0)"
        }, 850, delay);
      }
    };

    const setup = () => {
      observer?.disconnect();
      preservedObserver?.disconnect();
      settleAll();
      targets.clear();
      main.querySelectorAll("[data-scroll-style]").forEach(element => {
        delete element.dataset.scrollStyle;
        delete element.dataset.scrollState;
      });
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          if (!isIntersecting || target.dataset.scrollState !== "waiting") return;
          // Start just below the viewport. If a fast scroll or anchor jump has
          // already brought content into the reading area, leave it visible.
          if (boundingClientRect.top >= innerHeight * 0.6) enter(target, targets.get(target));
          else settle(target);
          observer.unobserve(target);
        });
      }, { rootMargin: "0px 0px 48px 0px", threshold: 0 });
      preservedObserver = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          if (!isIntersecting || target.dataset.scrollState !== "waiting") return;
          if (boundingClientRect.bottom > 90) enter(target, targets.get(target));
          else settle(target);
          preservedObserver.unobserve(target);
        });
      }, { rootMargin: "0px 0px -7% 0px", threshold: 0 });
      for (const [kind, selector, preserved = false] of [...scenes, ...preservedHomeScenes]) {
        const siblings = new Map();
        main.querySelectorAll(selector).forEach(element => {
          if (preserved !== isPreserved(element)) return;
          const index = siblings.get(element.parentElement) || 0;
          siblings.set(element.parentElement, index + 1);
          targets.set(element, { kind, index, preserved });
          element.dataset.scrollStyle = kind;
          // Visible first-screen content never disappears during hydration.
          // Nothing is hidden while waiting: no JS, missed observers, or errors
          // can leave blank sections in the prerendered page.
          const box = element.getBoundingClientRect();
          if (box.top < innerHeight && box.bottom > 0) {
            element.dataset.scrollState = "complete";
          } else {
            element.dataset.scrollState = "waiting";
            (preserved ? preservedObserver : observer).observe(element);
          }
        });
      }
    };

    const onInteract = event => {
      const owner = event.target.closest?.("[data-scroll-style]");
      if (owner && targets.has(owner)) {
        observer?.unobserve(owner);
        preservedObserver?.unobserve(owner);
        if (event.type === "pointerdown") {
          active.get(owner)?.forEach(animation => animation.pause());
        } else if (event.type !== "focusin" || event.target.matches(":focus-visible")) {
          settle(owner);
        }
      }
    };
    const onVisibility = () => { if (document.hidden) settleAll(); };
    const onPointerEnd = () => {
      active.forEach(animations => animations.forEach(animation => {
        if (animation.playState === "paused") animation.play();
      }));
    };
    setup();
    preference.addEventListener("change", setup);
    main.addEventListener("focusin", onInteract);
    main.addEventListener("pointerdown", onInteract, { passive: true });
    main.addEventListener("click", onInteract);
    main.addEventListener("pointercancel", onInteract);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerup", onPointerEnd);
    document.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("beforeprint", settleAll);
    return () => {
      observer?.disconnect();
      preservedObserver?.disconnect();
      settleAll();
      preference.removeEventListener("change", setup);
      main.removeEventListener("focusin", onInteract);
      main.removeEventListener("pointerdown", onInteract);
      main.removeEventListener("click", onInteract);
      main.removeEventListener("pointercancel", onInteract);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerup", onPointerEnd);
      document.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("beforeprint", settleAll);
    };
  }, [route]);
}
