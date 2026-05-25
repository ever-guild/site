import React from 'react';
import { Section } from '../ui/Section';
import {
  Globe, Shield, Users, Clock,
  Route, Rocket, Wrench, Sparkles, Layout, BadgeCheck, Target
} from 'lucide-react';
import './About.scss';

const values = [
  {
    icon: Globe,
    title: 'Openness',
    description: 'We believe in transparent development and open collaboration.',
  },
  {
    icon: Shield,
    title: 'Quality',
    description: 'We maintain high standards in every line of code we write.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We grow stronger together through shared knowledge.',
  },
  {
    icon: Clock,
    title: 'Longevity',
    description: 'We build software designed to last and evolve.',
  },
];

const whyUs = [
  {
    icon: Route,
    title: 'Shape Architecture',
    description: 'Design technical direction and system architecture that scales.',
  },
  {
    icon: Rocket,
    title: 'Build MVPs',
    description: 'Launch products fast with maintainable, production-ready code.',
  },
  {
    icon: Wrench,
    title: 'Stabilize Systems',
    description: 'Optimize existing codebases and eliminate technical debt.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Features',
    description: 'Integrate LLMs, agents, and automation into your product.',
  },
  {
    icon: Layout,
    title: 'Modern Interfaces',
    description: 'Design and build clean, responsive, accessible UI/UX.',
  },
  {
    icon: BadgeCheck,
    title: 'Senior Ownership',
    description: 'Provide technical leadership and end-to-end accountability.',
  },
];

export const About = React.memo(function About() {
  return (
    <Section id="about">
      <div className="about">
        <h2 className="about__heading">Overview</h2>
        <div className="about__intro">
          <p>
            Ever Guild is a remote-first software engineering agency focused on Web3,
            blockchain infrastructure, smart contracts, backend systems, AI-powered products,
            developer tooling, product design, and modern frontend development.
          </p>
          <p>
            Founded in 2021 by Ilia, a senior software engineer and technical lead with
            20 years of engineering experience, Ever Guild combines technical depth with
            reliable remote delivery, clear communication, and strong technical ownership.
          </p>
          <p>
            We help startups, Web3 teams, SaaS companies, and gaming projects move from
            idea to production-ready software without creating technical debt.
          </p>
        </div>

        <div className="about__grid">
          {values.map((value) => (
            <div key={value.title} className="about__card">
              <div className="about__icon">
                <value.icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="about__title">{value.title}</h3>
              <p className="about__description">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="about__why">
          <div className="about__why-header">
            <div className="about__why-accent">
              <Target size={20} strokeWidth={2} />
            </div>
            <h3 className="about__why-heading">Why Ever Guild</h3>
            <p className="about__why-sub">
              More than just coding. We deliver strategic technical partnership.
            </p>
          </div>

          <div className="about__why-grid">
            {whyUs.map((item) => (
              <div key={item.title} className="about__why-card">
                <div className="about__why-icon">
                  <item.icon size={22} strokeWidth={1.8} />
                </div>
                <div className="about__why-content">
                  <h4 className="about__why-title">{item.title}</h4>
                  <p className="about__why-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="about__why-footer">
            Whether you are building a Web3 protocol, SaaS product, AI automation tool,
            backend platform, game interface, product prototype, or developer-facing
            infrastructure, Ever Guild helps you move from concept to working software
            with maintainable architecture.
          </p>
        </div>
      </div>
    </Section>
  );
});

export default About;
