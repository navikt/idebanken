'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { Button, Chips, Fieldset, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import { Idebanken_SpecialPage_Data, Part_Idebanken_Search_View, Tag } from '~/types/generated'
import { getTypeTagsMap, search, SearchResult } from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'
import { forceArray } from '~/utils/utils'
import {
    SOK_PAGE_PARAM,
    SOK_SEARCH_PARAM,
    SOK_SORT_PARAM,
    SOK_TYPE_TAG_PARAM,
} from '~/utils/constants'
import { SearchFrom, trackSearchResult } from '~/utils/analytics/umami'

export default function SearchView({
    meta,
    common,
}: PartData<Part_Idebanken_Search_View, Idebanken_SpecialPage_Data>) {
    const allFilter = 'Alle'

    const [searchResult, setSearchResult] = useState<SearchResult | undefined>()
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [filter, setFilter] = useState<Array<Tag>>([])
    const [selected, setSelected] = useState([allFilter])

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const typeTagsMap = getTypeTagsMap(common)

    const searchString = searchParams.get(SOK_SEARCH_PARAM)
    const sort = searchParams.get(SOK_SORT_PARAM)
    const typeTagsParamValue = searchParams.get(SOK_TYPE_TAG_PARAM)

    useEffect(() => {
        if (!searchString) return
        setLoading(true)
        search(searchParams)
            .then((res) => trackSearchResult(res, SearchFrom.SOKESIDE, pathname))
            .then(setSearchResult)
            .finally(() => setLoading(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, sort])

    useEffect(() => {
        setSelected(typeTagsParamValue?.split(',') ?? [allFilter])
    }, [typeTagsParamValue])

    useEffect(() => {
        const typeTagsInSearchResults = forceArray(searchResult?.hits)?.reduce((acc, curr) => {
            curr.typeTags?.forEach((typeId) => {
                if (typeId && !acc.find((c) => c.id === typeId)) {
                    const type = typeTagsMap[typeId]
                    if (type) acc.push({ name: type.name, id: typeId })
                }
            })
            return acc
        }, [] as Tag[])

        if (typeTagsInSearchResults?.length > 1) {
            setFilter(typeTagsInSearchResults)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResult])

    function updateUrlParams(mutator: (p: URLSearchParams) => void) {
        const urlSearchParams = new URLSearchParams(searchParams.toString())
        mutator(urlSearchParams)
        window.history.replaceState(null, '', `?${urlSearchParams.toString()}`)
    }

    function setTypeTagsParamNames(typeTagNames: string[]) {
        updateUrlParams((p) => {
            if (typeTagNames.length === 0 || typeTagNames.includes(allFilter)) {
                p.delete(SOK_TYPE_TAG_PARAM)
            } else {
                const names = Object.values(typeTagsMap)
                    .filter((typeTag) => typeTagNames.includes(typeTag.name))
                    .map((typeTag) => typeTag.name)
                if (names.length > 0) {
                    p.set(SOK_TYPE_TAG_PARAM, names.join(','))
                } else {
                    p.delete(SOK_TYPE_TAG_PARAM)
                }
            }
        })
        setSelected(typeTagNames)
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
        <VStack gap={'4'}>
            <RadioGroup
                legend="Sorter etter"
                onChange={setSortParam}
                size="small"
                defaultValue={'0'}>
                <HStack gap={'4'}>
                    <Radio value="0">Beste treff</Radio>
                    <Radio value="1">Dato</Radio>
                </HStack>
            </RadioGroup>
            <Fieldset legend={'Filtrer på type'} id={'choose-type'} size={'small'}>
                <HStack>
                    <Chips>
                        {[{ name: allFilter, id: '' }].concat(filter).map(({ name }) => (
                            <Chips.Toggle
                                key={name}
                                checkmark={false}
                                selected={selected.includes(name)}
                                aria-labelledby={'choose-type'}
                                className={'py-(--ax-space-8) px-(--ax-space-16)'}
                                onClick={() => {
                                    if (name === allFilter) {
                                        setTypeTagsParamNames([allFilter])
                                    } else if (selected.includes(name)) {
                                        const newSelected = selected.filter((sel) => sel !== name)
                                        setTypeTagsParamNames(
                                            newSelected.length === 0 ? [allFilter] : newSelected
                                        )
                                    } else {
                                        setTypeTagsParamNames([
                                            ...selected.filter((it) => it !== allFilter),
                                            name,
                                        ])
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
        <VStack gap={'4'}>
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
            {SearchResults(
                meta,
                SearchFrom.SOKESIDE,
                searchResult
                    ? {
                          ...searchResult,
                          hits: searchResult?.hits?.filter((it) => {
                              if (selected.includes(allFilter)) return true
                              return forceArray(it.typeTags).some((catId) =>
                                  selected.some((sel) => sel === typeTagsMap[catId].name)
                              )
                          }),
                      }
                    : undefined,
                loading,
                common,
                filterElement
            )}
            {searchResult?.isMore && (
                <Button
                    variant={'secondary'}
                    loading={loadingMore}
                    className={'rounded-xl'}
                    onClick={() => {
                        updateUrlParams((p) => {
                            p.set(
                                SOK_PAGE_PARAM,
                                ((Number(p.get(SOK_PAGE_PARAM) ?? 0) || 0) + 1).toString()
                            )
                        })
                        setLoadingMore(true)
                        search(searchParams)
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
