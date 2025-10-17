import styles from '../../styles/loading.module.css'

import { getResultCategories, SearchResult } from '~/utils/search'
import { MetaData } from '@enonic/nextjs-adapter'
import { BodyShort, VStack } from '@navikt/ds-react'
import { LinkCardView } from '~/components/parts/LinkCard'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import { CommonType } from '../queries/common'
import type { JSX } from 'react'
import TrackFirstLink from '~/components/common/analytics/TrackFirstLink'
import { AnalyticsEvents } from '~/utils/analytics/umami'

export default function SearchResults(
    searchFrom: 'hurtigsøk meny' | 'søkeside',
    searchResult?: SearchResult | undefined,
    loading: boolean = false,
    meta?: MetaData,
    common?: CommonType<unknown>, // for resolving categories
    filter?: JSX.Element
) {
    return (
        <VStack gap={'2'}>
            {filter}
            <BodyShort
                id={'search-status'}
                role={'status'}
                aria-live={'polite'}
                className={'pt-4 font-bold'}>
                {searchResult?.word
                    ? `Viser ${searchResult?.hits?.length} av ${searchResult?.total ?? 0} treff på «${searchResult?.word ?? ''}»`
                    : ''}
            </BodyShort>
            {loading ? (
                <div className={'h-6 flex justify-center align-middle content-center items-center'}>
                    <div className={styles.loading} aria-label={'laster innhold'} />
                </div>
            ) : (
                searchResult?.hits?.map((result, index) => (
                    <TrackFirstLink
                        key={index}
                        analyticsEventName={AnalyticsEvents.SEARCH_RESULT_CLICKED}
                        eventData={{
                            søktFra: searchFrom,
                            treffnr: index + 1,
                            komponent: 'SearchResults',
                        }}
                        meta={meta}>
                        <LinkCardView
                            url={result.href}
                            external={false}
                            title={result.displayName}
                            description={
                                <RichTextView
                                    className="font-extralight"
                                    // @ts-expect-error meta is not required
                                    meta={meta}
                                    data={{ processedHtml: result.highlight }}
                                    customReplacer={htmlRichTextReplacer}
                                />
                            }
                            categories={getResultCategories(result, common)}
                            brand={'neutral'}
                            icon={{ url: result.iconUrl, iconColor: result.iconColor }}
                            key={index}
                        />
                    </TrackFirstLink>
                ))
            )}
        </VStack>
    )
}
