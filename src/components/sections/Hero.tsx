import React from "react";
import { ChevronDown } from "lucide-react";
import logo from "../../assets/LogoNoBg.svg";
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
    <section className="hero">
      <div className="hero__content">
        <img src={logo} alt="Ever Guild" className="hero__logo" />

        <h1 className="hero__tagline">
          Software that lasts. Community that builds.
        </h1>

        <p className="hero__description">
          Ever Guild is a community of developers dedicated to building and
          maintaining high-quality open-source software.
        </p>

        <div className="hero__actions">
          <Button href="mailto:n@ever-guild.net" variant="primary" size="lg">
            Get in Touch
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

      <a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </a>
    </section>
  );
});

export default Hero;
