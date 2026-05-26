import React from 'react';
import { Section } from '../ui/Section';
import {
  Blocks, Bot, Code2, Palette, Server,
} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython,
  SiRust, SiGo, SiSolidity, SiDocker, SiKubernetes,
  SiPostgresql, SiMongodb, SiRedis, SiGraphql, SiTailwindcss,
  SiFigma, SiOpenai, SiGithub, SiFastapi, SiExpress,
  SiLinux, SiEthereum, SiNear, SiGit,
} from 'react-icons/si';
import './Skills.scss';

const categories = [
  {
    icon: Blocks,
    title: 'Web3 & Blockchain',
    description: 'TON, EVM, NEAR, Cosmos, Solidity, smart contracts, SDKs, protocol integrations, transaction analysis.',
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    description: 'AI apps, LLM integrations, OpenAI / Claude / Gemini APIs, AI agents, workflow automation, CLI systems.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'React, Next.js, TypeScript, Node.js, Express, FastAPI, REST APIs, SaaS platforms, dashboards, marketplaces.',
  },
  {
    icon: Palette,
    title: 'Product Design & UI/UX',
    description: 'Interface layouts, prototypes, design systems, responsive web, game UI/UX, web animation, clean experiences.',
  },
  {
    icon: Server,
    title: 'DevOps & Reliability',
    description: 'Rust, Go, Python, Docker, Kubernetes, CI/CD, cloud infrastructure, testing, monitoring, optimization.',
  },
];

const techRow1 = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Python', icon: SiPython },
  { name: 'Rust', icon: SiRust },
  { name: 'Go', icon: SiGo },
  { name: 'Solidity', icon: SiSolidity },
  { name: 'Ethereum', icon: SiEthereum },
  { name: 'NEAR', icon: SiNear },
];

const techRow2 = [
  { name: 'Docker', icon: SiDocker },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Redis', icon: SiRedis },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Figma', icon: SiFigma },
  { name: 'OpenAI', icon: SiOpenai },
  { name: 'Git', icon: SiGit },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Express', icon: SiExpress },
  { name: 'Linux', icon: SiLinux },
  { name: 'GitHub', icon: SiGithub },
];

export const Skills = React.memo(function Skills() {
  return (
    <Section id="skills">
      <div className="skills">
        <h2 className="skills__heading">Core Expertise</h2>
        <p className="skills__subtext">
          From Web3 protocols to AI automation — we cover the full spectrum of modern software engineering.
        </p>

        <div className="skills__grid">
          {categories.map((cat) => (
            <div key={cat.title} className="skills__card">
              <div className="skills__card-icon">
                <cat.icon size={26} strokeWidth={1.6} />
              </div>
              <h3 className="skills__card-title">{cat.title}</h3>
              <p className="skills__card-desc">{cat.description}</p>
            </div>
          ))}
        </div>

        <div className="skills__tech">
          <h3 className="skills__tech-heading">Technologies</h3>

          <div className="skills__marquee">
            <div className="skills__marquee-track skills__marquee-track--left">
              {[...techRow1, ...techRow1].map((tech, i) => (
                <div key={`r1-${tech.name}-${i}`} className="skills__marquee-item">
                  <tech.icon size={32} className="skills__marquee-icon" />
                  <span className="skills__marquee-label">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skills__marquee">
            <div className="skills__marquee-track skills__marquee-track--right">
              {[...techRow2, ...techRow2].map((tech, i) => (
                <div key={`r2-${tech.name}-${i}`} className="skills__marquee-item">
                  <tech.icon size={32} className="skills__marquee-icon" />
                  <span className="skills__marquee-label">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

export default Skills;
