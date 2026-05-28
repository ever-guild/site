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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
            {navLinks.map((link) => (
              <li key={link.href} className="navbar__item">
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href="mailto:n@ever-guild.net"
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
