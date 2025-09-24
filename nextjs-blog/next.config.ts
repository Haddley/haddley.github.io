import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Temporarily disabled for development
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // No basePath needed for user/organization pages (username.github.io)
};

export default nextConfig;
