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
    const searchParams = useSearchParams()

    useEffect(() => {
        const ord = searchParams.get(SOK_SEARCH_PARAM)
        if (!ord) {
            return
        }
        search(setSearchResult, ord)
    }, [searchParams])

    return (
        <VStack>
            <SearchWrapper
                aria-controls={'search-status'}
                onSubmit={(_) => search(setSearchResult, searchParams.get(SOK_SEARCH_PARAM))}
            />
            {SearchResults(searchResult, meta, common)}
        </VStack>
    )
}
