import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import {
    EmptyRecord,
    ResolvedLinkSelector,
    resolveLink,
    Source,
} from '../../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { Button } from '@xp-types/site/parts'

export const buttonExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    reference,
    nonNull,
    Json,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_button: {
            link: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<Button>>
            ): ResolvedLinkSelector => resolveLink(env.source.internalOrExternalLink),
        },
    },
    creationCallbacks: {
        Part_idebanken_button: (params) => {
            params.removeFields(['internalOrExternalLink'])
            params.addFields({
                link: {
                    type: nonNull(reference('ResolvedLinkSelector')),
                },
            })
        },
    },
})
