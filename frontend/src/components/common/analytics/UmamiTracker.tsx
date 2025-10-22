'use client'

import React, { PropsWithChildren, useCallback } from 'react'
import { AnalyticsEvents, EventData, umami } from '~/utils/analytics/umami'

export type UmamiTrackerProps = PropsWithChildren<{
    as?: keyof React.JSX.IntrinsicElements

    /**
     * analyticsEventName must be provided either here or in the EventData
     * returned by getEventDataAction.
     */
    analyticsEventName?: AnalyticsEvents
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
                const eventData = getEventDataAction(e)
                const hasEventName =
                    Boolean(analyticsEventName) ||
                    (typeof eventData?.analyticsEventName === 'string' &&
                        Object.values<string>(AnalyticsEvents).includes(
                            eventData?.analyticsEventName
                        ))

                if (!eventData || !hasEventName) return

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { analyticsEventName: _ignored, ...filteredEventData } = eventData
                void umami(
                    analyticsEventName || (eventData.analyticsEventName as AnalyticsEvents),
                    filteredEventData
                )
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
