import type { NextConfig } from 'next'
import path from 'path'
import { redirects } from './redirects'
import { WebpackConfigContext } from 'next/dist/server/config-shared'

function getEnonicWebpackConfig(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: any,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }: WebpackConfigContext
) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
    }
    config.resolve.alias = {
        ...config.resolve.alias,
        '@phrases': path.resolve(__dirname, 'src', 'phrases'),
        '~': path.resolve(__dirname, 'src'),
    }
    return config
}

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    trailingSlash: false,
    //compress: true,
    transpilePackages: ['@enonic/nextjs-adapter'],
    webpack: getEnonicWebpackConfig,
    turbopack: {
        resolveAlias: {
            '@phrases': path.resolve(__dirname, 'src', 'phrases'),
        },
    },
    redirects,
    images: {
        qualities: [75, 80],
        unoptimized: process.env.ENV === 'local',
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
