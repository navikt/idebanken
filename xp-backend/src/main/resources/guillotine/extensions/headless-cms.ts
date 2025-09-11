import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { runInContext } from '/lib/repos/run-in-context'
import { getSiteConfig } from '/lib/utils/site-config'
import { guidesUnderSection } from './guides-under-section'
import {
    EmptyRecord,
    LinkGroups,
    ProcessedOverridableLink,
    resolveLinkGroups,
    resolveLinks,
} from '../common-guillotine-types'

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
                linksBottom: Array<ProcessedOverridableLink>
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
            guidesUnderSection: guidesUnderSection,
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
                    type: nonNull(list(nonNull(reference('OverridableContentLink')))),
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
                guidesUnderSection: {
                    type: list(nonNull(reference('idebanken_Guide'))),
                    args: {
                        section: nonNull(GraphQLString),
                        selectedGuidePaths: list(nonNull(GraphQLString)),
                        limit: GraphQLString,
                    },
                },
            })
        },
    },
})
