'use client'

import Script from 'next/script'
import { useCallback, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { setCookie } from '~/components/common/cookies/cookieUtils'
import {
    SkyraConfig,
    skyraOrg,
    updateSkyraConsent,
} from '~/components/common/cookies/skyra/skyraRuntime'
import { AnalyticsEvents, umami } from '~/utils/analytics/umami'

interface Props {
    analyticsConsent: boolean
    surveysConsent: boolean
    nonce?: string
    isProduction: boolean
}

export function CookieConsentScripts({
    analyticsConsent,
    surveysConsent,
    nonce,
    isProduction,
}: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const skyraConfig: SkyraConfig = {
        org: skyraOrg,
        cookieConsent: surveysConsent,
    }

    const loadUmamiScript = useCallback(
        (consent: boolean) => {
            const umamiScript = document.querySelector(
                'script[src="https://cdn.nav.no/team-researchops/sporing/sporing.js"]'
            )

            if (consent && !umamiScript) {
                const script = document.createElement('script')
                script.src = 'https://cdn.nav.no/team-researchops/sporing/sporing.js'
                script.defer = true
                script.nonce = nonce
                script.setAttribute('data-host-url', 'https://umami.nav.no')
                script.setAttribute(
                    'data-website-id',
                    isProduction
                        ? 'f882b9de-b91a-4940-8e3f-e076101eaf61'
                        : 'aa9d6480-2365-4552-8e16-5c7b5c9f777d'
                )
                script.setAttribute('data-auto-track', 'false')

                // Track initial page view once script loads
                script.onload = () => {
                    if (window.umami) void window.umami.track()
                }

                document.head.appendChild(script)
            } else if (!consent) {
                umamiScript?.remove()
            }
        },
        [isProduction, nonce]
    )

    useEffect(() => {
        if (analyticsConsent && window.umami) {
            // Track each page view with default properties (hostname, url, referrer, title, screen, language, etc.)
            void window.umami.track()
        }
    }, [pathname, searchParams, analyticsConsent])

    useEffect(() => {
        loadUmamiScript(analyticsConsent)

        const handleConsent = (e: CustomEvent) => {
            const { analytics, surveys, videoAnalytics } = e.detail

            setCookie({
                consent: { analytics, surveys, videoAnalytics },
                userActionTaken: true,
            })
            updateSkyraConsent(surveys)
            loadUmamiScript(analytics)
        }

        window.addEventListener('cookie-consent-changed', handleConsent as EventListener)
        return () =>
            window.removeEventListener('cookie-consent-changed', handleConsent as EventListener)
    }, [analyticsConsent, loadUmamiScript])

    // Global link click tracking (internal and external)
    useEffect(() => {
        if (!analyticsConsent) return

        const buildLinkText = (a: HTMLAnchorElement): string => {
            const text = (a.innerText || a.textContent || '').trim()
            if (text) return text
            const aria = a.getAttribute('aria-label')?.trim()
            if (aria) return aria
            const title = a.getAttribute('title')?.trim()
            if (title) return title
            return ''
        }

        const handler = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null
            if (!target) return
            const anchor = target.closest?.('a[href]') as HTMLAnchorElement | null
            if (!anchor) return

            // Ignore if explicitly opted out
            if (anchor.getAttribute('data-umami-ignore') === 'true') return

            try {
                const url = new URL(anchor.href, window.location.href)
                const sameHost =
                    url.host === window.location.host ||
                    url.host === 'enonic.cloud' ||
                    url.host === 'localhost:8080'
                const isExternal = !sameHost
                const protocol = url.protocol.replace(':', '')
                const isDownload = anchor.getAttribute('download') !== null
                const tittel = buildLinkText(anchor)

                if (isDownload) {
                    return void umami(AnalyticsEvents.DOWNLOAD, {
                        tekst: tittel,
                        filnavn: decodeURIComponent(
                            url.href?.replace(/^.*\/([^/#?]+\.\S+).*$/, '$1') ?? 'Ukjent filnavn'
                        ),
                        lenke: url.href,
                    })
                }

                const data = {
                    lenke: url.href,
                    lenkesti: url.pathname,
                    lenketype: isDownload
                        ? 'download'
                        : isExternal
                          ? 'external'
                          : protocol === 'mailto'
                            ? 'email'
                            : protocol === 'tel'
                              ? 'phone'
                              : 'internal',
                    tittel: tittel,
                    nyTab:
                        anchor.target === '_blank' || event.metaKey || event.ctrlKey
                            ? 'true'
                            : 'false',
                }

                void umami(AnalyticsEvents.LINK_CLICKED, data)
            } catch {
                // Swallow URL parsing errors to avoid interfering with navigation
            }
        }

        // Track normal left clicks and auxiliary clicks (e.g., middle button)
        document.addEventListener('click', handler, true)
        document.addEventListener('auxclick', handler, true)

        return () => {
            document.removeEventListener('click', handler, true)
            document.removeEventListener('auxclick', handler, true)
        }
    }, [analyticsConsent])

    return (
        <>
            <Script id={'skyra-config'} nonce={nonce}>
                {`window.SKYRA_CONFIG = ${JSON.stringify(skyraConfig)};`}
            </Script>
            <Script
                defer
                strategy="afterInteractive"
                src="https://survey.skyra.no/skyra-survey.js"
                nonce={nonce}
            />
        </>
    )
}
