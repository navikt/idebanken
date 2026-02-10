export type ConsentCookie = {
    consent: {
        analytics: boolean
        surveys: boolean
        videoAnalytics: boolean
    }
    functional: {
        alertBannerClosed: number | null
    }
    userActionTaken: boolean
    meta: {
        createdAt: string
        updatedAt: string
        version: number
    }
}

export type CookieConsentChangeEvent = CustomEvent<{
    analytics: boolean
    surveys: boolean
    videoAnalytics: boolean
}>

type PartialConsentCookie = {
    consent?: Partial<ConsentCookie['consent']>
    functional?: Partial<ConsentCookie['functional']>
    userActionTaken?: boolean
    meta?: Partial<ConsentCookie['meta']>
}

const ConsentDataSchema = {
    consent: {
        analytics: 'boolean',
        surveys: 'boolean',
        videoAnalytics: 'boolean',
    },
    functional: {
        alertBannerClosed: 'number',
    },
    userActionTaken: 'boolean',
    meta: {
        createdAt: 'string',
        updatedAt: 'string',
        version: 'number',
    },
}

const consentCookieName = 'idebanken-consent'

export function setAlertBannerClosed(hash: number) {
    try {
        setCookie({
            functional: {
                alertBannerClosed: hash,
            },
        })
    } catch (e) {
        console.error(`Failed to set alert banner closed state in "${consentCookieName}":`, e)
    }
}

export function getAlertBannerClosedHash(): number | null {
    try {
        const existingCookie = getCookie()
        return existingCookie?.functional?.alertBannerClosed || null
    } catch (error) {
        console.warn(
            `Error getting alertBannerClosed value from cookie "${consentCookieName}":`,
            error
        )
        return null
    }
}

export function dispatchCookieConsentEvent({
    analytics,
    surveys,
    videoAnalytics,
}: {
    analytics?: boolean
    surveys?: boolean
    videoAnalytics?: boolean
}): void {
    if (typeof window === 'undefined') return
    let newOrOldAnalytics = analytics
    let newOrOldSurveys = surveys
    let newOrOldVideoAnalytics = videoAnalytics
    if (analytics === undefined || surveys === undefined || videoAnalytics === undefined) {
        const { analyticsConsent, surveysConsent, videoAnalyticsConsent } = getConsentValues()
        if (analytics === undefined) {
            newOrOldAnalytics = analyticsConsent
        }
        if (surveys === undefined) {
            newOrOldSurveys = surveysConsent
        }
        if (videoAnalytics === undefined) {
            newOrOldVideoAnalytics = videoAnalyticsConsent
        }
    }
    window.dispatchEvent(
        new CustomEvent('cookie-consent-changed', {
            detail: {
                analytics: newOrOldAnalytics,
                surveys: newOrOldSurveys,
                videoAnalytics: newOrOldVideoAnalytics,
            },
        })
    )
}

export function setCookie(value: PartialConsentCookie, days = 90) {
    if (typeof document === 'undefined') {
        return
    }
    try {
        const existingCookie = getCookie()
        const newValue: ConsentCookie = existingCookie
            ? {
                  ...existingCookie,
                  ...value,
                  consent: {
                      ...existingCookie.consent,
                      ...value.consent,
                  },
                  functional: {
                      ...existingCookie.functional,
                      ...value.functional,
                  },
                  meta: {
                      ...existingCookie.meta,
                      ...value.meta,
                      updatedAt: new Date().toISOString(),
                  },
              }
            : {
                  consent: {
                      analytics: false,
                      surveys: false,
                      videoAnalytics: false,
                      ...value.consent,
                  },
                  functional: {
                      alertBannerClosed: null,
                      ...value.functional,
                  },
                  userActionTaken: value.userActionTaken ?? false,
                  meta: {
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      version: 1,
                      ...value.meta,
                  },
              }

        const jsonString = encodeURIComponent(JSON.stringify(newValue))
        const expires = new Date()
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
        const secureFlag = process.env.ENV === 'production' ? '; Secure' : ''
        document.cookie = `${consentCookieName}=${jsonString}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureFlag}`
    } catch (e) {
        console.error(`Failed to set cookie "${consentCookieName}":`, e)
        const errorMessage = e instanceof Error ? e.message : 'Unknown error'
        throw new Error(`Failed to set cookie "${consentCookieName}": ${errorMessage}`)
    }
}

function getCookie(cookies?: string): ConsentCookie | null {
    if (cookies) {
        const match = cookies.match(
            new RegExp(
                '(?:^|; )' +
                    consentCookieName.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
                    '=([^;]*)'
            )
        )

        if (!match) return null

        const cookieData = parseConsentCookie(decodeURIComponent(match[1]))

        if (!validateAgainstSchema(cookieData)) {
            console.warn(`Cookie "${consentCookieName}" does not match the expected schema.`)
            return null
        }

        return cookieData
    } else {
        if (typeof document === 'undefined') {
            return null
        }

        const match = document.cookie.match(
            new RegExp(
                '(?:^|; )' +
                    consentCookieName.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
                    '=([^;]*)'
            )
        )

        if (!match) return null

        const cookieData = parseConsentCookie(decodeURIComponent(match[1]))

        if (!validateAgainstSchema(cookieData)) {
            console.warn(`Cookie "${consentCookieName}" does not match the expected schema.`)
            return null
        }

        return cookieData
    }
}

function isValidISOString(dateString: string) {
    const date = new Date(dateString)
    return date.toISOString() === dateString
}

function parseConsentCookie(cookieString: string): ConsentCookie {
    const consentData: ConsentCookie = {
        consent: {
            analytics: false,
            surveys: false,
            videoAnalytics: false,
        },
        functional: {
            alertBannerClosed: null,
        },
        userActionTaken: false,
        meta: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
        },
    }

    try {
        const decodedString = decodeURIComponent(cookieString)

        const trimmedString = decodedString.replace(/^{|}$/g, '')

        const keyValuePairs = trimmedString.match(/"([^"]+)":(".*?"|\d+|true|false)/g)

        if (!keyValuePairs) {
            throw new Error('Invalid cookie format')
        }

        keyValuePairs.forEach((pair) => {
            const [key, rawValue] = pair.split(/:(.+)/).map((s) => s.trim().replace(/^"|"$/g, ''))

            let value
            if (rawValue === 'true') value = true
            else if (rawValue === 'false') value = false
            // @ts-expect-error isNaN accepts all values
            else if (!isNaN(rawValue)) value = Number(rawValue)
            else value = rawValue

            switch (key) {
                case 'analytics':
                    consentData.consent.analytics = value as boolean
                    break
                case 'surveys':
                    consentData.consent.surveys = value as boolean
                    break
                case 'videoAnalytics':
                    consentData.consent.videoAnalytics = value as boolean
                    break
                case 'alertBannerClosed':
                    if (consentData.functional) {
                        consentData.functional.alertBannerClosed = value as number
                    }
                    break
                case 'userActionTaken':
                    consentData.userActionTaken = value as boolean
                    break
                case 'createdAt':
                    consentData.meta.createdAt = isValidISOString(value as string)
                        ? (value as string)
                        : new Date().toISOString()
                    break
                case 'updatedAt':
                    consentData.meta.updatedAt = isValidISOString(value as string)
                        ? (value as string)
                        : new Date().toISOString()
                    break
                case 'version':
                    consentData.meta.version = value as number
                    break
                default:
                    break
            }
        })
    } catch (error) {
        console.error('Failed to parse consent cookie:', error)
    }

    return consentData
}

export function getUserActionTakenValue(cookies?: string) {
    try {
        const existingCookie = getCookie(cookies)
        return existingCookie?.userActionTaken || false
    } catch (error) {
        console.warn(
            `Error getting userActionTaken value from cookie "${consentCookieName}":`,
            error
        )
        return false
    }
}

export function getConsentValues(cookies?: string) {
    try {
        const existingCookie = getCookie(cookies)
        return {
            analyticsConsent: existingCookie?.consent?.analytics || false,
            surveysConsent: existingCookie?.consent?.surveys || false,
            videoAnalyticsConsent: existingCookie?.consent?.videoAnalytics || false,
        }
    } catch (error) {
        console.warn(`Error retrieving consent values for "${consentCookieName}":`, error)
        return {
            analyticsConsent: false,
            surveysConsent: false,
            videoAnalyticsConsent: false,
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateAgainstSchema(obj: any, schema: any = ConsentDataSchema): boolean {
    if (typeof obj !== 'object' || obj === null) return false

    return Object.entries(schema).every(([key, type]) => {
        if (typeof type === 'object') {
            return (
                obj.hasOwnProperty(key) &&
                typeof obj[key] === 'object' &&
                obj[key] !== null &&
                validateAgainstSchema(obj[key], type)
            )
        }
        return obj.hasOwnProperty(key) && (typeof obj[key] === type || obj[key] === null)
    })
}
