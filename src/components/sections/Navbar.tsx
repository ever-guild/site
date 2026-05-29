import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import logo from "../../assets/logoeverguild.svg";
import "./Navbar.scss";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = React.memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy — highlight the nav link for the section in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <a href="#" className="navbar__brand" onClick={closeMobileMenu}>
          <img src={logo} alt="Ever Guild" className="navbar__logo" />
        </a>

        <nav
          className={`navbar__nav ${isMobileMenuOpen ? "navbar__nav--open" : ""}`}
        >
          <ul className="navbar__list">
            {navLinks.map((link, i) => {
              const active = link.href === `#${activeId}`;
              return (
                <li key={link.href} className="navbar__item">
                  <a
                    href={link.href}
                    className={`navbar__link ${active ? "navbar__link--active" : ""}`}
                    aria-current={active ? "true" : undefined}
                    onClick={closeMobileMenu}
                  >
                    <span className="navbar__link-idx" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button
            href="#contact"
            variant="primary"
            size="sm"
            className="navbar__cta"
            onClick={closeMobileMenu}
          >
            Start a project
          </Button>
        </nav>

        <button
          className="navbar__toggle"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="navbar__overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
});

export default Navbar;
