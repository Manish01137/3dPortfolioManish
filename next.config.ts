import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75] },
  outputFileTracingRoot: path.join(__dirname),
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
