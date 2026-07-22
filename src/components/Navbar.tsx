import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const navItems = [
  { label: "Domů", href: "#home" },
  { label: "O mně", href: "#about" },
  { label: "Služby", href: "#services" },
  { label: "Práce", href: "#portfolio" },
  { label: "Žurnál", href: "#journal" },
  { label: "Cena", href: "/cena" },
  { label: "Mimo monitor", href: "/mimo-monitor" },
];

const isRoute = (href: string) => !href.startsWith("#");

// how far below the fixed nav to sample the section underneath it
const PROBE_Y = 90;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // nav stays transparent everywhere; only its text/logo color adapts to
  // whatever section is currently sitting behind it (light bg -> ink, dark
  // bg -> cream), read straight off the rendered layout so it also tracks
  // the horizontal-gallery's transform-driven "scroll".
  useEffect(() => {
    const detectTheme = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, PROBE_Y);
      const themed = el?.closest("[data-nav-theme]");
      setOnLight(themed?.getAttribute("data-nav-theme") === "light");
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      detectTheme();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", detectTheme);
    onScroll();
    // re-check once layout settles (fonts/images/hgallery measure)
    const t = window.setTimeout(detectTheme, 800);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", detectTheme);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`nav${scrolled ? " scrolled" : ""}${onLight ? " nav--light" : ""}`}
        aria-label="Hlavní navigace"
      >
        <a href="#home" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <span className="nav-brand-mark">Filip Hirt</span>
          <span className="nav-brand-tag">Webdesign &amp; vývoj</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) =>
            isRoute(item.href) ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="glitch-link"
                  data-text={item.label}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="glitch-real">{item.label}</span>
                </Link>
              </li>
            ) : (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="glitch-link"
                  data-text={item.label}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="glitch-real">{item.label}</span>
                </a>
              </li>
            )
          )}
        </ul>

        <a href="#contact" className="nav-cta">Spolupráce</a>

        <button
          ref={burgerRef}
          className="nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-label="Mobilní navigace"
        aria-hidden={!menuOpen}
      >
        {[...navItems, { label: "Kontakt", href: "#contact" }].map((item, i) =>
          isRoute(item.href) ? (
            <Link
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          )
        )}
      </nav>
    </>
  );
}
