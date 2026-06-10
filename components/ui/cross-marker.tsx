import React from "react";

export function CrossMarker({ dark = false }: { dark?: boolean }) {
  const color = dark ? "rgba(14,13,11,0.5)" : "rgba(236,230,216,0.65)";
  const size = 14;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: color, transform: "translateY(-50%)" }} />
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: color, transform: "translateX(-50%)" }} />
    </div>
  );
}
