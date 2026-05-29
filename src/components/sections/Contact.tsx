import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { ArrowUpRight } from 'lucide-react';
import './Contact.scss';

export const Contact = React.memo(function Contact() {
  return (
    <Section id="contact" variant="alt" index="04" label="Contact">
      <div className="contact">
        <SectionHeader
          title="Let's build something that lasts"
        />

        <a href="mailto:n@ever-guild.net" className="contact__email">
          <span className="contact__email-text">n@ever-guild.net</span>
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
