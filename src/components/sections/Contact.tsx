import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowUpRight } from 'lucide-react';
import './Contact.scss';

export const Contact = React.memo(function Contact() {
  return (
    <Section id="contact" variant="alt" className="contact-section">
      <div className="contact">
        <div className="contact__cta">
          <Button
            href="https://order.ever-guild.net/"
            variant="primary"
            size="lg"
            className="contact__button"
            ariaLabel="Start a project with Ever Guild"
            icon={<ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />}
          >
            Start a project with Ever Guild
          </Button>
        </div>
      </div>
    </Section>
  );
});

export default Contact;
