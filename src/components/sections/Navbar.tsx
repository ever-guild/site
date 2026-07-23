import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import logo from "../../assets/logo-header.svg";
import "./Navbar.scss";

const navLinks = [
  { label: "Team", href: "#team" },
  { label: "Capabilities", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = React.memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sentinel = document.querySelector("[data-scroll-sentinel]");
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Scroll-spy — highlight the nav link for the section in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    let mutationObserver: MutationObserver | null = null;

    const observeSections = () => {
      ids.forEach((id) => {
        if (observed.has(id)) return;

        const el = document.getElementById(id);
        if (!el) return;

        observer.observe(el);
        observed.add(id);
      });

      if (observed.size === ids.length) {
        mutationObserver?.disconnect();
      }
    };

    mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    observeSections();

    return () => {
      mutationObserver?.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const inertTargets = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const previousBodyOverflow = document.body.style.overflow;

    inertTargets.forEach((element) => {
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        window.requestAnimationFrame(() => toggleButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".navbar__container a[href], .navbar__container button:not([disabled])"
        )
      ).filter((element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      });

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (!focusableElements.includes(document.activeElement as HTMLElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      inertTargets.forEach((element) => {
        element.removeAttribute("inert");
        element.removeAttribute("aria-hidden");
      });
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <a href="#hero" className="navbar__brand" onClick={closeMobileMenu}>
          <img src={logo} alt="Ever Guild" className="navbar__logo" />
        </a>

        <button
          ref={toggleButtonRef}
          className="navbar__toggle"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="primary-nav"
        >
          <span
            className={`navbar__toggle-icon ${
              isMobileMenuOpen
                ? "navbar__toggle-icon--hidden"
                : "navbar__toggle-icon--visible"
            }`}
            aria-hidden="true"
          >
            <Menu size={24} />
          </span>
          <span
            className={`navbar__toggle-icon ${
              isMobileMenuOpen
                ? "navbar__toggle-icon--visible"
                : "navbar__toggle-icon--hidden"
            }`}
            aria-hidden="true"
          >
            <X size={24} />
          </span>
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary navigation"
          className={`navbar__nav ${isMobileMenuOpen ? "navbar__nav--open" : ""}`}
        >
          <ul className="navbar__list">
            {navLinks.map((link) => {
              const active = link.href === `#${activeId}`;
              return (
                <li key={link.href} className="navbar__item">
                  <a
                    href={link.href}
                    className={`navbar__link ${active ? "navbar__link--active" : ""}`}
                    aria-current={active ? "true" : undefined}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button
            href="https://order.ever-guild.net/"
            variant="primary"
            size="sm"
            className="navbar__cta"
            onClick={closeMobileMenu}
          >
            Start a project
          </Button>
        </nav>
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
