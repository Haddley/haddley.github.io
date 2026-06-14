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
};

// COOP/COEP headers are only needed for the dev server — WebGPU/SharedArrayBuffer
// requires them, but the static export relies on coi-serviceworker.js instead.
// Attaching headers() unconditionally causes a Next.js export warning, so we
// only add them outside of production builds.
if (process.env.NODE_ENV !== 'production') {
  nextConfig.headers = async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
      ],
    },
  ];
}

export default nextConfig;
