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
  {
    platform: "upwork",
    url: "https://www.upwork.com/agencies/everguild/",
    label: "Upwork",
  },
];

const Hero = React.memo(function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__hud" aria-hidden="true">
        <span className="hero__hud-line">EVER&nbsp;GUILD&nbsp;//&nbsp;ENGINEERING&nbsp;GUILD</span>
        <span className="hero__hud-line hero__hud-line--right">EST.&nbsp;2021&nbsp;//&nbsp;GLOBAL&nbsp;·&nbsp;REMOTE</span>
      </div>

      <div className="hero__inner">
        <p className="hero__kicker">Senior-led · Remote-first · Since 2021</p>

        <h1 className="hero__tagline">
          Software that lasts.
          <br />
          <span className="hero__tagline-accent">Team</span> that builds.
        </h1>

        <p className="hero__description">
          Senior engineers who ship Web3, AI and full-stack products built to
          survive production – and stay maintainable long after launch.
        </p>

        <div className="hero__actions">
          <Button href="#contact" variant="primary" size="lg">
            Start a project
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

      <a className="hero__scroll" href="#about" aria-label="Scroll to content">
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-rule" aria-hidden="true" />
      </a>
    </section>
  );
});

export default Hero;
