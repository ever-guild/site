import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import iljarAvatar from "../../assets/avatars/ilyar.png";
import ppmarkekAvatar from "../../assets/avatars/ppmarkek.png";
import glazlkAvatar from "../../assets/avatars/glazlk.png";
import "./Team.scss";

const team = [
  {
    name: "Ilia",
    role: "Senior Engineer · Web3 Lead",
    avatar: iljarAvatar,
    github: "https://github.com/ilyar",
    handle: "ilyar",
    bio: "Leads the guild with expertise in Web3 infrastructure, backend systems, blockchain architecture, smart contracts, Rust, Solidity, TON, EVM, TypeScript, automated testing, and reliability.",
  },
  {
    name: "Marks",
    role: "Full-Stack · AI Engineer",
    avatar: ppmarkekAvatar,
    github: "https://github.com/ppmarkek",
    handle: "ppmarkek",
    bio: "Full-stack development, AI automation, frontend engineering, and backend APIs. React, Next.js, TypeScript, Node.js, SaaS apps, dashboards, marketplaces, and product delivery.",
  },
  {
    name: "Andrei",
    role: "Product Designer",
    avatar: glazlkAvatar,
    github: "https://github.com/Glazlk",
    handle: "Glazlk",
    bio: "Product design and frontend: UI/UX, visual design, interface layouts, prototypes, responsive web, web animation, game UI/UX, design systems, and AI-assisted workflows.",
  },
];

export const Team = React.memo(function Team() {
  return (
    <Section id="team" variant="alt" index="02" label="Team">
      <SectionHeader title="The senior engineers you'll work with directly." />

      <div className="team">
        {team.map((member) => (
          <article key={member.name} className="team__card">
            <img
              src={member.avatar}
              alt={member.name}
              className="team__avatar"
              loading="lazy"
            />

            <div className="team__body">
              <h3 className="team__name">{member.name}</h3>
              <p className="team__role">{member.role}</p>
              <p className="team__bio">{member.bio}</p>

              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="team__github"
                aria-label={`${member.name} on GitHub`}
              >
                <SiGithub size={15} />
                <span className="team__github-handle">@{member.handle}</span>
                <ArrowUpRight size={14} strokeWidth={2} className="team__github-arrow" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
});

export default Team;
