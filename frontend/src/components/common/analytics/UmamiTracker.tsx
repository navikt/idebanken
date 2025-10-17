'use client'

import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { AnalyticsEvents, EventData, umami } from '~/utils/analytics/umami'

export type UmamiTrackerProps = PropsWithChildren<{
    as?: keyof React.JSX.IntrinsicElements
    analyticsEventName: AnalyticsEvents
    /**
     * Callback to produce analytics payload based on the root element.
     * Return value (if any) will be spread into the umami() eventData argument.
     */
    getEventDataAction: (rootRef: HTMLElement | null) => EventData | undefined | null
    /**
     * Optional onClick to run in addition to analytics.
     */
    onClick?: React.MouseEventHandler
}>

/**
 * Generic analytics helper that wraps children and, on click, calls umami()
 * with event name and payload computed by a callback that receives the root ref.
 */
export function UmamiTracker({
    as: Tag = 'div',
    analyticsEventName,
    getEventDataAction,
    onClick,
    children,
}: UmamiTrackerProps) {
    const rootRef = useRef<HTMLElement | null>(null)

    const handleClick = useCallback<React.MouseEventHandler>(
        (e) => {
            try {
                const payload = getEventDataAction?.(rootRef.current) || {}
                void umami(analyticsEventName, {
                    ...(payload as EventData),
                })
            } catch (err) {
                // Fail quietly – analytics must never break UI
                console.error('UmamiTracker error:', err)
            }

            // Invoke consumer onClick last
            if (onClick) onClick(e)
        },
        [analyticsEventName, getEventDataAction, onClick]
    )

    return (
        // @ts-expect-error ref type too complex to represent
        <Tag ref={rootRef as never} onClick={handleClick}>
            {children}
        </Tag>
    )
}

export default UmamiTracker
