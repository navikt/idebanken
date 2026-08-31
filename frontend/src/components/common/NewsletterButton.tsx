'use client'

import { useEffect, useState } from "react"
import { Box, Button, BodyShort, HStack } from '@navikt/ds-react'
import { XMarkIcon } from '@navikt/aksel-icons'
import NextLink from 'next/link'

const SESSION_KEY = 'newsletter-button'

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
        <Box
            as="aside"
            role="complementary"
            aria-label="Nyhetsbrev"
            padding="space-24"
            className="fixed bottom-6 right-6 z-50 w-80 rounded-lg shadow-2xl bg-(--ib-bg-orange-softA)">
            <HStack justify="space-between" align="start" gap="space-8" className="mb-3">
                <BodyShort size="small" weight="semibold">
                    Hold deg oppdatert — meld deg på nyhetsbrevet vårt!
                </BodyShort>
                <Button
                    variant="tertiary"
                    size="small"
                    icon={<XMarkIcon aria-hidden />}
                    onClick={() => setVisible(false)}
                    aria-label="Lukk"
                />
            </HStack>
            <Button as={NextLink} href={url} variant="primary" size="small" className="w-full">
                Meld deg på nyhetsbrev
            </Button>
        </Box>
    )
}