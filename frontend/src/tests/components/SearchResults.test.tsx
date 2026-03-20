import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetaData, RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter'
import type { SearchResult } from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'
import { SearchFrom } from '~/utils/analytics/umami'
import React from 'react'

// vi.mock calls are hoisted to the top of the file by Vitest automatically.
// They intercept the transitive imports of SearchResults before the module body runs.

vi.mock('~/components/parts/LinkCard', () => ({
    LinkCardView: ({ title, url }: { title: string; url: string }) => {
        return React.createElement('a', { href: url }, title)
    },
}))

vi.mock('~/components/common/analytics/TrackFirstLink', () => ({
    default: ({ children }: { children: React.ReactNode }) => {
        return React.createElement(React.Fragment, null, children)
    },
}))

// Minimal MetaData stub
const meta: MetaData = {
    id: '123456789',
    catchAll: false,
    renderMode: RENDER_MODE.NEXT,
    locale: 'nb',
    defaultLocale: 'nb',
    type: 'portal:site',
    path: '/',
    baseUrl: 'http://localhost:3000',
    apiUrl: '',
    requestType: 'type' as XP_REQUEST_TYPE,
    canRender: true,
}

const hit: SearchResult['hits'][0] = {
    href: '/ressurser/tips',
    displayName: 'Nyttige tips',
    highlight: '<em>Nyttige</em> tips',
    score: 1.0,
    typeTags: [],
    iconUrl: '',
    audience: [],
    language: 'no',
    type: 'idebanken:kjerneartikkel',
}

const mockResult: SearchResult = {
    total: 2,
    page: 1,
    isMore: false,
    hits: [hit, { ...hit, href: '/ressurser/mer', displayName: 'Mer innhold' }],
    word: 'tips',
}

describe('SearchResults', () => {
    it('renders a status message with hit count', () => {
        render(SearchResults(meta, SearchFrom.SOKESIDE, mockResult, false))
        expect(screen.getByRole('status')).toHaveTextContent('Viser 2 av 2 treff')
    })

    it('includes the search word in the status message', () => {
        render(SearchResults(meta, SearchFrom.SOKESIDE, mockResult, false))
        expect(screen.getByRole('status')).toHaveTextContent('«tips»')
    })

    it('renders a card for each search hit', () => {
        render(SearchResults(meta, SearchFrom.SOKESIDE, mockResult, false))
        expect(screen.getByText('Nyttige tips')).toBeInTheDocument()
        expect(screen.getByText('Mer innhold')).toBeInTheDocument()
    })

    it('renders a loading indicator when loading=true', () => {
        render(SearchResults(meta, SearchFrom.SOKESIDE, undefined, true))
        expect(screen.getByLabelText('laster innhold')).toBeInTheDocument()
    })

    it('renders an empty status when no result is provided', () => {
        render(SearchResults(meta, SearchFrom.SOKESIDE, undefined, false))
        expect(screen.getByRole('status')).toHaveTextContent('')
    })
})
