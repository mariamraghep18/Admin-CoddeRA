import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow all local dev origins to resolve the WebSocket HMR handshake failure
  allowedDevOrigins: [
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1",
    "127.0.0.1:3000",
    "127.0.0.1:3001",
    "192.168.1.11:3000",
    "192.168.1.11:3001",
    "192.168.1.11",
  ],
  reactStrictMode: true,
  // Disable the floating Next.js "N" dev indicator badge
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

