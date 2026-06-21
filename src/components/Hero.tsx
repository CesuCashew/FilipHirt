import { useEffect, useRef } from "react";

/**
 * SPIN ROOM-style poster cover — 1:1 homage.
 * Deep-brown frame, giant marigold wordmark "FILIP HIRT" overlapping the
 * hero photo, "WEB DESIGNER" lockup at the right, a small quote block, and
 * two album-tile navigations: About Me (3D model) / Social Sites (photo).
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // gentle pointer parallax on the poster photo
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const photo = root.querySelector<HTMLElement>(".poster-photo-img");
    if (!photo) return;
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
      photo.style.transform = `scale(1.06) translate(${cur.x * -10}px, ${cur.y * -10}px)`;
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
  // Socials live at the very end of the horizontal journey (outro panel).
  const scrollToSocial = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <section id="home" className="cover" ref={rootRef}>
      <div className="poster">

        {/* giant wordmark — one gold line across the top */}
        <h1 className="poster-name">
          <span>FILIP</span>
          <span>HIRT</span>
        </h1>

        {/* everything below the title — fills the remaining height */}
        <div className="poster-body">

          {/* hero photo — bottom-left */}
          <div className="poster-photo">
            <img className="poster-photo-img" src="/hero-bg.JPG" alt="Filip Hirt" />
          </div>

          {/* right-side lockup */}
          <span className="poster-wordmark">WEB DESIGNER</span>

          {/* credits block */}
          <div className="poster-quote">
            <p className="poster-quote-lead">DOBRÝ WEB SE NEVNUCUJE.</p>
            <p className="poster-quote-sub">
              Weby, kterým lidé rozumí hned — jen čistá práce, odshora dolů.
            </p>
          </div>

          {/* two album-tile navigations */}
          <div className="poster-tiles">
            <a className="poster-tile" href="#about" onClick={scrollToAbout}>
              <video
                className="poster-tile-media"
                src="/about-me-animation.webm"
                autoPlay loop muted playsInline
              />
              <span className="poster-tile-scrim" />
              <span className="poster-tile-label">ABOUT<br />ME</span>
              <span className="poster-tile-go">Poznej mě <span aria-hidden="true">↗</span></span>
            </a>
            <a className="poster-tile" href="#social" onClick={scrollToSocial}>
              <img className="poster-tile-media" src="/socialsites.png" alt="" />
              <span className="poster-tile-scrim" />
              <span className="poster-tile-label">SOCIAL<br />SITES</span>
              <span className="poster-tile-go">Najdi mě <span aria-hidden="true">↗</span></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
