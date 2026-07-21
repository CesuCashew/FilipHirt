import { Link } from "wouter";
import { articles, img } from "../data/articles";

export default function JournalPanel() {
  return (
    <section className="panel panel--journal panel--wide" id="journal" data-nav-theme="light">
      <div className="panel-bg" data-parallax="0.12" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/hero-art.webp')" }} />
      </div>

      <div className="panel-inner journal-inner">
        <header className="journal-head">
          <span className="panel-folio">Žurnál</span>
          <h2 className="poster-title">Z MÉHO<br />ZÁPISNÍKU</h2>
          <p className="journal-sub">Pár poznámek o řemesle, rychlosti a klidu.</p>
        </header>

        <div className="journal-row">
          {articles.map((p) => (
            <Link href={`/zurnal/${p.slug}`} className="jcard" key={p.slug}>
              <div className="jcard-media">
                <img
                  src={img(p.image)}
                  alt={p.alt}
                  loading="lazy"
                  style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                />
              </div>
              <span className="jcard-cat">{p.cat}</span>
              <h3 className="jcard-title">{p.title}</h3>
              <p className="jcard-excerpt">{p.excerpt}</p>
              <span className="jcard-read">Číst →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
