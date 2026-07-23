import React from 'react';
import {
  BadgeCheck,
  Blocks,
  Braces,
  Database,
  Layers3,
  PanelsTopLeft,
  Route,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import './Services.scss';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface StackGroup {
  title: string;
  tools: string[];
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: 'Web3 & Blockchain',
    description: 'Production-grade smart contracts and protocol integrations on TON, EVM, and NEAR. Audited patterns, built to hold real value.',
    icon: Blocks,
  },
  {
    title: 'AI & Automation',
    description: 'LLM integrations, AI agents, and workflow automation wired into your product, not bolted on as an afterthought.',
    icon: Workflow,
  },
  {
    title: 'Full-Stack Development',
    description: 'React, Next.js, and Node.js SaaS platforms, dashboards, and marketplaces. Shipped fast, built to scale.',
    icon: Layers3,
  },
  {
    title: 'Product Design & UI/UX',
    description: 'Interfaces, prototypes, and design systems that stay clean and responsive across every screen.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Candidate Experience Verification',
    description: 'Independent verification of claimed engineering experience for safer technical hiring decisions.',
    icon: BadgeCheck,
  },
  {
    title: 'Crisis Engineering Management',
    description: 'Rapid intervention for software projects facing delivery, quality, or team breakdowns. Restore the delivery path quickly.',
    icon: Route,
  },
];

const stackGroups: StackGroup[] = [
  {
    title: 'Product surface',
    tools: ['TypeScript', 'React', 'Next.js', 'Figma'],
    icon: PanelsTopLeft,
  },
  {
    title: 'Applications & data',
    tools: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'GraphQL'],
    icon: Database,
  },
  {
    title: 'Protocol & infrastructure',
    tools: ['Rust', 'Solidity', 'Docker'],
    icon: Blocks,
  },
];

export const Services = React.memo(function Services() {
  return (
    <Section id="services">
      <SectionHeader
        title="Engineering for systems that have to hold up."
        lead="Product delivery, critical-system work, and hands-on recovery led by senior engineers."
      />

      <div className="services__grid">
        {services.map((service) => {
          const ServiceIcon = service.icon;

          return (
            <article key={service.title} className="services__card">
              <div className="services__title-row">
                <ServiceIcon
                  className="services__service-icon"
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  focusable="false"
                />
                <h3 className="services__title">{service.title}</h3>
              </div>
              <p className="services__desc">{service.description}</p>
            </article>
          );
        })}
      </div>

      <aside className="services__stack" aria-labelledby="technology-label">
        <div className="services__stack-intro">
          <p id="technology-label" className="services__stack-label">
            <Braces
              className="services__stack-label-icon"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              focusable="false"
            />
            <span>Technology</span>
          </p>
          <h3 className="services__stack-title">One senior team across the system.</h3>
          <p className="services__stack-copy">
            We choose the stack around the product, then own the trade-offs through delivery and production.
          </p>
        </div>

        <div className="services__stack-groups">
          {stackGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <section key={group.title} className="services__stack-group">
                <h4 className="services__stack-group-title">
                  <GroupIcon
                    className="services__stack-group-icon"
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    focusable="false"
                  />
                  <span>{group.title}</span>
                </h4>
                <ul className="services__stack-list">
                  {group.tools.map((tool) => (
                    <li key={tool} className="services__stack-item">
                      {tool}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </aside>
    </Section>
  );
});

export default Services;
