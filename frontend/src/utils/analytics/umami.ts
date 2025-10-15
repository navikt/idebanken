interface EventData {
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
}

export async function umami(eventName: AnalyticsEvents, eventData: EventData = {}): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.ENV === 'local') {
        console.info(`📊 [Analytics] ${eventName}`, eventData)
        return
    }
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventName, eventData)
    }
}
