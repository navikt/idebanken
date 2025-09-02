'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchWrapper, SOK_SEARCH_PARAM } from '~/components/common/SearchWrapper'
import { BodyShort, Tag, VStack } from '@navikt/ds-react'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { Idebanken_SpecialPage_Data, Part_Idebanken_Search_View } from '~/types/generated'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import {
    LinkCard,
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardFooter,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard'

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
        //search(ord)
        setSearchResult({
            total: 2,
            hits: [
                {
                    displayName: 'Resultat 1 for ' + ord,
                    href: '/sok#test1',
                    highlight:
                        '<p>Dette er et <strong>fremhevet</strong> utdrag for ' + ord + '</p>',
                    modifiedTime: '2023-10-01T12:00:00Z',
                    publishedTime: '2023-09-01T12:00:00Z',
                    audience: ['audience1', 'audience2'],
                    score: 1.5,
                    language: 'nb',
                    type: 'article',
                },
                {
                    displayName: 'Resultat 2 for ' + ord,
                    href: '/sok#test2',
                    highlight:
                        '<p>Dette er et annet <strong>fremhevet</strong> utdrag for ' +
                        ord +
                        '</p>',
                    modifiedTime: '2023-10-02T12:00:00Z',
                    publishedTime: '2023-09-02T12:00:00Z',
                    audience: ['audience3'],
                    score: 1.2,
                    language: 'nb',
                    type: 'blog',
                },
            ],
            word: ord,
        })
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
                        <LinkCard key={index}>
                            <LinkCardTitle>
                                <LinkCardAnchor href={result.href}>
                                    {result.displayName}
                                </LinkCardAnchor>
                            </LinkCardTitle>
                            <LinkCardDescription>
                                <RichTextView
                                    className="font-extralight"
                                    meta={meta}
                                    data={{ processedHtml: result.highlight }}
                                    customReplacer={htmlRichTextReplacer}
                                />
                                <LinkCardFooter>
                                    <Tag size="small" variant="neutral">
                                        Score: {result.score}
                                    </Tag>
                                </LinkCardFooter>
                            </LinkCardDescription>
                        </LinkCard>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    )
}
