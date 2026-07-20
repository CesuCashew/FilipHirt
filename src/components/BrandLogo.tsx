import { useEffect, useState } from "react";

type Phase = "drawing" | "settled";

export default function BrandLogo() {
  const [phase, setPhase] = useState<Phase>("drawing");

  useEffect(() => {
    // Total intro: ~1.7s draw + ~0.5s hold + 0.5s fade = ~2.7s
    const t = window.setTimeout(() => {
      setPhase("settled");
    }, 2700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <a
      href="#home"
      className="brand-logo"
      aria-label="Filip Hirt — domů"
      style={{ textDecoration: "none" }}
    >
      {/* Signature draw-in (only on first mount) */}
      {phase === "drawing" && (
        <span className="brand-signature-wrap" aria-hidden="true">
          <span className="brand-signature-clip">
            <img
              src="/signature-final.webp"
              alt=""
              className="brand-signature-img"
              draggable={false}
            />
          </span>
        </span>
      )}

      {/* Settled state: rotating sparkle + name */}
      <span
        className="brand-mark"
        style={{
          opacity: phase === "settled" ? 1 : 0,
          pointerEvents: phase === "settled" ? "auto" : "none",
        }}
      >
        <span className="brand-asterisk" aria-hidden="true">
          <svg viewBox="-50 -50 100 100" width="22" height="22">
            <g fill="currentColor">
              {/* Long vertical spike */}
              <path d="M0 -46 C 4 -10 4 -10 0 0 C -4 -10 -4 -10 0 -46 Z" />
              <path d="M0 46 C 4 10 4 10 0 0 C -4 10 -4 10 0 46 Z" />
              {/* Short horizontal spike — asymmetric so rotation is visible */}
              <path d="M-30 0 C -8 4 -8 4 0 0 C -8 -4 -8 -4 -30 0 Z" />
              <path d="M30 0 C 8 4 8 4 0 0 C 8 -4 8 -4 30 0 Z" />
            </g>
          </svg>
        </span>
        <span className="brand-name">Filip Hirt</span>
      </span>
    </a>
  );
}
