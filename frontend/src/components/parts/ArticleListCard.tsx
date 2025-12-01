'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'
import { useCallback, useState } from 'react'
import { LinkCardView } from './LinkCard'
import { Button, Chips, Loader } from '@navikt/ds-react'
import { XP_BrandColor, XP_DisplayImageOrIcon } from '@xp-types/site/mixins'
import { fetchArticleCardList } from '../queries/articlesList'
import { ChipsToggle } from '@navikt/ds-react/Chips'

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

export function ArticleCardList({ part, meta }: PartData<Config>) {
    const initial = part.config?.list ?? []
    const typeTags = part.config?.availableTypeTags || []
    const total = part.config?.total ?? 0
    const pageSize = part.config?.pageSize ?? 6

    const [items, setItems] = useState<Card[]>(initial)
    const [offset, setOffset] = useState(initial.length)
    const [loading, setLoading] = useState(false)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [showAll, setShowAll] = useState(true)

    const canLoadMore = offset < total

    const loadMore = useCallback(async () => {
        if (!canLoadMore || loading) return
        if (!meta.id) return
        setLoading(true)

        try {
            const fetchPromise = fetchArticleCardList(meta.id, offset, pageSize)
            const delay = new Promise((res) => setTimeout(res, MIN_SPINNER_MS))
            const [res] = await Promise.all([fetchPromise, delay])

            const newItems: Card[] = res.list ?? []
            if (newItems.length) {
                setItems((prev) => [...prev, ...newItems])
                setOffset((prev) => prev + newItems.length)
            }
        } finally {
            setLoading(false)
        }
    }, [canLoadMore, loading, meta.id, offset, pageSize])

    if (!items.length) return null

    const firstTwo = items.slice(0, 2)
    const rest = items.slice(2)

    return (
        <>
            <Chips>
                <ChipsToggle
                    key="__all__"
                    selected={showAll}
                    onClick={() => {
                        setShowAll(true)
                        setSelectedTags([])
                    }}>
                    Vis alle
                </ChipsToggle>

                {typeTags.map((tag) => (
                    <ChipsToggle
                        key={tag.id}
                        selected={!showAll && selectedTags.some((t) => t.id === tag.id)}
                        onClick={() =>
                            setSelectedTags((prev) => {
                                const exists = prev.some((t) => t.id === tag.id)
                                const next = exists
                                    ? prev.filter((t) => t.id !== tag.id)
                                    : [...prev, tag]
                                setShowAll(next.length === 0) // if none selected, fallback to "Show all"
                                return next
                            })
                        }>
                        {tag.name}
                    </ChipsToggle>
                ))}
            </Chips>
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

            {canLoadMore && (
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

export default ArticleCardList
