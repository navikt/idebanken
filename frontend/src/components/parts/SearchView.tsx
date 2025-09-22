'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchWrapper, SOK_SEARCH_PARAM } from '~/components/common/SearchWrapper'
import { VStack } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import { Idebanken_SpecialPage_Data, Part_Idebanken_Search_View } from '~/types/generated'
import { search, SearchResult } from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'

export default function SearchView({
    meta,
    common,
}: PartData<Part_Idebanken_Search_View, Idebanken_SpecialPage_Data>) {
    const [searchResult, setSearchResult] = useState<SearchResult | undefined>()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        const ord = searchParams.get(SOK_SEARCH_PARAM)
        if (!ord) {
            return
        }
        setLoading(true)
        search(setSearchResult, ord).finally(() => setLoading(false))
    }, [searchParams])

    return (
        <VStack>
            <SearchWrapper
                aria-controls={'search-status'}
                onSubmit={(e) => {
                    e.preventDefault()

                    const urlSearchParams = new URLSearchParams(searchParams.toString())
                    urlSearchParams.set(
                        SOK_SEARCH_PARAM,
                        new FormData(e.currentTarget).get(SOK_SEARCH_PARAM)?.toString() || ''
                    )
                    window.history.replaceState(null, '', `?${urlSearchParams.toString()}`)
                }}
            />
            {SearchResults(searchResult, meta, common, loading)}
        </VStack>
    )
}
