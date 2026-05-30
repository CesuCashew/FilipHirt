import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { 
  Sliders, 
  Layout, 
  Play, 
  RefreshCw, 
  Check, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

// ==========================================
// 1. WIDGET: WIREFRAME BUILDER (Phase 01)
// ==========================================
function WidgetWireframe() {
  const [activeBlocks, setActiveBlocks] = useState({
    header: true,
    hero: true,
    grid: false,
    footer: false,
  });

  const toggleBlock = (block: keyof typeof activeBlocks) => {
    setActiveBlocks(prev => ({ ...prev, [block]: !prev[block] }));
  };

  const getActiveCount = () => {
    return Object.values(activeBlocks).filter(Boolean).length;
  };

  return (
    <div className="process-widget wireframe-widget">
      <div className="widget-header">
        <span className="widget-title">UX Wireframe Sandbox</span>
        <span className="widget-badge">{getActiveCount()} / 4 Aktivní</span>
      </div>

      <div className="wireframe-controls">
        {(Object.keys(activeBlocks) as Array<keyof typeof activeBlocks>).map((block) => (
          <button
            key={block}
            type="button"
            onClick={() => toggleBlock(block)}
            className={`wireframe-btn ${activeBlocks[block] ? "active" : ""}`}
          >
            {activeBlocks[block] && <Check className="w-3 h-3 text-lime" />}
            {block.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="wireframe-canvas">
        <div className="canvas-grid-bg" />
        
        {/* Header Block */}
        <div className={`canvas-block canvas-header ${activeBlocks.header ? "active" : ""}`}>
          <div className="canvas-dot" />
          <div className="canvas-line-short" />
          <div className="canvas-line-short ml-auto" />
        </div>

        {/* Hero Block */}
        <div className={`canvas-block canvas-hero ${activeBlocks.hero ? "active" : ""}`}>
          <div className="canvas-hero-content">
            <div className="canvas-line-long" />
            <div className="canvas-line-medium" />
            <div className="canvas-button-mock" />
          </div>
          <div className="canvas-hero-media">
            <Layout className="w-6 height-6 opacity-30" />
          </div>
        </div>

        {/* Grid Block */}
        <div className={`canvas-block canvas-grid-items ${activeBlocks.grid ? "active" : ""}`}>
          <div className="grid-item"><div className="canvas-line-short" /></div>
          <div className="grid-item"><div className="canvas-line-short" /></div>
          <div className="grid-item"><div className="canvas-line-short" /></div>
        </div>

        {/* Footer Block */}
        <div className={`canvas-block canvas-footer ${activeBlocks.footer ? "active" : ""}`}>
          <div className="canvas-line-short" />
          <div className="canvas-line-short ml-auto" />
        </div>
      </div>

      <div className="widget-footer-text">
        <span>Kliknutím na tlačítka poskládejte kostru webu.</span>
      </div>
    </div>
  );
}

// ==========================================
// 2. WIDGET: COMPARISON SLIDER (Phase 02)
// ==========================================
function WidgetSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="process-widget slider-widget">
      <div className="widget-header">
        <span className="widget-title">Figma Wireframe vs. Hotové UI</span>
        <span className="widget-badge">Posuvný Slider</span>
      </div>

      <div 
        ref={containerRef}
        className="slider-container"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
      >
        {/* Left Side: Wireframe Blueprint */}
        <div className="slider-layer layer-wireframe">
          <div className="blueprint-overlay" />
          <div className="mock-interface wireframe">
            <div className="mock-navbar">
              <div className="mock-dot-gray" />
              <div className="mock-line-s" />
              <div className="mock-line-s ml-auto" />
            </div>
            <div className="mock-hero">
              <div className="mock-line-l" />
              <div className="mock-line-m" />
              <div className="mock-box-accent" />
            </div>
          </div>
        </div>

        {/* Right Side: Colored UI (revealed under the slider clip path) */}
        <div 
          className="slider-layer layer-ui" 
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          <div className="mock-interface visual-ui">
            <div className="mock-navbar">
              <div className="mock-logo-glow" />
              <div className="mock-menu-active" />
              <div className="mock-cta-lime ml-auto" />
            </div>
            <div className="mock-hero">
              <div className="mock-title-gradient" />
              <div className="mock-desc-text" />
              <div className="mock-box-glow" />
            </div>
          </div>
        </div>

        {/* Handle Line & Thumb */}
        <div 
          className="slider-handle" 
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="slider-handle-line" />
          <div className="slider-handle-button">
            <Sliders className="w-4 h-4 text-black transform rotate-90" />
          </div>
        </div>
      </div>

      <div className="widget-footer-text">
        <span>Tažením slideru porovnejte skicu s výsledným UI.</span>
      </div>
    </div>
  );
}

// ==========================================
// 3. WIDGET: AI TERMINAL (Phase 03)
// ==========================================
function WidgetTerminal() {
  const [logs, setLogs] = useState<string[]>(["Pro spuštění kompilace klikněte na TLAČÍTKO"]);
  const [isCompiling, setIsCompiling] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  const startBuild = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setLogs([]);

    const messages = [
      "> initialising nextjs_vite_compiler...",
      "> loading configurations & tsconfig.json...",
      "> invoking cursor_ai_agent core v4.0...",
      "[AI] Analyzing code architecture & schema checks...",
      "[AI] Generating optimized style tokens...",
      "> compiling 42 components...",
      "> compressing bundle (24.8 kB)...",
      "[SUCCESS] Web built successfully in 142ms!",
      "> analyzing web vitals...",
      "  - performance: 99/100",
      "  - accessibility: 100/100",
      "  - seo: 100/100",
      "> site deployed to edge CDN servers.",
      "[OK] Live production link initialized."
    ];

    let current = 0;
    timerRef.current = setInterval(() => {
      if (current < messages.length) {
        const msg = messages[current];
        setLogs(prev => [...prev, msg]);
        current++;
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsCompiling(false);
      }
    }, 280);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="process-widget terminal-widget">
      <div className="widget-header">
        <span className="widget-title">AI Engine Compiler</span>
        <button 
          type="button"
          onClick={startBuild}
          disabled={isCompiling}
          className="terminal-run-btn"
        >
          {isCompiling ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>BUILDUJE...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>SPUSTIT VÝVOJ</span>
            </>
          )}
        </button>
      </div>

      <div ref={terminalBodyRef} className="terminal-body">
        {logs.map((log, idx) => (
          <div 
            key={idx} 
            className={`terminal-line ${
              log.startsWith("[SUCCESS]") ? "text-lime font-bold" :
              log.startsWith("[AI]") ? "text-cyan" :
              log.startsWith("[OK]") ? "text-emerald font-bold" :
              log.startsWith("  -") ? "text-white/60 ml-4" : "text-white/80"
            }`}
          >
            {log}
          </div>
        ))}
      </div>

      <div className="widget-footer-text">
        <span>Simulace AI akcelerovaného vývojového prostředí.</span>
      </div>
    </div>
  );
}

// ==========================================
// 4. WIDGET: LIGHTHOUSE DIAL (Phase 04)
// ==========================================
function WidgetLighthouse() {
  const [score, setScore] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);

  const startAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setScore(0);

    let current = 0;
    const interval = setInterval(() => {
      if (current < 100) {
        current += Math.floor(Math.random() * 4) + 1;
        if (current > 100) current = 100;
        setScore(current);
      } else {
        clearInterval(interval);
        setIsAuditing(false);
      }
    }, 30);
  };

  const radius = 32;
  const circumference = 2 * Math.PI * radius; // ~201.06
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="process-widget lighthouse-widget">
      <div className="widget-header">
        <span className="widget-title">Google Lighthouse Audit</span>
        <button 
          type="button"
          onClick={startAudit}
          disabled={isAuditing}
          className="audit-run-btn"
        >
          {isAuditing ? "TESTUJE SE..." : "SPUSTIT AUDIT"}
        </button>
      </div>

      <div className="lighthouse-gauge-area">
        <div className="gauge-svg-wrap">
          <svg viewBox="0 0 80 80" className="w-24 h-24">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="4"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={score === 100 ? "#84cc16" : score > 80 ? "#22d3ee" : "#eab308"}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="gauge-circle-fill"
            />
          </svg>
          <div className="gauge-score-value">
            <span className={score === 100 ? "text-lime font-bold scale-110" : ""}>
              {score}
            </span>
          </div>
        </div>

        <div className="lighthouse-metrics-list">
          <div className="metric-row">
            <span className="metric-dot performance" />
            <span className="metric-name">Výkon (Performance)</span>
            <span className="metric-val">{score}%</span>
          </div>
          <div className="metric-row">
            <span className="metric-dot accessibility" />
            <span className="metric-name">Přístupnost (A11y)</span>
            <span className="metric-val">{score}%</span>
          </div>
          <div className="metric-row">
            <span className="metric-dot seo" />
            <span className="metric-name">SEO skóre</span>
            <span className="metric-val">{score}%</span>
          </div>
        </div>
      </div>

      <div className="widget-footer-text">
        <span>Cílíme na absolutní maximum u všech typů projektů.</span>
      </div>
    </div>
  );
}

// ==========================================
// MAIN PROCESS COMPONENT
// ==========================================
const steps = [
  {
    num: "01",
    badge: "01 / STRATEGIE & STRUKTURA",
    title: "Definice & Strategie",
    desc: "Důkladné pochopení vašeho byznysu a cílů. Navrhnu optimální strukturu, UX drátěné modely a kreativní koncept.",
    list: ["Analýza konkurence & trhu", "UX drátěné modely (wireframes)", "Kreativní a technický koncept"],
    widget: WidgetWireframe
  },
  {
    num: "02",
    badge: "02 / UI DESIGN & PROTOTYP",
    title: "Unikátní UI Design",
    desc: "Tvorba moderního a přitažlivého vizuálního stylu. Každý pixel má svůj účel a emoci na míru vaší značce.",
    list: ["Grafický návrh na míru", "Responzivní design (mobil-first)", "Interaktivní prototypy ve Figmě"],
    widget: WidgetSlider
  },
  {
    num: "03",
    badge: "03 / KÓDOVÁNÍ & INTEGRACE",
    title: "Vývoj & AI Akcelerace",
    desc: "Rychlé kódování s využitím AI a moderních technologií. Čistý kód, perfektní optimalizace a TypeScript.",
    list: ["Bleskově rychlý Next.js / Vite", "Nasazení moderních AI nástrojů", "Clean code a čistá architektura"],
    widget: WidgetTerminal
  },
  {
    num: "04",
    badge: "04 / SPOUŠTĚNÍ & PODPORA",
    title: "Optimalizace & Launch",
    desc: "Důkladné testování, vyladění SEO a rychlosti před spuštěním. Následná podpora a rozvoj webu.",
    list: ["100% skóre v Google Lighthouse", "Bezpečné nasazení na CDN", "Průběžná optimalizace konverzí"],
    widget: WidgetLighthouse
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Monitor screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // useScroll hooks for desktop stacked card effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active card using Framer Motion hook
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    // Map 0 to 1 scroll scope into 4 segments
    if (latest < 0.22) {
      setActiveStep(0);
    } else if (latest < 0.48) {
      setActiveStep(1);
    } else if (latest < 0.74) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  });

  // Animating cards state dynamically based on activeStep instead of scrollYProgress ranges

  return (
    <section 
      id="process" 
      ref={sectionRef} 
      className={isMobile ? "process-section-mobile" : "process-section-desktop"}
    >
      {/* Background radial glow */}
      <div className="process-ambient-light" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-number">04</span>
          <div className="section-label">Jak pracuji</div>
          <h2 className="section-title">AI-Powered Workflow</h2>
          <p className="section-subtitle text-white/50 max-w-lg mt-2">
            Spojení lidské kreativity, precizního designu a bleskové rychlosti umělé inteligence pro maximální výsledky.
          </p>
        </div>

        {/* -------------------- DESKTOP LAYOUT -------------------- */}
        {!isMobile && (
          <div className="process-stacked-layout">
            <div className="process-cards-track">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;

                return (
                  <motion.div
                    key={step.num}
                    className={`process-card-stacked ${isActive ? "active" : ""}`}
                    animate={{
                      opacity: isActive ? 1.0 : isPast ? 0.8 : 0.0,
                      scale: isActive ? 1.0 : 0.95,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ 
                      pointerEvents: isActive ? "auto" : "none",
                      // Sticky offset to keep them stacking on top of each other
                      top: `calc(18vh + ${index * 24}px)`
                    }}
                  >
                    {/* Left Column: Text Content */}
                    <div className="card-content-col">
                      <span className="card-badge-lbl">{step.badge}</span>
                      <h3 className="card-step-title">{step.title}</h3>
                      <p className="card-step-desc">{step.desc}</p>
                      
                      <ul className="card-step-list">
                        {step.list.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column: Interactive Sandbox Widget */}
                    <div className="card-widget-col">
                      <step.widget />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* -------------------- MOBILE LAYOUT (Swipeable Carousel) -------------------- */}
        {isMobile && (
          <div className="process-mobile-carousel">
            <div className="carousel-controls-top">
              <button 
                onClick={() => setMobileIndex(prev => Math.max(0, prev - 1))}
                disabled={mobileIndex === 0}
                className="carousel-arrow-btn"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="carousel-counter-lbl">
                {steps[mobileIndex].num} / 04
              </span>
              
              <button 
                onClick={() => setMobileIndex(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={mobileIndex === steps.length - 1}
                className="carousel-arrow-btn"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Swipeable Container */}
            <div className="carousel-slide-wrapper">
              <motion.div 
                className="carousel-inner-slider"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const threshold = 50; // swipe delta threshold
                  if (info.offset.x < -threshold && mobileIndex < steps.length - 1) {
                    setMobileIndex(prev => prev + 1);
                  } else if (info.offset.x > threshold && mobileIndex > 0) {
                    setMobileIndex(prev => prev - 1);
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="mobile-card-item"
                  >
                    <span className="mobile-card-badge">{steps[mobileIndex].badge}</span>
                    <h3 className="mobile-card-title">{steps[mobileIndex].title}</h3>
                    <p className="mobile-card-desc">{steps[mobileIndex].desc}</p>
                    
                    {/* Widget Embedded */}
                    <div className="mobile-card-widget-wrap">
                      {(() => {
                        const MobileWidget = steps[mobileIndex].widget;
                        return <MobileWidget />;
                      })()}
                    </div>

                    <ul className="mobile-card-bullet-list">
                      {steps[mobileIndex].list.map((item, idx) => (
                        <li key={idx}>
                          <span className="bullet-dot" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Pagination Indicators */}
            <div className="carousel-dots-indicator">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileIndex(idx)}
                  className={`carousel-dot ${mobileIndex === idx ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
