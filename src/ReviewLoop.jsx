import { useEffect, useId, useRef, useState } from "react";
import "./review-accessibility.css";

export function ReviewLoop({ children }) {
  const shell = useRef(null);
  const track = useRef(null);
  const group = useRef(null);
  const clone = useRef(null);
  const controls = useRef({ paused: false, hovering: false, focused: false });
  const playback = useRef(() => {});
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [keyboardReading, setKeyboardReading] = useState(false);
  const focusedReview = useRef(null);
  const railId = useId();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    setReady(true);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    controls.current.paused = paused;
    playback.current();
  }, [paused]);

  useEffect(() => {
    // The visual repeat remains pointer-operable at the loop seam without
    // adding duplicate review controls to keyboard or screen-reader navigation.
    clone.current?.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")
      .forEach(element => { element.tabIndex = -1; });
  }, [ready, reducedMotion, keyboardReading, children]);

  useEffect(() => {
    if (!ready || reducedMotion || keyboardReading) return;
    let animation;
    let near = false;
    const updatePlayback = () => {
      const { paused, hovering, focused } = controls.current;
      if (near && !document.hidden && !paused && !hovering && !focused) animation?.play();
      else animation?.pause();
    };
    playback.current = updatePlayback;
    // Manual reading may have moved the viewport before motion was enabled.
    shell.current.scrollLeft = 0;
    const measure = () => {
      // Each copy includes its trailing gap, so the end and start frames align exactly.
      const distance = group.current.getBoundingClientRect().width;
      if (!distance) return;
      const previousDuration = animation?.effect.getTiming().duration || 1;
      const progress = animation ? (animation.currentTime % previousDuration) / previousDuration : 0;
      animation?.cancel();
      const duration = matchMedia("(max-width: 640px)").matches ? 56000 : 64000;
      animation = track.current.animate([
        { transform: "translate3d(0, 0, 0)" },
        { transform: `translate3d(-${distance}px, 0, 0)` }
      ], { duration, iterations: Infinity, easing: "linear" });
      animation.pause();
      animation.currentTime = progress * duration;
      updatePlayback();
    };
    const sizeObserver = new ResizeObserver(measure);
    sizeObserver.observe(group.current);
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      updatePlayback();
    }, { rootMargin: "180px 0px" });
    observer.observe(shell.current);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      animation?.cancel();
      playback.current = () => {};
    };
  }, [ready, reducedMotion, keyboardReading]);

  useEffect(() => {
    if (!keyboardReading) return;
    // The automatic transform has now been cancelled and the original cards
    // are in a scrollable rail, so even the first source link can be revealed.
    focusedReview.current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }, [keyboardReading]);

  const manual = !ready || reducedMotion || keyboardReading;
  const updateInteraction = (key, value) => {
    controls.current[key] = value;
    playback.current();
  };

  return <div className="review-loop" data-review-mode={manual ? "manual" : "automatic"}>
    <div className="google-review-shell" ref={shell} id={railId}
      role="region" aria-label="RM client reviews" tabIndex={manual ? 0 : undefined}
      onFocusCapture={event => {
        updateInteraction("focused", true);
        if (event.target.matches(":focus-visible")) {
          focusedReview.current = event.target;
          setKeyboardReading(true);
        }
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          updateInteraction("focused", false);
          focusedReview.current = null;
          setKeyboardReading(false);
        }
      }}>
      <div className="google-review-rail review-marquee" ref={track}>
        <div className="review-loop-group" ref={group}>{children}</div>
        {/* One semantic copy is prerendered. The visual repeat exists only
            after hydration, and is unnecessary for manual/reduced-motion reading. */}
        {!manual && <div className="review-loop-group" ref={clone} aria-hidden="true"
          onPointerDown={event => event.preventDefault()}>{children}</div>}
      </div>
    </div>
    <div className="review-loop-controls">
      {manual ? <span className="review-loop-hint">Swipe or use arrow keys to read reviews</span> :
        <button type="button" className="review-loop-toggle" aria-controls={railId}
          onClick={() => setPaused(value => !value)}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
          {paused ? "Resume reviews" : "Pause reviews"}
        </button>}
    </div>
  </div>;
}
