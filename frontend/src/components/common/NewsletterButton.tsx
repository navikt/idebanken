'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from '@navikt/ds-react'
import { XMarkIcon } from '@navikt/aksel-icons'
import NextLink from 'next/link'

const SESSION_KEY = 'newsletter-button-shown'
const SUPPRESSED_KEY = 'newsletter-button-suppressed'
const HIDDEN_PATHS = ['/nyhetsbrev', '/testing/nyhetsbrevlandingside', '/nyhetsbrev-kampanje']
const BUTTON_CLASSES =
    'cursor-pointer rounded-full shadow-lg bg-(--ib-bg-dark-blue-strong)! hover:bg-(--ib-bg-dark-blue-strong-hover)!'

export function NewsletterButton({ url }: { url: string }) {
    const [visible, setVisible] = useState(false)
    const clickedRef = useRef(false)
    const suppressedRef = useRef(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const isFromNewsletter = searchParams.get('utm_source') === 'nyhetsbrev'
    const isOnHiddenPath = HIDDEN_PATHS.some((path) => pathname?.endsWith(path))

    useEffect(() => {
        if (isFromNewsletter) {
            suppressedRef.current = true
        }

        if (suppressedRef.current) {
            setVisible(false)
        }

        try {
            if (suppressedRef.current) {
                sessionStorage.setItem(SUPPRESSED_KEY, 'true')
                return
            }

            if (sessionStorage.getItem(SUPPRESSED_KEY)) {
                suppressedRef.current = true
                setVisible(false)
                return
            }

            if (!isOnHiddenPath && !sessionStorage.getItem(SESSION_KEY)) {
                setVisible(true)
                sessionStorage.setItem(SESSION_KEY, 'true')
            }
        } catch {
            // Behold gjeldende synlighet hvis nettleseren blokkerer lagring.
        }
    }, [isFromNewsletter, isOnHiddenPath])

    useEffect(() => {
        if (clickedRef.current) {
            setVisible(false)
        }
    }, [pathname])

    if (!visible || isOnHiddenPath || isFromNewsletter) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
            <Button
                as={NextLink}
                href={url}
                variant="primary"
                size="medium"
                className={BUTTON_CLASSES}
                onClick={() => {
                    clickedRef.current = true
                }}>
                Meld deg på nyhetsbrev
            </Button>
            <Button
                type="button"
                variant="primary"
                size="medium"
                icon={<XMarkIcon aria-hidden />}
                aria-label="Lukk nyhetsbrevknappen"
                className={BUTTON_CLASSES}
                onClick={() => setVisible(false)}
            />
        </div>
    )
}
