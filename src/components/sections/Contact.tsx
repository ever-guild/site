import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { ArrowUpRight } from 'lucide-react';
import './Contact.scss';

export const Contact = React.memo(function Contact() {
  return (
    <Section id="contact" variant="alt">
      <div className="contact">
        <SectionHeader
          title="Let's build something that lasts"
          lead="Tell us what you're building. We reply within a day."
        />

        <a
          href="mailto:in@ever-guild.net?subject=New%20project%20enquiry"
          className="contact__email"
          aria-label="Email Ever Guild at in@ever-guild.net"
        >
          <span className="contact__email-text">in@ever-guild.net</span>
          <ArrowUpRight
            size={24}
            strokeWidth={2}
            className="contact__email-arrow"
            aria-hidden="true"
            focusable="false"
          />
        </a>
      </div>
    </Section>
  );
});

export default Contact;
