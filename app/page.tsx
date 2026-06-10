"use client";

import { useState, useEffect, useCallback } from "react";
import WaitlistModal from "@/components/WaitlistModal";
import { Header } from "@/components/ui/header-1";
import { HeroSection } from "@/components/ui/glass-video-hero";
import { TrustedBy } from "@/components/ui/trusted-by";
import { GarantirFooter } from "@/components/ui/flickering-footer";
import { PixelTrail } from "@/components/ui/pixel-trail";

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
          <div className="w-[calc(100%-20rem)] mx-auto px-16" style={{ minHeight: 400 }} />
        </section>

        {/* SECTION 2 */}
        <section style={{ padding: '96px 0', borderTop: '1px dashed rgba(14,13,11,0.25)' }}>
          <div className="w-[calc(100%-20rem)] mx-auto px-16" style={{ minHeight: 400 }} />
        </section>

        {/* SECTION 3 */}
        <section style={{ padding: '96px 0', borderTop: '1px dashed rgba(14,13,11,0.25)' }}>
          <div className="w-[calc(100%-20rem)] mx-auto px-16" style={{ minHeight: 400 }} />
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
