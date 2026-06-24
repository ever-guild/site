import React from 'react';
import './Section.scss';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant?: 'default' | 'alt' | 'dark';
}

export const Section = React.memo(function Section({
  children,
  id,
  className = '',
  variant = 'default',
}: SectionProps) {
  const cls = [
    'section',
    `section--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={cls}>
      <div className="section__container">
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
});
