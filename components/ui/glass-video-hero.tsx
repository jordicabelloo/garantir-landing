'use client';
import { useState, useEffect } from "react";
import { FrameButton } from "@/components/ui/frame-button";
import { DitheringShader } from "@/components/ui/dithering-shader";

type HeroSectionProps = {
  onCTA?: () => void;
};

export const HeroSection = ({ onCTA }: HeroSectionProps) => {
  const [dims, setDims] = useState({ w: 1920, h: 1080 });

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      id="top"
      className="relative flex flex-col bg-background overflow-hidden"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      {/* Grid lines — fixed so they cross the navbar and run full viewport height */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 55 }} aria-hidden="true">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-20rem)] border-x border-dashed border-[rgba(236,230,216,0.3)]" />
      </div>

      {/* Dithering shader — constrained to inner column only */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-20rem)] overflow-hidden">
        <DitheringShader
          width={dims.w}
          height={dims.h}
          shape="wave"
          type="8x8"
          colorBack="#0e0d0b"
          colorFront="#3d6010"
          pxSize={3}
          speed={0.35}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[rgba(14,13,11,0.55)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-14">
        <div className="w-[calc(100%-20rem)] mx-auto px-16">
          <div className="flex flex-col items-start text-left max-w-xl">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-[6px] border border-[rgba(203,242,78,0.35)] bg-[rgba(14,13,11,0.6)] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-primary">
                Pre-deployment validation · finance &amp; regulated teams
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-foreground text-[clamp(42px,5.5vw,72px)] leading-[0.97] tracking-[-0.025em] mb-5"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Test it on the<br />
              files that{" "}
              <em className="italic text-primary" style={{ fontVariationSettings: '"opsz" 144' }}>
                scare
              </em>{" "}
              you.
            </h1>

            {/* Subtext */}
            <p className="font-sans text-base text-muted-foreground max-w-[440px] leading-relaxed mb-8">
              Not demo data. Not fake invoices. Garantir proves whether a finance AI
              works on <strong className="text-foreground">your</strong> edge cases —
              before it ever touches real money.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <FrameButton variant="default" onClick={onCTA} size={14} offset={6} hoverOffset={5}>
                Get the verdict
              </FrameButton>
              <FrameButton
                variant="secondary"
                size={14} offset={6} hoverOffset={5}
                onClick={() => document.getElementById("tested")?.scrollIntoView({ behavior: "smooth" })}
              >
                See what we test
              </FrameButton>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
