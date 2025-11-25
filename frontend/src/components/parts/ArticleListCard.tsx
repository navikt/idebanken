'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'
import { useCallback, useState } from 'react'
import { LinkCardView } from './LinkCard'
import { Button, Loader } from '@navikt/ds-react'

type Card = Part_Idebanken_Article_Card_List['list'][number]

interface Config {
    list: Card[]
    total: number
}

const PAGE_SIZE = 5
const MIN_SPINNER_MS = 400 // ensure loader is visible

export function ArticleCardList({ part, meta }: PartData<Config>) {
    const initial = part.config?.list ?? []
    const total = part.config?.total ?? 0

    const [items, setItems] = useState<Card[]>(initial)
    const [offset, setOffset] = useState(initial.length)
    const [loading, setLoading] = useState(false)

    const canLoadMore = offset < total

    const loadMore = useCallback(async () => {
        if (!canLoadMore || loading) return
        if (!meta.id) return
        setLoading(true)
        try {
            const fetchPromise = fetch('/api/articlesList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contentId: meta.id, offset, count: PAGE_SIZE }),
            }).then((r) => r.json())

            // Enforce minimum spinner time
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
    }, [canLoadMore, loading, meta.id, offset])

    if (!items.length) return null

    return (
        <>
            {/* First two items: 2 columns */}
            <div className="grid gap-6 md:grid-cols-2">
                {items.slice(0, 2).map((card, index) => (
                    <LinkCardView
                        key={card.url ?? card.title ?? index}
                        title={card.title ?? '[Uten tittel]'}
                        description={card.description ?? ''}
                        url={card.url ?? '#'}
                        external={false}
                        image={card.image ?? undefined}
                        brand="neutral"
                        showDescription={true}
                        displayType="withImage"
                        hideArrow={true}
                        categories={[]}
                        meta={meta}
                    />
                ))}
            </div>

            {/* Remaining items: 3 columns */}
            {items.length > 2 && (
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {items.slice(2).map((card, index) => (
                        <LinkCardView
                            key={card.url ?? card.title ?? index}
                            title={card.title ?? '[Uten tittel]'}
                            description={card.description ?? ''}
                            url={card.url ?? '#'}
                            external={false}
                            image={card.image ?? undefined}
                            brand="neutral"
                            showDescription={true}
                            displayType="withImage"
                            hideArrow={true}
                            categories={[]}
                            meta={meta}
                        />
                    ))}
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
