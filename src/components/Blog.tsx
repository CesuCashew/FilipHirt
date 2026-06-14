const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const featured = {
  kicker: "Esej",
  date: "Říjen 2025",
  read: "8 min čtení",
  title: "Proč dobrý web začíná u atmosféry, ne u funkcí",
  excerpt:
    "Než vůbec otevřu editor, ptám se: jaký pocit má návštěvník mít? Barva světla, tempo scrollu, váha písma — atmosféra rozhodne dřív, než si někdo přečte jediné slovo. Funkce přijdou potom a o to líp sednou.",
  image: 1600453364898 + "-255c24a205d2",
  imageAlt: "Pracovní stůl ve večerním teplém světle lampy",
};

const posts = [
  {
    num: "01",
    cat: "Vývoj",
    read: "6 min",
    title: "Rychlost je zdvořilost",
    excerpt:
      "Každá vteřina načítání je malý test trpělivosti. Jak držím weby svižné — bez kompromisů v designu.",
    image: 1560890264 + "-4b92305ee66e",
    imageAlt: "Notebook na dřevěném stole v útulné chatě",
  },
  {
    num: "02",
    cat: "AI",
    read: "5 min",
    title: "AI, která nepřekáží",
    excerpt:
      "Asistent má pomáhat, ne otravovat. Kdy se chatbot na webu vyplatí — a kdy je jen drahá ozdoba.",
    image: 1604264849633 + "-67b1ea2ce0a4",
    imageAlt: "Pracovní stůl s monitorem, knihami a rostlinou",
  },
  {
    num: "03",
    cat: "UX",
    read: "7 min",
    title: "Redesign bez bourání",
    excerpt:
      "Ne každý web potřebuje začít od nuly. Jak poznat, co zachovat a co v klidu pustit k vodě.",
    image: 1552320640 + "-6e01a5f1c1e9",
    imageAlt: "Monitor zobrazující podzimní les nad pracovním stolem",
  },
];

export default function Blog() {
  return (
    <section id="journal" className="blog-section">
      <div className="container">
        <div className="blog-head-row reveal">
          <div className="section-header">
            <span className="section-number">05</span>
            <div className="section-label">Žurnál</div>
            <h2 className="section-title">Z mého <span className="it">zápisníku</span></h2>
          </div>
          <a href="#contact" className="blog-head-link">
            Napište mi téma <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Featured essay */}
        <article className="blog-feature reveal">
          <div className="blog-feature-media clip-reveal">
            <img src={img(featured.image, 1200)} alt={featured.imageAlt} loading="lazy" />
          </div>
          <div className="blog-feature-body">
            <div className="blog-kicker">
              <span>{featured.kicker}</span>
              <span className="dot" />
              <span className="muted">{featured.date}</span>
              <span className="dot" />
              <span className="muted">{featured.read}</span>
            </div>
            <h3 className="blog-feature-title">{featured.title}</h3>
            <p className="blog-feature-excerpt">{featured.excerpt}</p>
            <span className="blog-read">
              Číst esej <span className="arrow" aria-hidden="true">→</span>
            </span>
          </div>
        </article>

        {/* Article grid */}
        <div className="blog-grid">
          {posts.map((p) => (
            <article className="blog-card reveal" key={p.num}>
              <div className="blog-card-media">
                <span className="blog-card-num">{p.num}</span>
                <img src={img(p.image, 760)} alt={p.imageAlt} loading="lazy" />
              </div>
              <h3 className="blog-card-title">{p.title}</h3>
              <p className="blog-card-excerpt">{p.excerpt}</p>
              <div className="blog-card-foot">
                <span>{p.cat} · {p.read}</span>
                <span className="read">Číst →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
