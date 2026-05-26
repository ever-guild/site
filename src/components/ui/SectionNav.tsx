import React, { useEffect, useCallback } from 'react';
import { useSectionContext } from '../../contexts/SectionContext';
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
  const { activeId, setActiveId } = useSectionContext();

  useEffect(() => {
    let rafId: number;

    const updateActive = () => {
      const centerY = window.innerHeight / 2;
      let closestId = sections[0].id;
      let closestDist = Infinity;

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - centerY);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      });

      setActiveId(closestId);
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActive);
    updateActive();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActive);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [setActiveId]);

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
