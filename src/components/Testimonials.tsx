const testimonials = [
  {
    name: "Jan Novák",
    handle: "@jan_novak_cucina",
    avatar: "https://i.pravatar.cc/150?img=33",
    text: "Vytvořil skvělý web pro naši restauraci. Rezervační systém funguje perfektně a objednávek máme víc než kdy předtím!",
  },
  {
    name: "Petra Svobodová",
    handle: "@techshop_cz",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "Náš e-shop vypadá profesionálně a prodeje vzrostly o 45%. Chatbot řeší velkou část dotazů automaticky.",
  },
  {
    name: "Martin Procházka",
    handle: "@buildcorp_sro",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "Komunikace byla skvělá, vše včas a přesně podle představ. Konečně máme web, na který jsme hrdí.",
  },
  {
    name: "Lucie Černá",
    handle: "@yoga_lucie",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Web předčil má očekávání. Čistý design a rychlost načítání jsou přesně to, co moji klienti oceňují.",
  },
  {
    name: "Tomáš Dvořák",
    handle: "@startup_tomas",
    avatar: "https://i.pravatar.cc/150?img=68",
    text: "Spolupráce na redesignu aplikace byla perfektní. Profesionální přístup a moderní technologie.",
  },
  {
    name: "Veronika Malá",
    handle: "@art_veronika",
    avatar: "https://i.pravatar.cc/150?img=9",
    text: "Galerie mých obrazů vypadá na novém webu úžasně. Děkuji za citlivý přístup k designu.",
  },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
        <div>
          <div className="testimonial-author">{t.name}</div>
          <div className="testimonial-handle">{t.handle}</div>
        </div>
      </div>
      <p className="testimonial-text">
        <span className="lime" style={{ color: "var(--col-lime)" }}>@Filip</span> {t.text}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-number">05</span>
          <div className="section-label">Reference</div>
          <h2 className="section-title">Co Říkají Klienti</h2>
          <p className="section-subtitle">Reference od spokojených zákazníků</p>
        </div>
      </div>
      <div className="testimonials-wrapper reveal" style={{ marginTop: "0" }}>
        <div className="testimonials-row">
          {row1.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
        <div className="testimonials-row reverse" style={{ marginTop: "24px" }}>
          {row2.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
