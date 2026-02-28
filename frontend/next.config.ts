import type { NextConfig } from "next";

// orchids-visual-edits is a local VS Code dev tool — only load in local dev
const isVercel = !!process.env.VERCEL;
let loaderPath: string | null = null;
if (!isVercel) {
  try {
    loaderPath = require.resolve('orchids-visual-edits/loader.js');
  } catch {
    // not installed locally either — skip silently
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(loaderPath ? {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [loaderPath]
        }
      }
    }
  } : {}),
} as NextConfig;

export default nextConfig;
