import React from 'react';
import { Section } from '../ui/Section';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Code2, Package, Users, Lightbulb } from 'lucide-react';
import './Services.scss';

const services = [
  {
    icon: Code2,
    title: 'Open Source Development',
    description:
      'Contributing to and maintaining open-source projects that benefit the developer community.',
  },
  {
    icon: Package,
    title: 'Software Distribution',
    description:
      'Building tools and platforms for efficient software packaging and distribution.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description:
      'Creating spaces for developers to connect, learn, and grow together.',
  },
  {
    icon: Lightbulb,
    title: 'Technical Consulting',
    description:
      'Providing expert guidance on architecture, performance, and best practices.',
  },
];

export const Services = React.memo(function Services() {
  const ref = useScrollAnimation<HTMLDivElement>({ y: 40, opacity: 0, duration: 0.8 });

  return (
    <Section id="services" variant="alt">
      <div ref={ref} className="services">
        <h2 className="services__heading animate-item">What We Do</h2>
        <div className="services__grid">
          {services.map((service) => (
            <div key={service.title} className="services__card animate-item">
              <div className="services__icon">
                <service.icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

export default Services;
