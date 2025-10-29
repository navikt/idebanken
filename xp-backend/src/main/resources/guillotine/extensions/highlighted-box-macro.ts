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
            })
        },
    },
    types: {},
})
