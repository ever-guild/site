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

        <Button href="https://order.ever-guild.net/" size="lg" className="contact__cta">
          Start a project
        </Button>
      </div>
    </Section>
  );
});

export default Contact;
