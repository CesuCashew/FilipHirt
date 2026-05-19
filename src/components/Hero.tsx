import { useEffect, useRef } from "react";
import ScrambleText from "./ScrambleText";

const words = ["Vytvářím", "webové", "stránky,", "které", "vám", "přinesou"];

export default function Hero() {
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const sigRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const distortRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      wordsRef.current.forEach((el, i) => {
        if (el) {
          setTimeout(() => el.classList.add("visible"), i * 80);
        }
      });
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (sigRef.current) {
          sigRef.current.style.transform = `translateY(calc(-50% + ${y * 0.25}px)) scale(${1 + y * 0.0003})`;
          sigRef.current.style.opacity = String(Math.max(0, 0.35 - y * 0.0006));
        }
        if (headingRef.current) {
          headingRef.current.style.transform = `translateY(${y * -0.15}px)`;
        }
        if (heroInnerRef.current) {
          // Fade only in the last ~30% of hero so description + CTA stay readable & clickable
          const vh = window.innerHeight;
          const fadeStart = vh * 0.7;
          const fadeEnd = vh * 1.0;
          const t = Math.min(1, Math.max(0, (y - fadeStart) / (fadeEnd - fadeStart)));
          heroInnerRef.current.style.opacity = String(1 - t);
          heroInnerRef.current.style.pointerEvents = t > 0.5 ? "none" : "auto";
        }
        // Distort: ramp displacement scale on scroll. Turbulence stays static so
        // the noise pattern doesn't get regenerated every frame.
        if (distortRef.current) {
          const distortAmount = Math.min(40, y * 0.12);
          distortRef.current.setAttribute("scale", String(distortAmount));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMagnetLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section className="hero" id="home">
      {/* Background Image Setup */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-image" style={{ backgroundImage: "url('/hero-bg.JPG')" }}></div>
        <div className="hero-bg-overlay"></div>
      </div>

      {/* SVG distort filter for heading — ramps up on scroll */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="hero-distort" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              ref={distortRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
            />
          </filter>
        </defs>
      </svg>

      {/* Large decorative signature watermark with parallax */}
      <div
        ref={sigRef}
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(400px, 46vw, 700px)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.35,
          filter: "invert(1)",
          mixBlendMode: "screen",
          willChange: "transform, opacity",
        }}
      >
        <img
          src="/signature.png"
          alt=""
          aria-hidden="true"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      <div ref={heroInnerRef} className="hero-inner" style={{ position: "relative", zIndex: 1, willChange: "opacity" }}>
        <div className="hero-content-wrapper">
          <div className="hero-eyebrow">
            <ScrambleText text="Filip Hirt — Webový Designer & Vývojář" trigger="mount" duration={50} delay={1500} />
          </div>

        <h1
          ref={headingRef}
          className="hero-heading"
          style={{ willChange: "transform, filter", filter: "url(#hero-distort)" }}
        >
          {words.map((word, i) => (
            <span className="hero-word-wrap" key={i}>
              <span
                className="hero-word"
                ref={(el) => { if (el) wordsRef.current[i] = el; }}
              >
                {word}&nbsp;
              </span>
            </span>
          ))}
          <span className="hero-word-wrap">
            <span
              className="hero-word hero-word-image"
              ref={(el) => { if (el) wordsRef.current[words.length] = el; }}
            >
              více zákazníků
            </span>
          </span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">
            Moderní design + chytré funkce = úspěšný byznys online.
            Specializuji se na webová řešení s pokročilými technologiemi pro restaurace, e-shopy a firmy.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "20px" }}>
            <div className="availability-badge">
              <span className="availability-dot" />
              Dostupný pro projekty
            </div>
            <div className="hero-cta-group">
              <a
                href="#contact"
                className="btn-primary"
                onMouseMove={handleMagnet}
                onMouseLeave={handleMagnetLeave}
              >
                Začněme Projekt
              </a>
              <a
                href="#portfolio"
                className="btn-secondary"
                onMouseMove={handleMagnet}
                onMouseLeave={handleMagnetLeave}
              >
                Prozkoumat Práci
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

    </section>
  );
}
