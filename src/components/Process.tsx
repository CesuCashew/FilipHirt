const steps = [
  {
    num: "01",
    badge: "Kreativní vize",
    badgeVariant: "lime",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "Definice & Strategie",
    desc: "Lidský pohled na váš byznys. Pochopení cílů, které AI (zatím) nevidí.",
    list: ["Analýza trhu & konkurence", "Hledání unikátního úhlu pohledu", "Kreativní koncept webu"],
  },
  {
    num: "02",
    badge: "AI Akcelerace",
    badgeVariant: "ai",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Vývoj & Optimalizace",
    desc: "Využívám AI ke generování čistého kódu, testování a urychlení rutinních úkolů.",
    list: ["10x rychlejší prototypování", "Automatizované testování výkonu", "Pokročilá optimalizace pro vyhledávače"],
  },
  {
    num: "03",
    badge: "Prémiová kvalita",
    badgeVariant: "lime",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Doručení & Růst",
    desc: "Finální lidský dohled zaručuje, že web je perfektní, emotivní a funkční.",
    list: ["Ladění detailů a emocí", "Nasazení na rychlé servery", "Průběžná podpora & konverzní růst"],
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-number">04</span>
          <div className="section-label">Jak Pracuji</div>
          <h2 className="section-title">AI-Powered Workflow</h2>
          <p className="section-subtitle">
            Spojení lidské kreativity a rychlosti umělé inteligence pro maximální výsledky
          </p>
        </div>

        {/* Stacked sticky cards */}
        <div className="process-stack">
          {steps.map((s, i) => (
            <div
              className="process-stack-card"
              key={s.num}
              style={{
                top: `calc(120px + ${i * 28}px)`,
                zIndex: i + 1,
              }}
            >
              <div className="process-stack-card-inner">
                <div className="process-stack-card-left">
                  <div className="process-card-num">Step / {s.num}</div>
                  <div className={`process-card-badge${s.badgeVariant === "ai" ? " ai" : ""}`}>
                    {s.badge}
                  </div>
                  <div className="process-card-icon">{s.icon}</div>
                  <h3 className="process-card-title">{s.title}</h3>
                  <p className="process-card-desc">{s.desc}</p>
                </div>
                <div className="process-stack-card-right">
                  <div className="process-stack-bignum">{s.num}</div>
                  <ul className="process-list">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
