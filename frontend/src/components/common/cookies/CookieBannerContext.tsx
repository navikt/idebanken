'use client'

import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getUserActionTakenValue } from '~/components/common/cookies/cookieUtils'

export interface CookieBannerContextType {
    showCookieBanner: boolean
    setShowCookieBanner: (show: boolean) => void
    openCookieBanner: (buttonElement: HTMLElement | null) => void
    closeCookieBanner: () => void
}

interface CookieBannerProviderProps {
    children: ReactNode
    initialState?: boolean
}

const CookieBannerContext = createContext<CookieBannerContextType | undefined>(undefined)

export function CookieBannerProvider({
    children,
    initialState = false,
}: CookieBannerProviderProps) {
    const [showCookieBanner, setShowCookieBanner] = useState(initialState)
    const focusRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        // Check if user has already made a choice about cookies
        const hasMadeChoice = getUserActionTakenValue()
        console.log('CookieBannerProvider - hasMadeChoice:', hasMadeChoice)
        setShowCookieBanner(!hasMadeChoice)
    }, [])

    const openCookieBanner = (buttonElement: HTMLElement | null) => {
        setShowCookieBanner(true)
        focusRef.current = buttonElement
    }

    const closeCookieBanner = () => {
        setShowCookieBanner(false)
        focusRef.current?.focus()
    }

    const value = useMemo(
        () => ({
            showCookieBanner,
            setShowCookieBanner,
            openCookieBanner,
            closeCookieBanner,
        }),
        [showCookieBanner]
    )

    return <CookieBannerContext.Provider value={value}>{children}</CookieBannerContext.Provider>
}

export function useCookieBanner() {
    const context = useContext(CookieBannerContext)
    if (context === undefined) {
        throw new Error('useCookieBanner must be used within a CookieBannerProvider')
    }
    return context
}

export default CookieBannerContext
