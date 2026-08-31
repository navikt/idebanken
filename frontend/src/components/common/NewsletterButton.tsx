'use client'

import { useEffect, useState } from 'react'
import { Button } from '@navikt/ds-react'
import NextLink from 'next/link'

const SESSION_KEY = 'newsletter-button-shown'

export function NewsletterButton({ url }: { url: string }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!sessionStorage.getItem(SESSION_KEY)) {
            setVisible(true)
            sessionStorage.setItem(SESSION_KEY, 'true')
        }
    }, [])

    if (!visible) return null

    return (
        <div data-color="ib-brand-dark-blue" className="fixed bottom-6 right-6 z-50">
            <Button
                as={NextLink}
                href={url}
                variant="primary"
                size="medium"
                className="rounded-full shadow-lg"
                onClick={() => setVisible(false)}>
                Meld deg på nyhetsbrev
            </Button>
        </div>
    )
}