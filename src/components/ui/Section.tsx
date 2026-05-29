import React from 'react';
import './Section.scss';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: 'default' | 'alt' | 'dark';
  index?: string;
  label?: string;
}

const sigilPaths: Record<string, React.ReactNode> = {
  about: <path d="M18 32h28M32 18v28M24 24l16 16M40 24 24 40" />,
  team: <path d="M22 38c3-8 17-8 20 0M24 25a8 8 0 0 0 16 0M18 46h28" />,
  services: <path d="M20 24h24l-12 8-12-8Zm0 16h24l-12-8-12 8Z" />,
  contact: <path d="M18 24h28v18H18zM18 24l14 12 14-12M32 14v8M32 42v8" />,
  default: <path d="M20 20h24v24H20zM26 26h12v12H26z" />,
};

function SectionSigil({ type }: { type: string }) {
  const path = sigilPaths[type.toLowerCase()] ?? sigilPaths.default;

  return (
    <svg
      className="section__sigil"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="section__sigil-ring" cx="32" cy="32" r="25" />
      <path className="section__sigil-ray" d="M32 5v9M32 50v9M5 32h9M50 32h9" />
      <path className="section__sigil-ray" d="M13.6 13.6l6.4 6.4M44 44l6.4 6.4M50.4 13.6 44 20M20 44l-6.4 6.4" />
      <g className="section__sigil-glyph">{path}</g>
    </svg>
  );
}

export const Section = React.memo(function Section({
  children,
  id,
  className = '',
  variant = 'default',
  index,
  label,
}: SectionProps) {
  const indexed = Boolean(index || label);
  const cls = [
    'section',
    `section--${variant}`,
    indexed ? 'section--indexed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={cls}>
      <div className="section__container">
        {indexed && (
          <div className="section__index" aria-hidden="true">
            <SectionSigil type={id ?? label ?? 'default'} />
            {label && <span className="section__index-label">{label}</span>}
          </div>
        )}
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
});
