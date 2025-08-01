'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchWrapper, SOK_SEARCH_PARAM } from '~/components/common/SearchWrapper'
import { HeadingView } from '~/components/parts/Heading'
import { BodyShort, List, VStack } from '@navikt/ds-react'
import { ListItem } from '@navikt/ds-react/List'
import NextLink from 'next/link'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { Idebanken_SpecialPage_Data, Part_Idebanken_Search_View } from '~/types/generated'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'

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
            <SearchWrapper onSubmit={(_) => search(searchParams.get(SOK_SEARCH_PARAM))} />
            <VStack>
                {searchResult ? (
                    <VStack>
                        <BodyShort>
                            {searchResult.total ?? 0} treff på &#34;{searchResult.word}&#34;
                        </BodyShort>
                        <List>
                            {searchResult?.hits?.map((result, index) => (
                                <ListItem key={index} className="pb-8">
                                    <NextLink href={result.href}>
                                        <HeadingView level={'2'} size={'medium'}>
                                            {result.displayName}
                                        </HeadingView>
                                    </NextLink>
                                    <RichTextView
                                        className="font-extralight"
                                        meta={meta}
                                        data={{ processedHtml: result.highlight }}
                                        customReplacer={htmlRichTextReplacer}
                                    />
                                    <BodyShort>score: {result.score}</BodyShort>
                                </ListItem>
                            ))}
                        </List>
                    </VStack>
                ) : (
                    <></>
                )}
            </VStack>
        </VStack>
    )
}
