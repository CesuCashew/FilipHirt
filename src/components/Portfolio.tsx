import { useEffect, useRef, useState } from "react";
import ProjectCursorList from "./ProjectCursorList";
import ScrambleText from "./ScrambleText";

const projects = [
  {
    title: "Restaurace La Cucina",
    category: "Restaurace & Rezervace",
    url: "https://lacucina.cz",
    desc: "Moderní web s rezervačním systémem a digitálním menu",
    color: "#1a1a12",
  },
  {
    title: "TechShop CZ",
    category: "E-commerce",
    url: "https://techshop.cz",
    desc: "E-shop s AI chatbotem a pokročilou konverzní optimalizací",
    color: "#0f1a1a",
  },
  {
    title: "BuildCorp s.r.o.",
    category: "Firemní Prezentace",
    url: "https://buildcorp.cz",
    desc: "Firemní prezentace s moderním designem a SEO strategií",
    color: "#12121a",
  },
  {
    title: "Yoga Studio Lucie",
    category: "Health & Wellness",
    url: "https://yogalucie.cz",
    desc: "Minimalistický web pro jógové studio s online rezervacemi",
    color: "#1a1208",
  },
];

export default function Portfolio() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
      const trackWidth = track.scrollWidth;
      const visibleWidth = window.innerWidth;
      const maxX = trackWidth - visibleWidth + 80;
      track.style.transform = `translate3d(${-p * maxX}px, 0, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="portfolio" style={{ padding: 0 }}>
      <div className="container" style={{ paddingTop: "140px", paddingBottom: "60px" }}>
        <div className="section-header reveal">
          <span className="section-number">02</span>
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Moje Práce</h2>
          <p className="section-subtitle">Posouvejte stránku — projekty se odhalují horizontálně</p>
        </div>
      </div>

      {/* Horizontal sticky scroll wrapper */}
      <div
        ref={wrapperRef}
        className="portfolio-sticky-wrapper"
        style={{ height: `${projects.length * 90}vh`, position: "relative" }}
      >
        <div className="portfolio-sticky-pin">
          <div ref={trackRef} className="portfolio-h-track">
            {projects.map((p, i) => (
              <div
                className="portfolio-h-card"
                key={i}
                style={{ background: `linear-gradient(135deg, ${p.color} 0%, #0f0f0f 100%)` }}
              >
                <div className="portfolio-h-card-num">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                <div className="portfolio-h-card-content">
                  <div className="portfolio-card-category">{p.category}</div>
                  <h3 className="portfolio-h-card-title">
                    <ScrambleText text={p.title} trigger="view" duration={50} />
                  </h3>
                  <p className="portfolio-h-card-desc">{p.desc}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-card-link"
                  >
                    Otevřít Web ↗
                  </a>
                </div>
              </div>
            ))}
            <div className="portfolio-end-card">
              <div className="portfolio-end-text">Více projektů<br />na vyžádání</div>
              <a href="#contact" className="btn-primary" style={{ marginTop: "32px" }}>
                Kontaktujte mě
              </a>
            </div>
          </div>

          {/* Progress bar */}
          <div className="portfolio-progress-bar">
            <div
              className="portfolio-progress-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Scroll hint */}
          <div className="portfolio-scroll-hint">
            <span>SCROLL</span>
            <span style={{ fontFamily: "'Clash Display', sans-serif", color: "var(--col-lime)" }}>
              {String(Math.min(projects.length, Math.floor(progress * projects.length) + 1)).padStart(2, "0")}
              <span style={{ opacity: 0.3 }}>/{String(projects.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Cursor-follow project index list */}
      <div className="container" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
        <ProjectCursorList />
      </div>
    </section>
  );
}
