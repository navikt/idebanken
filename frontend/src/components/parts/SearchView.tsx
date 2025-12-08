'use client'

import { useCallback, useEffect, useState } from 'react'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { Button, Chips, Fieldset, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import { Idebanken_SpecialPage_Data, Part_Idebanken_Search_View } from '~/types/generated'
import { getTypeTagsMap, search, SearchResult } from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'
import {
    SOK_PAGE_PARAM,
    SOK_SEARCH_PARAM,
    SOK_SORT_PARAM,
    SOK_UNDER_FACET_PARAM,
} from '~/utils/constants'
import { SearchFrom, trackSearchResult } from '~/utils/analytics/umami'

const FILTER_NAME_ALL = 'Alle'

export default function SearchView({
    meta,
    common,
}: PartData<Part_Idebanken_Search_View, Idebanken_SpecialPage_Data>) {
    const [searchResult, setSearchResult] = useState<SearchResult | undefined>()
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [page, setPage] = useState(0)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const typeTagsMap = getTypeTagsMap(common)

    const searchString = searchParams.get(SOK_SEARCH_PARAM)
    const sort = searchParams.get(SOK_SORT_PARAM) ?? '0'
    const selectedTypeTags = searchParams.getAll(SOK_UNDER_FACET_PARAM)

    const getModifiedSearchParams = useCallback(
        (page: number = 0) => {
            const searchParamsWithIdTags = new URLSearchParams(searchParams.toString())
            // Map type tag names to ids for search
            searchParamsWithIdTags.delete(SOK_UNDER_FACET_PARAM)
            selectedTypeTags.forEach((name) => {
                if (typeTagsMap[name]) {
                    searchParamsWithIdTags.append(SOK_UNDER_FACET_PARAM, typeTagsMap[name].id)
                }
            })
            searchParamsWithIdTags.set(SOK_PAGE_PARAM, page.toString())
            setPage(page)
            return searchParamsWithIdTags as ReadonlyURLSearchParams
        },
        [searchParams, typeTagsMap, selectedTypeTags]
    )

    useEffect(() => {
        if (searchString === null || loading) return
        setLoading(true)
        search(getModifiedSearchParams(0))
            .then((res) => trackSearchResult(res, SearchFrom.SOKESIDE, pathname))
            .then(setSearchResult)
            .finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, sort, searchParams])

    function updateUrlParams(mutator: (p: URLSearchParams) => void) {
        const urlSearchParams = new URLSearchParams(searchParams.toString())
        mutator(urlSearchParams)
        window.history.replaceState(null, '', `?${urlSearchParams.toString()}`)
    }

    function setTypeTagsParamNames(typeTagNames: string[]) {
        updateUrlParams((p) => {
            p.delete(SOK_UNDER_FACET_PARAM)
            typeTagNames
                .filter((type) => type !== FILTER_NAME_ALL)
                .forEach((name) => {
                    p.append(SOK_UNDER_FACET_PARAM, name)
                })
        })
    }

    function setSortParam(sortValue: string | undefined) {
        updateUrlParams((p) => {
            if (!sortValue) {
                p.delete(SOK_SORT_PARAM)
            } else {
                p.set(SOK_SORT_PARAM, sortValue)
            }
        })
    }

    const filterElement = (
        <VStack gap={{ xs: 'space-16', lg: 'space-32' }}>
            <RadioGroup legend="Sorter etter" onChange={setSortParam} value={sort} size="small">
                <HStack gap={'4'}>
                    <Radio value="0">Beste treff</Radio>
                    <Radio value="1">Dato</Radio>
                </HStack>
            </RadioGroup>
            <Fieldset legend={'Filtrer på type'} id={'choose-type'} size={'small'}>
                <HStack>
                    <Chips>
                        {[{ name: FILTER_NAME_ALL, id: '' }]
                            .concat(common?.typeTags ?? [])
                            .map(({ name }) => (
                                <Chips.Toggle
                                    key={name}
                                    checkmark={false}
                                    selected={
                                        selectedTypeTags.includes(name) ||
                                        (!selectedTypeTags?.length && name === FILTER_NAME_ALL)
                                    }
                                    aria-labelledby={'choose-type'}
                                    className={'py-(--ax-space-8) px-(--ax-space-16)'}
                                    onClick={() => {
                                        if (name === FILTER_NAME_ALL) {
                                            setTypeTagsParamNames([])
                                        } else if (selectedTypeTags.includes(name)) {
                                            const newSelected = selectedTypeTags.filter(
                                                (sel) => sel !== name
                                            )
                                            setTypeTagsParamNames(
                                                newSelected.length === 0 ? [] : newSelected
                                            )
                                        } else {
                                            setTypeTagsParamNames([...selectedTypeTags, name])
                                        }
                                    }}>
                                    {name}
                                </Chips.Toggle>
                            ))}
                    </Chips>
                </HStack>
            </Fieldset>
        </VStack>
    )

    return (
        <VStack gap={{ xs: 'space-16', lg: 'space-32' }}>
            <SearchWrapper
                aria-label={'Søk etter innhold på idébanken'}
                aria-controls={'search-status'}
                onSubmit={(e) => {
                    e.preventDefault()
                    const value =
                        new FormData(e.currentTarget).get(SOK_SEARCH_PARAM)?.toString() || ''
                    updateUrlParams((p) => {
                        p.set(SOK_SEARCH_PARAM, value)
                    })
                }}
            />
            {SearchResults(meta, SearchFrom.SOKESIDE, searchResult, loading, common, filterElement)}
            {searchResult?.isMore && (
                <Button
                    variant={'secondary'}
                    loading={loadingMore}
                    className={'rounded-full w-fit self-center'}
                    onClick={() => {
                        setLoadingMore(true)
                        search(getModifiedSearchParams(page + 1))
                            .then((res) =>
                                setSearchResult({
                                    ...res,
                                    hits: searchResult?.hits?.concat(res.hits) ?? res.hits,
                                })
                            )
                            .finally(() => setLoadingMore(false))
                    }}>
                    Vis flere treff
                </Button>
            )}
        </VStack>
    )
}
