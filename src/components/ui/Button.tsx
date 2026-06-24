import React from 'react';
import './Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export const Button = React.memo(function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    icon ? 'btn--with-icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {children}
      {icon && <span className="btn__icon">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
});
