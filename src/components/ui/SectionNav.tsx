import React, { useState, useEffect, useCallback } from 'react';
import './SectionNav.scss';

interface SectionItem {
  id: string;
  label: string;
}

const sections: SectionItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Overview' },
  { id: 'team', label: 'Team' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const SectionNav = React.memo(function SectionNav() {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className="section-nav" aria-label="Section navigation">
      <ul className="section-nav__list">
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id} className="section-nav__item">
              <button
                className={`section-nav__button ${isActive ? 'section-nav__button--active' : ''}`}
                onClick={() => handleClick(id)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Go to ${label}`}
              >
                <span className="section-nav__dot" />
                <span className="section-nav__label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

export default SectionNav;
