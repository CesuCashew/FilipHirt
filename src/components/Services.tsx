import { useState } from "react";
import ScrambleText from "./ScrambleText";

const services = [
  {
    num: "01",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 20 L18 23 L25 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Chytré Webové Stránky",
    desc: "Weby s inteligentními asistenty, které odpovídají zákazníkům 24/7, automatizují procesy a přizpůsobují obsah každému návštěvníkovi.",
    tags: ["AI chatboty", "Automatizace", "Personalizace obsahu"],
  },
  {
    num: "02",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="30" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 22 L15 19 L18 22 L23 17 L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Online Obchody",
    desc: "Kompletní e-shopy, které skutečně prodávají. Moderní design, snadná správa produktů a optimalizace pro maximální konverze.",
    tags: ["E-commerce", "Platební brány", "Conversion optimalizace"],
  },
  {
    num: "03",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 26 L10 32 L13 22 L5 15 L15 15 Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    name: "Weby pro Restaurace",
    desc: "Atraktivní webové stránky s online rezervačním systémem, elektronickým menu a možností objednávek přímo z webu.",
    tags: ["Online rezervace", "Digitální menu", "Objednávkový systém"],
  },
  {
    num: "04",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 15 L25 15 M15 20 L25 20 M15 25 L22 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Firemní Prezentace",
    desc: "Reprezentativní webové prezentace, které budují důvěru a profesionalitu. Perfektní první dojem pro vaše klienty.",
    tags: ["Corporate design", "SEO optimalizace", "Brand identity"],
  },
  {
    num: "05",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M27 25 L33 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 18 H25 M20 13 V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Správa Výkonu a SEO",
    desc: "Zabezpečím, aby vás lidé na internetu skutečně našli. Zaměřuji se na technické SEO, rychlost načítání a dlouhodobý růst organické návštěvnosti.",
    tags: ["SEO Audit", "Performance", "Google Analytics"],
  },
  {
    num: "06",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 14 H34 M20 28 V34 M14 34 H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "UX/UI Redesign a Audity",
    desc: "Máte web, který neprodává? Provedu audit použitelnosti a navrhnu moderní redesign, který zlepší uživatelský zážitek a zvýší vaše konverze.",
    tags: ["UX Výzkum", "Redesign", "Konverzní poměr"],
  },
];

type Service = (typeof services)[number];

function ServiceCard({ s }: { s: Service }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="service-card-stacked reveal"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="service-card-stacked-head">
        <div className="service-num">{s.num}</div>
        <div className="service-icon-wrap">{s.icon}</div>
      </div>
      <h3 className="service-name">
        {hover ? (
          <ScrambleText text={s.name} trigger="mount" duration={12} speed={2} />
        ) : (
          s.name
        )}
      </h3>
      <p className="service-desc">{s.desc}</p>
      <div className="service-tags">
        {s.tags.map((tag) => (
          <span className="service-tag" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container-wide">
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

          {/* Scrolling right column */}
          <div className="services-scroll-col">
            {services.map((s) => (
              <ServiceCard key={s.num} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
