import React from "react";
import { Section } from "../ui/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import iljarAvatar from "../../assets/avatars/ilyar.webp";
import ppmarkekAvatar from "../../assets/avatars/ppmarkek.webp";
import andreiAvatar from "../../assets/avatars/andrei.webp";
import "./Team.scss";

const team = [
  {
    name: "Ilyar",
    role: "Senior Engineer · Web3 Lead",
    avatar: iljarAvatar,
    avatarSize: 800,
    github: "https://github.com/ilyar",
    handle: "ilyar",
    bio: "Leads Web3 infrastructure and backend systems – smart contracts in Rust and Solidity on TON and EVM, built to stay reliable.",
  },
  {
    name: "Marks",
    role: "Full-Stack · AI Engineer",
    avatar: ppmarkekAvatar,
    avatarSize: 800,
    github: "https://github.com/ppmarkek",
    handle: "ppmarkek",
    bio: "Builds full-stack products and AI automation – React, Next.js and Node.js for SaaS apps, dashboards and marketplaces.",
  },
  {
    name: "Andrei",
    role: "Product Designer",
    avatar: andreiAvatar,
    avatarSize: 700,
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
        {team.map((member) => (
          <article key={member.name} className="team__card">
            <div className="team__photo">
              <img
                src={member.avatar}
                alt={member.name}
                className="team__avatar"
                loading="lazy"
                width={member.avatarSize}
                height={member.avatarSize}
              />
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
                aria-label={`@${member.handle} on GitHub`}
              >
                <SiGithub size={15} aria-hidden="true" focusable="false" />
                <span className="team__github-handle">@{member.handle}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="team__github-arrow"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
});

export default Team;
