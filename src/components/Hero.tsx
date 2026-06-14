import { useEffect, useRef } from "react";

/**
 * Framed-collage cover — a warm "mixtape zine" front page.
 * Big frame: hero photo + FILIP HIRT + web designer.
 * Two side frames act as navigation tiles: About Me / Social Sites.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // gentle pointer parallax on the cover background
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bg = root.querySelector<HTMLElement>(".cover-bg-img");
    if (!bg) return;
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
      bg.style.transform = `scale(1.08) translate(${cur.x * -14}px, ${cur.y * -14}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // The socials live at the very end of the horizontal journey (outro panel).
  // Panels share a vertical offset, so jump to the bottom of the page instead.
  const scrollToSocial = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <section id="home" className="cover" ref={rootRef}>
      <div className="cover-bg" aria-hidden="true">
        <div className="cover-bg-img" style={{ backgroundImage: "url('/hero-art.jpg')" }} />
        <div className="cover-bg-wash" />
      </div>

      <div className="cover-inner">
        <header className="cover-masthead">
          <span className="cover-kicker"><span className="cover-dot" /> Portfolio — vol. 01 / ’25</span>
          <span className="cover-meta">Cheb · Česko</span>
          <span className="cover-scroll">(Scroll)<span className="cover-scroll-arrow">↓</span></span>
        </header>

        <div className="cover-grid">
          {/* Big frame */}
          <div className="cover-main">
            <img className="cover-main-photo" src="/hero-bg.JPG" alt="Filip Hirt" />
            <div className="cover-main-overlay" />
            <h1 className="cover-title">FILIP<br />HIRT</h1>
            <span className="cover-subtitle">web&nbsp;designer</span>
            <p className="cover-blurb">
              Weby stavěné jako řemeslo — teplé,<br />
              pomalé a dělané s citem pro detail.
            </p>
            <span className="cover-corner cover-corner-tl" />
            <span className="cover-corner cover-corner-br" />
          </div>

          {/* Two nav frames */}
          <div className="cover-side">
            <a className="cover-tile cover-tile-a" href="#about" onClick={scrollToAbout}>
              <span className="cover-tile-num">01</span>
              <span className="cover-tile-label">About<br />Me</span>
              <span className="cover-tile-go">Poznej mě <span aria-hidden="true">↗</span></span>
            </a>
            <a className="cover-tile cover-tile-b" href="#social" onClick={scrollToSocial}>
              <span className="cover-tile-num">02</span>
              <span className="cover-tile-label">Social<br />Sites</span>
              <span className="cover-tile-go">Najdi mě <span aria-hidden="true">↗</span></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
