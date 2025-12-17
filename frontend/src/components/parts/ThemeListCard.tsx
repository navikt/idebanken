'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Theme_Card_List, Theme_Card } from '~/types/generated'
import { useCallback, useState } from 'react'
import { LinkCardView } from './LinkCard'
import { Button, Loader } from '@navikt/ds-react'
import { XP_DisplayImageOrIcon } from '@xp-types/site/mixins'
import { fetchThemeCardList } from '~/components/queries/themeList'

const MIN_SPINNER_MS = 400

function normalizeCard(card: Theme_Card) {
    return {
        title: card.title ?? '[Uten tittel]',
        description: card.description ?? '',
        url: card.url ?? '#',
        external: false,
        image: card.image ?? undefined,
        showDescription: true,
        displayType: 'withImage' as XP_DisplayImageOrIcon['displayType'],
        hideArrow: true,
        typeTags: card.typeTags,
    }
}

export default function ThemeCardList({ part, meta }: PartData<Part_Idebanken_Theme_Card_List>) {
    const { data } = part.config || {}
    const initial = data?.list ?? []
    const total = data?.total ?? 0
    const pageSize = part.config?.pageSize ?? 6

    const [items, setItems] = useState<Theme_Card[]>(initial)
    const [offset, setOffset] = useState(initial.length)
    const [loading, setLoading] = useState(false)

    const canLoadMore = offset < total

    const loadMore = useCallback(async () => {
        if (!canLoadMore || loading || !meta.path) return
        setLoading(true)

        try {
            const fetchPromise = fetchThemeCardList(meta.path, offset, pageSize)
            const delay = new Promise((res) => setTimeout(res, MIN_SPINNER_MS))
            const [res] = await Promise.all([fetchPromise, delay])

            const newItems: Theme_Card[] = res.list ?? []
            if (newItems.length) {
                setItems((prev) => [...prev, ...newItems])
                setOffset((prev) => prev + newItems.length)
            }
        } finally {
            setLoading(false)
        }
    }, [canLoadMore, loading, meta.path, offset, pageSize])

    if (!items.length) return null

    return (
        <>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
                {items.map((card, i) => {
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

            {canLoadMore && (
                <div className="mt-8 flex justify-center">
                    {loading ? (
                        <Loader size="large" title="Laster" />
                    ) : (
                        <Button
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
