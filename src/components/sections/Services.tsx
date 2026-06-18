import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import './Services.scss';

const tracks = [
  {
    title: 'Web3 & Blockchain',
    description:
      'Smart contracts and protocol integrations on TON, EVM, and NEAR. Audited patterns, built to hold real value.',
  },
  {
    title: 'Full-Stack Development',
    description:
      'React, Next.js, and Node.js platforms, dashboards, and marketplaces. Shipped fast, built to scale.',
  },
];

const alsoAvailable = [
  'AI & Automation',
  'Product Design & UI/UX',
  'Candidate Experience Verification',
  'Crisis Engineering Management',
];

const toolkitGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'Rust', 'Go', 'Solidity'],
  },
  {
    label: 'Product',
    items: ['React', 'Next.js', 'Node.js', 'GraphQL', 'Figma'],
  },
  {
    label: 'Infrastructure',
    items: ['Docker', 'PostgreSQL'],
  },
];

export const Services = React.memo(function Services() {
  return (
    <Section id="services">
      <SectionHeader
        title="What we build for you."
        lead="Two delivery tracks we lead, and specialized work when the brief needs it."
      />

      <div className="services__tracks">
        {tracks.map((track) => (
          <article key={track.title} className="services__track">
            <h3 className="services__track-title">{track.title}</h3>
            <p className="services__track-desc">{track.description}</p>
          </article>
        ))}
      </div>

      <p className="services__also">
        <span className="services__also-label">Also available</span>
        {alsoAvailable.join(' · ')}
      </p>

      <div className="services__toolkit" aria-label="Tools and technologies we use">
        <div className="services__toolkit-groups">
          {toolkitGroups.map((group) => (
            <div key={group.label} className="services__toolkit-group">
              <p className="services__toolkit-group-label">{group.label}</p>
              <p className="services__toolkit-group-items">
                {group.items.map((name) => (
                  <span key={name} className="services__toolkit-name">
                    {name}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

export default Services;
