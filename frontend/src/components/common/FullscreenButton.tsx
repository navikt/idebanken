'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { Button } from '@navikt/ds-react'
import { ExpandIcon, ShrinkIcon } from '@navikt/aksel-icons'
import classNames from 'classnames'

export default function FullscreenButton({
    className,
    withText = false,
    children,
}: PropsWithChildren<{ className?: string; withText?: boolean }>) {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement))
        }

        setIsFullscreen(Boolean(document.fullscreenElement))

        document.addEventListener('fullscreenchange', onFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
    }, [])

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            void document.documentElement.requestFullscreen().catch(() => {
                // noop if denied
            })
        } else {
            void document.exitFullscreen().catch(() => {
                // noop if failed
            })
        }
    }, [])

    return (
        <Button
            className={classNames(
                'rounded-full px-(--ax-space-24) [&_.aksel-label]:pt-0.75',
                className
            )}
            size={'xsmall'}
            variant="secondary"
            onClick={toggleFullscreen}
            icon={
                isFullscreen ? (
                    <ShrinkIcon width={24} height={24} aria-hidden />
                ) : (
                    <ExpandIcon width={24} height={24} aria-hidden />
                )
            }
            aria-label={isFullscreen ? 'Avslutt fullskjerm' : 'Vis i fullskjerm'}>
            {children
                ? children
                : withText
                  ? isFullscreen
                      ? 'Avslutt fullskjerm'
                      : 'Fullskjerm'
                  : null}
        </Button>
    )
}
