import React from 'react';
import { Section } from '../ui/Section';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Globe, Shield, Users, Clock } from 'lucide-react';
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

export const About = React.memo(function About() {
  const ref = useScrollAnimation<HTMLDivElement>({ y: 40, opacity: 0, duration: 0.8 });

  return (
    <Section id="about">
      <div ref={ref} className="about">
        <h2 className="about__heading animate-item">About Us</h2>
        <p className="about__text animate-item">
          Ever Guild is a community of developers dedicated to building and maintaining
          high-quality open-source software. We believe in the power of collaboration and
          the importance of sustainable software development.
        </p>
        <div className="about__grid">
          {values.map((value) => (
            <div key={value.title} className="about__card animate-item">
              <div className="about__icon">
                <value.icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="about__title">{value.title}</h3>
              <p className="about__description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

export default About;
