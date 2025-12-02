'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LinkCardView } from './LinkCard'
import { Button, Loader } from '@navikt/ds-react'
import { XP_BrandColor, XP_DisplayImageOrIcon } from '@xp-types/site/mixins'
import { fetchArticleCardList } from '../queries/articlesList'
import { FilterChips } from '../common/FilterChips'

type Card = Part_Idebanken_Article_Card_List['list'][number]
type Tag = Part_Idebanken_Article_Card_List['availableTypeTags'][number]

interface Config {
    list: Card[]
    availableTypeTags: Tag[]
    total: number
    pageSize?: number
}

const MIN_SPINNER_MS = 400

function normalizeCard(card: Card) {
    return {
        title: card.title ?? '[Uten tittel]',
        description: card.description ?? '',
        url: card.url ?? '#',
        external: false,
        image: card.image ?? undefined,
        brand: 'neutral' as XP_BrandColor['brand'],
        showDescription: true,
        displayType: 'withImage' as XP_DisplayImageOrIcon['displayType'],
        hideArrow: true,
        themeTags: [],
        typeTags: [],
    }
}

function idsToCsv(ids: Set<string>) {
    return ids.size ? Array.from(ids).join(',') : undefined
}

export function ArticlesLinkCardList({ part, meta }: PartData<Config>) {
    const initial = part.config?.list ?? []
    const typeTags = useMemo(
        () => part.config?.availableTypeTags || [],
        [part.config?.availableTypeTags]
    )
    const initialTotal = part.config?.total ?? 0
    const pageSize = part.config?.pageSize ?? 6

    const [items, setItems] = useState<Card[]>(initial)
    const [offset, setOffset] = useState(initial.length)
    const [loading, setLoading] = useState(false)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [showAll, setShowAll] = useState(true)
    const [filteredTotal, setFilteredTotal] = useState<number>(initialTotal)
    const didMountRef = useRef(false)

    const selectedIds = useMemo(() => new Set(selectedTags.map((t) => t.id)), [selectedTags])
    const filterCsv = useMemo(
        () => (showAll ? undefined : idsToCsv(selectedIds)),
        [showAll, selectedIds]
    )

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            return // skip first load
        }
        let cancelled = false
        async function run() {
            if (!meta.id) return
            setLoading(true)
            try {
                const fetchPromise = fetchArticleCardList(meta.id, 0, pageSize, filterCsv)
                const delay = new Promise((res) => setTimeout(res, MIN_SPINNER_MS))
                const [res] = await Promise.all([fetchPromise, delay])
                if (cancelled) return
                const newItems: Card[] = res.list ?? []
                setItems(newItems)
                setOffset(newItems.length)
                setFilteredTotal(res.total ?? 0)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        run()
        return () => {
            cancelled = true
        }
    }, [meta.id, pageSize, filterCsv])

    const onToggleAll = useCallback(() => {
        setShowAll(true)
        setSelectedTags([])
    }, [])

    const onToggleTag = useCallback(
        (id: string) => {
            setSelectedTags((prev) => {
                const exists = prev.some((t) => t.id === id)
                const next = exists
                    ? prev.filter((t) => t.id !== id)
                    : [...prev, typeTags.find((t) => t.id === id)!]
                setShowAll(next.length === 0)
                return next
            })
        },
        [typeTags]
    )

    const canLoadMore = offset < filteredTotal

    const loadMore = useCallback(async () => {
        if (!canLoadMore || loading) return
        if (!meta.id) return
        setLoading(true)
        try {
            const fetchPromise = fetchArticleCardList(meta.id, offset, pageSize, filterCsv)
            const delay = new Promise((res) => setTimeout(res, MIN_SPINNER_MS))
            const [res] = await Promise.all([fetchPromise, delay])
            const newItems: Card[] = res.list ?? []
            if (newItems.length) {
                setItems((prev) => [...prev, ...newItems])
                setOffset((prev) => prev + newItems.length)
            }
            // total may be unchanged, but keep it in sync
            setFilteredTotal(res.total ?? filteredTotal)
        } finally {
            setLoading(false)
        }
    }, [canLoadMore, loading, meta.id, offset, pageSize, filterCsv, filteredTotal])

    const firstTwo = items.slice(0, 2)
    const rest = items.slice(2)

    return (
        <>
            <FilterChips
                tags={typeTags}
                showAll={showAll}
                selectedIds={selectedIds}
                onToggleAll={onToggleAll}
                onToggleTag={onToggleTag}
            />

            {items.length === 0 ? (
                <div className="text-center text-[color:var(--a-text-subtle)]">Ingen treff</div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        {firstTwo.map((card, i) => {
                            const nc = normalizeCard(card)
                            return (
                                <LinkCardView
                                    key={card.url || card.title || String(i)}
                                    {...nc}
                                    meta={meta}
                                />
                            )
                        })}
                    </div>

                    {items.length > 2 && (
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {rest.map((card, i) => {
                                const nc = normalizeCard(card)
                                return (
                                    <LinkCardView
                                        key={card.url || card.title || String(i)}
                                        {...nc}
                                        meta={meta}
                                    />
                                )
                            })}
                        </div>
                    )}
                </>
            )}

            {items.length > 0 && canLoadMore && (
                <div className="mt-8 flex justify-center">
                    {loading ? (
                        <Loader size="large" title="Laster" />
                    ) : (
                        <Button
                            data-color="ib-brand-dark-blue"
                            className="rounded-full font-light w-auto whitespace-nowrap"
                            onClick={loadMore}
                            variant="secondary"
                            aria-live="polite">
                            Last mer
                        </Button>
                    )}
                </div>
            )}
        </>
    )
}
