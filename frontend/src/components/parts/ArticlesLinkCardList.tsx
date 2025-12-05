'use client'

import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LinkCardView } from './LinkCard'
import { Button, Loader } from '@navikt/ds-react'
import { XP_BrandColor, XP_DisplayImageOrIcon } from '@xp-types/site/mixins'
import { fetchArticleCardList } from '../queries/articlesList'
import { FilterChips } from '../common/FilterChips'
import { usePathname, useRouter } from 'next/navigation'

type Card = Part_Idebanken_Article_Card_List['list'][number]
type Tag = Part_Idebanken_Article_Card_List['availableTypeTags'][number]

interface Config {
    pageSize?: number
}

const MIN_SPINNER_MS = 400

function normalizeCard(card: Card) {
    const themeTags = (card.themeTags ?? []).filter((t): t is Tag => !!t)
    const typeTags = (card.typeTags ?? []).filter((t): t is Tag => !!t)

    return {
        title: card.title ?? '[Uten tittel]',
        description: card.description ?? '',
        url: card.url ?? '#',
        external: card.external ?? false,
        image: card.image ?? undefined,
        brand: 'neutral' as XP_BrandColor['brand'],
        showDescription: true,
        displayType: 'withImage' as XP_DisplayImageOrIcon['displayType'],
        hideArrow: true,
        themeTags: themeTags,
        typeTags: typeTags,
    }
}

function toCsv(values: string[]) {
    return values.length ? values.join(',') : undefined
}

type ArticlePartProps = PartData<Config> & { data?: Part_Idebanken_Article_Card_List }

export function ArticlesLinkCardList(props: ArticlePartProps) {
    const { part, meta, data } = props

    const absolutePath = useMemo(() => {
        const site = 'idebanken'
        const p = meta.path || ''
        const cleaned = p.startsWith('/') ? p.slice(1) : p
        return `/${site}/${cleaned}`
    }, [meta.path])

    const initial = data?.list ?? []
    const typeTags = useMemo(() => data?.availableTypeTags || [], [data?.availableTypeTags])
    const initialTotal = data?.total ?? 0
    const pageSize = part.config?.pageSize ?? 6

    const [items, setItems] = useState<Card[]>(initial)
    const [offset, setOffset] = useState(initial.length)
    const [loading, setLoading] = useState(false)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [showAll, setShowAll] = useState(true)
    const [filteredTotal, setFilteredTotal] = useState<number>(initialTotal)

    const router = useRouter()
    const pathname = usePathname()
    const prevNamesCsvRef = useRef<string | null>(null)
    const didInitFromUrlRef = useRef(false)

    const selectedIdsCsv = useMemo(() => {
        if (showAll) return undefined
        const ids = Array.from(new Set(selectedTags.map((t) => t.id)))
        return toCsv(ids)
    }, [showAll, selectedTags])

    useEffect(() => {
        if (didInitFromUrlRef.current) return
        if (!typeTags.length) return

        const params = new URLSearchParams(window.location.search)
        const csv = params.get('filters') || ''
        const names = csv ? csv.split(',').filter(Boolean) : []
        const fromUrl = names
            .map((n) => typeTags.find((t) => t.name === n))
            .filter(Boolean) as Tag[]

        setSelectedTags(fromUrl)
        setShowAll(fromUrl.length === 0)
        prevNamesCsvRef.current = csv || null
        didInitFromUrlRef.current = true
    }, [typeTags])

    useEffect(() => {
        if (!didInitFromUrlRef.current) return
        let cancelled = false
        async function run() {
            if (!absolutePath) return
            setLoading(true)
            try {
                const fetchPromise = fetchArticleCardList(absolutePath, 0, pageSize, selectedIdsCsv)
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
    }, [absolutePath, pageSize, selectedIdsCsv])

    const setFiltersInUrl = useCallback(
        (namesCsvNext: string | null) => {
            if (!didInitFromUrlRef.current) return
            if (prevNamesCsvRef.current === namesCsvNext) return
            const params = new URLSearchParams(window.location.search)
            if (namesCsvNext) params.set('filters', namesCsvNext)
            else params.delete('filters')
            const qs = params.toString()
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
            prevNamesCsvRef.current = namesCsvNext
        },
        [pathname, router]
    )

    const onToggleAll = useCallback(() => {
        setShowAll(true)
        setSelectedTags([])
        setFiltersInUrl(null)
    }, [setFiltersInUrl])

    const onToggleTag = useCallback(
        (id: string) => {
            const exists = selectedTags.some((t) => t.id === id)
            const next = exists
                ? selectedTags.filter((t) => t.id !== id)
                : (() => {
                      const tag = typeTags.find((t) => t.id === id)
                      return tag ? [...selectedTags, tag] : selectedTags
                  })()

            setSelectedTags(next)
            setShowAll(next.length === 0)

            const namesCsvNext = next.length
                ? Array.from(new Set(next.map((t) => t.name))).join(',')
                : null
            setFiltersInUrl(namesCsvNext)
        },
        [selectedTags, typeTags, setFiltersInUrl]
    )

    const canLoadMore = offset < filteredTotal

    const loadMore = useCallback(async () => {
        if (!canLoadMore || loading) return
        if (!absolutePath) return
        setLoading(true)
        try {
            const fetchPromise = fetchArticleCardList(
                absolutePath,
                offset,
                pageSize,
                selectedIdsCsv
            )
            const delay = new Promise((res) => setTimeout(res, MIN_SPINNER_MS))
            const [res] = await Promise.all([fetchPromise, delay])
            const newItems: Card[] = res.list ?? []
            if (newItems.length) {
                setItems((prev) => [...prev, ...newItems])
                setOffset((prev) => prev + newItems.length)
            }
            setFilteredTotal(res.total ?? filteredTotal)
        } finally {
            setLoading(false)
        }
    }, [canLoadMore, loading, absolutePath, offset, pageSize, selectedIdsCsv, filteredTotal])

    const firstTwo = items.slice(0, 2)
    const rest = items.slice(2)

    return (
        <>
            <FilterChips
                tags={typeTags}
                showAll={showAll}
                selectedIds={new Set(selectedTags.map((t) => t.id))}
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
