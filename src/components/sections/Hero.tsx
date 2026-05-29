import React from "react";
import { Button } from "../ui/Button";
import "./Hero.scss";

const Hero = React.memo(function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <h1 className="hero__tagline">
          Software that lasts.
          <br />
          <span className="hero__tagline-accent">Community</span> that builds.
        </h1>

        <p className="hero__description">
          Senior engineers who ship Web3, AI and full-stack products built to
          survive production – and stay maintainable long after launch.
        </p>

        <div className="hero__actions">
          <Button href="https://order.ever-guild.net/" variant="primary" size="lg">
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
      </div>
    </section>
  );
});

export default Hero;
