"use client";

const BEATS = [
  {
    number: "01",
    title: "The demo looks perfect.",
    body: "Vendors test on clean, curated data. Yours has exceptions, partial scans, legacy formats, and edge cases they never designed for. The demo is not a test — it is a pitch.",
  },
  {
    number: "02",
    title: "There is no baseline to compare against.",
    body: "Without a pre-deployment test on your own documents, accuracy is a number with no meaning. You do not know if 94% is safe for your workflow — or if that 6% is the category that costs you most.",
  },
  {
    number: "03",
    title: "The commitment comes before the evidence.",
    body: "By the time you find the gaps, the contract is signed, the team is trained, and switching is expensive. The decision to deploy is the decision that is hardest to undo.",
  },
];

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
          maxWidth: "520px",
        }}
      >
        Every finance team evaluating an AI vendor goes through the same
        sequence. And every team finds out too late.
      </p>

      <div
        style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2.5rem",
        }}
      >
        {BEATS.map((beat) => (
          <div
            key={beat.number}
            style={{
              borderTop: "1px dashed rgba(14,13,11,0.25)",
              paddingTop: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--signal)",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {beat.number}
            </span>
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(17px, 1.4vw, 21px)",
                fontWeight: 400,
                color: "#0e0d0b",
                lineHeight: 1.25,
                marginBottom: "0.85rem",
              }}
            >
              {beat.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: 14,
                color: "rgba(14,13,11,0.55)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {beat.body}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "4rem",
          paddingLeft: "2rem",
          borderLeft: "2px solid var(--signal)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(18px, 1.6vw, 24px)",
            fontWeight: 400,
            color: "#0e0d0b",
            lineHeight: 1.4,
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Garantir gives you the verdict before the commitment.
        </p>
      </div>
    </div>
  );
}
