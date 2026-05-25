import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { SocialIcon } from '../ui/SocialIcon';
import { Mail } from 'lucide-react';
import './Contact.scss';

const socials = [
  { platform: 'github', url: 'https://github.com/ever-guild', label: 'GitHub' },
  { platform: 'x', url: 'https://x.com/ever_guild_net', label: 'X' },
  { platform: 'linkedin', url: 'https://www.linkedin.com/company/ever-guild/', label: 'LinkedIn' },
  { platform: 'telegram', url: 'https://t.me/everguild', label: 'Telegram' },
  { platform: 'upwork', url: 'https://www.upwork.com/agencies/everguild/', label: 'Upwork' },
];

export const Contact = React.memo(function Contact() {
  return (
    <Section id="contact">
      <div className="contact">
        <h2 className="contact__heading">Get in Touch</h2>
        <p className="contact__subtext">
          Interested in collaborating? Reach out to us.
        </p>
        <div className="contact__cta">
          <Button
            href="mailto:n@ever-guild.net"
            variant="primary"
            size="lg"
            icon={<Mail size={20} strokeWidth={1.8} />}
          >
            n@ever-guild.net
          </Button>
        </div>
        <div className="contact__socials">
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
    </Section>
  );
});

export default Contact;
