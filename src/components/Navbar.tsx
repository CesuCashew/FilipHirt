import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Domů", href: "#home" },
  { label: "O mně", href: "#about" },
  { label: "Služby", href: "#services" },
  { label: "Práce", href: "#portfolio" },
  { label: "Žurnál", href: "#journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Hlavní navigace">
        <a href="#home" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <span className="nav-brand-name">
            Filip Hirt<span className="nav-brand-dot">.</span>
          </span>
          <span className="nav-brand-tag">Webdesign &amp; vývoj</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
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
          ))}
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
        {[...navItems, { label: "Kontakt", href: "#contact" }].map((item, i) => (
          <a
            key={item.href}
            ref={i === 0 ? firstLinkRef : undefined}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
