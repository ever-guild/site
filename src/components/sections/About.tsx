import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import "./About.scss";

const facts = [
  { k: "Since", v: "2021" },
  { k: "Mode", v: "Remote-first" },
  { k: "Team", v: "Senior-led" },
  { k: "Focus", v: "Web3 · AI" },
];

export const About = React.memo(function About() {
  return (
    <Section id="about" index="01" label="About">
      <SectionHeader
        title="Senior engineers, end to end – no hand-offs to juniors"
        lead="We take Web3 infrastructure, AI products and full-stack platforms from idea to production – and keep them running clean, without the technical debt that slows you down later"
      />

      <ul className="about__facts">
        {facts.map((f) => (
          <li key={f.k} className="about__fact">
            <span className="about__fact-key">{f.k}</span>
            <span className="about__fact-val">{f.v}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
});

export default About;
