import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
