import React from 'react';
import './Section.scss';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: 'default' | 'alt' | 'dark';
  /** Two-digit section index, e.g. "01" — shown in the left blueprint column. */
  index?: string;
  /** Short mono label, e.g. "ABOUT" — shown under the index. */
  label?: string;
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
            {label && <span className="section__index-label">{label}</span>}
          </div>
        )}
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
});
