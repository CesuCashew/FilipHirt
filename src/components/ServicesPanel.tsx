type Skill = { lbl: string; big: string; left: string; top: string; accent?: boolean; size?: string };

const skills: Skill[] = [
  { lbl: "UX / UI", big: "DESIGN", left: "14vw", top: "46%", accent: true },
  { lbl: "Vývoj na míru", big: "FRONT-END", left: "50vw", top: "16%" },
  { lbl: "Chytré weby", big: "AI WEBY", left: "92vw", top: "56%", accent: true },
  { lbl: "Online obchody", big: "E-SHOPY", left: "126vw", top: "20%" },
  { lbl: "Výkon & SEO", big: "PERFORMANCE", left: "156vw", top: "58%", size: "clamp(40px,6vw,108px)" },
  { lbl: "Redesign & audit", big: "REDESIGN", left: "198vw", top: "22%", accent: true },
];

export default function ServicesPanel() {
  return (
    <section className="panel panel--services panel--ultrawide" id="services">
      <div className="panel-bg" aria-hidden="true">
        <div className="panel-bg-img svc-bg-img" style={{ backgroundImage: "url('/services-bg.webp')" }} />
        <div className="svc-overlay" />
      </div>

      {/* thermo centerpiece — lags behind the type for depth (à la the tiger) */}
      <div className="svc-thermo" data-parallax="0.34" aria-hidden="true">
        <img src="/termos.webp" alt="" loading="lazy" decoding="async" />
      </div>

      <div className="panel-inner svc-inner">
        <div className="svc-header">
          <span className="panel-folio">Co nabízím</span>
          <p className="svc-sub">Šest způsobů, jak z webu udělat nástroj, který pracuje za vás.</p>
        </div>

        {skills.map((s) => (
          <div
            key={s.big + s.left}
            className={`svc-word${s.accent ? " accent" : ""}`}
            style={{ left: s.left, top: s.top }}
          >
            <span className="svc-word-lbl">{s.lbl}</span>
            <span className="svc-word-big" style={s.size ? { fontSize: s.size } : undefined}>{s.big}</span>
          </div>
        ))}

        <div className="svc-tab" aria-hidden="true">Služby — Services</div>
      </div>
    </section>
  );
}
