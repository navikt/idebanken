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
import { AktueltTypeTag, ThemeTag, TypeTag } from '@xp-types/site/content-types'
import { mapTagContentToResolved, ResolvedTag } from './tag'
import { enonicSitePathToHref, hashCode } from '/lib/utils/string-utils'
import { processHtml } from '/lib/xp/portal'

export const headlessCmsExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLBoolean,
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
            themeTags: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): Array<ResolvedTag> => {
                return runInContext({ asAdmin: true }, () => {
                    const themeTags = query<Content<ThemeTag>>({
                        filters: {
                            hasValue: {
                                field: 'type',
                                values: ['idebanken:theme-tag'],
                            },
                        },
                    }).hits

                    return mapTagContentToResolved(themeTags)
                })
            },
            typeTags: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
            ): Array<ResolvedTag> => {
                return runInContext({ asAdmin: true }, () => {
                    const typeTags = query<Content<TypeTag | AktueltTypeTag>>({
                        filters: {
                            hasValue: {
                                field: 'type',
                                values: ['idebanken:type-tag', 'idebanken:aktuelt-type-tag'],
                            },
                        },
                    }).hits

                    return mapTagContentToResolved(typeTags)
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

                    const { status, text, closeable } = siteConfig?.alertBanner ?? {}
                    return {
                        searchPageHref: searchPageId ? enonicSitePathToHref(searchPageId) : '/sok',
                        cookieInfoText: processHtml({ value: siteConfig?.cookieInfoText ?? '' }),
                        alertBanner: {
                            text: processHtml({ value: text ?? '' }),
                            status: status ?? 'info',
                            hash: text ? hashCode(text) : undefined,
                            closeable,
                        },
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
        AlertBanner: {
            description: 'Alert banner configuration',
            fields: {
                text: {
                    type: nonNull(GraphQLString),
                },
                status: {
                    type: nonNull(GraphQLString),
                },
                hash: {
                    type: GraphQLInt,
                },
                closeable: {
                    type: GraphQLBoolean,
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
                cookieInfoText: {
                    type: nonNull(GraphQLString),
                },
                alertBanner: {
                    type: reference('AlertBanner'),
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
                themeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
                typeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
                siteConfiguration: {
                    type: nonNull(reference('SiteConfiguration')),
                },
            })
        },
    },
})
