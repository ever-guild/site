import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import './Contact.scss';

export const Contact = React.memo(function Contact() {
  return (
    <Section id="contact" variant="alt">
      <div className="contact">
        <SectionHeader
          title="Start a production build"
          lead="Tell us what you're building. We reply within a day."
        />

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=in@ever-guild.net&su=New%20project%20enquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__email"
          aria-label="Email Ever Guild at in@ever-guild.net"
        >
          <span className="contact__email-prompt" aria-hidden="true">▸</span>
          <span className="contact__email-text">in@ever-guild.net</span>
          <ArrowUpRight size={28} strokeWidth={1.8} className="contact__email-arrow" />
        </a>

        <p className="contact__note">
          Tell us what you're building. We reply within a day.
        </p>
      </div>
    </Section>
  );
});

export default Contact;
