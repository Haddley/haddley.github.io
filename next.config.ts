import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // WebLLM loads WASM at runtime from CDN — exclude from the server bundle so
  // Next.js's static-path worker never tries to resolve its deps (esprima etc.).
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [...(config.externals ?? []), '@mlc-ai/web-llm'];
    }
    return config;
  },
  // COOP/COEP headers for dev server (GitHub Pages uses coi-serviceworker.js instead)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

export default nextConfig;
