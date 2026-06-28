const tags = ["React", "Next.js", "AI integrace", "SEO", "UX/UI", "E-commerce"];

export default function AboutPanel() {
  return (
    <section className="panel panel--about panel--wide" id="about">
      <div className="panel-bg" data-parallax="0.1" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/hero-art.jpg')" }} />
      </div>

      <div className="panel-inner about-inner">
        <div className="about-head">
          <span className="panel-folio">O mně</span>
          <h2 className="poster-title about-word">ABOUT<br />ME</h2>
        </div>

        <div className="about-body">
          <div className="about-media">
            <video src="/about-me-animation.webm" autoPlay loop muted playsInline className="about-video" />
            <span className="about-cap">Filip Hirt · Cheb</span>
          </div>

          <div className="about-text">
            <p className="about-lead">
              Je mi 18 a weby nejsou jen moje práce — je to způsob, jak přemýšlím.
            </p>
            <p>
              Mám za sebou přes třicet dokončených projektů pro reálné klienty. Sídlím
              v Chebu, ale pracuji s firmami po celé republice. Každý web stavím od nuly —
              žádné šablony, žádné kompromisy.
            </p>
            <p>
              Od rezervačních systémů po e-shopy, od firemních prezentací po weby s AI —
              vždycky s jediným cílem: aby web pracoval za vás, ne vy za něj.
            </p>
            <div className="about-tags">
              {tags.map((t) => (
                <span className="chip" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
