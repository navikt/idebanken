import type { NextConfig } from 'next'
import path from 'path'
import { redirects } from './redirects'

function getEnonicWebpackConfig(config: NextConfig) {
    // config.resolve.fallback = {
    //     ...config.resolve.fallback,
    //     fs: false,
    // }
    // config.resolve.alias = {
    //     ...config.resolve.alias,
    //     '@phrases': path.resolve(__dirname, './src/phrases'),
    //     '~': path.resolve(__dirname, './src'),
    // }
    config.turbopack = config.turbopack || {}
    config.turbopack.resolveAlias = {
        ...config.turbopack?.resolveAlias,
        fs: {
            browser: './empty.ts', // We recommend to fix code imports before using this method
        },
        '@phrases': path.resolve(__dirname, './src/phrases'),
        '~': path.resolve(__dirname, './src'),
    }
    return config
}

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    trailingSlash: false,
    compress: true,
    transpilePackages: ['@enonic/nextjs-adapter'],
    //webpack: getEnonicWebpackConfig,
    turbopack: {
        resolveAlias: {
            '@phrases': path.resolve(__dirname, './src/phrases'),
            '~': path.resolve(__dirname, './src'),
        },
    },
    redirects,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'idebanken-xp7prod.enonic.cloud',
            },
            {
                protocol: 'https',
                hostname: 'idebanken-xp7test.enonic.cloud',
            },
            ...(process.env.ENV === 'local'
                ? [
                      {
                          protocol: 'http',
                          hostname: 'localhost',
                          port: '8080',
                      },
                  ]
                : []),
        ],
    },
    experimental: {
        optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    },
} as NextConfig

export default nextConfig
