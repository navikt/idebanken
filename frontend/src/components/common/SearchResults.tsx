import styles from '../../styles/loading.module.css'

import {getResultCategories, SearchResult} from '~/utils/search'
import {MetaData} from '@enonic/nextjs-adapter'
import {BodyShort, VStack} from '@navikt/ds-react'
import {LinkCardView} from '~/components/parts/LinkCard'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import {htmlRichTextReplacer} from '~/utils/richText/html-rich-text-replacer'
import {CommonType} from '../queries/common'
import type {JSX} from 'react'

export default function SearchResults(
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
                    ? `${searchResult?.total ?? 0} treff på «${searchResult?.word ?? ''}»`
                    : ''}
            </BodyShort>
            {loading ? (
                <div className={'h-6 flex justify-center align-middle content-center items-center'}>
                    <div className={styles.loading} aria-label={'laster innhold'} />
                </div>
            ) : (
                searchResult?.hits?.map((result, index) => (
                    <LinkCardView
                        url={result.href}
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
                        bgColor={'bg-white'}
                        iconName={result.iconName}
                        iconColor={result.iconColor}
                        key={index}
                    />
                ))
            )}
        </VStack>
    )
}
