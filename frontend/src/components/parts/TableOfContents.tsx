'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Table_Of_Contents } from '~/types/generated'
import { BodyShort, Link, VStack } from '@navikt/ds-react'
import {
    ExpansionCard,
    ExpansionCardContent,
    ExpansionCardHeader,
    ExpansionCardTitle,
} from '@navikt/ds-react/ExpansionCard'
import { headingIdOfString } from '~/utils/utils'
import TrackFirstLink from '~/components/common/analytics/TrackFirstLink'
import { AnalyticsEvents } from '~/utils/analytics/umami'
import { useEffect, useRef, useState } from 'react'

type TableOfContentsListProps = {
    title?: string | null
    sections?: Array<string | null> | null
    className?: string
    headingId?: string
}

const TableOfContentsList = ({
    sections,
    className,
    headingId = 'table-of-contents-heading',
}: TableOfContentsListProps) => (
    <VStack className={className}>
        <ul className="pl-6 md:pl-8" aria-labelledby={headingId}>
            {sections?.length ? (
                sections.map((section, index) => (
                    <li key={index}>
                        <TrackFirstLink
                            key={index}
                            analyticsEventName={AnalyticsEvents.ANCHOR_LINK_CLICKED}
                            eventData={{ komponentId: 'innholdsfortegnelse' }}>
                            <Link
                                href={`#${headingIdOfString(section ?? '')}`}
                                data-umami-ignore={true}
                                className="text-xl font-[400]">
                                {section}
                            </Link>
                        </TrackFirstLink>
                    </li>
                ))
            ) : (
                <BodyShort>[Opprett layouts av typen &#34;Kort&#34;]</BodyShort>
            )}
        </ul>
    </VStack>
)

type TableOfContentsCardProps = {
    title?: string | null
    sections?: Array<string | null> | null
    className?: string
    headingId?: string
    open?: boolean
    defaultOpen?: boolean
    onToggle?: (isOpen: boolean) => void
}

const TableOfContentsCard = ({
    title,
    sections,
    className,
    headingId,
    open,
    defaultOpen,
    onToggle,
}: TableOfContentsCardProps) => (
    <ExpansionCard
        data-color="accent"
        aria-label="Innholdsfortegnelse"
        className={className}
        open={open}
        defaultOpen={defaultOpen}
        onToggle={onToggle}>
        <ExpansionCardHeader>
            <ExpansionCardTitle as="h2" size="medium" className="font-ib-regular">
                {title}
            </ExpansionCardTitle>
        </ExpansionCardHeader>
        <ExpansionCardContent>
            <TableOfContentsList sections={sections} className="pt-2" headingId={headingId} />
        </ExpansionCardContent>
    </ExpansionCard>
)

export function TableOfContents({ part }: PartData<Part_Idebanken_Table_Of_Contents>) {
    const { sections, title } = part?.config ?? {}
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [isSticky, setIsSticky] = useState(false)
    const [fixedStyle, setFixedStyle] = useState<{ left: number; width: number } | null>(null)
    const [stickyOpen, setStickyOpen] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const updateRect = () => {
            const rect = container.getBoundingClientRect()
            setFixedStyle({ left: rect.left, width: rect.width })
        }

        updateRect()
        window.addEventListener('resize', updateRect)

        const observer = new IntersectionObserver(
            ([entry]) => {
                const shouldStick = !entry.isIntersecting && entry.boundingClientRect.top < 0
                setIsSticky(shouldStick)
                if (shouldStick) {
                    setStickyOpen(false)
                }
            },
            { threshold: 0, rootMargin: '-8px 0px 0px 0px' }
        )

        observer.observe(container)

        return () => {
            window.removeEventListener('resize', updateRect)
            observer.disconnect()
        }
    }, [])

    return (
        <div ref={containerRef} className="relative">
            <TableOfContentsCard
                title={title}
                sections={sections}
                className={'p-9 bg-(--ax-bg-accent-soft) rounded-3xl'}
                headingId="table-of-contents-heading"
                defaultOpen={true}
            />
            {isSticky && fixedStyle ? (
                <div
                    className="fixed top-6 z-40"
                    style={{ left: fixedStyle.left, width: fixedStyle.width }}>
                    <TableOfContentsCard
                        title={title}
                        sections={sections}
                        className={'p-9 bg-(--ax-bg-accent-soft) rounded-3xl shadow-ib-shadow'}
                        headingId="table-of-contents-heading-sticky"
                        open={stickyOpen}
                        onToggle={setStickyOpen}
                    />
                </div>
            ) : null}
        </div>
    )
}
