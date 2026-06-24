import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiRust,
  SiGo, SiSolidity, SiDocker, SiPostgresql, SiGraphql, SiFigma,
} from 'react-icons/si';
import {
  LuBlocks, LuCpu, LuLayers, LuPenTool, LuBadgeCheck, LuLifeBuoy,
} from 'react-icons/lu';
import './Services.scss';

const services = [
  {
    Icon: LuBlocks,
    title: 'Web3 & Blockchain',
    description: 'Production-grade smart contracts and protocol integrations on TON, EVM, and NEAR. Audited patterns, built to hold real value.',
  },
  {
    Icon: LuCpu,
    title: 'AI & Automation',
    description: 'LLM integrations, AI agents, and workflow automation wired into your product, not bolted on as an afterthought.',
  },
  {
    Icon: LuLayers,
    title: 'Full-Stack Development',
    description: 'React, Next.js, and Node.js SaaS platforms, dashboards, and marketplaces. Shipped fast, built to scale.',
  },
  {
    Icon: LuPenTool,
    title: 'Product Design & UI/UX',
    description: 'Interfaces, prototypes, and design systems that stay clean and responsive across every screen.',
  },
  {
    Icon: LuBadgeCheck,
    title: 'Candidate Experience Verification',
    description: 'Independent verification of claimed engineering experience for safer technical hiring decisions.',
  },
  {
    Icon: LuLifeBuoy,
    title: 'Crisis Engineering Management',
    description: 'Rapid intervention for software projects facing delivery, quality, or team breakdowns. Restore the delivery path quickly.',
  },
];

const stack = [
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'Rust', Icon: SiRust },
  { name: 'Go', Icon: SiGo },
  { name: 'Solidity', Icon: SiSolidity },
  { name: 'Docker', Icon: SiDocker },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'GraphQL', Icon: SiGraphql },
  { name: 'Figma', Icon: SiFigma },
];

export const Services = React.memo(function Services() {
  return (
    <Section id="services">
      <SectionHeader
        title="What we build for you."
        lead="Senior service lines we can own from architecture through production support."
      />

      <div className="services__grid">
        {services.map((service) => (
          <article key={service.title} className="services__card">
            <div className="services__head">
              <span className="services__icon" aria-hidden="true">
                <service.Icon />
              </span>
            </div>
            <h3 className="services__title">{service.title}</h3>
            <p className="services__desc">{service.description}</p>
          </article>
        ))}
      </div>

      <div className="services__marquee" aria-label="Tools and technologies we use">
        <ul className="services__track">
          {[...stack, ...stack].map((tech, i) => (
            <li
              key={`${tech.name}-${i}`}
              className={`services__tag ${i >= stack.length ? 'services__tag--duplicate' : ''}`}
              aria-hidden={i >= stack.length ? true : undefined}
            >
              <tech.Icon className="services__tag-icon" aria-hidden="true" />
              {tech.name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
});

export default Services;
