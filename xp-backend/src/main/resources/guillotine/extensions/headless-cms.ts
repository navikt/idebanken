import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { runInContext } from '/lib/repos/run-in-context'
import { getSiteConfig } from '/lib/utils/site-config'
import {
    EmptyRecord,
    LinkGroups,
    ResolvedLink,
    resolveLinkGroups,
    resolveLinks,
} from '../common-guillotine-types'
import { Content, get, query } from '/lib/xp/content'
import { Category } from '@xp-types/site/content-types'
import { mapCategoryContentToResolved, ResolvedCategory } from './category'
import { enonicSitePathToHref } from '/lib/utils/string-utils'

export const headlessCmsExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        HeadlessCms: {
            header: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): {
                linkGroups: LinkGroups
                linksBottom: Array<ResolvedLink>
            } => {
                return runInContext({ asAdmin: true }, () => {
                    const menuConfig = getSiteConfig()?.header

                    return {
                        linkGroups: resolveLinkGroups(menuConfig?.linkGroups),
                        linksBottom: resolveLinks(menuConfig?.linksBottom),
                    }
                })
            },
            footer: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): {
                footerText?: string
                linkGroups: LinkGroups
            } => {
                return runInContext({ asAdmin: true }, () => {
                    const footerConfig = getSiteConfig()?.footer

                    const linkGroups = resolveLinkGroups(footerConfig?.linkGroups)

                    return {
                        footerText: footerConfig?.footerText,
                        linkGroups,
                    }
                })
            },
            categories: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): Array<ResolvedCategory> => {
                return runInContext({ asAdmin: true }, () => {
                    const categories = query<Content<Category>>({
                        filters: {
                            hasValue: {
                                field: 'type',
                                values: ['idebanken:category'],
                            },
                        },
                    }).hits

                    return mapCategoryContentToResolved(categories)
                })
            },
            siteConfiguration: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): {
                searchPageHref: string
            } => {
                return runInContext({ asAdmin: true }, () => {
                    const siteConfig = getSiteConfig()
                    const searchPage = siteConfig?.searchConfig?.searchPage
                    const searchPageId = searchPage ? get({ key: searchPage })?._path : undefined

                    return {
                        searchPageHref: searchPageId ? enonicSitePathToHref(searchPageId) : '/sok',
                    }
                })
            },
        },
    },
    types: {
        Header: {
            description: 'Header configuration',
            fields: {
                linkGroups: {
                    type: nonNull(list(nonNull(reference('LinkGroups')))),
                },
                linksBottom: {
                    type: nonNull(list(nonNull(reference('ResolvedLink')))),
                },
            },
            interfaces: [],
        },
        Footer: {
            description: 'Footer configuration',
            fields: {
                footerText: {
                    type: GraphQLString,
                },
                linkGroups: {
                    type: nonNull(list(nonNull(reference('LinkGroups')))),
                },
            },
            interfaces: [],
        },
        SiteConfiguration: {
            description: 'Configuration for other parts of the site',
            fields: {
                searchPageHref: {
                    type: nonNull(GraphQLString),
                },
            },
            interfaces: [],
        },
    },
    creationCallbacks: {
        HeadlessCms: (params): void => {
            params.addFields({
                header: {
                    type: reference('Header'),
                },
                footer: {
                    type: reference('Footer'),
                },
                categories: {
                    type: nonNull(list(nonNull(reference('Category')))),
                },
                siteConfiguration: {
                    type: nonNull(reference('SiteConfiguration')),
                },
            })
        },
    },
})
