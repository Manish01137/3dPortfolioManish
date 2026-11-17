import { ImageResponse } from "next/og";

export const alt = "Manish Beniwal — Web, E-commerce & AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#EEEAE8", color: "#121212", padding: 72, fontFamily: "monospace" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#575960" }}>
          <span>[ DEVELOPER · E-COMMERCE · AI TOOLS ]</span><span>BANGALORE, IN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.9, letterSpacing: -8, fontFamily: "sans-serif", fontWeight: 600 }}>
          <span>Manish</span>
          <span>Beniwal<span style={{ color: "#002BBA" }}>*</span></span>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontFamily: "sans-serif", color: "#575960" }}>
          Websites, stores &amp; AI tools that actually grow brands.
        </div>
      </div>
    ),
    size,
  );
}
