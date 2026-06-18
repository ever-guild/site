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
          <span className="hero__tagline-accent">Team</span> that builds.
        </h1>

        <p className="hero__description">
          Senior engineers for Web3, AI, and full-stack products: shipped to
          production, maintained without the debt that slows you down later.
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
      </div>
    </section>
  );
});

export default Hero;
