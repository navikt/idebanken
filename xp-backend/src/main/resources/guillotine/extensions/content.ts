import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord } from '../common-guillotine-types'
import { forceArray } from '/lib/utils/array-utils'
import { getSiteConfig } from '/lib/utils/site-config'
import { runInContext } from '/lib/repos/run-in-context'

export const contentExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        Content: {
            skyraSlugs: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): Array<string> => {
                return runInContext({ asAdmin: true }, () => {
                    return forceArray(getSiteConfig()?.skyra?.slugs).filter((slug) => slug?.length)
                })
            },
        },
    },
    types: {},
    creationCallbacks: {
        Content: (params): void => {
            params.addFields({
                skyraSlugs: {
                    type: nonNull(list(nonNull(GraphQLString))),
                },
            })
        },
    },
})
