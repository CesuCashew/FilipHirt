export default function AboutMe() {
  return (
    <section id="about" className="about-section">
      <div className="container-wide">
        <div className="about-grid reveal">
          {/* Video column with Op-Art warped grid */}
          <div className="about-photo-col">
            <div className="op-art-container">
              {/* Warped Op-Art Grid (SVG) */}
              <div className="op-art-grid-wrap">
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="op-art-svg">
                  <defs>
                    <radialGradient id="opglow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
                      <stop offset="60%" stopColor="rgba(255, 255, 255, 0.03)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#opglow)" />

                  {/* Warped Horizontal Lines */}
                  <path d="M 0,50 Q 200,90 400,50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
                  <path d="M 0,120 Q 200,180 400,120" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
                  <path d="M 0,200 Q 200,280 400,200" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="3" />
                  <path d="M 0,300 Q 200,220 400,300" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="3" />
                  <path d="M 0,380 Q 200,320 400,380" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
                  <path d="M 0,450 Q 200,410 400,450" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />

                  {/* Warped Vertical Lines */}
                  <path d="M 50,0 Q 90,250 50,500" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
                  <path d="M 120,0 Q 180,250 120,500" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" />
                  <path d="M 200,0 Q 280,250 200,500" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="3" />
                  <path d="M 280,0 Q 220,250 280,500" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="3" />
                  <path d="M 350,0 Q 310,250 350,500" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Video Card (Pure White Frame) */}
              <div className="op-art-video-card">
                <video
                  src="/about-me-animation.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="op-art-video-el"
                />
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
