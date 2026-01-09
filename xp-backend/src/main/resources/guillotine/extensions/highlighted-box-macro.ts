import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import {
    EmptyRecord,
    InternalLink,
    ResolvedLinkSelector,
    resolveInternalLink,
    Source,
} from '../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { HighlightedBox } from '@xp-types/site/macros/highlighted-box'
import { resolveIcon } from '/lib/utils/media'
import { forceArray } from '/lib/utils/array-utils'

export const highlightedBoxMacroExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
    Json,
}: GraphQL): Extensions => ({
    resolvers: {
        Macro_idebanken_highlighted_box_DataConfig: {
            icon: (
                env: DataFetchingEnvironment<
                    EmptyRecord,
                    LocalContextRecord,
                    Source<HighlightedBox>
                >
            ) => resolveIcon(env.source.icon),

            links: (
                env: DataFetchingEnvironment<
                    EmptyRecord,
                    LocalContextRecord,
                    Source<HighlightedBox>
                >
            ): Array<ResolvedLinkSelector> => {
                return forceArray(env.source.links)
                    .map<InternalLink>((link) => ({ contentId: link }))
                    .map(resolveInternalLink)
            },
            linksAbsolute: (
                env: DataFetchingEnvironment<
                    EmptyRecord,
                    LocalContextRecord,
                    Source<HighlightedBox>
                >
            ): Array<ResolvedLinkSelector> => {
                return forceArray(env.source.linksAbsolute).map((link) => {
                    let url
                    let linkText

                    const markdownLink = link?.match(/^\(([^)]+)\)\((https:\/\/.*)\)$/)
                    if (markdownLink) {
                        linkText = markdownLink[1]
                        url = markdownLink[2]
                    } else {
                        linkText = truncateUrl(link) ?? '#'
                        url = link
                    }
                    return {
                        url,
                        linkText,
                        external: true,
                    }
                })
            },
        },
    },
    creationCallbacks: {
        Macro_idebanken_highlighted_box_DataConfig: (params) => {
            params.modifyFields({
                icon: {
                    type: reference('ResolvedMedia'),
                },
                links: {
                    type: nonNull(list(nonNull(reference('ResolvedLinkSelector')))),
                },
                linksAbsolute: {
                    type: nonNull(list(nonNull(reference('ResolvedLinkSelector')))),
                },
            })
        },
    },
    types: {},
})

function truncateUrl(link?: string, maxLength = 50): string | undefined {
    if (!link) return link

    const linkWithoutProtocolAndParams = link.replace(/(https?:\/\/)?([^?]*?)\/?(\?[^/]*)?$/, '$2')
    if (linkWithoutProtocolAndParams.length <= maxLength) return linkWithoutProtocolAndParams

    const truncatedUrl = linkWithoutProtocolAndParams.replace(
        /^([^/]+\/)(.+)?(\/[^/]+)$/,
        `$1...$3`
    )
    if (truncatedUrl.length > maxLength) {
        return truncatedUrl.substring(0, maxLength).concat('...')
    } else {
        return truncatedUrl
    }
}
