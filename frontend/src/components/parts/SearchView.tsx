'use client'

import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import {SearchWrapper, SOK_SEARCH_PARAM} from '~/components/common/SearchWrapper'
import {Chips, HStack, VStack} from '@navikt/ds-react'
import {PartData} from '~/types/graphql-types'
import {Category, Idebanken_SpecialPage_Data, Part_Idebanken_Search_View} from '~/types/generated'
import {getCategoriesMap, search, SearchResult} from '~/utils/search'
import SearchResults from '~/components/common/SearchResults'
import {HeadingView} from '~/components/parts/Heading'
import {forceArray} from '~/utils/utils'

export default function SearchView({
    meta,
    common,
}: PartData<Part_Idebanken_Search_View, Idebanken_SpecialPage_Data>) {
    const allFilter = 'Alle'

    const [searchResult, setSearchResult] = useState<SearchResult | undefined>()
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState<Array<Category>>()
    const [selected, setSelected] = useState([allFilter])

    const searchParams = useSearchParams()
    const categoriesMap = getCategoriesMap(common)

    useEffect(() => {
        const ord = searchParams.get(SOK_SEARCH_PARAM)
        if (!ord) {
            return
        }
        setLoading(true)
        search(setSearchResult, ord).finally(() => setLoading(false))
    }, [searchParams])

    useEffect(() => {
        const categoriesInSearchResults = searchResult?.hits?.reduce((acc, curr) => {
            curr.categories?.forEach((catId) => {
                if (catId && !acc.find((c) => c.id === catId)) {
                    acc.push({ name: categoriesMap[catId].name, id: catId })
                }
            })
            return acc
        }, [] as Category[])
        setFilter(categoriesInSearchResults)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResult])

    const filterElement = (
        <>
            <HeadingView id={'choose-category'} level={'2'} size={'xsmall'} className={'pt-4 mb-0'}>
                Velg kategori
            </HeadingView>
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
                                    setSelected([allFilter])
                                } else if (selected.includes(name)) {
                                    const newSelected = selected.filter((sel) => sel !== name)
                                    setSelected(
                                        newSelected.length === 0 ? [allFilter] : newSelected
                                    )
                                } else {
                                    setSelected([
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
        </>
    )

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
            {SearchResults(
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
                meta,
                common,
                filterElement
            )}
        </VStack>
    )
}
