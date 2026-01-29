import { getResultTypeTags, SearchResult } from '~/utils/search'
import { MetaData } from '@enonic/nextjs-adapter'
import { BodyShort, VStack } from '@navikt/ds-react'
import { LinkCardView } from '~/components/parts/LinkCard'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import type { JSX } from 'react'
import TrackFirstLink from '~/components/common/analytics/TrackFirstLink'
import { AnalyticsEvents, SearchFrom } from '~/utils/analytics/umami'
import { CommonType } from '~/types/graphql-types'
import classNames from 'classnames'
import LoadingCircles from '~/components/common/LoadingCircles'

export default function SearchResults(
    meta: MetaData,
    searchFrom: SearchFrom,
    searchResult?: SearchResult | undefined,
    loading: boolean = false,
    common?: CommonType<unknown>, // for resolving tags
    filter?: JSX.Element
) {
    const isMainSearch = searchFrom === SearchFrom.SOKESIDE
    return (
        <VStack gap={isMainSearch ? { xs: 'space-16', lg: 'space-32' } : 'space-12'}>
            {filter}
            <BodyShort
                id={'search-status'}
                role={'status'}
                aria-live={'polite'}
                className={classNames(!isMainSearch ? 'pt-4' : '', 'font-bold')}>
                {searchResult
                    ? `Viser ${searchResult?.hits?.length} av ${searchResult?.total ?? 0} treff`
                          .concat(searchResult.word ? ` på «${searchResult?.word}»` : '')
                          .concat(
                              searchFrom === SearchFrom.SOKESIDE ? ' med valgte søkefilter' : ''
                          )
                    : ''}
            </BodyShort>
            {loading ? (
                <LoadingCircles ariaLabel={'laster innhold'} />
            ) : (
                searchResult?.hits?.map((result, index) => (
                    <TrackFirstLink
                        key={index}
                        analyticsEventName={AnalyticsEvents.SEARCH_RESULT_CLICKED}
                        eventData={{
                            soktFra: searchFrom,
                            treffnr: index + 1,
                        }}
                        meta={meta}>
                        <LinkCardView
                            url={result.href}
                            external={false}
                            title={result.displayName}
                            showDescription
                            description={
                                <RichTextView
                                    className="font-extralight"
                                    meta={meta}
                                    data={{ processedHtml: result.highlight }}
                                    customReplacer={htmlRichTextReplacer}
                                />
                            }
                            typeTags={getResultTypeTags(result, meta, common)}
                            icon={{ url: result.iconUrl }}
                            key={index}
                            meta={meta}
                            linkProps={{ 'data-umami-ignore': true }}
                        />
                    </TrackFirstLink>
                ))
            )}
        </VStack>
    )
}
