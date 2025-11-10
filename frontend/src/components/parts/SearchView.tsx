'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { SearchWrapper } from '~/components/common/SearchWrapper'
import { Button, Chips, Fieldset, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import { Category, Idebanken_SpecialPage_Data, Part_Idebanken_Search_View } from '~/types/generated'
import { getCategoriesMap, search, SearchResult } from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'
import { forceArray } from '~/utils/utils'
import {
    SOK_CATEGORIES_PARAM,
    SOK_PAGE_PARAM,
    SOK_SEARCH_PARAM,
    SOK_SORT_PARAM,
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
    const [filter, setFilter] = useState<Array<Category>>()
    const [selected, setSelected] = useState([allFilter])

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const categoriesMap = getCategoriesMap(common)

    const searchString = searchParams.get(SOK_SEARCH_PARAM)
    const sort = searchParams.get(SOK_SORT_PARAM)
    const categoriesParamValue = searchParams.get(SOK_CATEGORIES_PARAM)

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
        setSelected(categoriesParamValue?.split(',') ?? [allFilter])
    }, [categoriesParamValue])

    useEffect(() => {
        const categoriesInSearchResults = searchResult?.hits?.reduce((acc, curr) => {
            curr.categories?.forEach((catId) => {
                if (catId && !acc.find((c) => c.id === catId)) {
                    const category = categoriesMap[catId]
                    if (category) acc.push({ name: category.name, id: catId })
                }
            })
            return acc
        }, [] as Category[])
        setFilter(categoriesInSearchResults)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResult])

    function updateUrlParams(mutator: (p: URLSearchParams) => void) {
        const urlSearchParams = new URLSearchParams(searchParams.toString())
        mutator(urlSearchParams)
        window.history.replaceState(null, '', `?${urlSearchParams.toString()}`)
    }

    function setCategoriesParamNames(categoryNames: string[]) {
        if (categoryNames.length === filter?.length) {
            // all categories selected, reset to "all"
            categoryNames = [allFilter]
        }
        updateUrlParams((p) => {
            if (categoryNames.length === 0 || categoryNames.includes(allFilter)) {
                p.delete(SOK_CATEGORIES_PARAM)
            } else {
                const names = Object.values(categoriesMap)
                    .filter((category) => categoryNames.includes(category.name))
                    .map((cat) => cat.name)
                if (names.length > 0) {
                    p.set(SOK_CATEGORIES_PARAM, names.join(','))
                } else {
                    p.delete(SOK_CATEGORIES_PARAM)
                }
            }
        })
        setSelected(categoryNames)
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
                legend="Sorter etter:"
                onChange={setSortParam}
                size="small"
                defaultValue={'0'}>
                <HStack gap={'4'}>
                    <Radio value="0">Beste treff</Radio>
                    <Radio value="1">Dato</Radio>
                </HStack>
            </RadioGroup>
            <Fieldset legend={'Velg kategori'} id={'choose-category'} size={'small'}>
                <HStack>
                    <Chips>
                        {[{ name: allFilter, id: '' }].concat(filter ?? []).map(({ name }) => (
                            <Chips.Toggle
                                key={name}
                                checkmark={false}
                                selected={selected.includes(name)}
                                aria-labelledby={'choose-category'}
                                onClick={() => {
                                    if (name === allFilter) {
                                        setCategoriesParamNames([allFilter])
                                    } else if (selected.includes(name)) {
                                        const newSelected = selected.filter((sel) => sel !== name)
                                        setCategoriesParamNames(
                                            newSelected.length === 0 ? [allFilter] : newSelected
                                        )
                                    } else {
                                        setCategoriesParamNames([
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
                              return forceArray(it.categories).some((catId) =>
                                  selected.some((sel) => sel === categoriesMap[catId].name)
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
