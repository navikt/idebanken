
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@navikt/ds-react'
import NextLink from 'next/link'

const SESSION_KEY = 'newsletter-button-shown'

export function NewsletterButton({ url }: { url: string }) {
    const [visible, setVisible] = useState(false)
    const clickedRef = useRef(false)
    const pathname = usePathname()

    useEffect(() => {
        if (!sessionStorage.getItem(SESSION_KEY)) {
            setVisible(true)
            sessionStorage.setItem(SESSION_KEY, 'true')
        }
    }, [])

    useEffect(() => {
        if (clickedRef.current) {
            setVisible(false)
        }
    }, [pathname])

    if (!visible) return null

    return (
        <Button
            as={NextLink}
            href={url}
            variant="primary"
            size="medium"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-(--ib-bg-dark-blue-strong)! hover:bg-(--ib-bg-dark-blue-strong-hover)!"
            onClick={() => {
                clickedRef.current = true
            }}>
            Meld deg på nyhetsbrev
        </Button>
    )
}