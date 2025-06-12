import type { NextConfig } from 'next'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getEnonicWebpackConfig(config: NextConfig) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
  };
  config.resolve.alias = {
    ...config.resolve.alias,
    "@phrases": path.resolve(__dirname, "./src/phrases"),
    "~": path.resolve(__dirname, "./src")
  };
  return config;
}

async function getEnonicHeaders() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `script-src 'self' 'unsafe-eval' 'unsafe-inline';`,
        },
      ],
    },
  ];
}

const config = {
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ['@enonic/nextjs-adapter'],
  webpack: getEnonicWebpackConfig,
  headers: getEnonicHeaders,
};

export default config;