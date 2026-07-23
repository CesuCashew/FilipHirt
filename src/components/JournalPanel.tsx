import { Link } from "wouter";
import { articles } from "../data/articles";

export default function JournalPanel() {
  return (
    <section className="panel panel--journal" id="journal" data-nav-theme="light">
      <div className="panel-bg" data-parallax="0.12" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/journal-bg.webp')" }} />
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
              <div className="jcard-meta">
                <span className="jcard-cat">{p.cat}</span>
                <span className="jcard-date">{p.date}</span>
              </div>
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
