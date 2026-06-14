const img = (id: string, w = 760) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const posts = [
  {
    n: "01",
    cat: "Esej · 8 min",
    title: "Proč dobrý web začíná u atmosféry, ne u funkcí",
    excerpt: "Než otevřu editor, ptám se: jaký pocit má návštěvník mít? Funkce přijdou potom.",
    image: "1600453364898-255c24a205d2",
    alt: "Pracovní stůl ve večerním teplém světle lampy",
  },
  {
    n: "02",
    cat: "Vývoj · 6 min",
    title: "Rychlost je zdvořilost",
    excerpt: "Každá vteřina načítání je test trpělivosti. Jak držím weby svižné bez kompromisů.",
    image: "1560890264-4b92305ee66e",
    alt: "Notebook na dřevěném stole v útulné chatě",
  },
  {
    n: "03",
    cat: "AI · 5 min",
    title: "AI, která nepřekáží",
    excerpt: "Asistent má pomáhat, ne otravovat. Kdy se chatbot vyplatí a kdy je jen ozdoba.",
    image: "1604264849633-67b1ea2ce0a4",
    alt: "Pracovní stůl s monitorem, knihami a rostlinou",
  },
];

export default function JournalPanel() {
  return (
    <section className="panel panel--journal panel--wide" id="journal">
      <div className="panel-bg" data-parallax="0.12" aria-hidden="true">
        <div className="panel-bg-img" style={{ backgroundImage: "url('/hero-art.jpg')" }} />
      </div>

      <div className="panel-inner journal-inner">
        <header className="journal-head">
          <span className="panel-folio">Žurnál</span>
          <h2 className="poster-title">Z MÉHO<br />ZÁPISNÍKU</h2>
          <p className="journal-sub">Pár poznámek o řemesle, rychlosti a klidu.</p>
        </header>

        <div className="journal-row">
          {posts.map((p) => (
            <article className="jcard" key={p.n}>
              <div className="jcard-media">
                <img src={img(p.image)} alt={p.alt} loading="lazy" />
              </div>
              <span className="jcard-cat">{p.cat}</span>
              <h3 className="jcard-title">{p.title}</h3>
              <p className="jcard-excerpt">{p.excerpt}</p>
              <span className="jcard-read">Číst →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
