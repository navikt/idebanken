import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { runInContext } from '/lib/repos/run-in-context'
import { getSiteConfig } from '/lib/utils/site-config'
import {
    EmptyRecord,
    LinkGroups,
    ResolvedLinkSelector,
    resolveLink,
    resolveLinkGroups,
    resolveLinks,
} from '../common-guillotine-types'
import { Content, get, query } from '/lib/xp/content'
import { Category } from '@xp-types/site/content-types'
import { mapCategoryContentToResolved, ResolvedCategory } from './category'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { processHtml } from '/lib/xp/portal'

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
                linksBottom: Array<ResolvedLinkSelector>
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
                    const {
                        linkGroups,
                        footerText,
                        newsletterSubscribeText,
                        internalOrExternalLink,
                    } = getSiteConfig()?.footer ?? {}

                    const resolvedLinkGroups = resolveLinkGroups(linkGroups)

                    return {
                        newsletterSubscribeText,
                        newsletterSubscribeLink: resolveLink(internalOrExternalLink),
                        footerText: processHtml({ value: footerText ?? '' }),
                        linkGroups: resolvedLinkGroups,
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
                    type: nonNull(list(nonNull(reference('ResolvedLinkSelector')))),
                },
            },
            interfaces: [],
        },
        Footer: {
            description: 'Footer configuration',
            fields: {
                newsletterSubscribeText: {
                    type: GraphQLString,
                },
                newsletterSubscribeLink: {
                    type: reference('ResolvedLinkSelector'),
                },
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
