import { describe, expect, it } from 'vitest'
import { getOrganizationJsonLd, getWebPageJsonLd, getWebSiteJsonLd } from '~/utils/jsonLd'
import type { CommonContentType } from '~/types/graphql-types'

// ---------------------------------------------------------------------------
// getOrganizationJsonLd
// ---------------------------------------------------------------------------
describe('getOrganizationJsonLd', () => {
    it('has @type Organization', () => {
        expect(getOrganizationJsonLd()['@type']).toBe('Organization')
    })

    it('has https://schema.org context', () => {
        expect(getOrganizationJsonLd()['@context']).toBe('https://schema.org')
    })

    it('includes the correct organization URL', () => {
        expect(getOrganizationJsonLd().url).toBe('https://idebanken.no')
    })

    it('includes sameAs links', () => {
        const { sameAs } = getOrganizationJsonLd()
        expect(Array.isArray(sameAs)).toBe(true)
        expect((sameAs as string[]).some((u) => u.includes('facebook'))).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// getWebSiteJsonLd
// ---------------------------------------------------------------------------
describe('getWebSiteJsonLd', () => {
    it('has @type WebSite', () => {
        expect(getWebSiteJsonLd()['@type']).toBe('WebSite')
    })

    it('includes a SearchAction potential action', () => {
        const action = getWebSiteJsonLd().potentialAction as Record<string, string>
        expect(action['@type']).toBe('SearchAction')
        expect(action.target).toContain('{search_term_string}')
    })
})

// ---------------------------------------------------------------------------
// getWebPageJsonLd
// ---------------------------------------------------------------------------
const mockContent: CommonContentType = {
    type: 'idebanken:artikkel',
    displayName: 'Test artikkel',
    _id: 'abc123',
    modifiedTime: '2024-01-15T10:00:00Z',
    publish: { first: '2024-01-02T00:00:00Z' },
    metaFields: {
        title: 'SEO Title',
        description: 'SEO Description',
        fullTitle: 'SEO Title | Idebanken',
        robots: { index: false },
    },
    dataAsJson: {},
    xAsJson: {},
    data: {},
    x: {
        idebanken: {
            meta: { icon: { mediaUrl: '' } },
        },
    },
}

describe('getWebPageJsonLd', () => {
    it('has @type WebPage', () => {
        expect(getWebPageJsonLd(mockContent)['@type']).toBe('WebPage')
    })

    it('uses metaFields.title as headline', () => {
        expect(getWebPageJsonLd(mockContent).headline).toBe('SEO Title')
    })

    it('falls back to displayName when metaFields.title is absent', () => {
        const c = { ...mockContent, metaFields: { ...mockContent.metaFields, title: undefined } }
        expect(getWebPageJsonLd(c as unknown as CommonContentType).headline).toBe('Test artikkel')
    })

    it('sets dateModified to modifiedTime for articles', () => {
        expect(getWebPageJsonLd(mockContent).dateModified).toBe('2024-01-15T10:00:00Z')
    })
})
