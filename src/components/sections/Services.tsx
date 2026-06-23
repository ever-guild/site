import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import './Services.scss';

const services = [
  {
    title: 'Web3 & Blockchain',
    description:
      'Production-grade smart contracts and protocol integrations on TON, EVM, and NEAR. Audited patterns, built to hold real value.',
  },
  {
    title: 'AI & Automation',
    description:
      'LLM integrations, AI agents, and workflow automation wired into your product, not bolted on as an afterthought.',
  },
  {
    title: 'Full-Stack Development',
    description:
      'React, Next.js, and Node.js SaaS platforms, dashboards, and marketplaces. Shipped fast, built to scale.',
  },
  {
    title: 'Product Design & UI/UX',
    description:
      'Interfaces, prototypes, and design systems that stay clean and responsive across every screen.',
  },
  {
    title: 'Candidate Experience Verification',
    description:
      'Independent verification of claimed engineering experience for safer technical hiring decisions.',
  },
  {
    title: 'Crisis Engineering Management',
    description:
      'Rapid intervention for software projects facing delivery, quality, or team breakdowns. Restore the delivery path quickly.',
  },
];

export const Services = React.memo(function Services() {
  return (
    <Section id="services">
      <SectionHeader
        title="What we build for you."
        lead="Senior service lines we can own from architecture through production support."
      />

      <div className="services__grid">
        {services.map((service, index) => (
          <article key={service.title} className="services__card">
            <span className="services__num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="services__title">{service.title}</h3>
            <p className="services__desc">{service.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
});

export default Services;
