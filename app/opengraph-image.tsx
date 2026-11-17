import { ImageResponse } from "next/og";

export const alt = "Manish Beniwal — Founder of Shape-360";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0F0F0F", color: "#F2F0EB", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Shape-360<span style={{ color: "#C6F432" }}>*</span></div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Websites, stores &amp; AI tools</span>
          <span>that actually <span style={{ color: "#C6F432", marginLeft: 22 }}>grow</span>&nbsp;brands.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8A8A85" }}>
          <span>Manish Beniwal — Founder &amp; Lead Developer</span><span>Bangalore, India</span>
        </div>
      </div>
    ),
    size,
  );
}
