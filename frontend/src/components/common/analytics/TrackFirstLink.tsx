'use client'

import React from 'react'
import { AnalyticsEvents, EventData } from '~/utils/analytics/umami'
import { UmamiTracker, UmamiTrackerProps } from '~/components/common/analytics/UmamiTracker'
import { MetaData } from '@enonic/nextjs-adapter'

export function TrackFirstLink({
    as = 'div',
    analyticsEventName = AnalyticsEvents.LINK_CLICKED,
    eventData,
    meta,
    children,
}: Omit<UmamiTrackerProps, 'getEventDataAction'> & {
    eventData?: EventData
    meta?: MetaData
}) {
    return (
        <UmamiTracker
            as={as}
            analyticsEventName={analyticsEventName}
            getEventDataAction={(root) => {
                const anchorText = root?.querySelector<HTMLAnchorElement>('a')?.textContent
                if (!anchorText) return {}
                return {
                    ...(eventData || {}),
                    ...(meta?.type ? { innholdstype: meta.type } : {}),
                    lenketekst: anchorText,
                }
            }}>
            {children}
        </UmamiTracker>
    )
}

export default TrackFirstLink
