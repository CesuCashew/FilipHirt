import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MessageSquare, PenTool, RefreshCw, Code2, Rocket } from "lucide-react";

/**
 * CollabFlow — „Jak probíhá spolupráce", a pinned tablet scene.
 *
 * Desktop (>980px): the section is ~360vh tall and pins a 100svh stage. A
 * lerp-smoothed scroll progress --p (0→1, same driver pattern as HeroKinetic)
 * runs the whole choreography: the tablet rises from below, then five step
 * bubbles fly out from behind it while the progress bar on the tablet's
 * screen fills and lights its nodes — one variable, perfect sync.
 *
 * Mobile (≤980px): no pin. An IntersectionObserver adds `is-in` to the tablet
 * and each bubble as they enter; CSS transitions handle the reveals and the
 * bar fills once the tablet is seen.
 *
 * The tablet is a layered SVG (chassis, rim, edge buttons, bezel, camera) —
 * the screen itself is live DOM overlaid on the SVG's screen rect, so the
 * heading and bar are real, animatable elements.
 */

const STEPS = [
  {
    icon: MessageSquare,
    title: "Konzultace",
    text: "Ujasníme si cíle webu, rozsah, obsah i to, jak má výsledek působit.",
  },
  {
    icon: PenTool,
    title: "Návrh",
    text: "Připravím strukturu a vizuální směr, který ladí s vaší značkou.",
  },
  {
    icon: RefreshCw,
    title: "Zpětná vazba",
    text: "Projdeme návrhy spolu a doladíme detaily podle vašich připomínek.",
  },
  {
    icon: Code2,
    title: "Realizace",
    text: "Web postupně stavím — podstránky, formuláře, SEO. Vše ke kontrole před spuštěním.",
  },
  {
    icon: Rocket,
    title: "Spuštění",
    text: "Otestovaný web nasadím na doménu, napojím analytiku a předám vám přístupy.",
  },
];

/* Landscape tablet, front view. The screen window is the rect at
   x64 y64 w1272 h872 of the 1400×1000 viewBox — .collab-screen is absolutely
   positioned over it with matching percentages. */
function TabletSvg() {
  return (
    <svg
      className="collab-tablet-svg"
      viewBox="0 0 1400 1000"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="collab-chassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3330" />
          <stop offset="0.08" stopColor="#2c2624" />
          <stop offset="0.5" stopColor="#262120" />
          <stop offset="0.94" stopColor="#211c1b" />
          <stop offset="1" stopColor="#171312" />
        </linearGradient>
        <linearGradient id="collab-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a7f75" />
          <stop offset="0.12" stopColor="#4d443f" />
          <stop offset="0.85" stopColor="#171312" />
          <stop offset="1" stopColor="#0c0a09" />
        </linearGradient>
        <linearGradient id="collab-btn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#55493f" />
          <stop offset="1" stopColor="#211c1b" />
        </linearGradient>
        <radialGradient id="collab-lens" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#3d4d63" />
          <stop offset="0.5" stopColor="#101c2a" />
          <stop offset="1" stopColor="#05070c" />
        </radialGradient>
        <clipPath id="collab-glass-clip">
          <rect x="30" y="30" width="1340" height="940" rx="54" />
        </clipPath>
      </defs>

      {/* edge buttons peeking past the chassis silhouette */}
      <rect x="1150" y="1.5" width="96" height="12" rx="6" fill="url(#collab-btn)" />
      <rect x="1391" y="180" width="8" height="72" rx="4" fill="url(#collab-btn)" />
      <rect x="1391" y="268" width="8" height="72" rx="4" fill="url(#collab-btn)" />

      {/* chassis with a metal rim catching light from above */}
      <rect x="6" y="6" width="1388" height="988" rx="74" fill="url(#collab-rim)" />
      <rect x="9" y="9" width="1382" height="982" rx="71" fill="url(#collab-chassis)" />

      {/* glass: uniform near-black bezel, then the screen window */}
      <rect x="30" y="30" width="1340" height="940" rx="54" fill="#080706" />
      <rect x="64" y="64" width="1272" height="872" rx="16" fill="#0c0a09" />

      {/* front camera on the top bezel */}
      <circle cx="700" cy="47" r="7.5" fill="#141210" />
      <circle cx="700" cy="47" r="4.5" fill="url(#collab-lens)" />
      <circle cx="698.2" cy="45.2" r="1.3" fill="rgba(210,225,240,0.55)" />

      {/* soft top-edge reflection along the bezel glass */}
      <g clipPath="url(#collab-glass-clip)">
        <rect x="30" y="30" width="1340" height="3" fill="rgba(255,255,255,0.07)" />
      </g>
    </svg>
  );
}

export default function CollabFlow() {
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
      // floatier than the hero's 0.09 — the tablet glide reads smoother
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

  // ---- mobile: reveal tablet + bubbles as they enter the viewport ----
  useEffect(() => {
    const root = rootRef.current;
    if (!root || pinned) return;
    const targets = root.querySelectorAll(".collab-tablet-wrap, .collab-bubble");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pinned]);

  return (
    <section id="spoluprace" className="collab" ref={rootRef} data-nav-theme="light">
      <div className="collab-sticky">
        <header className="collab-head">
          <p className="collab-label">
            Jak to probíhá <span className="collab-label-star">✳</span>
          </p>
          <h2 className="collab-title">
            Spolupráce od nápadu{" "}
            <span className="collab-title-it">ke spuštění</span>
          </h2>
          <p className="collab-sub">
            Pět kroků, žádný chaos — v každé chvíli víte, co se právě děje a co
            bude dál.
          </p>
        </header>

        <div className="collab-stage">
          <div className="collab-tablet-wrap">
            <div className="collab-tablet">
              <TabletSvg />
              <div className="collab-screen">
                <p className="collab-screen-title">
                  Jak probíhá <span className="collab-screen-it">spolupráce</span>
                </p>
                <div className="collab-bar">
                  <span className="collab-bar-line" aria-hidden="true" />
                  <span className="collab-bar-fill" aria-hidden="true" />
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <span
                        key={s.title}
                        className="collab-node"
                        style={{ "--start": 0.42 + i * 0.095 } as CSSProperties}
                      >
                        <span className="collab-node-tile">
                          <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="collab-node-label">{s.title}</span>
                      </span>
                    );
                  })}
                </div>
                <span className="collab-screen-tag" aria-hidden="true">
                  filiphirt.cz
                </span>
              </div>
            </div>
          </div>

          {STEPS.map((s, i) => (
            <article
              key={s.title}
              className={`collab-bubble collab-bubble--${i}`}
              style={{ "--start": 0.42 } as CSSProperties}
            >
              <h3 className="collab-bubble-title">{s.title}</h3>
              <p className="collab-bubble-text">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
