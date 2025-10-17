import { SearchResult } from '~/utils/search'

export interface EventData {
    [key: string]: number | string | EventData | number[] | string[] | EventData[]
}

declare global {
    interface Window {
        umami?: {
            track(eventName: string, eventData: EventData): Promise<void>
            identify: {
                (eventData: EventData): Promise<void>
                (eventName: string, eventData: EventData): Promise<void>
            }
        }
    }
}

export enum AnalyticsEvents {
    NAVIGATION = 'navigere',
    FILTER = 'filtervalg',
    ACC_EXPAND = 'accordion åpnet',
    ACC_COLLAPSE = 'accordion lukket',
    MODAL_OPEN = 'modal åpnet',
    MODAL_CLOSE = 'modal lukket',
    VIDEO_START = 'video start',
    VIDEO_STOP = 'video stopp',
    SCROLL_PERCENT = 'scroll prosent',
    BUTTON_CLICKED = 'knapp klikket',
    SEARCH_SUBMITTED = 'søk gjennomført',
    SEARCH_RESULT_CLICKED = 'søkeresultat klikket',
    LINK_CLICKED = 'lenke klikket',
}

export async function umami(eventName: AnalyticsEvents, eventData: EventData = {}): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.ENV === 'local') {
        console.info(`📊 [Analytics] ${eventName}`, eventData)
        return
    }
    if (typeof window !== 'undefined' && window.umami) {
        void window.umami.track(eventName, eventData)
    }
}

/**
 * url_path is added because this function is called before unload and is not awaited.
 * The default umami url_path will then be incorrect.
 */
export const trackSearchResult = (
    res: SearchResult,
    searchFrom: SearchFrom,
    urlPath: string
): SearchResult => {
    if (res?.word && res?.total !== undefined) {
        void umami(AnalyticsEvents.SEARCH_SUBMITTED, {
            sokeord: res.word,
            sokeresultater: res.total,
            soktFra: searchFrom,
            url_path: urlPath,
        })
    }
    return res
}

export enum SearchFrom {
    HURTIGSOK_MENY = 'hurtigsøk meny',
    SOKESIDE = 'søkeside',
}
