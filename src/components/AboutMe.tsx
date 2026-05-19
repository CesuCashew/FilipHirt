export default function AboutMe() {
  return (
    <section id="about" className="about-section">
      <div className="container-wide">
        <div className="about-grid reveal">
          {/* Photo column */}
          <div className="about-photo-col">
            <div className="about-photo-wrap">
              {/*
                TODO: Nahraď placeholder svou fotkou:
                <img src="/your-photo.jpg" className="about-photo-img" alt="Filip Hirt" />
                Doporučení: casual portrét, vertikální orientace (3:4)
              */}
              <div className="about-photo-placeholder">
                <div className="about-photo-initials">FH</div>
                <span className="about-photo-label">Vaše fotka</span>
              </div>

              {/* Glass overlay card */}
              <div className="about-photo-overlay">
                <div className="about-overlay-item">
                  <span className="about-overlay-num">18</span>
                  <span className="about-overlay-label">let</span>
                </div>
                <div className="about-overlay-sep" />
                <div className="about-overlay-item">
                  <span className="about-overlay-num">Cheb</span>
                  <span className="about-overlay-label">Česká republika</span>
                </div>
                <div className="about-overlay-sep" />
                <div className="about-overlay-item">
                  <span className="about-overlay-num">30+</span>
                  <span className="about-overlay-label">projektů</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="about-text-col">
            <div className="section-label">O mně</div>
            <h2 className="about-heading">
              Digitální řemeslo<br />
              <span className="lime">s vášní pro detail</span>
            </h2>

            <div className="about-body">
              <p>
                Je mi 18 a webový design není jen moje práce — je to způsob,
                jakým přemýšlím. Zatímco ostatní teprve začínají, já mám za
                sebou přes 30 dokončených projektů pro reálné klienty.
              </p>
              <p>
                Pracuji z Chebu, ale spolupracuji s firmami po celé České
                republice. Každý web stavím od nuly — žádné šablony, žádné
                kompromisy. Kombinuji moderní technologie s designem, který
                nejen vypadá, ale hlavně prodává.
              </p>
              <p>
                Od restauračních systémů po e-shopy, od firemních prezentací
                po weby s umělou inteligencí — vždy s jediným cílem: aby váš
                web pracoval za vás.
              </p>
            </div>

            <div className="about-tags">
              {["React", "Next.js", "AI Integrace", "SEO", "UX/UI", "E-Commerce"].map((tag) => (
                <span className="about-tag" key={tag}>{tag}</span>
              ))}
            </div>

            <a href="#contact" className="btn-primary about-cta">
              Pojďme spolupracovat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
