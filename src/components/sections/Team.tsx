import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import iljarAvatar from "../../assets/avatars/ilyar.webp";
import ppmarkekAvatar from "../../assets/avatars/ppmarkek.webp";
import glazlkAvatar from "../../assets/avatars/glazlk.webp";
import "./Team.scss";

const team = [
  {
    name: "Ilyar",
    role: "Senior Engineer · Web3 Lead",
    avatar: iljarAvatar,
    github: "https://github.com/ilyar",
    handle: "ilyar",
    bio: "Leads Web3 infrastructure and backend systems – smart contracts in Rust and Solidity on TON and EVM, built to stay reliable.",
  },
  {
    name: "Marks",
    role: "Full-Stack · AI Engineer",
    avatar: ppmarkekAvatar,
    github: "https://github.com/ppmarkek",
    handle: "ppmarkek",
    bio: "Builds full-stack products and AI automation – React, Next.js and Node.js for SaaS apps, dashboards and marketplaces.",
  },
  {
    name: "Andrei",
    role: "Product Designer",
    avatar: glazlkAvatar,
    github: "https://github.com/Glazlk",
    handle: "Glazlk",
    bio: "Designs products end to end – UI/UX, prototypes and design systems for responsive web, with AI-assisted workflows.",
  },
];

export const Team = React.memo(function Team() {
  return (
    <Section id="team" variant="alt" index="02" label="Team">
      <SectionHeader title="The senior engineers you'll work with directly." />

      <div className="team">
        {team.map((member, i) => (
          <article key={member.name} className="team__card">
            <div className="team__photo">
              <img
                src={member.avatar}
                alt={member.name}
                className="team__avatar"
                loading="lazy"
              />
              <span className="team__idx" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

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
