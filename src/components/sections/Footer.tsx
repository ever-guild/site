import React from 'react';
import { SocialIcon } from '../ui/SocialIcon';
import './Footer.scss';

const socials = [
  { platform: 'github', url: 'https://github.com/ever-guild', label: 'GitHub' },
  { platform: 'x', url: 'https://x.com/ever_guild_net', label: 'X' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/ever-guild/', label: 'LinkedIn' },
  { platform: 'telegram', url: 'https://t.me/everguild', label: 'Telegram' },
  { platform: 'upwork', url: 'https://www.upwork.com/agencies/everguild/', label: 'Upwork' },
];

export const Footer = React.memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2026 Ever Guild. All rights reserved.</p>
        <div className="footer__socials">
          {socials.map((social) => (
            <SocialIcon
              key={social.platform}
              platform={social.platform}
              url={social.url}
              label={social.label}
              size={18}
            />
          ))}
        </div>
      </div>
    </footer>
  );
});

export default Footer;
