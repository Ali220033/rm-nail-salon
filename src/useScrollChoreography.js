import { useEffect } from "react";

// Deliberate motion families shared across routes. Hero, navigation, sticky
// controls, reading paragraphs, and the continuous review loop stay independent.
const scenes = [
  ["service", ".service-line, .catalog-service, .seo-service-card"],
  ["gallery", ".masonry-item"],
  ["heading", ".section-intro, .catalog-group-heading, .work-reel-copy, .about-lead, .about-body, .seo-lead-block, .geo-story-main, .sterile-manifesto, .booking-copy"],
  ["step", ".proof-block, .values-flow > article, .seo-proof-grid > article, .decision-columns > article, .related-service-card, .blog-card, .journal-micro-card, .visit-info-card, .sterile-timeline > article, .artist-card, .team-intro-card, .geo-path-card, .luxe-accordion > article"],
  ["image", ".salon-preview-card, .about-luxury-collage > img, .service-image-story > article, .geo-arrival-board > img, .contact-concierge-card"]
];

export function useScrollChoreography(route) {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Map();
    const targets = new Map();
    let observer;

    const settle = (element) => {
      active.get(element)?.forEach(animation => animation.cancel());
      active.delete(element);
      element.dataset.scrollState = "complete";
    };
    const settleAll = () => [...active.keys()].forEach(settle);

    const play = (owner, element, from, duration, delay = 0, overshoot) => {
      if (!element) return;
      const style = getComputedStyle(element);
      const end = Object.fromEntries(Object.keys(from).map(key => [key, style[key]]));
      // Match shape types so the shutter interpolates instead of switching
      // discretely from a polygon/inset to `none` halfway through the reveal.
      if (from.clipPath && end.clipPath === "none") {
        end.clipPath = from.clipPath.startsWith("polygon")
          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          : "inset(0 0 0 0)";
      }
      const frames = overshoot ? [from, { ...overshoot, offset: 0.76 }, end] : [from, end];
      const animation = element.animate(frames, {
        duration, delay, fill: "both", easing: "cubic-bezier(0.22, 1, 0.36, 1)"
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

    const enter = (element, { kind, index }) => {
      element.dataset.scrollState = "playing";
      const direction = index % 2 === 0 ? -1 : 1;
      const distance = Math.min(100, innerWidth * 0.18);
      const delay = (index % 3) * 65;
      if (kind === "heading") {
        [...element.children].filter(child => child.matches("p, h2, h3")).forEach((child, i) => {
          play(element, child, {
            transform: `translate3d(${i === 0 ? -26 : 0}px, ${i === 0 ? 0 : 36}px, 0) skewY(${i === 1 ? 2 : 0}deg)`,
            clipPath: "inset(0 0 100% 0)"
          }, 900, i * 90);
        });
      } else if (kind === "service") {
        play(element, element, {
          transform: `translate3d(${direction * distance}px, 38px, 0) rotate(${direction * 1.4}deg)`
        }, 1000, delay, { transform: `translate3d(${-direction * 3}px, -2px, 0) rotate(0deg)` });
        play(element, element.querySelector(":scope > img"), {
          transform: `rotate(${-direction * 18}deg) scale(0.82)`
        }, 1100, delay + 50);
        play(element, element.querySelector(":scope > div"), {
          transform: "translate3d(0, 24px, 0)", clipPath: "inset(0 0 100% 0)"
        }, 900, delay + 120);
      } else if (kind === "gallery") {
        const shutter = direction < 0
          ? "polygon(0 0, 12% 0, 0 100%, 0 100%)"
          : "polygon(88% 0, 100% 0, 100% 100%, 100% 100%)";
        // Keep the button's hit area stationary. Moving/clipping the button
        // itself makes focus/scroll-into-view follow its transient geometry.
        play(element, element.querySelector("img"), {
          transform: `translate3d(${direction * 28}px, ${32 + (index % 3) * 12}px, 0) rotate(${direction * 3}deg) scale(1.12)`,
          clipPath: shutter
        }, 1200, delay);
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
    };

    const setup = () => {
      observer?.disconnect();
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
          // Don't animate content a fast scroll has already carried above view.
          if (boundingClientRect.bottom > 90) enter(target, targets.get(target));
          else settle(target);
          observer.unobserve(target);
        });
      }, { rootMargin: "0px 0px -7% 0px", threshold: 0 });
      for (const [kind, selector] of scenes) {
        const siblings = new Map();
        main.querySelectorAll(selector).forEach(element => {
          const index = siblings.get(element.parentElement) || 0;
          siblings.set(element.parentElement, index + 1);
          targets.set(element, { kind, index });
          element.dataset.scrollStyle = kind;
          // Visible first-screen content never disappears during hydration.
          // Nothing is hidden while waiting: no JS, missed observers, or errors
          // can leave blank sections in the prerendered page.
          const box = element.getBoundingClientRect();
          if (box.top < innerHeight && box.bottom > 0) {
            element.dataset.scrollState = "complete";
          } else {
            element.dataset.scrollState = "waiting";
            observer.observe(element);
          }
        });
      }
    };

    const onInteract = event => {
      const owner = event.target.closest?.("[data-scroll-style]");
      if (owner && targets.has(owner)) {
        observer?.unobserve(owner);
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
