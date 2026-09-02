import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["outskirts-grimace-faceplate.ngrok-free.dev"],
  poweredByHeader: false,
};

export default nextConfig;
