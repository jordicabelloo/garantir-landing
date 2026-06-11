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
        {/* Left — headline + body */}
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
            Garantir compresses a traditional vendor evaluation — weeks of data
            preparation, legal review, and manual testing — into a single
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

        {/* Right — 2×2 stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid rgba(14,13,11,0.14)",
          }}
        >
          {[
            { stat: "< 4h", label: "Full validation run, start to finish" },
            { stat: "100%", label: "Your documents tested — not vendor samples" },
            { stat: "Zero", label: "Sensitive data transmitted to the AI vendor" },
            { stat: "1", label: "Evidence Pack per run, ready for audit" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 2rem",
                borderRight: i % 2 === 0 ? "1px solid rgba(14,13,11,0.14)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(14,13,11,0.14)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(40px, 4.5vw, 62px)",
                  fontWeight: 500,
                  color: "#0e0d0b",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: "0.75rem",
                }}
              >
                {item.stat}
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
