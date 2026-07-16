import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Pins a section and turns vertical scroll into horizontal travel
 * (à la pf.j-or-y.com). Background layers tagged [data-parallax] lag
 * behind for depth. Falls back to a normal vertical stack on small /
 * touch screens and under reduced motion.
 */
export default function HorizontalGallery({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const didHashJump = useRef(false);
  const [horizontal, setHorizontal] = useState(
    () => typeof window !== "undefined" && window.innerWidth > 980
  );

  useEffect(() => {
    const decide = () => setHorizontal(window.innerWidth > 980);
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  useEffect(() => {
    if (!horizontal) {
      // clear any inline transforms when in vertical mode
      if (trackRef.current) trackRef.current.style.transform = "";
      if (wrapRef.current) wrapRef.current.style.height = "";
      // deep-link (/#journal): plain anchor scroll in the vertical stack
      if (!didHashJump.current) {
        didHashJump.current = true;
        const id = window.location.hash.slice(1);
        if (id && id !== "now") document.getElementById(id)?.scrollIntoView();
      }
      return;
    }
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const parallaxEls = Array.from(track.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    let distance = 0;

    const measure = () => {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      wrap.style.height = `${distance + window.innerHeight}px`;
    };

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), distance);
      track.style.transform = `translate3d(${-scrolled}px,0,0)`;
      // parallax: each tagged layer lags relative to the viewport centre
      for (const el of parallaxEls) {
        const speed = parseFloat(el.dataset.parallax || "0.12");
        const panel = el.parentElement as HTMLElement;
        const panelLeft = panel.offsetLeft;
        const rel = scrolled - panelLeft; // px the panel has travelled past left edge
        el.style.transform = `translate3d(${rel * speed}px,0,0)`;
      }
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); update(); };

    measure();
    update();
    // deep-link (/#journal): vertical scroll maps 1:1 to horizontal travel,
    // so landing on a panel means scrolling to wrap top + its track offset
    if (!didHashJump.current) {
      didHashJump.current = true;
      const id = window.location.hash.slice(1);
      if (id && id !== "now") {
        const target = track.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
        if (target) {
          window.scrollTo(0, wrap.offsetTop + Math.min(target.offsetLeft, distance));
          update();
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // re-measure after fonts/images settle
    const t = setTimeout(onResize, 800);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [horizontal]);

  if (!horizontal) {
    return <div className="hgallery hgallery--vertical">{children}</div>;
  }

  return (
    <div ref={wrapRef} className="hgallery hgallery--horizontal">
      <div ref={pinRef} className="hgallery-pin">
        <div ref={trackRef} className="hgallery-track">
          {children}
        </div>
      </div>
    </div>
  );
}
