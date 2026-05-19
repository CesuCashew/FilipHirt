import { useEffect, useRef, useState } from "react";
import ScrambleText from "./ScrambleText";

const projects = [
  {
    year: "2025",
    title: "Restaurace La Cucina",
    category: "F&B / Rezervace",
    color1: "#1a1a12",
    color2: "#E8A238",
    url: "https://lacucina.cz",
  },
  {
    year: "2025",
    title: "TechShop CZ",
    category: "E-commerce",
    color1: "#0f1a1a",
    color2: "#5cf1d8",
    url: "https://techshop.cz",
  },
  {
    year: "2024",
    title: "BuildCorp s.r.o.",
    category: "Corporate",
    color1: "#12121a",
    color2: "#a78bfa",
    url: "https://buildcorp.cz",
  },
  {
    year: "2024",
    title: "Yoga Studio Lucie",
    category: "Wellness",
    color1: "#1a1208",
    color2: "#fbbf24",
    url: "https://yogalucie.cz",
  },
];

export default function ProjectCursorList() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number>(-1);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.15;
      currentY.current += (targetY.current - currentY.current) * 0.15;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetX.current = e.clientX - rect.left;
    targetY.current = e.clientY - rect.top;
  };

  return (
    <div
      ref={wrapperRef}
      className="cursor-list-wrapper"
      onMouseMove={handleMove}
      onMouseLeave={() => setHoverIdx(-1)}
    >
      <div className="cursor-list-header">
        <span className="cursor-list-eyebrow">Index — Vybrané projekty</span>
        <span className="cursor-list-eyebrow">{String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>

      <ul className="cursor-list">
        {projects.map((p, i) => (
          <li key={i}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-list-link${hoverIdx === i ? " is-active" : ""}`}
              onMouseEnter={() => setHoverIdx(i)}
            >
              <span className="cursor-list-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cursor-list-title">
                {hoverIdx === i ? (
                  <ScrambleText text={p.title} trigger="mount" duration={20} />
                ) : (
                  p.title
                )}
              </span>
              <span className="cursor-list-category">{p.category}</span>
              <span className="cursor-list-year">{p.year}</span>
              <span className="cursor-list-arrow">↗</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following image preview */}
      <div
        ref={previewRef}
        className={`cursor-preview${hoverIdx >= 0 ? " is-visible" : ""}`}
        aria-hidden="true"
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="cursor-preview-card"
            style={{
              opacity: hoverIdx === i ? 1 : 0,
              transform: hoverIdx === i ? "scale(1)" : "scale(0.92)",
              background: `linear-gradient(135deg, ${p.color1} 0%, ${p.color1} 60%, ${p.color2}22 100%)`,
            }}
          >
            <div
              className="cursor-preview-glow"
              style={{ background: `radial-gradient(circle at 70% 30%, ${p.color2}40, transparent 60%)` }}
            />
            <div className="cursor-preview-meta">
              <span>{p.category}</span>
              <span>{p.year}</span>
            </div>
            <div className="cursor-preview-title">{p.title}</div>
            <div className="cursor-preview-cta">View Project ↗</div>
          </div>
        ))}
      </div>
    </div>
  );
}
