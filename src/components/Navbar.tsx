import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Domů", href: "#home" },
    { label: "Služby", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Jak Pracuji", href: "#process" },
    { label: "Kontakt", href: "#contact" },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <BrandLogo />

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">Spolupráce</a>
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Spolupráce
        </a>
      </div>
    </>
  );
}
