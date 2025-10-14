'use client'

import { Button, Tooltip } from '@navikt/ds-react'
import { SunFillIcon, MoonIcon } from '@navikt/aksel-icons'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

function ThemeButton() {
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
