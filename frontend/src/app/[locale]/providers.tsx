'use client'
import { Theme } from '@navikt/ds-react/Theme'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Theme theme="dark" hasBackground>
            {children}
        </Theme>
    )
}
