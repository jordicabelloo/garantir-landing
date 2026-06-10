'use client';
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

export default function Preloader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    let animationFrame: number;

    const checkReady = () => {
      if (document.readyState === "complete") {
        setLoaded(true);
      } else {
        animationFrame = requestAnimationFrame(checkReady);
      }
    };

    checkReady();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useLayoutEffect(() => {
    if (loaded && loaderRef.current && textRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          gsap.set(loaderRef.current, {
            pointerEvents: "none",
            display: "none",
          });
        },
      });

      tl.to(textRef.current, { scale: 5, opacity: 0, duration: 0.8 });
      tl.to(
        loaderRef.current,
        {
          y: "-105%",
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
          duration: 1,
        },
        "<"
      );
    }
  }, [loaded]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e0d0b] shadow-2xl"
      style={{
        transform: "translateY(0%)",
        borderBottomLeftRadius: "0%",
        borderBottomRightRadius: "0%",
      }}
    >
      <div ref={textRef} className="flex flex-col items-center gap-4">
        <span
          className="font-serif text-[#ece6d8] text-4xl font-semibold tracking-wide"
          style={{ fontVariationSettings: '"opsz" 60' }}
        >
          Garantir
        </span>
        <span className="font-mono text-[#cbf24e] text-xs tracking-[0.25em] uppercase animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
}
