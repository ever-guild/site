import React from 'react';
import { SocialIcon } from '../ui/SocialIcon';
import './Footer.scss';

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
        <div className="footer__brand">
          <span className="footer__wordmark">Ever Guild</span>
          <span className="footer__tag">Senior engineering team</span>
        </div>

        <div className="footer__meta">
          <p className="footer__copyright">© 2026 Ever Guild</p>
        </div>

        <div className="footer__socials">
          {socials.map((social) => (
            <SocialIcon
              key={social.platform}
              platform={social.platform}
              url={social.url}
              label={social.label}
            />
          ))}
        </div>
      </div>
    </footer>
  );
});

export default Footer;
