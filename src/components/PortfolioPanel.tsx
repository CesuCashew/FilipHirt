const projects = [
  { n: "01", title: "Restaurace La Cucina", cat: "F&B / Rezervace", year: "2025", url: "https://lacucina.cz", color: "#C0431B" },
  { n: "02", title: "TechShop CZ", cat: "E-commerce", year: "2025", url: "https://techshop.cz", color: "#A9761B" },
  { n: "03", title: "BuildCorp s.r.o.", cat: "Firemní prezentace", year: "2024", url: "https://buildcorp.cz", color: "#2E6E68" },
  { n: "04", title: "Yoga Studio Lucie", cat: "Wellness", year: "2024", url: "https://yogalucie.cz", color: "#C97A63" },
];

export default function PortfolioPanel() {
  return (
    <section className="panel panel--portfolio panel--wide" id="portfolio">
      <div className="panel-bg" data-parallax="0.14" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/hero-art.jpg')" }} />
      </div>

      <div className="panel-inner portfolio-inner">
        <header className="portfolio-head">
          <span className="panel-folio">Práce</span>
          <h2 className="poster-title">VYBRANÉ<br />PRÁCE</h2>
          <p className="portfolio-sub">Pár věcí, co už stojí a běží naživo.</p>
        </header>

        <div className="cover-tiles">
          {projects.map((p) => (
            <a
              className="ptile"
              key={p.n}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ["--tile" as string]: p.color }}
            >
              <div className="ptile-top">
                <span className="ptile-year">{p.year}</span>
              </div>
              <div className="ptile-mid">
                <span className="ptile-cat">{p.cat}</span>
                <h3 className="ptile-title">{p.title}</h3>
              </div>
              <span className="ptile-go">Otevřít web <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
