"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, ShieldCheck, Cpu, ClipboardCheck, ChevronDown } from "lucide-react";

type NodeKey = "TL" | "TR" | "BR" | "BL";
type PairKey = "top" | "bottom";
type EdgeDir = "right" | "bottom" | "left" | "top";

interface NodeDef {
  key: NodeKey;
  pair: PairKey;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  sub: string;
  detail: string;
}

const NODES: NodeDef[] = [
  {
    key: "TL",
    pair: "top",
    Icon: FileText,
    title: "Your Invoice Folder",
    sub: "Finance · Compliance · Ops",
    detail:
      "Upload your real invoice batch and an answer key. Garantir validates file integrity, catches edge cases and legacy formats, and creates a protected snapshot — before any vendor touches your data.",
  },
  {
    key: "TR",
    pair: "top",
    Icon: ShieldCheck,
    title: "Protected Twin",
    sub: "Anonymized · Format-preserving",
    detail:
      "Every sensitive value is replaced with a cryptographic equivalent. Same document layout, different data. The AI vendor processes this copy — your originals never leave your environment.",
  },
  {
    key: "BR",
    pair: "bottom",
    Icon: Cpu,
    title: "AI Vendor",
    sub: "IDP · OCR · Extraction",
    detail:
      "The vendor's engine runs against the Protected Twin under Garantir's supervision. Output is captured field by field and compared against your answer key in real time.",
  },
  {
    key: "BL",
    pair: "bottom",
    Icon: ClipboardCheck,
    title: "Evidence Pack",
    sub: "Accuracy score · Audit trail",
    detail:
      "A structured report with field-level accuracy, confidence bands, failure categories, and a chain-of-custody log. Decision-grade evidence your CFO and auditors can act on immediately.",
  },
];

// labelOffset: perpendicular to the arrow direction so text doesn't sit on the line
const ARROW_DEFS = [
  {
    from: "TL" as NodeKey, to: "TR" as NodeKey,
    fromEdge: "right" as EdgeDir, toEdge: "left" as EdgeDir,
    label: "encrypts & anonymizes",
    delay: 0,
    labelOffset: { x: 0, y: -16 },
  },
  {
    from: "TR" as NodeKey, to: "BR" as NodeKey,
    fromEdge: "bottom" as EdgeDir, toEdge: "top" as EdgeDir,
    label: "vendor processes twin",
    delay: 500,
    labelOffset: { x: 20, y: 0 },
  },
  {
    from: "BR" as NodeKey, to: "BL" as NodeKey,
    fromEdge: "left" as EdgeDir, toEdge: "right" as EdgeDir,
    label: "output scored",
    delay: 1000,
    labelOffset: { x: 0, y: 16 },
  },
  {
    from: "BL" as NodeKey, to: "TL" as NodeKey,
    fromEdge: "top" as EdgeDir, toEdge: "bottom" as EdgeDir,
    label: "verdict delivered",
    delay: 1500,
    labelOffset: { x: -20, y: 0 },
  },
];

interface ArrowPath {
  d: string;
  labelX: number;
  labelY: number;
}

function getEdgePt(rect: DOMRect, edge: EdgeDir, ox: number, oy: number) {
  const l = rect.left - ox, t = rect.top - oy;
  const r = rect.right - ox, b = rect.bottom - oy;
  const mx = (l + r) / 2, my = (t + b) / 2;
  switch (edge) {
    case "right":  return { x: r,  y: my };
    case "left":   return { x: l,  y: my };
    case "top":    return { x: mx, y: t  };
    case "bottom": return { x: mx, y: b  };
  }
}

function buildPath(
  fromRect: DOMRect,
  toRect: DOMRect,
  cr: DOMRect,
  fromEdge: EdgeDir,
  toEdge: EdgeDir,
  labelOffset: { x: number; y: number }
): ArrowPath {
  const ox = cr.left, oy = cr.top;
  const p0 = getEdgePt(fromRect, fromEdge, ox, oy);
  const p2 = getEdgePt(toRect, toEdge, ox, oy);
  const mx = (p0.x + p2.x) / 2, my = (p0.y + p2.y) / 2;
  const cx = cr.width / 2, cy = cr.height / 2;
  // Quadratic bezier CP pulled 30% toward container center → curves inward
  const cpX = mx + (cx - mx) * 0.3;
  const cpY = my + (cy - my) * 0.3;
  // Label at bezier midpoint t=0.5: p0/4 + cp/2 + p2/4
  return {
    d: `M ${p0.x} ${p0.y} Q ${cpX} ${cpY} ${p2.x} ${p2.y}`,
    labelX: p0.x / 4 + cpX / 2 + p2.x / 4 + labelOffset.x,
    labelY: p0.y / 4 + cpY / 2 + p2.y / 4 + labelOffset.y,
  };
}

export function GarantirFlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<NodeKey, HTMLDivElement | null>>>({});
  const [paths, setPaths] = useState<Partial<Record<string, ArrowPath>>>({});
  const [expandedPair, setExpandedPair] = useState<PairKey | null>(null);
  const [visible, setVisible] = useState(false);

  const compute = useCallback(() => {
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    const next: Record<string, ArrowPath> = {};
    for (const def of ARROW_DEFS) {
      const fe = nodeRefs.current[def.from]?.getBoundingClientRect();
      const te = nodeRefs.current[def.to]?.getBoundingClientRect();
      if (fe && te) {
        next[`${def.from}-${def.to}`] = buildPath(
          fe, te, cr, def.fromEdge, def.toEdge, def.labelOffset
        );
      }
    }
    setPaths(next);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    compute();
    return () => { io.disconnect(); ro.disconnect(); };
  }, [compute]);

  // Recompute after expand/collapse transition settles
  useEffect(() => {
    const t = setTimeout(compute, 340);
    return () => clearTimeout(t);
  }, [expandedPair, compute]);

  const togglePair = (pair: PairKey) =>
    setExpandedPair((e) => (e === pair ? null : pair));

  return (
    <div ref={containerRef} style={{ position: "relative", margin: "3rem 0 0" }}>
      {/* 3-column grid: fixed node columns, flexible center */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr 260px",
          gridTemplateRows: "auto minmax(90px, 1fr) auto",
        }}
      >
        {/* Row 1 */}
        <NodeCard
          def={NODES[0]}
          nodeRef={(el) => { nodeRefs.current.TL = el; }}
          expanded={expandedPair === "top"}
          onToggle={() => togglePair("top")}
        />
        <div />
        <NodeCard
          def={NODES[1]}
          nodeRef={(el) => { nodeRefs.current.TR = el; }}
          expanded={expandedPair === "top"}
          onToggle={() => togglePair("top")}
        />

        {/* Row 2 — center label */}
        <div />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--signal)",
                display: "block",
                marginBottom: "0.35rem",
              }}
            >
              GARANTIR
            </span>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(14,13,11,0.5)",
                lineHeight: 1.35,
                display: "block",
                maxWidth: "130px",
              }}
            >
              Vendor evaluation layer
            </span>
          </div>
        </div>
        <div />

        {/* Row 3 */}
        <NodeCard
          def={NODES[3]}
          nodeRef={(el) => { nodeRefs.current.BL = el; }}
          expanded={expandedPair === "bottom"}
          onToggle={() => togglePair("bottom")}
        />
        <div />
        <NodeCard
          def={NODES[2]}
          nodeRef={(el) => { nodeRefs.current.BR = el; }}
          expanded={expandedPair === "bottom"}
          onToggle={() => togglePair("bottom")}
        />
      </div>

      {/* SVG arrows — above grid, below pointer events */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <defs>
          <marker
            id="gfd-arr"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <path
              d="M 0 0 L 5 3.5 L 0 7"
              fill="none"
              stroke="rgba(14,13,11,0.32)"
              strokeWidth="1"
            />
          </marker>
        </defs>

        {ARROW_DEFS.map((def) => {
          const p = paths[`${def.from}-${def.to}`];
          if (!p) return null;
          const fadeDelay = `${(def.delay / 1000).toFixed(2)}s`;
          const marchStart = `${((def.delay + 600) / 1000).toFixed(2)}s`;
          return (
            <g key={`${def.from}-${def.to}`}>
              {/* Dashed arrow — fades in, then marches in a loop */}
              <path
                d={p.d}
                fill="none"
                stroke="rgba(14,13,11,0.22)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                markerEnd="url(#gfd-arr)"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.7s ease ${fadeDelay}`,
                  ...(visible && {
                    animation: `gfd-march 1.4s linear ${marchStart} infinite`,
                  }),
                }}
              />
              {/* Label with background stroke so it reads above the line */}
              <text
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "var(--mono, monospace)",
                  fontSize: 11,
                  fill: "rgba(14,13,11,0.42)",
                  stroke: "#f2ece0",
                  strokeWidth: 7,
                  paintOrder: "stroke fill",
                  letterSpacing: "0.04em",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease calc(${fadeDelay} + 0.4s)`,
                }}
              >
                {def.label}
              </text>
            </g>
          );
        })}
      </svg>

      <style>{`
        @keyframes gfd-march {
          to { stroke-dashoffset: -10; }
        }
      `}</style>
    </div>
  );
}

interface NodeCardProps {
  def: NodeDef;
  nodeRef: (el: HTMLDivElement | null) => void;
  expanded: boolean;
  onToggle: () => void;
}

function NodeCard({ def, nodeRef, expanded, onToggle }: NodeCardProps) {
  return (
    <div
      ref={nodeRef}
      onClick={onToggle}
      style={{
        background: "#f9f8f6",
        border: `1px solid ${expanded ? "rgba(14,13,11,0.2)" : "rgba(14,13,11,0.14)"}`,
        cursor: "pointer",
        transition: "border-color 0.2s ease",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Header — always visible */}
      <div style={{ padding: "1.25rem 1.25rem 1rem" }}>
        <def.Icon size={17} strokeWidth={1.5} color="rgba(14,13,11,0.45)" />
        <div style={{ marginTop: "0.65rem" }}>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(13px, 1.05vw, 15px)",
              fontWeight: 500,
              color: "#0e0d0b",
              lineHeight: 1.2,
              display: "block",
              marginBottom: "0.3rem",
            }}
          >
            {def.title}
          </span>
          <span
            style={{
              fontFamily: "var(--sans)",
              fontSize: 12,
              color: "rgba(14,13,11,0.45)",
              lineHeight: 1.4,
            }}
          >
            {def.sub}
          </span>
        </div>
        <div style={{ marginTop: "0.85rem" }}>
          <ChevronDown
            size={13}
            strokeWidth={2}
            color="rgba(14,13,11,0.28)"
            style={{
              transform: expanded ? "rotate(180deg)" : "none",
              transition: "transform 0.25s ease",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Expandable detail */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: expanded ? "200px" : "0px",
          opacity: expanded ? 1 : 0,
          transition: "max-height 0.32s ease, opacity 0.22s ease",
        }}
      >
        <p
          style={{
            fontFamily: "var(--sans)",
            fontSize: 12.5,
            color: "rgba(14,13,11,0.58)",
            lineHeight: 1.65,
            margin: 0,
            padding: "0.75rem 1.25rem 1.25rem",
            borderTop: "1px dashed rgba(14,13,11,0.12)",
          }}
        >
          {def.detail}
        </p>
      </div>
    </div>
  );
}
