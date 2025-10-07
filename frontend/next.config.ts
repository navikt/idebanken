import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getEnonicWebpackConfig(config: NextConfig) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
    }
    config.resolve.alias = {
        ...config.resolve.alias,
        '@phrases': path.resolve(__dirname, './src/phrases'),
        '~': path.resolve(__dirname, './src'),
    }
    return config
}

const config = {
    output: 'standalone',
    reactStrictMode: true,
    trailingSlash: false,
    transpilePackages: ['@enonic/nextjs-adapter'],
    webpack: getEnonicWebpackConfig,
    images: {
        remotePatterns: [
            ...[
                process.env.ENV === 'local'
                    ? {
                          protocol: 'http',
                          hostname: 'localhost',
                          port: '8080',
                      }
                    : {},
            ],
        ],
    },
    experimental: {
        optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    },
} as NextConfig

export default config
