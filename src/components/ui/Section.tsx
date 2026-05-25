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
  return (
    <section
      id={id}
      className={`section section--${variant} ${className}`.trim()}
    >
      <div className="section__container">{children}</div>
    </section>
  );
});
