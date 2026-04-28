import { useEffect, useState } from "react";

const MARQUEE_ITEMS = [
  "→ PŘIJÍMÁM PROJEKTY NA Q3 2026",
  "ZDARMA ÚVODNÍ KONZULTACE",
  "PIŠTE NA F.HIRT@SEZNAM.CZ",
  "ODPOVĚĎ DO 24 HODIN",
  "WEB · E-COMMERCE · BRAND",
];

function formatTime(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function AsciiBar() {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Duplicate marquee items for seamless loop
  const Row = ({ aria = false }: { aria?: boolean }) => (
    <div className="topbar-marquee-row" aria-hidden={aria}>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="topbar-marquee-item">
          <span>{item}</span>
          <span className="topbar-marquee-dot">●</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="topbar" aria-hidden="true">
      {/* Left: live status */}
      <div className="topbar-status">
        <span className="topbar-status-dot" />
        <span>CHEB, CZ</span>
        <span className="topbar-sep">/</span>
        <span className="topbar-time">{time} CET</span>
        <span className="topbar-sep">/</span>
        <span className="topbar-available">DOSTUPNÝ Q3 2026</span>
      </div>

      {/* Right: scrolling marketing CTA */}
      <div className="topbar-marquee">
        <div className="topbar-marquee-track">
          <Row />
          <Row aria />
        </div>
      </div>
    </div>
  );
}
