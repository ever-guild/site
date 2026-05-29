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

const morphemes: Record<string, React.ReactNode> = {
  axis: <path d="M32 16v32" />,
  core: <circle cx="32" cy="32" r="5" />,
  flow: <path d="M20 32c5-8 19-8 24 0M20 32c5 8 19 8 24 0" />,
  frame: <path d="M20 20h24v24H20z" />,
  gate: <path d="M18 24h28v18H18zM18 24l14 12 14-12" />,
  link: <path d="M18 32h28M24 24l16 16M40 24 24 40" />,
  people: <path d="M22 40c4-8 16-8 20 0M26 26a6 6 0 0 0 12 0" />,
  stack: <path d="M20 24h24l-12 8-12-8Zm0 16h24l-12-8-12 8Z" />,
};

const sectionSigils: Record<string, string[]> = {
  about: ['core', 'axis', 'link'],
  team: ['core', 'people', 'flow'],
  services: ['core', 'stack', 'frame'],
  contact: ['core', 'gate', 'axis'],
  default: ['core', 'frame'],
};

function SectionSigil({ type }: { type: string }) {
  const parts = sectionSigils[type.toLowerCase()] ?? sectionSigils.default;

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
      <g className="section__sigil-glyph">
        {parts.map((part) => (
          <React.Fragment key={part}>{morphemes[part]}</React.Fragment>
        ))}
      </g>
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
