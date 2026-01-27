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
import { MouseEvent, useEffect, useRef, useState } from 'react'

type TableOfContentsListProps = {
    title?: string | null
    sections?: Array<string | null> | null
    className?: string
    headingId?: string
    onLinkClick?: (event: MouseEvent<HTMLAnchorElement>, section: string | null) => void
}

const TableOfContentsList = ({
    sections,
    className,
    headingId = 'table-of-contents-heading',
    onLinkClick,
}: TableOfContentsListProps) => (
    <VStack className={className}>
        <ul className="pl-6 md:pl-8" aria-labelledby={headingId}>
            {sections?.length ? (
                sections.map((section, index) => (
                    <li key={index} className="my-[var(--ax-space-8)]">
                        <TrackFirstLink
                            key={index}
                            analyticsEventName={AnalyticsEvents.ANCHOR_LINK_CLICKED}
                            eventData={{ komponentId: 'innholdsfortegnelse' }}>
                            <Link
                                href={`#${headingIdOfString(section ?? '')}`}
                                data-umami-ignore={true}
                                className="text-xl font-[400]"
                                onClick={(event) => onLinkClick?.(event, section ?? null)}>
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
    onLinkClick?: (event: MouseEvent<HTMLAnchorElement>, section: string | null) => void
}

const TableOfContentsCard = ({
    title,
    sections,
    className,
    headingId,
    open,
    defaultOpen,
    onToggle,
    onLinkClick,
}: TableOfContentsCardProps) => (
    <ExpansionCard
        data-color="accent"
        aria-label="Innholdsfortegnelse"
        size="small"
        className={className}
        open={open}
        defaultOpen={defaultOpen}
        onToggle={onToggle}>
        <ExpansionCardHeader className="items-center">
            <ExpansionCardTitle as="h2" size="medium" className="font-ib-regular">
                {title}
            </ExpansionCardTitle>
        </ExpansionCardHeader>
        <ExpansionCardContent>
            <TableOfContentsList
                sections={sections}
                className=""
                headingId={headingId}
                onLinkClick={onLinkClick}
            />
        </ExpansionCardContent>
    </ExpansionCard>
)

export function TableOfContents({ part }: PartData<Part_Idebanken_Table_Of_Contents>) {
    const { sections, title, sticky } = part?.config ?? {}
    const isStickyEnabled = sticky !== false
    const containerRef = useRef<HTMLDivElement | null>(null)
    const stickyRef = useRef<HTMLDivElement | null>(null)
    const [isSticky, setIsSticky] = useState(false)
    const [fixedStyle, setFixedStyle] = useState<{ left: number; width: number } | null>(null)
    const [stickyHeight, setStickyHeight] = useState(0)
    const [inlineOpen, setInlineOpen] = useState(true)
    const [stickyOpen, setStickyOpen] = useState(false)

    const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, section: string | null) => {
        event.currentTarget.blur()
        setInlineOpen(false)
        setStickyOpen(false)
        const id = headingIdOfString(section ?? '')
        const target = id ? document.getElementById(id) : null
        if (!target) return

        event.preventDefault()
        const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
        const nonStickyExtraOffset = 110
        const offset =
            isStickyEnabled && isSticky ? stickyHeight + 16 : headerHeight + nonStickyExtraOffset
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        if (!isStickyEnabled) {
            setIsSticky(false)
            return
        }

        const updateRect = () => {
            const rect = container.getBoundingClientRect()
            setFixedStyle({ left: rect.left, width: rect.width })
            const stickyEl = stickyRef.current ?? containerRef.current
            if (stickyEl) {
                setStickyHeight(stickyEl.getBoundingClientRect().height)
            }
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
    }, [isStickyEnabled])

    useEffect(() => {
        const stickyEl = stickyRef.current ?? containerRef.current
        if (stickyEl) {
            setStickyHeight(stickyEl.getBoundingClientRect().height)
        }
    }, [isSticky])

    useEffect(() => {
        if (!isStickyEnabled) return
        if (!isSticky) {
            setInlineOpen(true)
        }
    }, [isSticky, isStickyEnabled])

    return (
        <div ref={containerRef} className="relative">
            <TableOfContentsCard
                title={title}
                sections={sections}
                className={'bg-(--ax-bg-accent-soft) rounded-3xl'}
                headingId="table-of-contents-heading"
                open={inlineOpen}
                onToggle={setInlineOpen}
                onLinkClick={handleLinkClick}
            />
            {isStickyEnabled && isSticky && fixedStyle ? (
                <div
                    className="fixed top-3 z-40"
                    style={{ left: fixedStyle.left, width: fixedStyle.width }}
                    ref={stickyRef}>
                    <TableOfContentsCard
                        title={title}
                        sections={sections}
                        className={'bg-(--ax-bg-accent-soft) rounded-3xl shadow-ib-shadow'}
                        headingId="table-of-contents-heading-sticky"
                        open={stickyOpen}
                        onToggle={setStickyOpen}
                        onLinkClick={handleLinkClick}
                    />
                </div>
            ) : null}
        </div>
    )
}
