import React from 'react';
import { ArrowUp } from 'lucide-react';
import logo from '../../assets/logo-header.svg';

const socials = [
  { platform: 'github', url: 'https://github.com/ever-guild', label: 'GitHub' },
  { platform: 'x', url: 'https://x.com/ever_guild_net', label: 'X' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/ever-guild/', label: 'LinkedIn' },
  { platform: 'telegram', url: 'https://t.me/everguild', label: 'Telegram' },
  { platform: 'upwork', url: 'https://www.upwork.com/agencies/everguild/', label: 'Upwork' },
  { platform: 'email', url: 'mailto:in@ever-guild.net', label: 'Email' },
];

export const Footer = React.memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__head">
          <a className="footer__brand" href="#hero" aria-label="Ever Guild home">
            <img className="footer__logo" src={logo} alt="Ever Guild" />
            <span className="footer__tag">Senior engineering team</span>
          </a>

          <a className="footer__back" href="#hero">
            <span>Back to top</span>
            <ArrowUp className="footer__back-icon" size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 Ever Guild</p>

          <nav className="footer__links" aria-label="Ever Guild channels">
            {socials.map((social) => (
              <a
                key={social.platform}
                className="footer__link"
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
