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

export async function umami(eventName: string, eventData: EventData = {}): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
        console.info(`📊 [Analytics] ${eventName}`, eventData)
        return
    }
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventName, eventData)
    }
}
