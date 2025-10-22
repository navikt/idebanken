'use client'

import React from 'react'
import { AnalyticsEvents, EventData } from '~/utils/analytics/umami'
import { UmamiTracker, UmamiTrackerProps } from '~/components/common/analytics/UmamiTracker'
import { MetaData } from '@enonic/nextjs-adapter'

export function TrackAccordion({
    as = 'div',
    eventData,
    meta,
    children,
}: Omit<UmamiTrackerProps, 'getEventDataAction' | 'analyticsEventName'> & {
    eventData?: EventData
    meta?: MetaData
}) {
    return (
        <UmamiTracker
            as={as}
            getEventDataAction={(event) => {
                const target = event?.target as HTMLElement | undefined
                const button = target?.closest?.('button') as HTMLAnchorElement | null
                if (!button) return

                const anchorText = button.textContent
                if (!anchorText) return {}
                const wasClosed = button.getAttribute('aria-expanded') === 'false'
                return {
                    ...(eventData || {}),
                    ...(meta?.type ? { innholdstype: meta.type } : {}),
                    tittel: anchorText,
                    analyticsEventName: wasClosed
                        ? AnalyticsEvents.ACC_EXPAND
                        : AnalyticsEvents.ACC_COLLAPSE,
                }
            }}>
            {children}
        </UmamiTracker>
    )
}

export default TrackAccordion
