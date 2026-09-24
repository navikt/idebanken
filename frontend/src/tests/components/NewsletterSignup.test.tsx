import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetaData, RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter'
import NewsletterSignup from '~/components/parts/NewsletterSignup'
import type { PartData } from '~/types/graphql-types'
import type { XP_NewsletterSignup } from '@xp-types/site/parts'

// Unngår cookieUtils-importkjeden — umami brukes kun ved klikk i denne komponenten
vi.mock('~/utils/analytics/umami', () => ({
    umami: vi.fn(),
    AnalyticsEvents: { BUTTON_CLICKED: 'knapp klikket' },
}))

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

const props = {
    meta,
    path: '/',
    part: {
        config: {
            title: 'Meld deg på nyhetsbrevet',
            description: 'Få nyttige råd på e-post',
        },
    },
} as unknown as PartData<XP_NewsletterSignup>

describe('NewsletterSignup', () => {
    it('rendrer heading med anker-id som lenkes til fra samme side', () => {
        render(<NewsletterSignup {...props} />)
        const heading = screen.getByRole('heading', { name: 'Meld deg på nyhetsbrevet' })
        expect(heading).toHaveAttribute('id', 'pamelding')
    })

    it('har scroll-margin slik at ankerhopp får luft fra toppkanten', () => {
        render(<NewsletterSignup {...props} />)
        const heading = screen.getByRole('heading', { name: 'Meld deg på nyhetsbrevet' })
        expect(heading.className).toContain('scroll-mt')
    })

    it('kan motta programmatisk fokus etter ankerhopp', () => {
        render(<NewsletterSignup {...props} />)
        const heading = screen.getByRole('heading', { name: 'Meld deg på nyhetsbrevet' })
        expect(heading).toHaveAttribute('tabindex', '-1')
    })

    it('bruker standard Make-skjema når ingen url er satt', () => {
        const { container } = render(<NewsletterSignup {...props} />)
        expect(container.querySelector('form')).toHaveAttribute(
            'action',
            expect.stringContaining('nyhetsbrev.idebanken.no')
        )
    })

    it('bruker egen Make-url fra part-config når satt', () => {
        const customProps = {
            ...props,
            part: {
                config: {
                    ...props.part.config,
                    formActionUrl: 'https://nyhetsbrev.idebanken.no/p/s/annen-liste',
                },
            },
        } as unknown as PartData<XP_NewsletterSignup>
        const { container } = render(<NewsletterSignup {...customProps} />)
        expect(container.querySelector('form')).toHaveAttribute(
            'action',
            'https://nyhetsbrev.idebanken.no/p/s/annen-liste'
        )
    })
})
