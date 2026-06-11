"use client";

import { motion } from "framer-motion";
import { Clock, BarChart2, ShieldOff, FileCheck } from "lucide-react";
import DisplayCards from "./display-cards";
import { cn } from "@/lib/utils";

const SHIMMER =
  "linear-gradient(90deg, #0e0d0b 0%, #0e0d0b 25%, #5d7e10 50%, #0e0d0b 75%, #0e0d0b 100%)";

function ShimmerStat({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  return (
    <motion.span
      style={{
        fontFamily: "var(--serif)",
        fontSize: "clamp(28px, 3vw, 40px)",
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "-0.03em",
        background: SHIMMER,
        backgroundSize: "300% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
      }}
      animate={{ backgroundPosition: ["0% center", "100% center", "0% center"] }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {value}
    </motion.span>
  );
}

// Shared classes: all cards start muted (grayscale + overlay), become bright on hover
const MUTED = cn(
  "grayscale hover:grayscale-0",
  "before:absolute before:w-full before:h-full before:content-[''] before:left-0 before:top-0",
  "before:rounded-xl before:bg-[#f2ece0]/55 before:transition-opacity before:duration-500",
  "hover:before:opacity-0",
  "transition-all duration-500"
);

const CARDS = [
  {
    icon: <Clock className="size-3.5 text-[rgba(14,13,11,0.5)]" />,
    title: "< 4h",
    description: "Full validation run, start to finish",
    date: "speed",
    delay: 0,
    className: cn("[grid-area:stack]", "hover:-translate-y-10", MUTED),
  },
  {
    icon: <BarChart2 className="size-3.5 text-[rgba(14,13,11,0.5)]" />,
    title: "100%",
    description: "Your documents tested, not vendor samples",
    date: "coverage",
    delay: 0.6,
    className: cn("[grid-area:stack]", "translate-x-16 translate-y-10", "hover:-translate-y-1", MUTED),
  },
  {
    icon: <ShieldOff className="size-3.5 text-[rgba(14,13,11,0.5)]" />,
    title: "Zero",
    description: "Sensitive data transmitted to the AI vendor",
    date: "privacy",
    delay: 1.2,
    className: cn("[grid-area:stack]", "translate-x-32 translate-y-20", "hover:translate-y-10", MUTED),
  },
  {
    icon: <FileCheck className="size-3.5 text-[rgba(14,13,11,0.5)]" />,
    title: "1",
    description: "Evidence Pack per run, ready for audit",
    date: "output",
    delay: 1.8,
    className: cn("[grid-area:stack]", "translate-x-48 translate-y-[7.5rem]", "hover:translate-y-[5rem]", MUTED),
  },
];

export function OutcomeCards() {
  return (
    <div className="flex items-start justify-center py-6">
      <div className="grid [grid-template-areas:'stack'] place-items-center">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={cn(
              "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-[rgba(14,13,11,0.18)] bg-[#f9f8f6] px-5 py-4",
              "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#f2ece0] after:to-transparent after:content-['']",
              "hover:border-[rgba(14,13,11,0.3)] hover:shadow-lg",
              "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
              card.className
            )}
          >
            {/* Title row with icon + shimmer number */}
            <div>
              <span className="relative inline-flex shrink-0 items-center justify-center rounded-full border border-[rgba(14,13,11,0.14)] bg-[#ece8df] p-1.5">
                {card.icon}
              </span>
              <ShimmerStat value={card.title} delay={card.delay} />
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-[rgba(14,13,11,0.65)]">
              {card.description}
            </p>

            {/* Badge */}
            <p className="font-mono text-[10px] uppercase tracking-widest text-[rgba(14,13,11,0.35)]">
              {card.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
