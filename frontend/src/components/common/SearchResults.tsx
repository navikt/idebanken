import { getResultCategories, SearchResult } from '~/utils/search'
import { MetaData } from '@enonic/nextjs-adapter'
import { BodyShort, VStack } from '@navikt/ds-react'
import { LinkCardView } from '~/components/parts/LinkCard'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import { CommonType } from '../queries/common'

export default function SearchResults(
    searchResult: SearchResult | undefined,
    meta?: MetaData,
    common?: CommonType<unknown> // for resolving categories
) {
    return (
        <VStack gap={'2'}>
            <BodyShort
                id={'search-status'}
                role={'status'}
                aria-live={'polite'}
                className={'pt-4 font-bold'}>
                {searchResult?.word
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
            ))}
        </VStack>
    )
}
