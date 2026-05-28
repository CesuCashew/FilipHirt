import { useEffect, useRef, useState } from "react";

// CountUp component to animate statistics numbers when the tab is active
function CountUp({ 
  end, 
  duration = 1000, 
  prefix = "", 
  suffix = "", 
  decimals = 0 
}: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
  decimals?: number; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let cancelled = false;

    const step = (timestamp: number) => {
      if (cancelled) return;
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress * (2 - progress); // Ease out quad
      setCount(ease * end);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);

    return () => {
      cancelled = true;
    };
  }, [end, duration]);

  return (
    <>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
}

// Circular progress dial with stroke-dashoffset animation
function CircularDial({ pct, label }: { pct: number; label: string }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius; // 100.53
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Animate the stroke dash offset after mount
    const timer = setTimeout(() => {
      setOffset(circumference - (pct / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [pct, circumference]);

  return (
    <div className="hud-dial-card">
      <div className="hud-dial-svg-wrap">
        <svg viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="2.5"
          />
          {/* Foreground animating circle */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            stroke="var(--theme-color)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ 
              transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease" 
            }}
          />
          {/* Inside value text */}
          <text
            x="18"
            y="18.5"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--col-text)"
            fontSize="8.5"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
          >
            {pct}%
          </text>
        </svg>
      </div>
      <div className="hud-dial-text">
        <span>{label}</span>
      </div>
    </div>
  );
}

// Hologram SVG 1: Design & UX blueprint
const DesignHologram = () => (
  <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
    {/* Outer technical radar circle */}
    <circle cx="200" cy="200" r="180" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.2" />
    <circle cx="200" cy="200" r="160" stroke="var(--theme-color)" strokeWidth="1" strokeDasharray="5, 8" strokeOpacity="0.3" className="anim-spin-slow" />
    <circle cx="200" cy="200" r="135" stroke="var(--theme-color)" strokeWidth="1.5" strokeDasharray="50 15 10 15" strokeOpacity="0.35" className="anim-spin-reverse" />
    
    {/* Tech grid crosshairs */}
    <line x1="200" y1="15" x2="200" y2="385" stroke="var(--theme-color)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4, 4" />
    <line x1="15" y1="200" x2="385" y2="200" stroke="var(--theme-color)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4, 4" />

    {/* Canvas mockup grid */}
    <g transform="translate(100, 115)">
      {/* Browser mockup box */}
      <rect x="0" y="0" width="200" height="145" rx="6" stroke="var(--theme-color)" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="0" y1="24" x2="200" y2="24" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.35" />
      {/* 3 browser window header dots */}
      <circle cx="12" cy="12" r="2" fill="var(--theme-color)" fillOpacity="0.4" />
      <circle cx="20" cy="12" r="2" fill="var(--theme-color)" fillOpacity="0.4" />
      <circle cx="28" cy="12" r="2" fill="var(--theme-color)" fillOpacity="0.4" />

      {/* Wireframe box layout */}
      <rect x="15" y="38" width="170" height="50" rx="3" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3, 3" />
      <circle cx="45" cy="63" r="14" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.35" />
      <line x1="72" y1="56" x2="160" y2="56" stroke="var(--theme-color)" strokeWidth="1.5" strokeOpacity="0.45" />
      <line x1="72" y1="70" x2="130" y2="70" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.3" />

      {/* Hero cards */}
      <rect x="15" y="100" width="50" height="30" rx="2" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.35" />
      <rect x="75" y="100" width="50" height="30" rx="2" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.35" />
      <rect x="135" y="100" width="50" height="30" rx="2" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.35" />

      {/* Figma style node anchors and measurements */}
      <g stroke="var(--theme-color)" strokeWidth="1">
        {/* Dimension line */}
        <line x1="15" y1="94" x2="65" y2="94" strokeOpacity="0.7" />
        <line x1="15" y1="91" x2="15" y2="97" strokeOpacity="0.7" />
        <line x1="65" y1="91" x2="65" y2="97" strokeOpacity="0.7" />
        <text x="40" y="89" fill="var(--theme-color)" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle" stroke="none">50px</text>
        
        {/* Node selector box */}
        <rect x="10" y="96" width="60" height="38" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.7" fill="var(--theme-color)" fillOpacity="0.04" />
        <rect x="8" y="94" width="4" height="4" fill="var(--col-bg)" stroke="var(--theme-color)" />
        <rect x="68" y="94" width="4" height="4" fill="var(--col-bg)" stroke="var(--theme-color)" />
        <rect x="8" y="132" width="4" height="4" fill="var(--col-bg)" stroke="var(--theme-color)" />
        <rect x="68" y="132" width="4" height="4" fill="var(--col-bg)" stroke="var(--theme-color)" />
      </g>
    </g>

    {/* Peripheral technical UI markers */}
    <path d="M 45 90 L 25 90 L 25 70" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.25" />
    <path d="M 355 90 L 375 90 L 375 70" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.25" />
    <text x="30" y="105" fill="var(--theme-color)" fontSize="8" fontFamily="JetBrains Mono, monospace" fillOpacity="0.35" stroke="none">SYS_CANVAS: ON</text>
    <text x="30" y="120" fill="var(--theme-color)" fontSize="8" fontFamily="JetBrains Mono, monospace" fillOpacity="0.35" stroke="none">SCALE: 1.0</text>
    <text x="30" y="135" fill="var(--theme-color)" fontSize="8" fontFamily="JetBrains Mono, monospace" fillOpacity="0.35" stroke="none">UX_ENG: READY</text>
  </svg>
);

// Hologram SVG 2: Custom Development node network
const DevHologram = () => (
  <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
    {/* Outer Tech Circle */}
    <circle cx="200" cy="200" r="185" stroke="var(--theme-color)" strokeWidth="1" strokeDasharray="3, 8" strokeOpacity="0.2" />
    <circle cx="200" cy="200" r="168" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.15" />
    <circle cx="200" cy="200" r="135" stroke="var(--theme-color)" strokeWidth="1" strokeDasharray="40 25" strokeOpacity="0.3" className="anim-spin-slow" />

    {/* Center Hexagon Core */}
    <g transform="translate(200, 200)">
      {/* Rotating outer gear */}
      <polygon points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5" stroke="var(--theme-color)" strokeWidth="1.5" strokeOpacity="0.75" className="anim-spin-reverse" />
      <polygon points="0,-35 30,-17.5 30,17.5 0,35 -30,17.5 -30,-17.5" fill="var(--theme-color)" fillOpacity="0.08" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.45" />
      {/* Code tag symbol */}
      <path d="M -12 -6 L -20 0 L -12 6 M 12 -6 L 20 0 L 12 6 M -4 10 L 4 -10" stroke="var(--theme-color)" strokeWidth="2" strokeOpacity="0.85" />
    </g>

    {/* Node network connection lines */}
    <g stroke="var(--theme-color)" strokeWidth="1.5" strokeOpacity="0.4">
      {/* Top Left Node */}
      <line x1="200" y1="155" x2="110" y2="110" strokeDasharray="4,6" className="anim-dash-offset" />
      <circle cx="110" cy="110" r="15" fill="var(--col-bg)" stroke="var(--theme-color)" strokeWidth="1.5" />
      <circle cx="110" cy="110" r="5" fill="var(--theme-color)" />
      
      {/* Top Right Node */}
      <line x1="200" y1="155" x2="290" y2="110" strokeDasharray="4,6" className="anim-dash-offset" />
      <circle cx="290" cy="110" r="15" fill="var(--col-bg)" stroke="var(--theme-color)" strokeWidth="1.5" />
      <circle cx="290" cy="110" r="5" fill="var(--theme-color)" />

      {/* Bottom Center Node */}
      <line x1="200" y1="245" x2="200" y2="305" strokeDasharray="4,6" className="anim-dash-offset" />
      <circle cx="200" cy="305" r="15" fill="var(--col-bg)" stroke="var(--theme-color)" strokeWidth="1.5" />
      <circle cx="200" cy="305" r="5" fill="var(--theme-color)" />

      {/* Far Left Node */}
      <line x1="110" y1="110" x2="60" y2="200" />
      <circle cx="60" cy="200" r="9" fill="var(--col-bg)" stroke="var(--theme-color)" strokeWidth="1" />
      <circle cx="60" cy="200" r="3.5" fill="var(--theme-color)" fillOpacity="0.75" />

      {/* Far Right Node */}
      <line x1="290" y1="110" x2="340" y2="200" />
      <circle cx="340" cy="200" r="9" fill="var(--col-bg)" stroke="var(--theme-color)" strokeWidth="1" />
      <circle cx="340" cy="200" r="3.5" fill="var(--theme-color)" fillOpacity="0.75" />
    </g>

    {/* Tech Stack Code overlays */}
    <g fill="var(--theme-color)" fillOpacity="0.35" fontSize="8" fontFamily="JetBrains Mono, monospace" stroke="none">
      <text x="50" y="75">import &#123; useState &#125; from 'react';</text>
      <text x="50" y="90">const sys = await initialize();</text>
      <text x="260" y="345">api.sync(&#123; active: true &#125;);</text>
      <text x="260" y="360">engine: REACT_v19.0</text>
    </g>
  </svg>
);

// Hologram SVG 3: Performance & SEO graph
const SeoHologram = () => (
  <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
    {/* Outer rotating concentric arcs */}
    <circle cx="200" cy="200" r="185" stroke="var(--theme-color)" strokeWidth="1.5" strokeDasharray="140 180" strokeOpacity="0.25" className="anim-spin-slow" />
    <circle cx="200" cy="200" r="168" stroke="var(--theme-color)" strokeWidth="1" strokeDasharray="3, 3" strokeOpacity="0.15" />

    {/* Speedometer Gauge Dial (cx: 200, cy: 145) */}
    <g transform="translate(200, 145)">
      {/* Gauge Arc */}
      <path d="M -90 40 A 100 100 0 1 1 90 40" stroke="var(--theme-color)" strokeWidth="7" strokeOpacity="0.08" strokeLinecap="round" />
      <path d="M -90 40 A 100 100 0 1 1 72 -32" stroke="var(--theme-color)" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.8" />
      
      {/* Needle pointing to 99% */}
      <g transform="rotate(72)">
        <line x1="0" y1="0" x2="0" y2="-90" stroke="var(--theme-color)" strokeWidth="2.5" strokeOpacity="0.9" />
        <polygon points="-4,0 0,-14 4,0" fill="var(--theme-color)" />
        <circle cx="0" cy="0" r="5" fill="var(--col-bg)" stroke="var(--theme-color)" strokeWidth="1.5" />
      </g>
      
      {/* Readout values */}
      <text x="0" y="42" fill="var(--col-text)" fontSize="26" fontFamily="Clash Display, sans-serif" fontWeight="700" textAnchor="middle" stroke="none">99</text>
      <text x="0" y="58" fill="var(--theme-color)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="0.08em" textAnchor="middle" stroke="none">LIGHTHOUSE</text>
      
      {/* Circular Dial ticks */}
      {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="-106"
          x2="0"
          y2="-112"
          stroke="var(--theme-color)"
          strokeWidth="1.5"
          strokeOpacity={deg < 80 ? "0.75" : "0.25"}
          transform={`rotate(${deg})`}
        />
      ))}
    </g>

    {/* Traffic/SEO Growth Chart at bottom */}
    <g transform="translate(70, 260)" stroke="var(--theme-color)">
      {/* Horizontal grid lines */}
      <line x1="0" y1="55" x2="260" y2="55" strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1="0" y1="28" x2="260" y2="28" strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1="0" y1="0" x2="260" y2="0" strokeWidth="0.5" strokeOpacity="0.12" />
      
      {/* Chart line (Upward Growth Curve) */}
      <path
        d="M 0 50 Q 55 45 95 30 T 175 12 T 260 0"
        strokeWidth="2"
        strokeOpacity="0.8"
        fill="none"
      />
      
      {/* Chart shading */}
      <path
        d="M 0 50 Q 55 45 95 30 T 175 12 T 260 0 L 260 55 L 0 55 Z"
        fill="var(--theme-color)"
        fillOpacity="0.04"
        stroke="none"
      />

      {/* Pulsing indicator node */}
      <circle cx="260" cy="0" r="3.5" fill="var(--theme-color)" className="anim-pulse-soft" />
      <circle cx="260" cy="0" r="7" stroke="var(--theme-color)" strokeWidth="1" strokeOpacity="0.45" className="anim-pulse-soft" />

      {/* Axis readouts */}
      <text x="-10" y="4" fill="var(--theme-color)" fillOpacity="0.35" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="end" stroke="none">100%</text>
      <text x="-10" y="32" fill="var(--theme-color)" fillOpacity="0.35" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="end" stroke="none">50%</text>
      <text x="0" y="70" fill="var(--theme-color)" fillOpacity="0.35" fontSize="7" fontFamily="JetBrains Mono, monospace" stroke="none">APR</text>
      <text x="130" y="70" fill="var(--theme-color)" fillOpacity="0.35" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle" stroke="none">MAY</text>
      <text x="260" y="70" fill="var(--theme-color)" fillOpacity="0.35" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="end" stroke="none">JUN</text>
    </g>
  </svg>
);

export default function WhyWorkWithMe() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const themeClass = 
    activeTab === 0 ? "theme-gold" : 
    activeTab === 1 ? "theme-cyan" : 
    "theme-emerald";

  return (
    <section id="tech" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-number">03</span>
          <div className="section-label">O mně</div>
          <h2 className="section-title">Proč navázat<br />spolupráci?</h2>
        </div>

        {/* Dynamic theme wrapper switches colors on tab transition */}
        <div className={`hud-dashboard-container ${themeClass} reveal`}>
          
          {/* LEFT: Diagnostic Hologram Core Viewport */}
          <div className="hud-hologram-view">
            {/* Corner Crop Marks */}
            <div className="hud-crop-mark hud-crop-tl" />
            <div className="hud-crop-mark hud-crop-tr" />
            <div className="hud-crop-mark hud-crop-bl" />
            <div className="hud-crop-mark hud-crop-br" />

            {/* Corner telemetry status readouts */}
            <div className="hud-readout hud-readout-tl">SYS_DIAG: ACTIVE</div>
            <div className="hud-readout hud-readout-tr">MODE: INTERACTIVE</div>
            <div className="hud-readout hud-readout-bl">REFRESH: 120HZ</div>
            <div className="hud-readout hud-readout-br">ACCENT_LOCK: TRUE</div>

            {/* Glowing blur backlight */}
            <div className="hud-hologram-glow" />

            {/* Diagonal screen scanner scanline */}
            <div className="hud-scanline-overlay" />

            {/* Vector Hologram SVG viewport */}
            <div className="hud-svg-container">
              <div className={`hologram-svg-wrapper ${activeTab === 0 ? "active" : ""}`}>
                <DesignHologram />
              </div>
              <div className={`hologram-svg-wrapper ${activeTab === 1 ? "active" : ""}`}>
                <DevHologram />
              </div>
              <div className={`hologram-svg-wrapper ${activeTab === 2 ? "active" : ""}`}>
                <SeoHologram />
              </div>
            </div>
          </div>

          {/* RIGHT: Telemetry Control Panel with interactive tabs */}
          <div className="hud-telemetry-panel">
            
            {/* TAB 01: DESIGN & UX */}
            <div 
              className={`hud-tab-item ${activeTab === 0 ? "active" : ""}`}
              onMouseEnter={() => setActiveTab(0)}
              onClick={() => setActiveTab(0)}
            >
              <div className="hud-tab-header">
                <span className="hud-tab-meta">01 / BRAND & BLUEPRINT</span>
              </div>
              <h3 className="hud-tab-title">Design & UX Estetika</h3>
              
              <div className="hud-tab-content">
                <div className="hud-tab-content-inner">
                  <p className="hud-tab-desc">
                    Navrhuji rozhraní, která nejen skvěle vypadají, ale jsou intuitivní a vysoce konverzní. Důkladný výzkum a pixel-perfect prototypy ve Figmě jsou základem každého úspěšného projektu.
                  </p>
                  
                  {/* Dynamic stats */}
                  <div className="hud-stats-grid">
                    <div className="hud-stat-card">
                      <span className="hud-stat-value">
                        {isVisible && <CountUp end={30} suffix="+" />}
                      </span>
                      <span className="hud-stat-label">Hotových projektů</span>
                    </div>
                    <div className="hud-stat-card">
                      <span className="hud-stat-value">
                        {isVisible && <CountUp end={95} suffix="%" />}
                      </span>
                      <span className="hud-stat-label">UX spokojenost</span>
                    </div>
                  </div>

                  {/* Circular skills gauges */}
                  <div className="hud-dials-container">
                    <CircularDial pct={95} label="UI/UX DESIGN" />
                    <CircularDial pct={90} label="PROTOTYPOVÁNÍ" />
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 02: CUSTOM DEVELOPMENT */}
            <div 
              className={`hud-tab-item ${activeTab === 1 ? "active" : ""}`}
              onMouseEnter={() => setActiveTab(1)}
              onClick={() => setActiveTab(1)}
            >
              <div className="hud-tab-header">
                <span className="hud-tab-meta">02 / CORE ENGINE</span>
              </div>
              <h3 className="hud-tab-title">Vývoj na míru & Architektura</h3>
              
              <div className="hud-tab-content">
                <div className="hud-tab-content-inner">
                  <p className="hud-tab-desc">
                    Čistý kód, moderní React stack a stabilní API rozhraní. Zaměřuji se na robustní výkon, bezpečnost a znovupoužitelné komponenty postavené na TypeScriptu a Next.js.
                  </p>
                  
                  {/* Dynamic stats */}
                  <div className="hud-stats-grid">
                    <div className="hud-stat-card">
                      <span className="hud-stat-value">
                        {isVisible && <CountUp end={3} suffix="+" />}
                      </span>
                      <span className="hud-stat-label">Roky plné praxe</span>
                    </div>
                    <div className="hud-stat-card">
                      <span className="hud-stat-value">
                        {isVisible && <CountUp end={99.9} decimals={1} suffix="%" />}
                      </span>
                      <span className="hud-stat-label">Spolehlivost systémů</span>
                    </div>
                  </div>

                  {/* Circular skills gauges */}
                  <div className="hud-dials-container">
                    <CircularDial pct={95} label="REACT / NEXT.JS" />
                    <CircularDial pct={88} label="NODE & APIs" />
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 03: SEO & PERFORMANCE */}
            <div 
              className={`hud-tab-item ${activeTab === 2 ? "active" : ""}`}
              onMouseEnter={() => setActiveTab(2)}
              onClick={() => setActiveTab(2)}
            >
              <div className="hud-tab-header">
                <span className="hud-tab-meta">03 / CONVERSION TELEMETRY</span>
              </div>
              <h3 className="hud-tab-title">Rychlost & SEO Optimalizace</h3>
              
              <div className="hud-tab-content">
                <div className="hud-tab-content-inner">
                  <p className="hud-tab-desc">
                    Vaše stránky poletí bleskovou rychlostí. Optimalizace Core Web Vitals, detailní SEO audity, sémantický kód a měření konverzí, které zajistí špičkové pozice ve vyhledávačích.
                  </p>
                  
                  {/* Dynamic stats */}
                  <div className="hud-stats-grid">
                    <div className="hud-stat-card">
                      <span className="hud-stat-value">
                        {isVisible && <CountUp end={0.6} decimals={1} prefix="< " suffix="s" />}
                      </span>
                      <span className="hud-stat-label">Načtení stránky</span>
                    </div>
                    <div className="hud-stat-card">
                      <span className="hud-stat-value">
                        {isVisible && <CountUp end={140} prefix="+" suffix="%" />}
                      </span>
                      <span className="hud-stat-label">Průměrný růst trafficu</span>
                    </div>
                  </div>

                  {/* Circular skills gauges */}
                  <div className="hud-dials-container">
                    <CircularDial pct={98} label="SPEED INDEX" />
                    <CircularDial pct={100} label="SEO AUDITY" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
