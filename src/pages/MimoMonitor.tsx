import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import { useSeo } from "../lib/seo";

const SITE_URL = "https://filiphirt.cz";

// Noc začíná ve 21:47 a končí svítáním ve 4:58 — scroll přetáčí čas mezi nimi.
const NIGHT_START = 21 * 60 + 47;
const NIGHT_END = 4 * 60 + 58;
const NIGHT_SPAN = 24 * 60 - NIGHT_START + NIGHT_END;

type Stop = {
  src: string;
  time: string;
  alt: string;
  caption: string;
  /** portrét (v) nebo ležatý abstrakt (h) — řídí poměr rámečku */
  frame: "v" | "h";
};

const STOPS: Stop[] = [
  {
    src: "/noc-1.webp",
    time: "22:31",
    alt: "Filip pod sodíkovou lampou před zavřeným Bufetem 11 v Chebu",
    caption: "Velké věci začínají, když se nikdo nedívá.",
    frame: "v",
  },
  {
    src: "/noc-2.webp",
    time: "23:15",
    alt: "Filip v brýlích pod lampou, přes záběr jde oranžová záře",
    caption: "Nečekám na příležitost. Stavím si ji.",
    frame: "v",
  },
  {
    src: "/noc-3.webp",
    time: "00:42",
    alt: "Filip stojí pod lampou, kolem světelné stopy projíždějících aut",
    caption: "Sen bez práce je jen přání.",
    frame: "v",
  },
  {
    src: "/noc-4.webp",
    time: "02:07",
    alt: "Filip sedí uprostřed prázdné noční silnice pod pouliční lampou",
    caption: "Vlastní cesta se nevyšlapává po chodníku.",
    frame: "v",
  },
  {
    src: "/noc-5.webp",
    time: "03:38",
    alt: "Rozmazaný noční záběr s kapucí a pruhem světla přes celý snímek",
    caption: "Dokonalost je směr, ne cíl.",
    frame: "h",
  },
];

// Proslovy mezi zastávkami — <em> věty svítí sodíkovou oranžovou.
const SPEECHES: (ReactNode | null)[] = [
  <>
    Je mi osmnáct. Někdo v tom vidí nevýhodu. Já v tom vidím <em>palivo</em>.
    Mám hlad, mám čas a mám <em>sen, který mě budí dřív než budík</em>.
    Vyrostl jsem na internetu — web pro mě není práce, je to mateřský jazyk.
  </>,
  <>
    Proč si vybrat mladého vývojáře? Protože nemám dvacet let starých návyků,
    které bych musel odnaučovat. Učím se technologie, které vyjdou zítra, ne
    ty, co frčely před deseti lety. A protože si nemůžu dovolit odevzdat
    průměr — <em>každý web nese moje jméno</em>.
  </>,
  <>
    Nikdo mě to nenaučil. Našel jsem si to sám — po nocích, pokus omyl,
    <em> řádek po řádku</em>, dokud se z kódu nestal jazyk, kterým myslím.
    Dnes mám za sebou přes třicet webů pro reálné klienty a pořád ten pocit,
    že <em>teprve začínám</em>. To není slabost. To je ten nejlepší důvod
    svěřit mi svůj web.
  </>,
  <>
    Nejlepší nápady chodí po setmění. Cheb v noci vypadá jinak — žádný spěch,
    jen lampy, dlažba a hlava plná plánů. <em>Tohle město mě naučilo dívat
    se.</em>
  </>,
  null,
];

export default function MimoMonitor() {
  useSeo({
    title: "Mimo monitor | Filip Hirt",
    description:
      "Pět fotek, manifest osmnáctiletého vývojáře a důvody, proč weby stavím tak, jak je stavím. Osobní stránka Filipa Hirta — mimo monitor.",
    canonical: `${SITE_URL}/mimo-monitor`,
    ogType: "website",
    ogTitle: "Mimo monitor | Filip Hirt",
    ogDescription:
      "Ve dne stavím weby. Tohle je zbytek — pět fotek a manifest osmnáctiletého vývojáře.",
    ogUrl: `${SITE_URL}/mimo-monitor`,
    ogImage: `${SITE_URL}/noc-4.webp`,
    twitterTitle: "Mimo monitor | Filip Hirt",
    twitterDescription:
      "Ve dne stavím weby. Tohle je zbytek — pět fotek a manifest osmnáctiletého vývojáře.",
    twitterImage: `${SITE_URL}/noc-4.webp`,
  });

  const clockRef = useRef<HTMLSpanElement>(null);
  const clockBoxRef = useRef<HTMLDivElement>(null);

  // Noční hodiny — scroll přetáčí čas od 21:47 do 4:58; se svítáním lampa
  // (i hodiny) zhasne
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      const minutes = (NIGHT_START + Math.round(p * NIGHT_SPAN)) % (24 * 60);
      const el = clockRef.current;
      if (el) {
        const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
        const mm = String(minutes % 60).padStart(2, "0");
        el.textContent = `${hh}:${mm}`;
      }
      const box = clockBoxRef.current;
      if (box) box.style.opacity = String(Math.max(0, Math.min(1, (0.96 - p) / 0.08)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // scroll-reveal + „vyvolávání" polaroidů — stejný vzor jako Home:
  // základní stav je plně viditelný, JS teprve přidá skrytý stav a odhaluje
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<Element>(".noc-page .reveal, .noc-page .noc-develop")
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("will-reveal");
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    requestAnimationFrame(() => {
      els.forEach((el) => {
        if (!el.classList.contains("revealed")) el.classList.add("will-reveal");
      });
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="noc-page">
      <header className="article-top noc-top">
        <Link href="/" className="article-back">← Domů</Link>
        <Link href="/" className="article-brand">Filip Hirt</Link>
        <nav className="article-top-links" aria-label="Rychlé odkazy">
          <Link href="/#journal">Žurnál</Link>
          <Link href="/#contact">Kontakt</Link>
        </nav>
      </header>

      {/* noční hodiny — čistě dekorační, čas „utíká" se scrollem */}
      <div className="noc-clock" aria-hidden="true" ref={clockBoxRef}>
        <span className="noc-clock-time" ref={clockRef}>21:47</span>
        <span className="noc-clock-place">Cheb</span>
      </div>

      <main className="noc-main">
        <section className="noc-intro">
          <h1 className="noc-title">
            MIMO<br />
            <span className="noc-flicker">MONITOR</span>
          </h1>
          <p className="noc-lead">
            Ve dne stavím weby. Tohle je zbytek — pět fotek z jedné noci
            a pár věcí, které jinam na web nepatří.
          </p>
          <p className="noc-hint" aria-hidden="true">scrolluj, noc teprve začíná ↓</p>
        </section>

        {STOPS.map((stop, i) => (
          <Fragment key={stop.time}>
            <section className={`noc-stop${i % 2 ? " noc-stop--flip" : ""}${stop.src === "/noc-4.webp" ? " noc-stop--hero" : ""}`}>
              <span className="noc-ghost-time" aria-hidden="true">{stop.time}</span>
              <figure className={`noc-polaroid noc-polaroid--${stop.frame} noc-develop`}>
                <img
                  src={stop.src}
                  alt={stop.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <figcaption>
                  <span className="noc-caption-time">{stop.time}</span>
                  {stop.caption}
                </figcaption>
              </figure>
            </section>

            {SPEECHES[i] && (
              <section className="noc-speech reveal">
                <p>{SPEECHES[i]}</p>
              </section>
            )}
          </Fragment>
        ))}

        <section className="noc-motto reveal">
          <p className="noc-motto-line">Mladý,</p>
          <p className="noc-motto-line">dravý,</p>
          <p className="noc-motto-line noc-motto-line--hot">na pixel přesný.</p>
          <p className="noc-signature">Filip Hirt</p>
        </section>

        <section className="noc-dawn">
          <div className="noc-dawn-inner">
            <p className="noc-dawn-big reveal">Velké sny se rodí v malých městech.</p>
            <p className="noc-dawn-text reveal">
              Až se rozední, stavím weby. Napište mi — a probereme ten váš.
            </p>
            <Link href="/#contact" className="btn-primary noc-dawn-btn">
              Napsat zprávu →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
