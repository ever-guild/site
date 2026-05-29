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

const morphemes: Record<string, React.ReactNode> = {
  axis: <path d="M32 16v32" />,
  break: <path d="M22 22l9 10-7 10M42 22l-9 10 7 10" />,
  core: <circle cx="32" cy="32" r="5" />,
  frame: <path d="M20 20h24v24H20z" />,
  gate: <path d="M18 24h28v18H18zM18 24l14 12 14-12" />,
  link: <path d="M18 32h28M24 24l16 16M40 24 24 40" />,
  stack: <path d="M20 24h24l-12 8-12-8Zm0 16h24l-12-8-12 8Z" />,
  spark: <path d="M32 16v32M16 32h32M22 22l20 20M42 22 22 42" />,
  seal: <path d="M20 38c4-10 20-10 24 0M24 24h16" />,
  sight: <path d="M18 32c6-9 22-9 28 0-6 9-22 9-28 0Z" />,
};

const serviceSigils = [
  ['core', 'link', 'stack'],
  ['core', 'spark', 'axis'],
  ['core', 'stack', 'axis'],
  ['core', 'frame', 'sight'],
  ['core', 'seal', 'sight'],
  ['core', 'break', 'link'],
];

function ServiceSigil({ variant }: { variant: number }) {
  const parts = serviceSigils[variant % serviceSigils.length];

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
      <g className="services__sigil-glyph">
        {parts.map((part) => (
          <React.Fragment key={part}>{morphemes[part]}</React.Fragment>
        ))}
      </g>
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
