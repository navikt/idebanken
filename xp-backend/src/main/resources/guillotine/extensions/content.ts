import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord } from '../common-guillotine-types'
import { forceArray } from '/lib/utils/array-utils'
import { getSiteConfig } from '/lib/utils/site-config'
import { runInContext } from '/lib/repos/run-in-context'
import { Content, get } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'

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
            backlink: (env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Content>) => {
                const parent = env.source?._path?.replace(/\/[^/]+$/, '')
                if (!parent) return undefined
                const parentContent = get({ key: parent })
                if (!parentContent) return undefined

                const parentTitle =
                    parentContent._path === '/idebanken'
                        ? 'Forsiden'
                        : ((parentContent.data?.shortTitle ||
                              parentContent.data?.title ||
                              parentContent.displayName) as string)
                return {
                    text: parentTitle,
                    href: enonicSitePathToHref(parentContent._path),
                }
            },
            skyraSlugs: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): Array<string> => {
                return runInContext({ asAdmin: true }, () => {
                    return forceArray(getSiteConfig()?.skyra?.slugs).filter((slug) => slug?.length)
                })
            },
        },
    },
    types: {
        SimpleLink: {
            description: 'A simple link with text and href',
            fields: {
                text: {
                    type: GraphQLString,
                },
                href: {
                    type: nonNull(GraphQLString),
                },
            },
            interfaces: [],
        },
    },
    creationCallbacks: {
        Content: (params): void => {
            params.addFields({
                skyraSlugs: {
                    type: nonNull(list(nonNull(GraphQLString))),
                },
                backlink: {
                    type: reference('SimpleLink'),
                },
            })
        },
    },
})
