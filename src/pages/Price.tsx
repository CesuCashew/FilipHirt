import { Link } from "wouter";
import HorizontalGallery from "../components/HorizontalGallery";
import Footer from "../components/Footer";
import { articles } from "../data/articles";
import { useSeo } from "../lib/seo";

const SITE_URL = "https://filiphirt.cz";

const FACTORS = [
  {
    title: "Rozsah",
    text: "Jednostránková prezentace je jiný úkol než e-shop se stovkami produktů nebo rezervační systém napojený na kalendář.",
  },
  {
    title: "Funkce navíc",
    text: "AI asistent, vícejazyčnost, platební brána, admin rozhraní — každá funkce je čas navíc, ne příplatek za nálepku.",
  },
  {
    title: "Obsah a design",
    text: "Stavím na míru, ne z šablony. Čím víc originality a ladění do detailu, tím víc hodin to zabere.",
  },
  {
    title: "Termín",
    text: "Realistický termín vyjde levněji než noční směny navíc, aby to stihlo zítra.",
  },
];

const PRICE_ARTICLES = articles.filter((a) => a.tags?.includes("cena"));

export default function Price() {
  useSeo({
    title: "Cena je rozhovor — Filip Hirt",
    description:
      "Na webu nenajdete ceník. Každý projekt je jinak velký úkol — napište mi a domluvíme se na rozsahu i ceně napřímo.",
    canonical: `${SITE_URL}/cena`,
    ogType: "website",
    ogDescription:
      "Na webu nenajdete ceník. Každý projekt je jinak velký úkol — napište mi a domluvíme se na rozsahu i ceně napřímo.",
    ogUrl: `${SITE_URL}/cena`,
    ogImage: `${SITE_URL}/opengraph.jpg`,
    twitterDescription:
      "Na webu nenajdete ceník. Každý projekt je jinak velký úkol — napište mi a domluvíme se na rozsahu i ceně napřímo.",
    twitterImage: `${SITE_URL}/opengraph.jpg`,
  });

  return (
    <div className="price-page">
      <header className="article-top">
        <Link href="/" className="article-back">← Domů</Link>
        <Link href="/" className="article-brand">Filip Hirt</Link>
        <nav className="article-top-links" aria-label="Rychlé odkazy">
          <Link href="/#journal">Žurnál</Link>
          <Link href="/#contact">Kontakt</Link>
        </nav>
      </header>

      <HorizontalGallery>
        <section className="panel panel--wide panel--price-intro" id="cena-rozhovor">
          <div className="panel-inner price-intro-inner">
            <div className="price-head">
              <span className="panel-folio">Cena</span>
              <h1 className="poster-title price-word">
                CENA JE
                <br />
                ROZHOVOR
              </h1>
            </div>

            <div className="price-intro-body">
              <p className="price-lead">
                Nenajdete tu ceník. Ne protože bych se čísel bál, ale protože
                každý web je jinak velký úkol — a cena napsaná předem by byla
                skoro vždycky lež.
              </p>
              <p>
                Weby, co dělám, nejsou položky v e-shopu. Napsat k nim jedno
                číslo na web by znamenalo buď podhodnotit menší projekty, nebo
                nadhodnotit ty jednoduché — a ani jedno není fér vůči vám.
              </p>
              <p>
                Takže místo ceníku dostanete něco lepšího: rozhovor. Napíšete
                mi, co potřebujete, a obvykle do druhého dne víte, na čem
                jste — bez tlaku, bez závazku a bez agenturní přirážky.
              </p>
            </div>
          </div>
        </section>

        <section className="panel panel--wide panel--price-factors" id="cena-faktory">
          <div className="panel-inner price-factors-inner">
            <div className="price-head">
              <span className="panel-folio">Co hraje roli</span>
              <h2 className="poster-title price-word price-word--sm">
                CO OVLIVŇUJE CENU
              </h2>
            </div>

            <div className="price-factor-grid">
              {FACTORS.map((f, i) => (
                <div className="price-factor" key={f.title}>
                  <span className="price-factor-no">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="price-factor-title">{f.title}</h3>
                  <p className="price-factor-text">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel panel--price-cta" id="cena-cta">
          <div className="panel-inner price-cta-inner">
            <div className="price-head">
              <span className="panel-folio">První krok</span>
              <h2 className="poster-title price-word price-word--sm">NAPIŠTE MI</h2>
            </div>

            <p className="price-cta-lead">
              Stačí pár vět o tom, co potřebujete. Obvykle odpovím do druhého
              dne s orientační představou o rozsahu, ceně i termínu —{" "}
              <Link href="/#spoluprace">jak vypadá spolupráce dál</Link>, si
              můžete přečíst na hlavní stránce.
            </p>

            <Link href="/#contact" className="btn-primary price-cta-btn">
              Napsat zprávu →
            </Link>

            {PRICE_ARTICLES.length > 0 && (
              <div className="price-reads">
                <p className="price-reads-label">Chcete vědět víc? Pár článků k tématu:</p>
                <ul className="price-reads-list">
                  {PRICE_ARTICLES.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/zurnal/${a.slug}`}>{a.title} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </HorizontalGallery>

      <Footer />
    </div>
  );
}
