import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loaderPath = 'orchids-visual-edits/loader.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  eslint: {
    ignoreDuringBuilds: true,
  },
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
      };
      return config;
    },
    turbopack: {
      rules: {
        "*.{js,jsx,tsx}": {
          loaders: [loaderPath]
        }
      }
    }
};

export default nextConfig;
// Orchids restart: 1766486782972
