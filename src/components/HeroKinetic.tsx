import { useEffect, useRef } from "react";
import HeroModel3D from "./HeroModel3D";

/**
 * Hero — kinetic editorial cover. Repeating wordmark marquees frame a two-part
 * stage: a typographic statement on the left, and the Commodore 64 presented as
 * the 3D centrepiece on the right — lit, grounded with a contact shadow, and
 * parallaxing to the cursor. A small photo chip keeps the human credit.
 */
export default function HeroKinetic() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    window.addEventListener("mousemove", onMove);
    tick();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const Marquee = ({ text, dir }: { text: string; dir: "l" | "r" }) => (
    <div className={`heroB-marquee heroB-marquee--${dir}`} aria-hidden="true">
      <div className="heroB-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i}>
            {text} <span className="heroB-star">✳</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="home" className="heroB" ref={rootRef}>
      <Marquee text="FILIP HIRT" dir="l" />

      <div className="heroB-body">
        <div className="heroB-statement">
          <p className="heroB-kicker" data-depth="5">Freelance web designer &amp; developer</p>
          <h1 className="heroB-headline">
            <span className="heroB-h-serif">Weby</span>
            <span className="heroB-h-grotesk">stavěné</span>
            <span className="heroB-h-serif heroB-h-it">jako</span>
            <span className="heroB-h-grotesk">řemeslo.</span>
          </h1>
          <p className="heroB-lead" data-depth="3">
            Od nuly, bez šablon — moderní design, čistý kód a chytré funkce,
            které pracují za vás.
          </p>

          <div className="heroB-meta">
            <figure className="heroB-chip" data-depth="7">
              <img src="/onlu7728.jpg" alt="Filip Hirt v noční ulici v Chebu" />
            </figure>
            <div className="heroB-badges">
              <span className="heroB-badge heroB-badge--live">
                <span className="heroB-dot" /> Volný na 2026
              </span>
              <span className="heroB-badge">30+ projektů</span>
              <span className="heroB-badge">Cheb → celá ČR</span>
            </div>
          </div>
        </div>

        {/* 3D centrepiece — the Commodore 64 on a lit plinth */}
        <div className="heroB-stage" data-depth="-10">
          <div className="heroB-stage-glow" aria-hidden="true" />
          <HeroModel3D src="/models/commodore.glb" className="heroB-stage-model" />
          <div className="heroB-stage-shadow" aria-hidden="true" />
          <span className="heroB-stage-tag">Commodore 64 · 1982</span>
        </div>
      </div>

      <Marquee text="WEB DESIGNER" dir="r" />
    </section>
  );
}
