import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * WhyMe — „Proč já", a pinned book-opening scene.
 *
 * Desktop (>980px): ~300vh section pins a 100svh stage, driven by the same
 * lerp-smoothed --p progress as HeroKinetic/CollabFlow. A closed suede
 * notebook (photo-based, CC0 rawpixel source) rises from below; scroll pulls
 * its front cover open in real 3D (rotateY around the spine). The cover's
 * backface is the left page of the very same open-spread photo, so the flip
 * reassembles the original photograph pixel-for-pixel. Five sales arguments
 * then appear on the pages as live DOM text — selectable and indexable.
 *
 * Mobile (≤980px): no pin — IntersectionObserver adds `is-in`, the cover
 * opens via a CSS transition and the arguments fade in staggered.
 */

const LEFT_REASONS = [
  {
    title: "Mluvíte přímo se mnou",
    text: "Žádný account manager, žádná tichá pošta. Píšete člověku, který váš web skutečně staví — a odpověď máte za hodiny, ne za týdny.",
  },
  {
    title: "Žádné šablony",
    text: "Váš web nevznikne na burze šablon. Kreslím ho od nuly, takže ho konkurence nikdy nebude mít taky.",
  },
];

const RIGHT_REASONS = [
  {
    title: "30+ hotových webů",
    text: "Přes třicet projektů pro reálné firmy znamená, že na vás nic nezkouším poprvé.",
  },
  {
    title: "Žádná agenturní režie",
    text: "Platíte mou práci, ne open space a tři vrstvy manažerů. Agenturní kvalita za cenu jednoho člověka.",
  },
  {
    title: "Rychlost a SEO v základu",
    text: "Bleskové načítání a SEO nejsou příplatková položka. Web, který Google nenajde, je jen drahá vizitka.",
  },
];

/* print order across the spread: left page 01–02, right page 03–05 */
const START = { header: 0.56, left: [0.6, 0.68], right: [0.76, 0.83, 0.9], cta: 0.955 };

export default function WhyMe() {
  const rootRef = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(
    () => typeof window !== "undefined" && window.innerWidth > 980
  );

  useEffect(() => {
    const onResize = () => setPinned(window.innerWidth > 980);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---- desktop: --p scroll progress driver (HeroKinetic pattern) ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pinned) return;

    let target = 0;
    let cur = 0;
    let lastP = -1;
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
      cur += (target - cur) * 0.06;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      if (cur !== lastP) {
        root.style.setProperty("--p", cur.toFixed(4));
        lastP = cur;
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

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(root);

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
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pinned]);

  // ---- mobile: open the book + reveal notes as they enter the viewport ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root || pinned) return;
    const book = root.querySelector(".why-book");
    if (!book) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(book);
    return () => io.disconnect();
  }, [pinned]);

  return (
    <section id="proc-ja" className="why" ref={rootRef}>
      <div className="why-sticky">
        <header className="why-head">
          <p className="why-label">
            Proč já <span className="why-label-star">✳</span>
          </p>
          <h2 className="why-title">
            Důvody, které se <span className="why-title-it">nedají okopírovat</span>
          </h2>
          <p className="why-sub">
            Proč si pro tvorbu webu vybrat mě, a ne agenturu nebo šablonu —
            otevřete a čtěte.
          </p>
        </header>

        <div className="why-stage">
          <div className="why-book">
            <span className="why-book-shadow" aria-hidden="true" />
            <div className="why-book-inner">
              <img
                src="/book-page-right.webp"
                alt=""
                className="why-page-img why-page-img--right"
                loading="lazy"
                decoding="async"
              />

              {/* the front cover — backface is the left page of the same photo */}
              <div className="why-cover" aria-hidden="true">
                <div className="why-cover-front">
                  <span className="why-cover-title">Proč já?</span>
                  <span className="why-cover-sub">Filip Hirt · webdesign</span>
                  <span className="why-cover-shade" />
                </div>
                <div className="why-cover-back">
                  <img src="/book-page-left.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* cast shadow the cover drags across the right page mid-flip */}
              <span className="why-flip-shadow" aria-hidden="true" />
            </div>

            {/* live DOM text laid onto the opened pages (siblings of the 3D
                box so mobile can stack them below the book) */}
            <div className="why-page-text why-page-text--left">
              <p
                className="why-note why-note--header"
                style={{ "--start": START.header } as CSSProperties}
              >
                Filip Hirt — sepsáno černé na bílém
              </p>
              {LEFT_REASONS.map((r, i) => (
                <div
                  key={r.title}
                  className="why-note"
                  style={{ "--start": START.left[i] } as CSSProperties}
                >
                  <span className="why-note-no">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="why-note-title">{r.title}</h3>
                  <p className="why-note-text">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="why-page-text why-page-text--right">
              {RIGHT_REASONS.map((r, i) => (
                <div
                  key={r.title}
                  className="why-note"
                  style={{ "--start": START.right[i] } as CSSProperties}
                >
                  <span className="why-note-no">{String(i + 3).padStart(2, "0")}</span>
                  <h3 className="why-note-title">{r.title}</h3>
                  <p className="why-note-text">{r.text}</p>
                </div>
              ))}
              <a
                href="#contact"
                className="why-cta"
                style={{ "--start": START.cta } as CSSProperties}
              >
                Dává vám to smysl? Napište mi →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
