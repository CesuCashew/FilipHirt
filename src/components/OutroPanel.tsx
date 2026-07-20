const socials = [
  { label: "GitHub", url: "https://github.com/cesucashew" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/filip-hirt-876671365/" },
  { label: "Discord", url: "https://discord.com/users/396724038535479297" },
];

export default function OutroPanel() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="panel panel--outro" id="social">
      <div className="panel-bg" data-parallax="0.08" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/hero-art.webp')" }} />
      </div>

      <div className="panel-inner outro-inner">
        <h2 className="outro-word">DÍKY ZA<br />NÁVŠTĚVU</h2>
        <p className="outro-line">Pojďme spolu něco postavit.</p>
        <p className="outro-sub">Tvořím weby na zakázku v Chebu a po celé ČR.</p>

        <div className="outro-links">
          {socials.map((s) => (
            <a className="outro-social" key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a className="outro-social outro-mail" href="mailto:f.hirt@seznam.cz">
            f.hirt@seznam.cz
          </a>
        </div>

        <button className="outro-top" onClick={toTop}>
          <span aria-hidden="true">↑</span> Zpátky na začátek
        </button>

        <span className="outro-sign" aria-hidden="true">FILIP HIRT</span>
      </div>
    </section>
  );
}
