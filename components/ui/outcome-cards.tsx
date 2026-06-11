"use client";

import { motion } from "framer-motion";

const STATS = [
  { stat: "< 4h",  label: "Full validation run, start to finish" },
  { stat: "100%",  label: "Your documents tested, not vendor samples" },
  { stat: "Zero",  label: "Sensitive data transmitted to the AI vendor" },
  { stat: "1",     label: "Evidence Pack per run, ready for audit" },
];

// Dark base with a signal-green shimmer traveling across the number
const SHIMMER =
  "linear-gradient(90deg, #0e0d0b 0%, #0e0d0b 25%, #5d7e10 50%, #0e0d0b 75%, #0e0d0b 100%)";

export function OutcomeCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
      }}
    >
      {STATS.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{
            y: -3,
            boxShadow: "0 8px 28px rgba(14,13,11,0.09)",
            borderColor: "rgba(14,13,11,0.26)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            background: "#f9f8f6",
            border: "1px solid rgba(14,13,11,0.14)",
            padding: "2.5rem 2rem",
            position: "relative",
            cursor: "default",
          }}
        >
          {/* Animated shimmer number */}
          <motion.div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(40px, 4.5vw, 62px)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
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
              delay: i * 0.7,
            }}
          >
            {item.stat}
          </motion.div>

          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 13.5,
              color: "rgba(14,13,11,0.52)",
              lineHeight: 1.5,
            }}
          >
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
