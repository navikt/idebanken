import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MetaData, RENDER_MODE, XP_REQUEST_TYPE } from '@enonic/nextjs-adapter'
import { ButtonPart } from '~/components/parts/Button'
import { umami } from '~/utils/analytics/umami'
import type { PartData } from '~/types/graphql-types'
import type { Part_Idebanken_Button } from '~/types/generated'

vi.mock('~/utils/analytics/umami', () => ({
    umami: vi.fn(),
    AnalyticsEvents: { ANCHOR_LINK_CLICKED: 'ankerlenke klikket' },
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

function buttonProps(url: string) {
    return {
        meta,
        part: {
            config: {
                link: { url, linkText: 'Meld deg på nyhetsbrev', external: false },
                size: 'medium',
                variant: 'primary',
            },
        },
    } as unknown as PartData<Part_Idebanken_Button>
}

describe('ButtonPart', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('beholder anker-url som href', () => {
        render(<ButtonPart {...buttonProps('#pamelding')} />)
        expect(screen.getByRole('button', { name: 'Meld deg på nyhetsbrev' })).toHaveAttribute(
            'href',
            '#pamelding'
        )
    })

    it('sender Umami-hendelse ved klikk på ankerknapp', async () => {
        render(<ButtonPart {...buttonProps('#pamelding')} />)
        await userEvent.click(screen.getByRole('button', { name: 'Meld deg på nyhetsbrev' }))
        expect(umami).toHaveBeenCalledWith(
            'ankerlenke klikket',
            expect.objectContaining({ komponentId: 'knapp', anker: '#pamelding' })
        )
    })

})
