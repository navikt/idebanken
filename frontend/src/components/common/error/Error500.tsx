'use client'

import { GlobalAlert, GlobalAlertContent, GlobalAlertHeader } from '@navikt/ds-react/GlobalAlert'
import { HeadingView } from '~/components/parts/Heading'
import { BodyLong, Box, Button, Link, VStack } from '@navikt/ds-react'
import { useEffect } from 'react'

export type ErrorParams = {
    error: Error & { digest?: string }
    reset(): void
}

export default function Error500({ error, reset }: ErrorParams) {
    useEffect(() => {
        console.error('ErrorBoundary caught an error:', error)
    }, [error])

    return (
        <Box className={'flex py-(--ax-space-72) justify-center items-center'}>
            <GlobalAlert status={'error'} className={'max-w-md'}>
                <GlobalAlertHeader className={'[&>div]:mt-(--ax-space-1)'}>
                    <HeadingView level={'1'} size={'small'}>
                        Det har oppstått en feil på siden
                    </HeadingView>
                </GlobalAlertHeader>
                <GlobalAlertContent>
                    <VStack>
                        <BodyLong className={'pb-(--ax-space-12)'}>
                            Prøv igjen ved å trykke på knappen nedenfor eller laste inn siden på
                            nytt.
                        </BodyLong>
                        <BodyLong>
                            Dersom problemet vedvarer, kontakt oss gjerne på{' '}
                            <Link href={'mailto:post@idebanken.org'}>post@idebanken.org</Link>
                        </BodyLong>
                        <Button
                            className={
                                'rounded-full my-(--ax-space-32) w-fit mx-auto px-(--ax-space-48)'
                            }
                            size={'small'}
                            onClick={() => reset()}>
                            Prøv igjen
                        </Button>
                    </VStack>
                </GlobalAlertContent>
            </GlobalAlert>
        </Box>
    )
}
