import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";

export const About = React.memo(function About() {
  return (
    <Section id="about">
      <SectionHeader
        title={
          <>
            Senior engineers, end to end –<br />
            no hand-offs to juniors.
          </>
        }
        lead="We take Web3 infrastructure, AI products and full-stack platforms from idea to production – and keep them running clean, without the technical debt that slows you down later."
      />
    </Section>
  );
});

export default About;
