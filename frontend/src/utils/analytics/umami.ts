declare global {
    interface Window {
        umami?: {
            track(event_name: string, payload: Record<string, unknown>): void
            identify(session_data: Record<string, unknown>): void
        }
    }
}

export function umami(event_name: string, data: Record<string, unknown> = {}) {
    if (process.env.NODE_ENV === 'development') {
        console.info(`📊 [Analytics] ${event_name}`, data)
        return
    }
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(event_name, data)
    }
}
