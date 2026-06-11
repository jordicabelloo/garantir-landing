"use client";

import { useState, useEffect, useCallback } from "react";
import WaitlistModal from "@/components/WaitlistModal";
import { Header } from "@/components/ui/header-1";
import { HeroSection } from "@/components/ui/glass-video-hero";
import { TrustedBy } from "@/components/ui/trusted-by";
import { GarantirFooter } from "@/components/ui/flickering-footer";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { ValidationDemo } from "@/components/ui/validation-demo";
import { InvoiceComparison } from "@/components/ui/invoice-comparison";
import { GarantirFaq } from "@/components/ui/garantir-faq";
import { BlindDeployment } from "@/components/ui/blind-deployment";
import { RegulatedIndustries } from "@/components/ui/regulated-industries";
import { GenerativeMountainScene } from "@/components/ui/mountain-scene";

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.querySelectorAll<HTMLElement>(".count").forEach(runCount);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
        <Header onCTA={openModal} />
        <HeroSection onCTA={openModal} />
        <TrustedBy />

        <div className="light-band" style={{ position: 'relative' }}>
        {/* Dark vertical grid lines for light sections */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-20rem)] border-x border-dashed border-[rgba(14,13,11,0.25)]" />
        </div>
        {/* Pixel trail — left margin */}
        <div className="absolute top-0 left-0 h-full pointer-events-auto overflow-hidden" style={{ width: '10rem', zIndex: 10 }}>
          <PixelTrail pixelSize={16} fadeDuration={800} delay={0} pixelClassName="rounded-full bg-[#5d7e10] opacity-40" />
        </div>
        {/* Pixel trail — right margin */}
        <div className="absolute top-0 right-0 h-full pointer-events-auto overflow-hidden" style={{ width: '10rem', zIndex: 10 }}>
          <PixelTrail pixelSize={16} fadeDuration={800} delay={0} pixelClassName="rounded-full bg-[#5d7e10] opacity-40" />
        </div>
        {/* SECTION 1 */}
        <section style={{ padding: '96px 0' }}>
          <div className="w-[calc(100%-20rem)] mx-auto px-16">
            <h2>The blind deployment problem</h2>
            <BlindDeployment />
          </div>
        </section>

        {/* SECTION 2 */}
        <section style={{ padding: '96px 0', borderTop: '1px dashed rgba(14,13,11,0.25)' }}>
          <div className="w-[calc(100%-20rem)] mx-auto px-16">

            {/* Title + subtitle */}
            <h2>How it works</h2>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              color: 'rgba(14,13,11,0.58)',
              lineHeight: 1.6,
              marginTop: '1.25rem',
              maxWidth: '520px',
            }}>
              Three automated steps. Your data never leaves your machine. At the end, a decision-grade Evidence Pack your CFO and auditors can act on.
            </p>

            {/* Block 1 — Run a validation */}
            <div style={{ marginTop: '4rem' }}>
              <span className="eyebrow" style={{ color: 'var(--signal)', marginBottom: '0.75rem', display: 'inline-flex' }}>
                01 — Run a validation
              </span>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: 13.5,
                color: 'rgba(14,13,11,0.55)',
                lineHeight: 1.65,
                marginTop: '0.6rem',
                marginBottom: '1.75rem',
                maxWidth: '480px',
              }}>
                Upload your invoice folder and answer key. Garantir validates the files, creates a protected twin, and runs the AI vendor — all in one click.
              </p>
              <ValidationDemo />
            </div>

            {/* Block 2 — The Protected Twin */}
            <div style={{ marginTop: '5rem' }}>
              <span className="eyebrow" style={{ color: 'var(--signal)', display: 'inline-flex' }}>
                02 — The Protected Twin
              </span>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: 13.5,
                color: 'rgba(14,13,11,0.55)',
                lineHeight: 1.65,
                marginTop: '0.6rem',
                marginBottom: '1.75rem',
                maxWidth: '480px',
              }}>
                Your originals are never sent to the AI vendor. Garantir substitutes them with a format-preserving encrypted twin — same structure, different values. Drag to compare what the AI sees vs. your real data.
              </p>
              <InvoiceComparison />
            </div>

          </div>
        </section>

        {/* SECTION 3 */}
        <section style={{ paddingTop: '96px', paddingBottom: 0, borderTop: '1px dashed rgba(14,13,11,0.25)', overflow: 'hidden' }}>
          <div className="w-[calc(100%-20rem)] mx-auto px-16">
            <h2>Built for regulated industries</h2>
            <RegulatedIndustries />
          </div>
          {/* Full-width terrain anchored to section bottom */}
          <div style={{ position: 'relative', height: 280, width: '100%', marginTop: '4rem' }}>
            <GenerativeMountainScene />
          </div>
        </section>

        {/* SECTION 4 */}
        <section style={{ padding: '96px 0', borderTop: '1px dashed rgba(14,13,11,0.25)' }}>
          <div className="w-[calc(100%-20rem)] mx-auto px-16">
            <h2>Common questions</h2>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              color: 'rgba(14,13,11,0.58)',
              lineHeight: 1.6,
              marginTop: '1.25rem',
              marginBottom: '3rem',
              maxWidth: '480px',
            }}>
              What every CFO and compliance lead asks before joining the waitlist.
            </p>
            <GarantirFaq />
          </div>
        </section>
        </div>

        <GarantirFooter />

        <WaitlistModal open={modalOpen} onClose={closeModal} />
      </>
  );
}

function runCount(node: HTMLElement) {
  if (node.dataset.done) return;
  node.dataset.done = "1";
  const to = parseInt(node.dataset.to ?? "0", 10);
  const dur = 1200;
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  function tick(now: number) {
    const p = Math.min((now - start) / dur, 1);
    node.textContent = String(Math.round(ease(p) * to));
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
