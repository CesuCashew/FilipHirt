import { useState, useEffect, useRef } from "react";

interface Service {
  num: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
  tags: string[];
  terminalData: {
    system: string;
    status: string;
    response_time: string;
    logs: string[];
    [key: string]: any;
  };
}

const services: Service[] = [
  {
    num: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 20 L18 23 L25 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Chytré Webové Stránky",
    desc: "Weby s inteligentními asistenty, které odpovídají zákazníkům 24/7, automatizují procesy a přizpůsobují obsah každému návštěvníkovi.",
    tags: ["AI chatboty", "Automatizace", "Personalizace obsahu"],
    terminalData: {
      system: "AI_AGENT_CORE v2.4",
      status: "ACTIVE_RUNNING",
      response_time: "98ms",
      context_window: "128k tokens",
      integrations: ["OpenAI API", "Vektorové DB", "Make.com"],
      logs: [
        "Initializing neural agent...",
        "Custom knowledge base loaded: 142 articles",
        "Stream-chunk generator online",
        "Ready to serve customer inquiries"
      ]
    }
  },
  {
    num: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="30" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 22 L15 19 L18 22 L23 17 L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Online Obchody",
    desc: "Kompletní e-shopy, které skutečně prodávají. Moderní design, snadná správa produktů a optimalizace pro maximální konverze.",
    tags: ["E-commerce", "Platební brány", "Conversion optimalizace"],
    terminalData: {
      system: "E_SHOP_CORE v5.1",
      status: "STABLE",
      response_time: "140ms",
      payment_gateways: ["Stripe", "GP webpay", "Apple Pay"],
      conversion_rate: "+42% avg",
      logs: [
        "DB connection: established",
        "Syncing inventory with warehouse API...",
        "Apple Pay merchant validation: OK",
        "Ready to process checkout pipelines"
      ]
    }
  },
  {
    num: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 26 L10 32 L13 22 L5 15 L15 15 Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    name: "Weby pro Restaurace",
    desc: "Atraktivní webové stránky s online rezervačním systémem, elektronickým menu a možností objednávek přímo z webu.",
    tags: ["Online rezervace", "Digitální menu", "Objednávkový systém"],
    terminalData: {
      system: "BISTRO_OS v1.8",
      status: "STANDBY",
      response_time: "110ms",
      menu_items: "Synced (94 items)",
      features: ["Live Rezervace", "QR Objednávky"],
      logs: [
        "Loading interactive digital menu...",
        "Connecting to kitchen printer webhook...",
        "Table reservation system: active",
        "Standby for customer reservations"
      ]
    }
  },
  {
    num: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 15 L25 15 M15 20 L25 20 M15 25 L22 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Firemní Prezentace",
    desc: "Reprezentativní webové prezentace, které budují důvěru a profesionalitu. Perfektní první dojem pro vaše klienty.",
    tags: ["Corporate design", "SEO optimalizace", "Brand identity"],
    terminalData: {
      system: "CORP_PRES_CORE v3.0",
      status: "READY",
      response_time: "75ms",
      seo_score: "100/100 Mobile",
      security: "SSL / Cloudflare WAF",
      logs: [
        "Optimizing LCP and CLS values...",
        "Sitemap index generated: 18 nodes",
        "Asset compression pipeline: active",
        "Performance optimization COMPLETE"
      ]
    }
  },
  {
    num: "05",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M27 25 L33 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 18 H25 M20 13 V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Správa Výkonu a SEO",
    desc: "Zabezpečím, aby vás lidé na internetu skutečně našli. Zaměřuji se na technické SEO, rychlost načítání a dlouhodobý růst organické návštěvnosti.",
    tags: ["SEO Audit", "Performance", "Google Analytics"],
    terminalData: {
      system: "SEO_INSIGHTS_CORE v4.2",
      status: "MONITORING",
      response_time: "60ms",
      index_status: "100% Crawled",
      lighthouse: { perf: 100, seo: 100, bp: 100 },
      logs: [
        "Analyzing Google Search Console data...",
        "Tracking keyword rankings: Czech Republic",
        "Structured data validator: 0 errors",
        "Ready to audit technical performance"
      ]
    }
  },
  {
    num: "06",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 14 H34 M20 28 V34 M14 34 H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "UX/UI Redesign a Audity",
    desc: "Máte web, který neprodává? Provedu audit použitelnosti a navrhnu moderní redesign, který zlepší uživatelský zážitek a zvýší vaše konverze.",
    tags: ["UX Výzkum", "Redesign", "Konverzní poměr"],
    terminalData: {
      system: "UX_UI_AUDITOR v1.0",
      status: "READY",
      response_time: "N/A",
      ux_methodology: ["Figma UI Kit", "Heatmaps", "A/B Testing"],
      conversion_uplift: "+25% expected",
      logs: [
        "Loading Hotjar heatmap recordings...",
        "Identifying checkout page drop-offs...",
        "Creating high-fidelity UI components...",
        "Ready to launch A/B test variant B"
      ]
    }
  },
];

function AtmosphericBackdrop({ 
  hoveredIndex, 
  isDesktop, 
  activeRowTop 
}: { 
  hoveredIndex: number | null; 
  isDesktop: boolean; 
  activeRowTop: number;
}) {
  if (!isDesktop) return null;

  return (
    <div className="services-backdrop-canvas">
      {/* Layer 0: Idle Background Grid (Fills parent canvas) */}
      <div className={`backdrop-layer layer-idle ${hoveredIndex === null ? "is-active" : ""}`}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
          <defs>
            <pattern id="grid-idle" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-idle)" />
        </svg>
      </div>

      {/* Themed layers container - vertically slides to activeRowTop */}
      <div 
        className="services-themed-backdrop-container"
        style={{
          position: "absolute",
          left: 0,
          top: activeRowTop,
          width: "100%",
          height: "500px",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          transition: "top 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Layer 1: AI Weby */}
        <div className={`backdrop-layer layer-ai ${hoveredIndex === 0 ? "is-active" : ""}`}>
          <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
            <defs>
              <pattern id="grid-ai" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0, 240, 255, 0.03)" strokeWidth="1" />
              </pattern>
              <radialGradient id="glow-ai" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 240, 255, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1000" height="500" fill="url(#grid-ai)" />
            <circle cx="500" cy="250" r="280" fill="url(#glow-ai)" filter="blur(30px)" />
            
            {/* Neural Node Connections centered around y=250 */}
            <g stroke="rgba(0, 240, 255, 0.22)" strokeWidth="1.2" fill="none">
              <line x1="500" y1="250" x2="650" y2="150" className="draw-line-ai" />
              <line x1="650" y1="150" x2="620" y2="400" className="draw-line-ai" />
              <line x1="620" y1="400" x2="380" y2="350" className="draw-line-ai" />
              <line x1="380" y1="350" x2="420" y2="100" className="draw-line-ai" />
              <line x1="420" y1="100" x2="500" y2="250" className="draw-line-ai" />
              <line x1="500" y1="250" x2="380" y2="350" className="draw-line-ai" />
              <line x1="650" y1="150" x2="380" y2="350" className="draw-line-ai" />
            </g>

            {/* Glowing HUD circles on AI Core */}
            <circle cx="500" cy="250" r="45" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1" />
            <circle cx="500" cy="250" r="30" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1.5" strokeDasharray="10, 5" className="rotate-hud-fast" />
            
            {/* Pulsating nodes */}
            <g fill="rgba(0, 240, 255, 0.6)">
              <circle cx="500" cy="250" r="7" className="pulse-node" style={{ animationDelay: "0s" }} />
              <circle cx="650" cy="150" r="8" className="pulse-node" style={{ animationDelay: "0.5s" }} />
              <circle cx="620" cy="400" r="7" className="pulse-node" style={{ animationDelay: "1s" }} />
              <circle cx="380" cy="350" r="5" className="pulse-node" style={{ animationDelay: "1.5s" }} />
              <circle cx="420" cy="100" r="6" className="pulse-node" style={{ animationDelay: "0.8s" }} />
            </g>
          </svg>
        </div>

        {/* Layer 2: Online Obchody */}
        <div className={`backdrop-layer layer-eshop ${hoveredIndex === 1 ? "is-active" : ""}`}>
          <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
            <defs>
              <linearGradient id="glow-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(232, 162, 56, 0.18)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <pattern id="grid-eshop" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(232, 162, 56, 0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#grid-eshop)" />
            <circle cx="500" cy="250" r="280" fill="url(#glow-gold)" filter="blur(40px)" />
            
            {/* Isometric Transaction Blueprint Grid centered around y=250 */}
            <g stroke="rgba(232, 162, 56, 0.15)" strokeWidth="1" fill="none">
              {/* Isometric base card outline */}
              <path d="M 350 250 L 500 175 L 650 250 L 500 325 Z" />
              <path d="M 350 265 L 500 190 L 650 265 L 500 340 Z" />
              <line x1="350" y1="250" x2="350" y2="265" />
              <line x1="500" y1="325" x2="500" y2="340" />
              <line x1="650" y1="250" x2="650" y2="265" />
              
              {/* Isometric grid lines */}
              <line x1="400" y1="275" x2="550" y2="200" />
              <line x1="450" y1="300" x2="600" y2="225" />
              
              {/* Flow paths representation */}
              <path d="M 100 350 Q 300 100 500 250 T 700 150" stroke="rgba(232, 162, 56, 0.25)" strokeWidth="1.5" strokeDasharray="8, 8" className="flow-path-gold" />
              <path d="M 200 450 Q 400 380 550 280 T 750 320" stroke="rgba(232, 162, 56, 0.12)" strokeWidth="1" strokeDasharray="12, 6" className="flow-path-gold" style={{ animationDuration: "12s" }} />
            </g>
          </svg>
        </div>

        {/* Layer 3: Weby pro Restaurace */}
        <div className={`backdrop-layer layer-bistro ${hoveredIndex === 2 ? "is-active" : ""}`}>
          <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
            <defs>
              <radialGradient id="glow-bistro" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(232, 110, 56, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <pattern id="grid-bistro" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(232, 110, 56, 0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#grid-bistro)" />
            
            {/* Ambient warm radial glow under tableware */}
            <circle cx="500" cy="250" r="280" fill="url(#glow-bistro)" filter="blur(30px)" />

            {/* Gourmet plate geometric blueprint centered at 500, 250 */}
            <circle cx="500" cy="250" r="160" fill="none" stroke="rgba(232, 110, 56, 0.1)" strokeWidth="1" />
            <circle cx="500" cy="250" r="120" fill="none" stroke="rgba(232, 110, 56, 0.15)" strokeWidth="1.5" />
            <circle cx="500" cy="250" r="80" fill="none" stroke="rgba(232, 110, 56, 0.2)" strokeWidth="1.5" />
            <circle cx="500" cy="250" r="45" fill="none" stroke="rgba(232, 110, 56, 0.25)" strokeWidth="2" strokeDasharray="4, 4" />
            
            {/* Fine line art representation of tableware */}
            <g stroke="rgba(232, 110, 56, 0.3)" strokeWidth="1.5" fill="none">
              {/* Cloche dome overlay */}
              <path d="M 390 250 C 390 140 610 140 610 250 Z" strokeDasharray="6, 3" />
              <path d="M 480 140 L 520 140 M 500 140 L 500 130" />
              
              {/* Wine Glass at the right side */}
              <path d="M 650 180 L 680 180" />
              <path d="M 650 180 C 650 230 680 230 680 180 Z" />
              <line x1="665" y1="215" x2="665" y2="280" />
              <path d="M 650 280 L 680 280" />
            </g>

            {/* Wave vapor curves */}
            <path d="M 470 330 C 450 270 490 220 470 160 C 450 110 490 80 470 30" fill="none" stroke="rgba(232, 110, 56, 0.22)" strokeWidth="2" className="vapor-wave" style={{ animationDelay: "0s" }} />
            <path d="M 530 330 C 510 280 550 230 530 170 C 510 120 550 90 530 40" fill="none" stroke="rgba(232, 110, 56, 0.15)" strokeWidth="1.5" className="vapor-wave" style={{ animationDelay: "1.5s" }} />
          </svg>
        </div>

        {/* Layer 4: Firemní Prezentace */}
        <div className={`backdrop-layer layer-corp ${hoveredIndex === 3 ? "is-active" : ""}`}>
          <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
            <defs>
              <radialGradient id="glow-corp" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(86, 156, 214, 0.18)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <pattern id="grid-isometric" width="80" height="46.188" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 23.094 L 40 46.188 L 80 23.094 Z" fill="none" stroke="rgba(86, 156, 214, 0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="500" fill="url(#grid-isometric)" />
            
            {/* Ambient corporate blue glow */}
            <circle cx="500" cy="250" r="280" fill="url(#glow-corp)" filter="blur(30px)" />
            
            {/* Highly complex multi-ring clockwork HUD blueprint centered at 500, 250 */}
            <g transform="translate(500, 250)">
              {/* Outer compass ring */}
              <circle cx="0" cy="0" r="210" fill="none" stroke="rgba(86, 156, 214, 0.1)" strokeWidth="1" />
              
              {/* Counter-rotating segment rings */}
              <circle cx="0" cy="0" r="180" fill="none" stroke="var(--theme-color)" strokeWidth="1.5" strokeDasharray="40, 20" className="rotate-hud" style={{ opacity: 0.3 }} />
              <circle cx="0" cy="0" r="150" fill="none" stroke="var(--theme-color)" strokeWidth="1.2" strokeDasharray="10, 15" className="rotate-hud-counter" style={{ opacity: 0.2 }} />
              <circle cx="0" cy="0" r="120" fill="none" stroke="var(--theme-color)" strokeWidth="2" strokeDasharray="6, 12" className="rotate-hud" style={{ animationDuration: "15s", opacity: 0.35 }} />
              
              {/* Crosshair coordinate lines */}
              <line x1="-230" y1="0" x2="230" y2="0" stroke="rgba(86, 156, 214, 0.15)" strokeWidth="1" />
              <line x1="0" y1="-230" x2="0" y2="230" stroke="rgba(86, 156, 214, 0.15)" strokeWidth="1" />
              
              {/* Angle ticks HUD */}
              <g stroke="rgba(86, 156, 214, 0.25)" strokeWidth="1">
                <line x1="0" y1="-180" x2="0" y2="-190" />
                <line x1="0" y1="180" x2="0" y2="190" />
                <line x1="-180" y1="0" x2="-190" y2="0" />
                <line x1="180" y1="0" x2="190" y2="0" />
              </g>
            </g>
          </svg>
        </div>

        {/* Layer 5: Správa Výkonu a SEO */}
        <div className={`backdrop-layer layer-seo ${hoveredIndex === 4 ? "is-active" : ""}`}>
          <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
            <defs>
              <pattern id="grid-seo" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="1" fill="rgba(0, 255, 120, 0.08)" />
              </pattern>
              <radialGradient id="glow-seo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0, 255, 120, 0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1000" height="500" fill="url(#grid-seo)" />
            <circle cx="500" cy="250" r="280" fill="url(#glow-seo)" filter="blur(30px)" />
            
            {/* Speedometer performance dial gauge centered at 500, 280 */}
            <g transform="translate(500, 280)">
              {/* Base grey arc */}
              <path 
                d="M -120 80 A 140 140 0 1 1 120 80" 
                fill="none" 
                stroke="rgba(0, 255, 120, 0.1)" 
                strokeWidth="8" 
                strokeLinecap="round" 
              />
              
              {/* Active neon green arc that sweeps in */}
              <path 
                d="M -120 80 A 140 140 0 1 1 120 80" 
                fill="none" 
                stroke="var(--theme-color)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                className="seo-gauge-sweep"
              />
              
              {/* Score text */}
              <text x="0" y="10" fill="var(--theme-color)" fontFamily="Clash Display" fontSize="36" fontWeight="700" textAnchor="middle">100</text>
              <text x="0" y="32" fill="rgba(0, 255, 120, 0.4)" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.1em" textAnchor="middle">PERFORMANCE</text>
            </g>
            
            {/* SEO Analytics growth line graph */}
            <path d="M 350 400 L 450 280 L 550 320 L 650 120 L 750 160 L 850 50" fill="none" stroke="rgba(0, 255, 120, 0.25)" strokeWidth="2.5" className="seo-graph" />
            
            {/* Pulsating target point */}
            <circle cx="850" cy="50" r="4" fill="var(--theme-color)" className="pulse-node" />
            <circle cx="850" cy="50" r="12" fill="none" stroke="var(--theme-color)" strokeWidth="1" className="pulse-ring" style={{ transformOrigin: "850px 50px" }} />
          </svg>
        </div>

        {/* Layer 6: UX/UI Redesign a Audity */}
        <div className={`backdrop-layer layer-ux ${hoveredIndex === 5 ? "is-active" : ""}`}>
          <svg width="100%" height="500" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" className="backdrop-svg">
            <defs>
              <radialGradient id="glow-ux" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 0, 128, 0.12)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="1000" height="500" fill="none" />
            <circle cx="500" cy="250" r="280" fill="url(#glow-ux)" filter="blur(30px)" />

            {/* Figma rulers */}
            <line x1="0" y1="25" x2="100%" y2="25" stroke="rgba(255, 0, 128, 0.15)" strokeWidth="1" strokeDasharray="1, 9" />
            <line x1="25" y1="0" x2="25" y2="100%" stroke="rgba(255, 0, 128, 0.15)" strokeWidth="1" strokeDasharray="1, 9" />
            
            {/* Columns layout overlay in the background */}
            <g stroke="rgba(255, 0, 128, 0.04)" strokeWidth="1">
              <line x1="200" y1="0" x2="200" y2="100%" />
              <line x1="280" y1="0" x2="280" y2="100%" />
              <line x1="360" y1="0" x2="360" y2="100%" />
              <line x1="440" y1="0" x2="440" y2="100%" />
              <line x1="520" y1="0" x2="520" y2="100%" />
              <line x1="600" y1="0" x2="600" y2="100%" />
              <line x1="680" y1="0" x2="680" y2="100%" />
              <line x1="760" y1="0" x2="760" y2="100%" />
              <line x1="840" y1="0" x2="840" y2="100%" />
            </g>
            
            {/* Figma blueprint showing measurements centered at 350, 140 */}
            <g stroke="rgba(255, 0, 128, 0.3)" strokeWidth="1" fill="none" transform="translate(350, 140)">
              {/* Desktop mock window */}
              <rect x="0" y="0" width="300" height="220" rx="4" />
              
              {/* Layout guides */}
              <line x1="-30" y1="40" x2="330" y2="40" stroke="rgba(255, 0, 128, 0.1)" strokeDasharray="2, 2" />
              <line x1="-30" y1="180" x2="330" y2="180" stroke="rgba(255, 0, 128, 0.1)" strokeDasharray="2, 2" />
              
              {/* Measurement lines */}
              <line x1="320" y1="40" x2="320" y2="180" />
              <path d="M 317 45 L 320 40 L 323 45 M 317 175 L 320 180 L 323 175" />
              
              {/* Text details */}
              <text x="330" y="115" fill="rgba(255, 0, 128, 0.55)" fontFamily="JetBrains Mono" fontSize="9" stroke="none">h: 140px</text>
              <text x="100" y="-12" fill="rgba(255, 0, 128, 0.55)" fontFamily="JetBrains Mono" fontSize="9" stroke="none">gap: 24px</text>
              
              {/* Figma style corner handles */}
              <rect x="-3" y="-3" width="6" height="6" fill="#fff" stroke="var(--theme-color)" />
              <rect x="297" y="-3" width="6" height="6" fill="#fff" stroke="var(--theme-color)" />
              <rect x="-3" y="217" width="6" height="6" fill="#fff" stroke="var(--theme-color)" />
              <rect x="297" y="217" width="6" height="6" fill="#fff" stroke="var(--theme-color)" />

              {/* Mock Cursor overlay */}
              <path d="M 50 120 L 70 140 L 60 145 L 75 165 L 70 168 L 55 148 L 50 155 Z" fill="var(--theme-color)" stroke="none" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeRowTop, setActiveRowTop] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRowMouseEnter = (e: React.MouseEvent, idx: number) => {
    setHoveredIndex(idx);
    
    // Calculate the top offset of the hovered row relative to the list container
    const rowEl = e.currentTarget as HTMLElement;
    const listEl = rowEl.parentElement;
    if (rowEl && listEl) {
      const rowRect = rowEl.getBoundingClientRect();
      const listRect = listEl.getBoundingClientRect();
      // Y center of the row relative to the list container top
      const rowCenterY = (rowRect.top - listRect.top) + (rowRect.height / 2);
      setActiveRowTop(rowCenterY);
    }
  };

  const getThemeClass = () => {
    if (hoveredIndex === null) return "bg-theme-idle";
    switch (hoveredIndex) {
      case 0: return "bg-theme-ai";
      case 1: return "bg-theme-eshop";
      case 2: return "bg-theme-bistro";
      case 3: return "bg-theme-corp";
      case 4: return "bg-theme-seo";
      case 5: return "bg-theme-ux";
      default: return "bg-theme-idle";
    }
  };

  return (
    <section 
      id="services" 
      className={`services-section ${getThemeClass()}`}
      ref={containerRef}
    >
      <div className="container-wide" style={{ position: "relative", zIndex: 2 }}>
        <div className="services-sticky-layout">
          {/* Sticky left column */}
          <div className="services-sticky-col">
            <div className="services-sticky-inner reveal">
              <span className="section-number" style={{ position: "static", opacity: 0.05 }}>01</span>
              <div className="section-label">Služby</div>
              <h2 className="section-title">Co Nabízím</h2>
              <p className="section-subtitle">
                Komplexní digitální strategie pro váš úspěch a růst
              </p>
              <div className="services-counter-pill">
                <span>{String(services.length).padStart(2, "0")}</span> služeb
              </div>
            </div>
          </div>

          {/* Scrolling right column / List of rows */}
          <div className="services-list-interactive" style={{ position: "relative" }}>
            {/* Background vector graphics canvas */}
            <AtmosphericBackdrop 
              hoveredIndex={hoveredIndex} 
              isDesktop={isDesktop} 
              activeRowTop={activeRowTop} 
            />

            {services.map((s, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={s.num}
                  className={`service-row-item ${isHovered ? "is-active" : ""}`}
                  onMouseEnter={(e) => handleRowMouseEnter(e, idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="service-row-bg-glitch" />
                  
                  <div className="service-row-main">
                    <span className="service-row-num">{s.num}</span>
                    <div className="service-row-icon-wrap">{s.icon}</div>
                    
                    <div className="service-row-title-wrap">
                      <h3 className="service-row-title">
                        {s.name}
                      </h3>
                      <p className="service-row-desc">{s.desc}</p>
                      
                      <div className="service-row-tags">
                        {s.tags.map((tag) => (
                          <span key={tag} className="service-row-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="service-row-arrow-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
