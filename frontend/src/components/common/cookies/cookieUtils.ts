export type ConsentCookie = {
    consent: {
        analytics: boolean
        surveys: boolean
    }
    userActionTaken: boolean
    meta: {
        createdAt: string
        updatedAt: string
        version: number
    }
}

const ConsentDataSchema = {
    consent: {
        analytics: 'boolean',
        surveys: 'boolean',
    },
    userActionTaken: 'boolean',
    meta: {
        createdAt: 'string',
        updatedAt: 'string',
        version: 'number',
    },
}

const consentCookieName = 'idebanken-consent'

export function dispatchCookieConsentEvent({
    analytics,
    surveys,
}: {
    analytics?: boolean
    surveys?: boolean
}): void {
    if (typeof window === 'undefined') return
    let newOrOldAnalytics = analytics
    let newOrOldSurveys = surveys
    if (analytics === undefined || surveys === undefined) {
        const { analyticsConsent, surveysConsent } = getConsentValues()
        if (analytics === undefined) {
            newOrOldAnalytics = analyticsConsent
        }
        if (surveys === undefined) {
            newOrOldSurveys = surveysConsent
        }
    }
    window.dispatchEvent(
        new CustomEvent('cookie-consent-changed', {
            detail: { analytics: newOrOldAnalytics, surveys: newOrOldSurveys },
        })
    )
}

export function setCookie(value: ConsentCookie, days = 90) {
    if (typeof document === 'undefined') {
        return
    }
    try {
        const jsonString = encodeURIComponent(JSON.stringify(value))
        const expires = new Date()
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
        const secureFlag = process.env.ENV === 'production' ? '; Secure' : ''
        document.cookie = `${consentCookieName}=${jsonString}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureFlag}`
    } catch (e) {
        console.error(`Failed to set cookie "${consentCookieName}":`, e)
        // @ts-expect-error e is unknown
        throw new Error(`Failed to set cookie "${consentCookieName}": ${e.message}`)
    }
}

function getCookie(cookies?: string) {
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

function parseConsentCookie(cookieString: string) {
    const consentData = {
        consent: {
            analytics: false,
            surveys: false,
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

export function getCreatedAtValue(cookies?: string) {
    try {
        const existingCookie = getCookie(cookies)
        return existingCookie?.meta?.createdAt || new Date().toISOString()
    } catch (error) {
        console.warn(`Error getting createdAt value from cookie "${consentCookieName}":`, error)
        return new Date().toISOString()
    }
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
        }
    } catch (error) {
        console.warn(`Error retrieving consent values for "${consentCookieName}":`, error)
        return {
            analyticsConsent: false,
            surveysConsent: false,
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateAgainstSchema(obj: any, schema: any = ConsentDataSchema): boolean {
    if (typeof obj !== 'object' || obj === null) return false

    return Object.entries(schema).every(([key, type]) => {
        if (typeof type === 'object') {
            return obj[key] && validateAgainstSchema(obj[key], type)
        }
        return obj.hasOwnProperty(key) && typeof obj[key] === type
    })
}
