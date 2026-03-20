import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// ---------------------------------------------------------------------------
// Environment variables required by @enonic/nextjs-adapter at module load time.
// These MUST be set before any module is imported.
// ---------------------------------------------------------------------------
process.env.NEXT_PUBLIC_ENONIC_APP_NAME = 'com.enonic.app.idebanken'
process.env.NEXT_PUBLIC_ENONIC_API = 'http://localhost:8080/site/api/en/draft'
process.env.NEXT_PUBLIC_ENONIC_API_DRAFT = 'http://localhost:8080/site/api/en/draft'
process.env.NEXT_PUBLIC_ENONIC_API_MASTER = 'http://localhost:8080/site/api/en/master'
process.env.ENONIC_API = 'http://localhost:8080/site/idebanken'
process.env.SEARCH_API_URL = 'http://localhost:8080/api/search'
process.env.NEXT_PUBLIC_ENONIC_MAPPINGS = 'no:idebanken/idebanken'

// ---------------------------------------------------------------------------
// Next.js navigation mocks
// ---------------------------------------------------------------------------
vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
    })),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    ReadonlyURLSearchParams: URLSearchParams,
}))

vi.mock('next/image', () => ({
    default: (props: Record<string, unknown>) => {
        const { src, alt, fill, ...rest } = props as {
            src: string
            alt: string
            fill?: boolean
            [key: string]: unknown
        }
        return Object.assign(document.createElement('img'), {
            src,
            alt,
            ...(fill ? { style: 'position:absolute;inset:0;' } : {}),
            ...rest,
        })
    },
}))

vi.mock('next/link', () => ({
    default: ({
        children,
        href,
        ...rest
    }: {
        children: React.ReactNode
        href: string
        [key: string]: unknown
    }) => {
        return React.createElement('a', { href, ...rest }, children)
    },
}))

// ---------------------------------------------------------------------------
// @enonic/nextjs-adapter mocks
// ---------------------------------------------------------------------------
vi.mock('@enonic/nextjs-adapter', () => ({
    getUrl: vi.fn((url: string) => url ?? ''),
    getAsset: vi.fn((url: string) => url ?? ''),
    RENDER_MODE: { NEXT: 'next', INLINE: 'inline', EDIT: 'edit' },
    MetaData: {},
    fetchGuillotine: vi.fn(),
    getContentApiUrl: vi.fn(() => 'http://localhost:8080/api'),
}))

vi.mock('@enonic/nextjs-adapter/views/RichTextView', () => ({
    default: ({ data }: { data: { processedHtml?: string } }) => {
        return React.createElement('div', {
            dangerouslySetInnerHTML: { __html: data?.processedHtml ?? '' },
        })
    },
}))

// Also stub the BaseComponent module that reads env vars at import time
vi.mock('@enonic/nextjs-adapter/src/views/BaseComponent', () => ({
    default: ({ children }: { children: unknown }) => children,
}))

// ---------------------------------------------------------------------------
// Suppress noisy console output during tests
// ---------------------------------------------------------------------------
beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => {
    vi.restoreAllMocks()
})
