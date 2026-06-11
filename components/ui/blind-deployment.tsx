"use client";

import { GarantirFlowDiagram } from "./garantir-flow-diagram";
import { OutcomeCards } from "./outcome-cards";

export function BlindDeployment() {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: "clamp(15px, 1.3vw, 18px)",
          color: "rgba(14,13,11,0.58)",
          lineHeight: 1.6,
          marginTop: "1.25rem",
          maxWidth: "560px",
        }}
      >
        Every AI vendor demo looks perfect. Your documents are different. Before
        you sign, Garantir runs the vendor on your real data, with your privacy
        protected, and delivers a verdict you can act on.
      </p>

      <GarantirFlowDiagram />

      {/* Outcome block */}
      <div
        style={{
          marginTop: "5rem",
          borderTop: "1px dashed rgba(14,13,11,0.25)",
          paddingTop: "4rem",
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* Left,headline + body */}
        <div>
          <span
            style={{
              fontFamily: "var(--mono, monospace)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--signal)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                background: "var(--signal)",
                flexShrink: 0,
              }}
            />
            Outcome
          </span>
          <h3
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 500,
              color: "#0e0d0b",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            A complete verdict in an afternoon.
          </h3>
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: 14.5,
              color: "rgba(14,13,11,0.58)",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            Garantir compresses a traditional vendor evaluation,weeks of data
            preparation, legal review, and manual testing,into a single
            automated run on your own documents.
          </p>
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: 14.5,
              color: "rgba(14,13,11,0.58)",
              lineHeight: 1.7,
            }}
          >
            At the end, you have a structured Evidence Pack your CFO can read
            and your auditors can reference. No vendor access to your data
            required.
          </p>
        </div>

        {/* Right — animated outcome cards */}
        <OutcomeCards />
      </div>
    </div>
  );
}
