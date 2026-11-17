import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#121212", color: "#EEEAE8", fontSize: 34, fontWeight: 700, borderRadius: 14, fontFamily: "monospace", letterSpacing: -2 }}>
        MB<span style={{ color: "#819FFE", fontSize: 30, marginTop: -14 }}>*</span>
      </div>
    ),
    size,
  );
}
