import { useState } from "react";
import Crystal3D from "./Crystal3D";

interface Service {
  num: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
  tags: string[];
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
    name: "Chytré weby s AI",
    desc: "Weby s asistenty, kteří odpovídají zákazníkům 24/7, automatizují rutinu a obsah přizpůsobí každému návštěvníkovi. Technologie, která zůstává v pozadí.",
    tags: ["AI chatboti", "Automatizace", "Personalizace"],
  },
  {
    num: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="30" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 22 L15 19 L18 22 L23 17 L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Online obchody",
    desc: "E-shopy, které opravdu prodávají. Přehledný design, jednoduchá správa produktů a každý krok nákupu vyladěný k co nejvyšší konverzi.",
    tags: ["E-commerce", "Platební brány", "Konverze"],
  },
  {
    num: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5 L25 15 L35 15 L27 22 L30 32 L20 26 L10 32 L13 22 L5 15 L15 15 Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    name: "Weby pro restaurace",
    desc: "Webové stránky, ze kterých máte hlad. Online rezervace, digitální menu a objednávky přímo z webu — vše na pár kliknutí.",
    tags: ["Rezervace", "Digitální menu", "Objednávky"],
  },
  {
    num: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 15 L25 15 M15 20 L25 20 M15 25 L22 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Firemní prezentace",
    desc: "Web, který buduje důvěru ještě dřív, než zvednete telefon. Reprezentativní, rychlý a postavený tak, aby udělal ten správný první dojem.",
    tags: ["Corporate design", "SEO", "Brand identita"],
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
    name: "Výkon & SEO",
    desc: "Postarám se, aby vás lidé na internetu skutečně našli. Technické SEO, rychlost načítání a dlouhodobý růst organické návštěvnosti.",
    tags: ["SEO audit", "Rychlost", "Analytika"],
  },
  {
    num: "06",
    icon: (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 14 H34 M20 28 V34 M14 34 H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: "Redesign & UX audit",
    desc: "Máte web, který neprodává? Projdu ho do detailu a navrhnu redesign, který zlepší zážitek a zvýší konverze — bez bourání toho, co funguje.",
    tags: ["UX výzkum", "Redesign", "Konverzní poměr"],
  },
];

const themeClasses = [
  "bg-theme-ai",
  "bg-theme-eshop",
  "bg-theme-bistro",
  "bg-theme-corp",
  "bg-theme-seo",
  "bg-theme-ux",
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const themeClass = hoveredIndex === null ? "bg-theme-idle" : themeClasses[hoveredIndex];

  return (
    <section id="services" className={`services-section ${themeClass}`}>
      <div className="container-wide">
        <div className="services-sticky-layout">
          {/* Sticky left column */}
          <div className="services-sticky-col">
            <div className="services-sticky-inner reveal">
              <span className="section-number" style={{ position: "static", opacity: 0.07 }}>01</span>
              <div className="section-label">Služby</div>
              <h2 className="section-title">Co pro vás <span className="it">postavím</span></h2>
              <p className="section-subtitle">
                Šest způsobů, jak z webu udělat nástroj, který pro vás pracuje — od prvního dojmu po poslední konverzi.
              </p>
              <div className="services-counter-pill">
                <span>{String(services.length).padStart(2, "0")}</span> služeb
              </div>

              {/* warm 3D amber stone filling the sticky space */}
              <Crystal3D className="services-ornament" />
            </div>
          </div>

          {/* Interactive editorial list */}
          <div className="services-list-interactive">
            {services.map((s, idx) => (
              <div
                key={s.num}
                className={`service-row-item ${hoveredIndex === idx ? "is-active" : ""}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="service-row-bg-glitch" />
                <div className="service-row-main">
                  <span className="service-row-num">{s.num}</span>
                  <div className="service-row-icon-wrap">{s.icon}</div>
                  <div className="service-row-title-wrap">
                    <h3 className="service-row-title">{s.name}</h3>
                    <p className="service-row-desc">{s.desc}</p>
                    <div className="service-row-tags">
                      {s.tags.map((tag) => (
                        <span key={tag} className="service-row-tag">{tag}</span>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
