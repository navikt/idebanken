'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchWrapper, SOK_SEARCH_PARAM } from '~/components/common/SearchWrapper'
import { BodyShort, VStack } from '@navikt/ds-react'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { Idebanken_SpecialPage_Data, Part_Idebanken_Search_View } from '~/types/generated'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import { LinkCardView } from '~/components/parts/LinkCard'
import { forceArray } from '~/utils/utils'

type SearchResult = {
    total: number
    hits: Array<{
        displayName: string
        href: string
        highlight: string
        modifiedTime?: string
        publishedTime?: string
        audience: Array<string>
        language: string
        type: string
        iconName?: string
        iconColor?: string
        categories?: Array<string>
        score: number
    }>
    word: string
}

export default function SearchView({
    meta,
}: PartData<Part_Idebanken_Search_View, Idebanken_SpecialPage_Data>) {
    const [searchResult, setSearchResult] = useState<SearchResult | undefined>()
    const searchParams = useSearchParams()

    useEffect(() => {
        const ord = searchParams.get(SOK_SEARCH_PARAM)
        if (!ord) {
            return
        }
        search(ord)
    }, [searchParams])

    function search(searchTerm?: string | null) {
        fetch(`/api/search?${SOK_SEARCH_PARAM}=${searchTerm}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((data) => {
                setSearchResult(data)
            })
            .catch((error) => {
                console.error('Error fetching search results:', error)
            })
    }

    return (
        <VStack>
            <SearchWrapper
                aria-controls={'search-status'}
                onSubmit={(_) => search(searchParams.get(SOK_SEARCH_PARAM))}
            />
            <VStack>
                <VStack gap={'2'}>
                    <BodyShort
                        id={'search-status'}
                        role={'status'}
                        aria-live={'polite'}
                        className={'pt-4 font-bold'}>
                        {searchResult
                            ? `${searchResult?.total ?? 0} treff på «${searchResult?.word ?? ''}»`
                            : ''}
                    </BodyShort>
                    {searchResult?.hits?.map((result, index) => (
                        <LinkCardView
                            url={result.href}
                            title={result.displayName}
                            description={
                                <RichTextView
                                    className="font-extralight"
                                    meta={meta}
                                    data={{ processedHtml: result.highlight }}
                                    customReplacer={htmlRichTextReplacer}
                                />
                            }
                            categories={[
                                ...forceArray(result.categories ?? []),
                                result.type,
                                `score: ${result.score}`,
                            ]}
                            bgColor={'bg-white'}
                            iconName={result.iconName}
                            iconColor={result.iconColor}
                            key={index}
                        />
                    ))}
                </VStack>
            </VStack>
        </VStack>
    )
}
