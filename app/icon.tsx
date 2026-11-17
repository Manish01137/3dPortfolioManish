import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F0F0F", color: "#F2F0EB", fontSize: 44, fontWeight: 800, borderRadius: 14 }}>
        S<span style={{ color: "#C6F432", fontSize: 40, marginTop: -14 }}>*</span>
      </div>
    ),
    size,
  );
}
