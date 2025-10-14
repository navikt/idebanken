'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Theme } from '@navikt/ds-react'

type SupportedThemes = 'light' | 'dark'

const colorThemes = ['light', 'dark'] satisfies SupportedThemes[]

const LOCAL_STORAGE_KEY = 'idebanken-theme'

function ThemeProvider({ children, nonce }: { children: React.ReactNode; nonce?: string }) {
    return (
        <NextThemeProvider
            attribute="class"
            storageKey={LOCAL_STORAGE_KEY}
            enableSystem
            themes={colorThemes}
            disableTransitionOnChange
            nonce={nonce}>
            <Theme>{children}</Theme>
        </NextThemeProvider>
    )
}

export { ThemeProvider }
