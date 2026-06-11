"use client";

const INDUSTRIES = [
  {
    label: "Finance & Accounts Payable",
    pain: "A misread invoice can trigger a fraudulent payment, a duplicate supplier charge, or a VAT compliance breach.",
    consequence:
      "The Finance Director is accountable — not the AI vendor. Regulators and auditors expect documented evidence that the tool was validated before it was authorised.",
  },
  {
    label: "Insurance & Claims",
    pain: "A wrong field extraction in a claims document can produce an incorrect payout decision.",
    consequence:
      "One regulatory complaint can trigger a full audit of your AI workflow. Proof of pre-deployment testing is the difference between an isolated error and a systemic finding.",
  },
  {
    label: "Legal & Contracts",
    pain: "A missed clause or wrong date is not a bug report — it is a liability.",
    consequence:
      "Legal teams evaluating AI drafting or review tools need documented evidence before any document touches a client matter. Professional indemnity depends on the process, not just the outcome.",
  },
];

export function RegulatedIndustries() {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: "clamp(15px, 1.3vw, 18px)",
          color: "rgba(14,13,11,0.58)",
          lineHeight: 1.6,
          marginTop: "1.25rem",
          maxWidth: "540px",
        }}
      >
        Most companies can move fast and fix later. Regulated companies cannot.
      </p>

      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: 14,
          color: "rgba(14,13,11,0.48)",
          lineHeight: 1.7,
          marginTop: "0.85rem",
          maxWidth: "520px",
        }}
      >
        In finance, insurance, and legal, a wrong AI output is not just a
        mistake — it is a compliance event. You answer to auditors, regulators,
        and clients who expect documented due diligence.{" "}
        <em>"We tested it"</em> requires proof.
      </p>

      <div
        style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2px",
          background: "rgba(14,13,11,0.12)",
        }}
      >
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.label}
            style={{
              background: "#f2ece0",
              padding: "2.25rem 2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--signal)",
                display: "block",
                marginBottom: "1.25rem",
              }}
            >
              {ind.label}
            </span>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: 15,
                fontWeight: 500,
                color: "#0e0d0b",
                lineHeight: 1.5,
                marginBottom: "0.85rem",
                margin: 0,
              }}
            >
              {ind.pain}
            </p>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: 13.5,
                color: "rgba(14,13,11,0.52)",
                lineHeight: 1.65,
                marginTop: "0.85rem",
                margin: 0,
              }}
            >
              {ind.consequence}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "3.5rem",
          padding: "1.75rem 2rem",
          background: "rgba(14,13,11,0.04)",
          borderLeft: "2px solid var(--signal)",
          maxWidth: 640,
        }}
      >
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: 14,
            color: "rgba(14,13,11,0.62)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          The Evidence Pack Garantir produces is designed for this standard. It
          is readable by your CFO, your compliance lead, and your external
          auditors — not just your technical team.
        </p>
      </div>
    </div>
  );
}
