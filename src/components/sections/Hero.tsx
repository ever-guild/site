import React from "react";
import { Button } from "../ui/Button";
import { SocialIcon } from "../ui/SocialIcon";
import "./Hero.scss";

const socials = [
  { platform: "github", url: "https://github.com/ever-guild", label: "GitHub" },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/company/ever-guild/",
    label: "LinkedIn",
  },
  { platform: "x", url: "https://x.com/ever_guild_net", label: "X" },
  { platform: "telegram", url: "https://t.me/everguild", label: "Telegram" },
  {
    platform: "upwork",
    url: "https://www.upwork.com/agencies/everguild/",
    label: "Upwork",
  },
];

const Hero = React.memo(function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <p className="hero__kicker">
          Senior-led · Remote-first · Since 2021
        </p>

        <h1 className="hero__tagline">
          Software that lasts.
          <br />
          <span className="hero__tagline-accent">Community</span> that builds.
        </h1>

        <p className="hero__description">
          Senior engineers who ship Web3, AI and full-stack products built to
          survive production — and stay maintainable long after launch.
        </p>

        <div className="hero__actions">
          <Button href="#contact" variant="primary" size="lg">
            Get in touch
          </Button>
          <Button
            href="https://github.com/ever-guild"
            variant="secondary"
            size="lg"
          >
            View on GitHub
          </Button>
        </div>

        <div className="hero__socials">
          {socials.map((s) => (
            <SocialIcon
              key={s.platform}
              platform={s.platform}
              url={s.url}
              label={s.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Hero;
