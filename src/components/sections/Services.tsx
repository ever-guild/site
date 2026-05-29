import React from 'react';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiRust,
  SiGo, SiSolidity, SiDocker, SiPostgresql, SiGraphql, SiFigma,
} from 'react-icons/si';
import './Services.scss';

const services = [
  {
    title: 'Web3 & Blockchain',
    description: 'Production-grade smart contracts and protocol integrations on TON, EVM and NEAR – audited patterns, built to hold real value',
  },
  {
    title: 'AI & Automation',
    description: 'LLM integrations, AI agents and workflow automation wired into your product – not bolted on as an afterthought',
  },
  {
    title: 'Full-Stack Development',
    description: 'React, Next.js and Node.js SaaS platforms, dashboards and marketplaces – shipped fast, built to scale',
  },
  {
    title: 'Product Design & UI/UX',
    description: 'Interfaces, prototypes and design systems that stay clean and responsive across every screen',
  },
  {
    title: 'Candidate Experience Verification',
    description: 'Independent verification of claimed engineering experience for safer technical hiring decisions',
  },
  {
    title: 'Crisis Engineering Management',
    description: 'Rapid intervention for software projects facing delivery, quality or team breakdowns',
  },
];

function ServiceSigil({ variant }: { variant: number }) {
  const glyphs = [
    <path key="chain" d="M18 32h28M22 24l20 16M22 40l20-16" />,
    <path key="spark" d="M32 15v34M15 32h34M22 22l20 20M42 22 22 42" />,
    <path key="stack" d="M18 24h28l-14 9-14-9Zm0 16h28l-14-9-14 9Z" />,
    <path key="frame" d="M20 20h24v24H20zM26 26h12v12H26z" />,
    <path key="seal" d="M20 36c4-10 20-10 24 0M24 24h16M32 18v28" />,
    <path key="crisis" d="M20 22l10 8-8 12M44 22l-10 8 8 12M25 32h14M30 20l4 24" />,
  ];

  return (
    <svg
      className="services__sigil"
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="services__sigil-ring" cx="32" cy="32" r="26" />
      <path className="services__sigil-ray" d="M32 4v10M32 50v10M4 32h10M50 32h10" />
      <path className="services__sigil-ray" d="M12.2 12.2l7.1 7.1M44.7 44.7l7.1 7.1M51.8 12.2l-7.1 7.1M19.3 44.7l-7.1 7.1" />
      <g className="services__sigil-glyph">{glyphs[variant % glyphs.length]}</g>
    </svg>
  );
}

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
    <Section id="services" index="03" label="Services">
      <SectionHeader title="What we build for you" />

      <div className="services__grid">
        {services.map((service, i) => (
          <article key={service.title} className="services__card">
            <ServiceSigil variant={i} />
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
              className="services__tag"
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
