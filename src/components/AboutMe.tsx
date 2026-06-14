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
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="op-art-svg" stroke="currentColor">
                  <defs>
                    <radialGradient id="opglow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(210, 100, 30, 0.18)" />
                      <stop offset="60%" stopColor="rgba(210, 100, 30, 0.05)" />
                      <stop offset="100%" stopColor="rgba(210, 100, 30, 0)" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#opglow)" stroke="none" />

                  {/* Warped Horizontal Lines */}
                  <path d="M 0,50 Q 200,90 400,50" strokeOpacity="0.35" strokeWidth="1.5" />
                  <path d="M 0,120 Q 200,180 400,120" strokeOpacity="0.55" strokeWidth="2" />
                  <path d="M 0,200 Q 200,280 400,200" strokeOpacity="0.9" strokeWidth="3" />
                  <path d="M 0,300 Q 200,220 400,300" strokeOpacity="0.9" strokeWidth="3" />
                  <path d="M 0,380 Q 200,320 400,380" strokeOpacity="0.55" strokeWidth="2" />
                  <path d="M 0,450 Q 200,410 400,450" strokeOpacity="0.35" strokeWidth="1.5" />

                  {/* Warped Vertical Lines */}
                  <path d="M 50,0 Q 90,250 50,500" strokeOpacity="0.35" strokeWidth="1.5" />
                  <path d="M 120,0 Q 180,250 120,500" strokeOpacity="0.55" strokeWidth="2" />
                  <path d="M 200,0 Q 280,250 200,500" strokeOpacity="0.9" strokeWidth="3" />
                  <path d="M 280,0 Q 220,250 280,500" strokeOpacity="0.9" strokeWidth="3" />
                  <path d="M 350,0 Q 310,250 350,500" strokeOpacity="0.35" strokeWidth="1.5" />
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
              <span className="lime">se smyslem pro detail</span>
            </h2>

            <div className="about-body">
              <p>
                <span className="lead">Je mi 18 a weby nejsou jen moje práce — je to způsob,
                jak přemýšlím.</span> Zatímco ostatní teprve začínají, já mám za sebou
                přes třicet dokončených projektů pro reálné klienty.
              </p>
              <p>
                Sídlím v Chebu, ale pracuji s firmami po celé republice. Každý web
                stavím od nuly — žádné šablony, žádné kompromisy. Spojuji moderní
                technologie s designem, který nejen dobře vypadá, ale hlavně prodává.
              </p>
              <p>
                Od rezervačních systémů po e-shopy, od firemních prezentací po weby
                s umělou inteligencí — vždycky s jediným cílem: aby web pracoval
                za vás, ne vy za něj.
              </p>
            </div>

            <div className="about-tags">
              {["React", "Next.js", "AI Integrace", "SEO", "UX/UI", "E-Commerce"].map((tag) => (
                <span className="about-tag" key={tag}>{tag}</span>
              ))}
            </div>

            <a href="#contact" className="btn-primary about-cta">
              Pojďme do toho spolu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
