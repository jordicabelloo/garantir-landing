'use client';
import { FrameButton } from "@/components/ui/frame-button";

type HeroSectionProps = {
  onCTA?: () => void;
};

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

export const HeroSection = ({ onCTA }: HeroSectionProps) => {
  return (
    <div id="top" className="relative flex flex-col bg-background overflow-hidden" style={{ height: 'calc(100vh - 3.5rem)' }}>

      {/* Grid lines — z-[55] sits above header (z-50) so verticals cut through nav */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 55 }} aria-hidden="true">
        <div className="absolute top-14 left-0 right-0 border-t border-dashed border-[rgba(236,230,216,0.3)]" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-20rem)] border-x border-dashed border-[rgba(236,230,216,0.3)]" />
      </div>

      {/* Video */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-20rem)] overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
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
