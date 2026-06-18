import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { ArrowUpRight } from "lucide-react";
import "./About.scss";

const proof = [
  {
    name: "acki.live",
    url: "https://github.com/ever-guild/acki.live",
    description: "Blockchain explorer for TVM networks, built for production traffic.",
  },
  {
    name: "tvm-action",
    url: "https://github.com/ever-guild/tvm-action",
    description: "CI action for TON, Acki Nacki, Everscale, and Venom development workflows.",
  },
  {
    name: "network-load",
    url: "https://github.com/ever-guild/network-load",
    description: "Live load metrics across TVM-based networks.",
  },
];

export const About = React.memo(function About() {
  return (
    <Section id="about">
      <SectionHeader
        title="Senior engineers, end to end. No hand-offs to juniors."
        lead="We take Web3 infrastructure, AI products, and full-stack platforms from idea to production, then keep them running clean."
      />

      <div className="about__proof">
        <p className="about__proof-label">Open work from the team</p>
        <ul className="about__proof-list">
          {proof.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="about__proof-link"
              >
                <span className="about__proof-name">{item.name}</span>
                <span className="about__proof-desc">{item.description}</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                  className="about__proof-arrow"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
});

export default About;
