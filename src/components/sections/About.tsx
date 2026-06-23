import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export const About = React.memo(function About() {
  return (
    <Section id="about">
      <SectionHeader
        title="Senior engineers, end to end. No hand-offs to juniors."
        lead="We take Web3 infrastructure, AI products, and full-stack platforms from idea to production, then keep them running clean."
      />
    </Section>
  );
});

export default About;
