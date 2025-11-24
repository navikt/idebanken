'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'
import { getAsset, getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import {
    LinkCard,
    LinkCardImage,
    LinkCardTitle,
    LinkCardAnchor,
    LinkCardDescription,
} from '@navikt/ds-react/LinkCard'
import Image from 'next/image'
import { useCallback, useState } from 'react'

type Card = Part_Idebanken_Article_Card_List['list'][number]

interface Config {
    list: Card[]
    total: number
}

const PAGE_SIZE = 10

export function ArticleCardList({ part, meta }: PartData<Config>) {
    const initial = part.config?.list ?? []
    const total = part.config?.total ?? 0

    console.log('meta', meta)

    const [items, setItems] = useState<Card[]>(initial)
    const [offset, setOffset] = useState(initial.length)
    const [loading, setLoading] = useState(false)

    const canLoadMore = offset < total

    const loadMore = useCallback(async () => {
        console.log('entering loadMore')
        if (!canLoadMore || loading) return
        setLoading(true)

        const query = `
        query ($contentId: ID!, $offset: Int!, $count: Int!) {
            guillotine {
                get(key: $contentId) {
                    components {
                        ... on PartComponent {
                            descriptor
                            config {
                                idebanken {
                                    article_card_list {
                                        list(offset: $offset, count: $count) {
                                            url external title description
                                            image { url caption }
                                            icon { url caption }
                                            categories { id name }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`

        const res = await fetch('/api/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { contentId: meta.id, offset, count: PAGE_SIZE },
            }),
        }).then((r) => r.json())

        const parts = res?.data?.guillotine?.get?.components ?? []
        const node = parts.find((p: any) => p?.descriptor === 'idebanken:article-card-list')
        const newItems: Card[] = node?.config?.idebanken?.article_card_list?.list ?? []

        setItems((prev) => [...prev, ...newItems])
        setOffset((prev) => prev + newItems.length)
        setLoading(false)
    }, [canLoadMore, loading, meta.id, offset])

    if (!items.length) return null

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {items.map((card) => (
                <p key={card.url}>{card.title}</p>
            ))}
            <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="px-4 py-2 rounded bg-(--ax-bg-action) text-(--ax-text-on-action) disabled:opacity-60">
                {loading ? 'Laster…' : 'Last flere'}
            </button>
        </div>
    )
}

export default ArticleCardList
