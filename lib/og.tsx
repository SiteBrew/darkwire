import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** DarkWire's share card: black, the wire grid, the mark, a kicker and a big headline. */
export function ogCard(kicker: string, title: string) {
  const size = title.length > 70 ? 54 : title.length > 44 ? 64 : 76;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#0A0A0A", backgroundImage: "linear-gradient(rgba(0,217,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.07) 1px, transparent 1px)", backgroundSize: "56px 56px", color: "#E8E8E8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 48 48">
            <path d="M14 6H6v36h8" stroke="#E8E8E8" strokeWidth="4" fill="none" />
            <path d="M34 6h8v36h-8" stroke="#E8E8E8" strokeWidth="4" fill="none" />
            <circle cx="24" cy="24" r="6.5" fill="#00D9FF" />
          </svg>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: 6 }}>
            DARK<span style={{ color: "#00D9FF" }}>/</span>WIRE
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#00D9FF", fontSize: 24, fontWeight: 700, letterSpacing: 6 }}>
            <div style={{ width: 36, height: 3, background: "#00D9FF" }} />
            {kicker.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2, maxWidth: 1040 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(232,232,232,0.5)", letterSpacing: 3 }}>
          <span>THE DAILY WIRE FOR AI &amp; TECH</span>
          <span style={{ color: "#00D9FF" }}>FACT-CHECKED · SOURCED</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
