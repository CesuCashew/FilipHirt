import { Link, useLocation } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();
  const [pathname] = useLocation();
  const isHome = pathname === "/";

  const hashLink = (label: string, hash: string) =>
    isHome ? (
      <a href={hash}>{label}</a>
    ) : (
      <Link href={`/${hash}`}>{label}</Link>
    );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            {isHome ? (
              <a href="#home" style={{ display: "inline-block", textDecoration: "none" }}>
                <span className="footer-brand-name">Filip Hirt</span>
              </a>
            ) : (
              <Link href="/" style={{ display: "inline-block", textDecoration: "none" }}>
                <span className="footer-brand-name">Filip Hirt</span>
              </Link>
            )}
            <p className="footer-tagline">
              Webdesignér a vývojář z Chebu. Stavím weby jako řemeslo — s teplem,
              precizností a citem pro detail.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Navigace</div>
            <ul className="footer-links-list">
              <li>{hashLink("Domů", "#home")}</li>
              <li>{hashLink("O mně", "#about")}</li>
              <li>{hashLink("Služby", "#services")}</li>
              <li>{hashLink("Práce", "#portfolio")}</li>
              <li>{hashLink("Žurnál", "#journal")}</li>
              <li><Link href="/cena">Cena</Link></li>
              <li>{hashLink("Kontakt", "#contact")}</li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Služby</div>
            <ul className="footer-links-list">
              {[
                "Chytré weby s AI",
                "Online obchody",
                "Weby pro restaurace",
                "Firemní prezentace",
              ].map((s) => (
                <li key={s}>{hashLink(s, "#services")}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Sociální sítě</div>
            <div className="footer-socials">
              <a
                href="https://github.com/cesucashew"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/filip-hirt-876671365/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://discord.com/users/396724038535479297"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Discord"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Giant name signature */}
        <div className="footer-giant" aria-hidden="true">
          <span className="giant-name">Filip Hirt</span>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {year} Filip Hirt. Všechna práva vyhrazena.</span>
          <span className="footer-copy">Webdesignér &amp; vývojář — Cheb, Česká republika</span>
          <Link href="/soukromi" className="footer-copy footer-legal">Ochrana osobních údajů</Link>
        </div>
      </div>
    </footer>
  );
}
