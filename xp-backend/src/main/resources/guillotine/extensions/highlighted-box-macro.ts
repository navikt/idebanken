import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { HighlightedBox } from '@xp-types/site/macros/highlighted-box'
import { resolveMedia } from '/lib/utils/helpers'

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
            ) => resolveMedia({ id: env.source.icon, type: 'absolute', scale: 'full' }),
        },
    },
    creationCallbacks: {
        Macro_idebanken_highlighted_box_DataConfig: (params) => {
            params.modifyFields({
                icon: {
                    type: reference('ResolvedMedia'),
                },
            })
        },
    },
    types: {},
})
