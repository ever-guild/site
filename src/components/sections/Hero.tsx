import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";
import "./Hero.scss";

const facts = [
  { k: "Operating since", v: "2021", note: "Production work, not experiments" },
  { k: "Delivery mode", v: "Remote-first", note: "Async, documented, available" },
  { k: "Team model", v: "Senior-led", note: "Architecture stays close to code" },
  { k: "Primary focus", v: "Web3 / AI", note: "Infrastructure and products" },
];

const FLOAT_HOVER_RATE = 1.18;

const Hero = React.memo(function Hero() {
  const setFactFloatRate = React.useCallback((card: HTMLElement, rate: number) => {
    card.getAnimations().forEach((animation) => {
      const cssAnimation = animation as Animation & {
        animationName?: string;
        updatePlaybackRate?: (playbackRate: number) => void;
      };

      if (cssAnimation.animationName !== "heroGlassFloat") return;

      if (typeof cssAnimation.updatePlaybackRate === "function") {
        cssAnimation.updatePlaybackRate(rate);
        return;
      }

      cssAnimation.playbackRate = rate;
    });
  }, []);

  const handleFactPointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      if (
        event.pointerType === "touch" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      setFactFloatRate(event.currentTarget, FLOAT_HOVER_RATE);
    },
    [setFactFloatRate],
  );

  const handleFactPointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      setFactFloatRate(event.currentTarget, 1);
    },
    [setFactFloatRate],
  );

  return (
    <section id="hero" className="hero">
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

        </div>

        <aside
          className="hero__signal-field"
          aria-label="Ever Guild operating facts"
        >
          <span className="hero__glass-shard hero__glass-shard--a" aria-hidden="true" />
          <span className="hero__glass-shard hero__glass-shard--b" aria-hidden="true" />
          <span className="hero__glass-shard hero__glass-shard--c" aria-hidden="true" />
          <ul className="hero__facts">
            {facts.map((fact, index) => (
              <li
                key={fact.k}
                className={`hero__fact hero__fact--${index + 1}`}
                onPointerEnter={handleFactPointerEnter}
                onPointerLeave={handleFactPointerLeave}
              >
                <span className="hero__fact-surface">
                  <span className="hero__fact-key">{fact.k}</span>
                  <span className="hero__fact-val">{fact.v}</span>
                  <span className="hero__fact-note">{fact.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
});

export default Hero;
