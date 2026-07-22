import { Link } from "wouter";
import { useSeo } from "../lib/seo";
import Footer from "../components/Footer";

const SITE_URL = "https://filiphirt.cz";

export default function Privacy() {
  useSeo({
    title: "Zásady ochrany osobních údajů — Filip Hirt",
    description:
      "Jaké údaje z kontaktního formuláře sbírám, proč, jak dlouho je uchovávám a jaká máte práva.",
    canonical: `${SITE_URL}/soukromi`,
    robots: "noindex, follow",
  });

  return (
    <div className="article-page">
      <header className="article-top">
        <Link href="/" className="article-back">← Domů</Link>
        <Link href="/" className="article-brand">Filip Hirt</Link>
      </header>

      <main className="article-main">
        <article>
          <header className="article-head">
            <p className="article-meta">
              <span className="article-meta-cat">Právní</span>
              <span aria-hidden="true">·</span>
              <span>Aktualizováno červenec 2026</span>
            </p>
            <h1 className="article-title">Ochrana osobních údajů</h1>
            <p className="article-lead">
              Stručně a bez právničiny: co se stane s vašimi údaji, když mi
              napíšete přes kontaktní formulář.
            </p>
          </header>

          <div className="article-body">
            <h2 className="article-h2">Kdo je správcem údajů</h2>
            <p className="article-p">
              Filip Hirt, webdesignér a vývojář se sídlem v Chebu. Nejsem
              zapsán jako OSVČ — údaje zpracovávám jako fyzická osoba
              provozující tento web. Kontakt:{" "}
              <a href="mailto:info@filiphirt.cz">info@filiphirt.cz</a>.
            </p>

            <h2 className="article-h2">Jaké údaje sbírám a proč</h2>
            <p className="article-p">
              Přes kontaktní formulář si od vás vyžádám jméno, e-mail,
              nepovinně telefon, typ webu, o který máte zájem, a vaši zprávu.
              Jediný účel je odpovědět vám na poptávku a domluvit se na
              spolupráci — nic z toho nepoužívám k ničemu jinému a
              neprodávám to dál.
            </p>
            <p className="article-p">
              Odesláním formuláře se údaje uloží do databáze a zároveň mi
              přijdou e-mailem jako upozornění na novou poptávku.
            </p>

            <h2 className="article-h2">Jak dlouho údaje uchovávám</h2>
            <p className="article-p">
              Po dobu, kterou potřebuju k vyřízení poptávky a případné
              spolupráci, nejdéle však 24 měsíců od posledního kontaktu.
              Pokud si přejete údaje smazat dřív, stačí napsat na e-mail výše.
            </p>

            <h2 className="article-h2">Komu údaje předávám</h2>
            <p className="article-p">
              Údaje z formuláře fyzicky leží v databázi Neon (Postgres) a
              upozornění na poptávku posílám přes Gmail/Google. Oba jsou
              zpracovatelé, kteří údaje ukládají nebo přenášejí jménem mě,
              nikoho dalšího, a nepoužívám je k reklamě ani analytice.
            </p>

            <h2 className="article-h2">Cookies a analytika</h2>
            <p className="article-p">
              Tenhle web aktuálně nepoužívá žádné sledovací cookies, reklamní
              pixely ani analytické nástroje. Pokud se to v budoucnu změní,
              tuto stránku aktualizuju a doplním informaci o konkrétním
              nástroji.
            </p>

            <h2 className="article-h2">Vaše práva</h2>
            <p className="article-p">
              Podle GDPR máte právo na přístup ke svým údajům, jejich opravu
              nebo výmaz, omezení zpracování, přenositelnost a právo vznést
              námitku. Stačí napsat na{" "}
              <a href="mailto:info@filiphirt.cz">info@filiphirt.cz</a> — ozvu se
              obvykle do pár dní. Pokud máte pocit, že se zpracováním údajů
              není něco v pořádku, máte právo podat stížnost u{" "}
              <a
                href="https://www.uoou.cz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Úřadu pro ochranu osobních údajů
              </a>
              .
            </p>

            <p className="article-sign">— Filip</p>
          </div>
        </article>

        <footer className="article-end">
          <div className="article-end-row">
            <Link href="/#contact" className="article-home">
              ← Zpět na kontakt
            </Link>
          </div>
        </footer>
      </main>
      <Footer />
    </div>
  );
}
