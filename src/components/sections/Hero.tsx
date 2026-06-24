import React from "react";
import { ArrowUpRight } from "lucide-react";
import heroBrandRaster from "../../assets/hero-brand-raster.webp";
import { Button } from "../ui/Button";
import "./Hero.scss";

const facts = [
  { k: "Since", v: "2021" },
  { k: "Mode", v: "Remote-first" },
  { k: "Team", v: "Senior-led" },
  { k: "Focus", v: "Web3 / AI" },
];

const Hero = React.memo(function Hero() {
  return (
    <section id="hero" className="hero">
      <img
        className="hero__art"
        src={heroBrandRaster}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
      />
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__tagline">
            Build what lasts.
            <br />
            <span className="hero__tagline-accent">Keep it running.</span>
          </h1>

          <p className="hero__description">
            Senior engineers for <strong>Web3 infrastructure</strong>,{" "}
            <strong>AI products</strong> and <strong>full-stack platforms</strong>,
            from architecture to production support.
          </p>

          <div className="hero__actions">
            <Button
              href="https://order.ever-guild.net/"
              variant="primary"
              size="lg"
              icon={<ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />}
            >
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

          <ul className="hero__facts" aria-label="Ever Guild facts">
            {facts.map((fact) => (
              <li key={fact.k} className="hero__fact">
                <span className="hero__fact-key">{fact.k}</span>
                <span className="hero__fact-val">{fact.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default Hero;
