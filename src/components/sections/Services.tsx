import React from 'react';
import {
  BadgeCheck,
  Blocks,
  Braces,
  Layers3,
  PanelsTopLeft,
  Route,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiFigma,
  SiGo,
  SiGraphql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSolidity,
  SiTypescript,
} from 'react-icons/si';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import './Services.scss';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Technology {
  name: string;
  icon: IconType;
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

const technologies: Technology[] = [
  {
    name: 'TypeScript',
    icon: SiTypescript,
  },
  {
    name: 'React',
    icon: SiReact,
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
  },
  {
    name: 'Python',
    icon: SiPython,
  },
  {
    name: 'Rust',
    icon: SiRust,
  },
  {
    name: 'Go',
    icon: SiGo,
  },
  {
    name: 'Solidity',
    icon: SiSolidity,
  },
  {
    name: 'Docker',
    icon: SiDocker,
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
  },
  {
    name: 'GraphQL',
    icon: SiGraphql,
  },
  {
    name: 'Figma',
    icon: SiFigma,
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

      <section className="services__technology" aria-labelledby="technology-label">
        <div className="services__technology-intro">
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
          <p className="services__technology-copy">
            Tools we use across product, data, protocols, and infrastructure.
          </p>
        </div>

        <div className="services__marquee" aria-label="Tools and technologies we use">
          <div className="services__technology-track">
            {[false, true].map((isDuplicate) => (
              <ul
                key={isDuplicate ? 'duplicate' : 'primary'}
                className={`services__technology-list${isDuplicate ? ' services__technology-list--duplicate' : ''}`}
                aria-hidden={isDuplicate ? true : undefined}
              >
                {technologies.map((technology) => {
                  const TechnologyIcon = technology.icon;

                  return (
                    <li key={technology.name} className="services__technology-item">
                      <TechnologyIcon
                        className="services__technology-icon"
                        aria-hidden="true"
                        focusable="false"
                      />
                      <span>{technology.name}</span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
});

export default Services;
