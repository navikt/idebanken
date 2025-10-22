'use client'

import { Button, Tooltip } from '@navikt/ds-react'
import { MoonIcon, SunFillIcon } from '@navikt/aksel-icons'
import { useTheme } from 'next-themes'
import React, { useCallback } from 'react'

function ThemeButton(props: React.HTMLAttributes<HTMLButtonElement>) {
    const { resolvedTheme, setTheme } = useTheme()

    const toggle = useCallback(() => {
        const next = resolvedTheme === 'dark' ? 'light' : 'dark'
        setTheme(next)
    }, [resolvedTheme, setTheme])

    return (
        <Tooltip content="Bytt tema">
            <Button
                variant="tertiary-neutral"
                aria-label="Bytt tema"
                onClick={toggle}
                {...props}
                icon={
                    <span className="grid place-items-center">
                        <SunFillIcon className="hidden dark:block" aria-hidden />
                        <MoonIcon className="block dark:hidden" aria-hidden />
                    </span>
                }
            />
        </Tooltip>
    )
}

export { ThemeButton }
