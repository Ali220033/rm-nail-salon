import { useEffect, useRef } from "react";

export function ReviewLoop({ children }) {
  const shell = useRef(null);
  const track = useRef(null);
  const group = useRef(null);

  useEffect(() => {
    let animation;
    let near = false;
    const updatePlayback = () => {
      if (near && !document.hidden) animation?.play();
      else animation?.pause();
    };
    const measure = () => {
      // Each copy includes its trailing gap, so the end and start frames align exactly.
      const distance = group.current.getBoundingClientRect().width;
      if (!distance) return;
      const previousDuration = animation?.effect.getTiming().duration || 1;
      const progress = animation ? (animation.currentTime % previousDuration) / previousDuration : 0;
      animation?.cancel();
      const duration = matchMedia("(max-width: 640px)").matches ? 38000 : 46000;
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
    };
  }, []);

  return <div className="google-review-shell" ref={shell}>
    <div className="google-review-rail review-marquee" ref={track} aria-label="Auto-scrolling RM client reviews">
      <div className="review-loop-group" ref={group}>{children}</div>
      <div className="review-loop-group" aria-hidden="true" inert>{children}</div>
    </div>
  </div>;
}
