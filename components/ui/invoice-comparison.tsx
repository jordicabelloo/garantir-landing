"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";

// ─── Fake company data ───────────────────────────────────────────────────────

const ORIGINAL = {
  company:    "Meridian Capital Partners S.L.",
  address:    "Passeig de Gràcia 92, 08008 Barcelona",
  invoiceNum: "INV-2024-0847",
  date:       "15 November 2024",
  due:        "15 December 2024",
  billTo:     "TechSolutions Group Ltd.",
  billAddr:   "14 Finsbury Square, London EC2A 1HP",
  item:       "Q4 Advisory & Compliance Services",
  subtotal:   "€124,500.00",
  vat:        "€26,145.00",
  total:      "€150,645.00",
  poRef:      "PO-2024-441",
  iban:       "ES91 2100 0418 4502 0005 1332",
};

const TWIN = {
  company:    "Veltran Kapital S.L.",
  address:    "Carrer de Mallorca 44, 08001 Barcelona",
  invoiceNum: "INV-2024-7832",
  date:       "03 March 2024",
  due:        "03 April 2024",
  billTo:     "Korenth Solutions Ltd.",
  billAddr:   "31 Bishopsgate, London EC2N 3AQ",
  item:       "Q1 Consulting & Advisory Services",
  subtotal:   "€89,234.00",
  vat:        "€18,739.14",
  total:      "€107,973.14",
  poRef:      "PO-2024-817",
  iban:       "ES29 3121 0900 1703 0086 2312",
};

// ─── Invoice panel ────────────────────────────────────────────────────────────

// ─── Theme tokens per panel ───────────────────────────────────────────────────

const DARK = {
  bg:      "#0e0d0b",
  accent:  "#cbf24e",
  muted:   "rgba(203,242,78,0.45)",
  val:     "#cbf24e",
  line:    "rgba(203,242,78,0.14)",
  body:    "rgba(236,230,216,0.75)",
};

const LIGHT = {
  bg:      "#ffffff",
  accent:  "#0e0d0b",
  muted:   "#888",
  val:     "#0e0d0b",
  line:    "#e0e0e0",
  body:    "#333",
};

// ─── Invoice panel ────────────────────────────────────────────────────────────

function InvoicePanel({ data, isTwin }: { data: typeof ORIGINAL; isTwin: boolean }) {
  const t = isTwin ? DARK : LIGHT;

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: t.bg,
      fontFamily: "var(--sans)",
      fontSize: 11.5,
      color: t.body,
      padding: "28px 28px 20px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>

      {/* Twin badge */}
      {isTwin && (
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "rgba(203,242,78,0.1)",
          border: "1px solid rgba(203,242,78,0.3)",
          borderRadius: 4,
          padding: "2px 8px",
          fontSize: 9.5,
          fontFamily: "var(--mono)",
          color: "#cbf24e",
          letterSpacing: "0.04em",
        }}>
          PROTECTED TWIN · FPE
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.accent, letterSpacing: "-0.01em" }}>
          {data.company}
        </div>
        <div style={{ fontSize: 10.5, color: t.muted, marginTop: 2 }}>{data.address}</div>
      </div>

      {/* Title + meta */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: t.accent }}>INVOICE</div>
        <div style={{ textAlign: "right" }}>
          <Row label="Invoice" value={data.invoiceNum} t={t} mono />
          <Row label="Date"    value={data.date}       t={t} />
          <Row label="Due"     value={data.due}        t={t} />
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${t.line}`, marginBottom: 12 }} />

      {/* Bill to */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: t.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>
          Bill To
        </div>
        <div style={{ fontWeight: 600, color: t.accent }}>{data.billTo}</div>
        <div style={{ color: t.muted, fontSize: 10.5 }}>{data.billAddr}</div>
        <div style={{ color: t.muted, fontSize: 10.5 }}>PO Ref: {data.poRef}</div>
      </div>

      {/* Line items */}
      <div style={{ flex: 1 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`,
          padding: "6px 0", marginBottom: 8,
        }}>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: t.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Description</span>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: t.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Amount</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "4px 0" }}>
          <span style={{ color: t.body }}>{data.item}</span>
          <span style={{ fontFamily: "var(--mono)", color: t.val, fontWeight: 600, fontSize: 11 }}>{data.subtotal}</span>
        </div>
      </div>

      {/* Totals */}
      <div style={{ borderTop: `1px solid ${t.line}`, marginTop: 10, paddingTop: 8 }}>
        <TotalRow label="Subtotal"  value={data.subtotal} t={t} />
        <TotalRow label="VAT (21%)" value={data.vat}      t={t} />
        <TotalRow label="TOTAL"     value={data.total}    t={t} bold />
      </div>

      {/* Footer */}
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid ${t.line}` }}>
        <div style={{ fontSize: 9.5, color: t.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>Bank Details</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: t.val }}>{data.iban}</div>
      </div>
    </div>
  );
}

type Theme = typeof DARK;

function Row({ label, value, t, mono }: { label: string; value: string; t: Theme; mono?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 2 }}>
      <span style={{ fontSize: 10, color: t.muted }}>{label}</span>
      <span style={{ fontSize: 10, color: t.val, fontFamily: mono ? "var(--mono)" : "var(--sans)", fontWeight: 600, minWidth: 110, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function TotalRow({ label, value, t, bold }: { label: string; value: string; t: Theme; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
      <span style={{ fontSize: bold ? 11.5 : 10.5, fontWeight: bold ? 700 : 400, color: bold ? t.accent : t.muted }}>{label}</span>
      <span style={{ fontSize: bold ? 12.5 : 10.5, fontWeight: bold ? 700 : 500, fontFamily: "var(--mono)", color: t.val }}>{value}</span>
    </div>
  );
}

// ─── Comparison slider ────────────────────────────────────────────────────────

export function InvoiceComparison() {
  const [inset, setInset]           = useState(62);
  const [dragging, setDragging]     = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;
    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = (e as React.MouseEvent).clientX - rect.left;
    }
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setInset(pct);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "2px" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "#4a6b1c", letterSpacing: "0.05em" }}>
          ← PROTECTED TWIN · what the AI sees
        </span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "rgba(14,13,11,0.45)", letterSpacing: "0.05em" }}>
          YOUR INVOICE · real data →
        </span>
      </div>

      {/* Outer wrapper — overflow visible so handle can stick out */}
      <div
        style={{ position: "relative", width: "100%", height: 460, cursor: "ew-resize", userSelect: "none" }}
        onMouseMove={handleMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchMove={handleMove}
        onTouchEnd={() => setDragging(false)}
      >
        {/* Inner clip area — panels + divider line only */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", border: "1px solid rgba(14,13,11,0.12)" }}>
          {/* Background: Protected Twin */}
          <div style={{ position: "absolute", inset: 0 }}>
            <InvoicePanel data={TWIN} isTwin />
          </div>

          {/* Foreground: Original Invoice — clips from left at inset% */}
          <div style={{
            position: "absolute", inset: 0,
            clipPath: `inset(0 0 0 ${inset}%)`,
            transition: dragging ? "none" : "clip-path 0.05s",
          }}>
            <InvoicePanel data={ORIGINAL} isTwin={false} />
          </div>

          {/* Divider line */}
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${inset}%`, width: 2,
            background: "#0e0d0b",
            zIndex: 20,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Handle — outside overflow:hidden, can extend beyond document edges */}
        <button
          style={{
            position: "absolute",
            top: "50%",
            left: `${inset}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 30,
            width: 32,
            height: 52,
            background: "#0e0d0b",
            border: "none",
            borderRadius: 6,
            cursor: "ew-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
          }}
          onMouseDown={(e) => { setDragging(true); handleMove(e); }}
          onTouchStart={(e) => { setDragging(true); handleMove(e); }}
          onMouseUp={() => setDragging(false)}
          onTouchEnd={() => setDragging(false)}
        >
          <GripVertical size={14} color="#cbf24e" />
        </button>
      </div>

      {/* Hint */}
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(14,13,11,0.35)", textAlign: "center", letterSpacing: "0.05em" }}>
        drag to compare
      </div>
    </div>
  );
}
