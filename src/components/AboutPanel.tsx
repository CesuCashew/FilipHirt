import { Link } from "wouter";

export default function AboutPanel() {
  return (
    <section className="panel panel--about panel--wide" id="about" data-nav-theme="light">
      <div className="panel-bg" data-parallax="0.1" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/hero-art.webp')" }} />
      </div>

      <div className="panel-inner about-inner">
        <div className="about-head">
          <span className="panel-folio">O mně</span>
          <h2 className="poster-title about-word">ABOUT<br />ME</h2>
        </div>

        <div className="about-body">
          <div className="about-media">
            <video src="/about-me-animation.webm" autoPlay loop muted playsInline className="about-video" />
          </div>

          <div className="about-text">
            <p className="about-lead">
              Tvořím weby, které nevypadají jako šablona. Protože žádnou nepoužívám.
            </p>
            <p>
              Jmenuju se Filip Hirt a mám za sebou přes třicet webů pro
              reálné klienty — od firemních prezentací a e-shopů po rezervační
              systémy a weby s umělou inteligencí. Sídlím v Chebu, ale tvořím
              webové stránky pro firmy z celé České republiky.
            </p>
            <p>
              Každý web stavím na míru: moderní technologie, rychlé načítání,
              SEO od prvního řádku kódu a design, který nejen dobře vypadá, ale
              hlavně přivádí zákazníky. Cíl je vždycky stejný — aby web pracoval
              za vás, ne vy za něj.
            </p>
            <p className="about-more">
              A kdo je ten, kdo to celé staví?{" "}
              <Link href="/mimo-monitor" className="about-more-link">
                Poznejte mě mimo monitor →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
