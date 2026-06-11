"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, CircleDotDashed, Play, RotateCcw } from "lucide-react";

type StepStatus = "pending" | "in-progress" | "completed";

interface Step {
  id: number;
  title: string;
  label: string;
}

const STEPS: Step[] = [
  { id: 1, title: "Load Invoice Data",         label: "Invoice folder + answer key validated" },
  { id: 2, title: "Create Protected Twin",      label: "FPE transform — data never leaves your machine" },
  { id: 3, title: "Run AI Validation",          label: "AI vendor runs on the twin, not your originals" },
];

// ms when each step transitions in/out
const TIMINGS = [
  { start: 0,    end: 800  },
  { start: 800,  end: 1800 },
  { start: 1800, end: 3000 },
];
const RESULT_AT = 3200;

function StatusIcon({ status }: { status: StepStatus }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={status}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.18 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        {status === "completed"  && <CheckCircle2  size={16} color="#cbf24e" />}
        {status === "in-progress" && <CircleDotDashed size={16} color="#efb14a" />}
        {status === "pending"    && <Circle         size={16} color="rgba(236,230,216,0.28)" />}
      </motion.span>
    </AnimatePresence>
  );
}

export function ValidationDemo() {
  const [statuses, setStatuses] = useState<StepStatus[]>(["pending", "pending", "pending"]);
  const [showResult, setShowResult] = useState(false);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function reset() {
    clearTimers();
    setStatuses(["pending", "pending", "pending"]);
    setShowResult(false);
    setRunning(false);
  }

  function run() {
    if (running) return;
    reset();
    setRunning(true);

    TIMINGS.forEach(({ start, end }, i) => {
      timers.current.push(
        setTimeout(() => setStatuses(prev => { const s = [...prev]; s[i] = "in-progress"; return s; }), start)
      );
      timers.current.push(
        setTimeout(() => setStatuses(prev => { const s = [...prev]; s[i] = "completed"; return s; }), end)
      );
    });

    timers.current.push(
      setTimeout(() => { setShowResult(true); setRunning(false); }, RESULT_AT)
    );
  }

  useEffect(() => () => clearTimers(), []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2rem" }}>

      {/* Terminal card */}
      <div style={{
        background: "#0e0d0b",
        border: "1px solid rgba(236,230,216,0.12)",
        borderRadius: "8px",
        overflow: "hidden",
        width: "100%",
        maxWidth: "560px",
      }}>
        {/* Window chrome */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(236,230,216,0.08)",
          background: "rgba(255,255,255,0.03)",
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e2573e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#efb14a", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#cbf24e", display: "inline-block" }} />
          <span style={{ marginLeft: 8, fontFamily: "var(--mono)", fontSize: 11, color: "rgba(236,230,216,0.35)" }}>
            garantir · validation
          </span>
        </div>

        {/* Steps */}
        <div style={{ padding: "20px 20px 24px" }}>
          {STEPS.map((step, i) => {
            const status = statuses[i];
            return (
              <div key={step.id} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: i < STEPS.length - 1 ? "20px" : 0 }}>
                {/* Icon + connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <StatusIcon status={status} />
                  {i < STEPS.length - 1 && (
                    <div style={{
                      width: 1,
                      height: 28,
                      marginTop: 4,
                      background: status === "completed"
                        ? "rgba(203,242,78,0.3)"
                        : "rgba(236,230,216,0.1)",
                      transition: "background 0.4s ease",
                    }} />
                  )}
                </div>

                {/* Text */}
                <div style={{ paddingTop: 0 }}>
                  <div style={{
                    fontFamily: "var(--sans)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: status === "pending" ? "rgba(236,230,216,0.35)" : "#ece6d8",
                    transition: "color 0.3s ease",
                    lineHeight: 1.3,
                  }}>
                    Step {step.id} — {step.title}
                  </div>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: status === "in-progress" ? "#efb14a" : "rgba(236,230,216,0.28)",
                    marginTop: 3,
                    transition: "color 0.3s ease",
                  }}>
                    {status === "in-progress" ? "running..." : step.label}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Result */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                style={{
                  marginTop: 24,
                  padding: "12px 16px",
                  background: "rgba(203,242,78,0.06)",
                  border: "1px solid rgba(203,242,78,0.2)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#cbf24e", marginBottom: 2 }}>
                    PASS
                  </div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "rgba(236,230,216,0.7)" }}>
                    98.3% accuracy · 12 fields validated · Evidence Pack ready
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button row */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={run}
          disabled={running}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            background: running ? "rgba(14,13,11,0.5)" : "#0e0d0b",
            color: running ? "rgba(236,230,216,0.35)" : "#ece6d8",
            border: "1px solid rgba(14,13,11,0.4)",
            borderRadius: 4,
            fontFamily: "var(--sans)",
            fontSize: 13,
            fontWeight: 500,
            cursor: running ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.01em",
          }}
        >
          <Play size={13} />
          Run Validation
        </button>

        {showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 16px",
              background: "transparent",
              color: "rgba(14,13,11,0.4)",
              border: "1px solid rgba(14,13,11,0.15)",
              borderRadius: 4,
              fontFamily: "var(--sans)",
              fontSize: 12,
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
          >
            <RotateCcw size={11} />
            Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}
