import { useEffect, useRef, useState } from "react";

/**
 * Hero — kinetic editorial cover, now driven by a single scroll timeline.
 *
 * One tall section (≈320vh) pins a 100vh stage. A common, lerp-smoothed scroll
 * progress (0 at the top edge → 1 at the bottom) drives TWO things at once, so
 * they read as one motion:
 *   • the typographic statement + marquees reveal (rise + fade in), and
 *   • a scroll-scrubbed video of a Macintosh Plus that restores itself from a
 *     filthy, cracked wreck into a clean, booted machine.
 *
 * The video is muted/scrubbed (never auto-plays), lazily loaded only when the
 * section nears the viewport, and seeked via fastSeek on Safari. It sits on a
 * big, full-white brand star: the video's white background is flattened to pure
 * #fff at encode time and the star is sized to contain the frame, so the
 * rectangle dissolves and the computer reads as background-free.
 *
 * prefers-reduced-motion: the section collapses to 100vh, the hero shows in
 * full immediately, and the final (restored) frame is shown as a still — no
 * scrubbing, no reveal.
 */
export default function HeroKinetic() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // ---- cursor parallax (the stage + photo chip drift to the pointer) ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      for (const el of layers) {
        const d = parseFloat(el.dataset.depth || "0");
        el.style.transform = `translate3d(${cur.x * d}px, ${cur.y * d}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // ---- shared scroll timeline: reveal + video scrub, one lerped progress ----
  // This runs for everyone, including prefers-reduced-motion: the scrub and
  // reveal are driven by the user's own scroll (not autoplay), so they're safe
  // to keep. Only autonomous motion (marquees, cursor parallax) is suppressed
  // under reduced motion.
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root) return;

    // lazily attach the source only when the section nears the viewport
    let sourced = false;
    const lazyIO = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && video && !sourced) {
          sourced = true;
          video.preload = "auto";
          video.src = "/mac-assemble.mp4";
          video.load();
          lazyIO.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );
    lazyIO.observe(root);

    let duration = 10;
    const onMeta = () => {
      if (video && isFinite(video.duration) && video.duration > 0)
        duration = video.duration;
    };
    video?.addEventListener("loadedmetadata", onMeta);

    // iOS won't seek a never-played <video>; nudge it once on first touch
    let kicked = false;
    const kick = () => {
      if (kicked || !video) return;
      kicked = true;
      const p = video.play();
      if (p && typeof p.then === "function")
        p.then(() => video.pause()).catch(() => {});
      window.removeEventListener("touchstart", kick);
    };
    window.addEventListener("touchstart", kick, { passive: true });

    const isSafari =
      typeof navigator !== "undefined" &&
      /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
    const canFastSeek = !!video && typeof video.fastSeek === "function";

    let target = 0;
    let cur = 0;
    let lastP = -1;
    let lastSeek = -1;
    let raf = 0;
    let running = false;

    const measure = () => {
      const r = root.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return 0;
      return Math.min(1, Math.max(0, -r.top / span));
    };

    const frame = () => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      target = measure();
      cur += (target - cur) * 0.09;
      if (Math.abs(target - cur) < 0.0004) cur = target;

      if (cur !== lastP) {
        root.style.setProperty("--p", cur.toFixed(4));
        lastP = cur;
      }

      if (video && video.readyState >= 1 && duration > 0) {
        // finish the restore by ~90% scroll, then hold the booted machine for
        // the last stretch before the hero unpins and scrolls away
        const vp = Math.min(1, cur / 0.9);
        const t = Math.min(duration - 0.001, vp * duration);
        if (Math.abs(t - lastSeek) > 1 / 60) {
          if (isSafari && canFastSeek) video.fastSeek(t);
          else video.currentTime = t;
          lastSeek = t;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // only spin the rAF loop while the section is actually on screen
    const runIO = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    runIO.observe(root);

    const onVis = () => {
      if (document.hidden) stop();
      else {
        const r = root.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) start();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    root.style.setProperty("--p", "0");

    return () => {
      stop();
      lazyIO.disconnect();
      runIO.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("touchstart", kick);
      video?.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const Marquee = ({ text, dir }: { text: string; dir: "l" | "r" }) => (
    <div className={`heroB-marquee heroB-marquee--${dir}`} aria-hidden="true">
      <div className="heroB-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            {text} <span className="heroB-star-glyph">✳</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="home" className="heroB" ref={rootRef}>
      <div className="heroB-sticky" ref={stickyRef}>
        {/* night-street photo that fades up out of the brown as you scroll */}
        <div className="heroB-bg" aria-hidden="true" />
        <Marquee text="FILIP HIRT" dir="l" />

        <div className="heroB-body">
          <div className="heroB-statement">
            <p className="heroB-kicker">Freelance web designer &amp; developer</p>
            <h1 className="heroB-headline">
              <span className="heroB-h-serif">Weby</span>
              <span className="heroB-h-grotesk">stavěné</span>
              <span className="heroB-h-serif heroB-h-it">jako</span>
              <span className="heroB-h-grotesk">řemeslo.</span>
            </h1>
            <p className="heroB-lead">
              Od nuly, bez šablon — moderní design, čistý kód a chytré funkce,
              které pracují za vás.
            </p>

            <div className="heroB-meta">
              <div className="heroB-badges">
                <span className="heroB-badge heroB-badge--live">
                  <span className="heroB-dot" /> Volný na 2026
                </span>
                <span className="heroB-badge">30+ projektů</span>
                <span className="heroB-badge">Cheb → celá ČR</span>
              </div>
            </div>
          </div>

          {/* Centrepiece — the Macintosh restored on scroll, on a white star */}
          <div className="heroB-stage" data-depth="-9">
            <div className="heroB-stage-inner">
              <div className="heroB-star-glow" aria-hidden="true" />
              <svg
                className="heroB-star"
                viewBox="0 0 300 300"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="150" cy="150" r="96" fill="#fff" />
                <path
                  d="M150 2 C 168 96 204 132 298 150 C 204 168 168 204 150 298 C 132 204 96 168 2 150 C 96 132 132 96 150 2 Z"
                  fill="#fff"
                />
              </svg>

              <div className="heroB-screen">
                <video
                  ref={videoRef}
                  className="heroB-video"
                  poster="/mac-poster.jpg"
                  muted
                  playsInline
                  preload="none"
                  tabIndex={-1}
                  aria-hidden="true"
                  disablePictureInPicture
                />
              </div>
            </div>
          </div>

        </div>

        <Marquee text="WEB DESIGNER" dir="r" />
      </div>
    </section>
  );
}
