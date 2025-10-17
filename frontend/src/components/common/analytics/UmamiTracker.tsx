'use client'

import React, { PropsWithChildren, useCallback } from 'react'
import { AnalyticsEvents, EventData, umami } from '~/utils/analytics/umami'

export type UmamiTrackerProps = PropsWithChildren<{
    as?: keyof React.JSX.IntrinsicElements
    analyticsEventName: AnalyticsEvents
    /**
     * Callback to produce analytics payload based on the event.
     */
    getEventDataAction: (e: React.MouseEvent<Element, MouseEvent>) => EventData | undefined | null
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
    const handleClick = useCallback<React.MouseEventHandler>(
        (e) => {
            try {
                const payload = getEventDataAction(e)
                if (!payload) return
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

    return <Tag onClick={handleClick}>{children}</Tag>
}

export default UmamiTracker
