import { useEffect, useRef } from "react";

/**
 * Vybrané práce — two live projects on real silver iMac 24" mockups
 * (LS Graphics freebie, free for commercial use; resized render in
 * public/imac-silver.webp, transparent background).
 *
 * The screen area of the render (measured on the source PNG) is covered by
 * a live DOM overlay holding a full-page screenshot of the site. At rest the
 * screenshot shows the top of the page; hovering the monitor first zooms it
 * in, then the screenshot starts gliding down the page (CSS transition
 * delayed past the zoom). JS only measures: a ResizeObserver writes the
 * scroll travel (--travel, px) and a duration proportional to page length
 * (--dur) onto each monitor — no container-query units involved.
 * On touch devices (hover: none) the glide runs as a slow autonomous loop.
 *
 * Screenshots live in public/work-*.webp — re-capture when the sites change.
 */

const works = [
  {
    title: "FINC a.s.",
    cat: "Finance / M&A",
    year: "2026",
    shot: "/work-finc.webp",
    note: "Korporátní web pro poradenskou firmu — fúze, akvizice a čísla, kterým se dá věřit.",
    url: "https://cesucashew.github.io/FINC/",
  },
  {
    title: "Mezičas",
    cat: "Kavárna / Music bar",
    year: "2026",
    shot: "/work-mezicas.webp",
    note: "Zin o jedné kavárně — web, který mění tvář podle denní doby.",
    url: "https://cesucashew.github.io/mezicas/",
  },
];

/* screen rect of the silver iMac render, as fractions of the full image
   (detected on the 4454×3764 source: x116 y106 w4222 h2380) */
const SCREEN = { left: 2.604, top: 2.816, width: 94.79, height: 63.23 };

export default function PortfolioPanel() {
  const rootRef = useRef<HTMLElement>(null);

  // measure each monitor: how far the shot can travel inside the screen and
  // how long the glide should take (constant reading speed for both sites)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const monitors = Array.from(root.querySelectorAll<HTMLElement>(".wm"));
    const cleanups: Array<() => void> = [];

    const measure = (wm: HTMLElement) => {
      const screen = wm.querySelector<HTMLElement>(".wm-screen");
      const shot = wm.querySelector<HTMLImageElement>(".wm-shot");
      if (!screen || !shot || !shot.naturalWidth) return;
      const screenH = screen.clientHeight;
      const shotH = (screen.clientWidth * shot.naturalHeight) / shot.naturalWidth;
      const travel = Math.max(0, shotH - screenH);
      wm.style.setProperty("--travel", `${travel.toFixed(0)}px`);
      wm.style.setProperty("--dur", `${Math.max(6, travel / 130).toFixed(1)}s`);
    };

    for (const wm of monitors) {
      const shot = wm.querySelector<HTMLImageElement>(".wm-shot");
      const ro = new ResizeObserver(() => measure(wm));
      ro.observe(wm);
      const onLoad = () => measure(wm);
      shot?.addEventListener("load", onLoad);
      measure(wm);
      cleanups.push(() => {
        ro.disconnect();
        shot?.removeEventListener("load", onLoad);
      });
    }
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="panel panel--portfolio" id="portfolio" ref={rootRef} data-nav-theme="light">
      <div className="panel-bg" data-parallax="0.1" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/work-bg.webp')" }} />
      </div>

      <div className="panel-inner portfolio-inner">
        <header className="portfolio-head">
          <span className="panel-folio">Práce</span>
          <h2 className="poster-title">VYBRANÉ PRÁCE</h2>
          <p className="portfolio-sub">Dvě věci, co už stojí a běží naživo.</p>
        </header>

        <div className="works">
          {works.map((w, i) => (
            <a
              className="work reveal"
              key={w.title}
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="wm">
                <img
                  className="wm-frame"
                  src="/imac-silver.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="wm-screen"
                  style={{
                    left: `${SCREEN.left}%`,
                    top: `${SCREEN.top}%`,
                    width: `${SCREEN.width}%`,
                    height: `${SCREEN.height}%`,
                  }}
                >
                  <img
                    className="wm-shot"
                    src={w.shot}
                    alt={`Náhled webu ${w.title}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="work-meta">
                <div className="work-meta-top">
                  <span className="work-cat">{w.cat}</span>
                  <span className="work-year">{w.year}</span>
                </div>
                <h3 className="work-title">{w.title}</h3>
                <p className="work-note">{w.note}</p>
                <span className="work-link">
                  Zobrazit živě <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
