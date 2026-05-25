import React from "react";
import { Section } from "../ui/Section";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import iljarAvatar from "../../assets/avatars/ilyar.png";
import ppmarkekAvatar from "../../assets/avatars/ppmarkek.png";
import glazlkAvatar from "../../assets/avatars/glazlk.png";
import "./Team.scss";

const team = [
  {
    name: "Ilia",
    role: "Founder / Senior Software Engineer / Web3 Technical Lead",
    avatar: iljarAvatar,
    github: "https://github.com/ilyar",
    bio: "Leads Ever Guild with expertise in Web3 infrastructure, backend systems, blockchain architecture, smart contracts, Rust, Solidity, TON, EVM, TypeScript, architecture design, automated testing, code reviews, and reliability.",
  },
  {
    name: "Marks",
    role: "Full Stack / AI Engineer",
    avatar: ppmarkekAvatar,
    github: "https://github.com/ppmarkek",
    bio: "Strengthens Ever Guild with full-stack development, AI automation, frontend engineering, backend APIs, and product-focused implementation. Skills include React, Next.js, TypeScript, Node.js, API integrations, SaaS apps, dashboards, marketplaces, AI features, automation, and product delivery.",
  },
  {
    name: "Andrei",
    role: "Product Designer / AI-assisted Frontend Developer",
    avatar: glazlkAvatar,
    github: "https://github.com/Glazlk",
    bio: "Strengthens Ever Guild on the product design side with UI/UX, visual design, interface layouts, prototypes, responsive web design, web animation, frontend prototyping, game UI/UX, design systems, and AI-assisted workflows.",
  },
];

export const Team = React.memo(function Team() {
  return (
    <Section id="team">
      <div className="team">
        <h2 className="team__heading">Our Team</h2>
        <div className="team__grid">
          {team.map((member) => (
            <div key={member.name} className="team__card">
              <div className="team__card-inner">
                <div className="team__avatar-wrapper">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="team__avatar"
                    loading="lazy"
                  />
                  <div className="team__avatar-ring" aria-hidden="true" />
                </div>

                <div className="team__info">
                  <h3 className="team__name">{member.name}</h3>
                  <p className="team__role">{member.role}</p>
                  <p className="team__bio">{member.bio}</p>
                </div>

                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team__github"
                  aria-label={`${member.name} on GitHub`}
                >
                  <SiGithub size={18} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

export default Team;
