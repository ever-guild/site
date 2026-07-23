import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowUpRight } from 'lucide-react';
import './Contact.scss';

export const Contact = React.memo(function Contact() {
  return (
    <Section id="contact" variant="alt" className="contact-section">
      <div className="contact">
        <div className="contact__card">
          <div className="contact__info">
            <h2 className="contact__heading">Ready to build with Ever Guild?</h2>
            <p className="contact__sub">
              Start a project directly with our senior engineering team for Web3, AI, full-stack delivery, or crisis support.
            </p>
          </div>

          <div className="contact__cta">
            <Button
              href="https://order.ever-guild.net/"
              variant="primary"
              size="lg"
              className="contact__button"
              ariaLabel="Start a project with Ever Guild"
              icon={<ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />}
            >
              Start a project with Ever Guild
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
});

export default Contact;
