import React from 'react';
import { ArrowUpRight, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import './Hero.scss';

const deliveryAreas = [
  {
    title: 'Web3 infrastructure',
    detail: 'Smart contracts and protocol integrations across TON, EVM, and NEAR.',
  },
  {
    title: 'AI products',
    detail: 'LLM integrations and automation embedded in real product workflows.',
  },
  {
    title: 'Full-stack platforms',
    detail: 'Web apps, dashboards, and marketplaces from architecture through support.',
  },
  {
    title: 'Delivery recovery',
    detail: 'Technical audits and intervention when a project needs a clear path forward.',
  },
];

const Hero = React.memo(function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__tagline">
            Build what lasts.
            <span className="hero__tagline-accent">Keep it running.</span>
          </h1>

          <p className="hero__description">
            Senior engineers for <strong>Web3 infrastructure</strong>,{' '}
            <strong>AI products</strong> and <strong>full-stack platforms</strong>,
            from architecture through production support.
          </p>

          <div className="hero__actions">
            <Button
              href="https://order.ever-guild.net/"
              variant="primary"
              size="lg"
              icon={<ArrowUpRight size={18} strokeWidth={2.2} aria-hidden="true" />}
            >
              Start a project
            </Button>
            <Button href="https://github.com/ever-guild" variant="secondary" size="lg">
              View on GitHub
            </Button>
          </div>

          <p className="hero__operating-note">
            <span>Operating since 2021</span>
            <span>Senior-led delivery</span>
            <span>Remote-first, documented collaboration</span>
          </p>
        </div>

        <aside className="hero__scope" aria-labelledby="hero-scope-title">
          <p className="hero__scope-label">
            <Target
              className="hero__scope-label-icon"
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              focusable="false"
            />
            <span>Architecture, delivery, recovery</span>
          </p>
          <h2 id="hero-scope-title" className="hero__scope-title">
            The work that gets expensive when it is wrong.
          </h2>
          <ul className="hero__scope-list">
            {deliveryAreas.map((area) => (
              <li key={area.title} className="hero__scope-item">
                <h3>{area.title}</h3>
                <p>{area.detail}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
});

export default Hero;
