import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Category as XDataCategory } from '@xp-types/site/x-data'
import { forceArray } from '/lib/utils/array-utils'
import { get as getContent, query } from '/lib/xp/content'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { runInContext } from '/lib/repos/run-in-context'
import { getSiteConfig } from '/lib/utils/site-config'
import { SiteConfig } from '@xp-types/site'
import { guidesUnderSection } from './resolvers/guidesUnderSection'
import { logger } from '/lib/utils/logging'
import { TableOfContents, TableOfContentsSection } from '@xp-types/site/parts'
import { getFieldByDescriptor } from '/lib/utils/object-utils'

type Source<T> = {
    __contentId: string
} & T

type ProcessedOverridableLink = { href: string; linkText: string }

type LinkGroups = Array<{
    title?: string
    links: Array<ProcessedOverridableLink>
}>

type EmptyRecord = Record<string, unknown>

export function extensions({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions {
    return {
        types: {
            OverridableContentLink: {
                description: 'Overridable content link',
                fields: {
                    href: {
                        type: nonNull(GraphQLString),
                    },
                    linkText: {
                        type: nonNull(GraphQLString),
                    },
                },
                interfaces: [],
            },
            LinkGroups: {
                description: 'Link groups',
                fields: {
                    title: {
                        type: GraphQLString,
                    },
                    links: {
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
        resolvers: {
            Part_idebanken_table_of_contents: {
                sections: (
                    env: DataFetchingEnvironment<
                        { path?: string },
                        LocalContextRecord,
                        Source<TableOfContents>
                    >
                ): Array<TableOfContentsSection> => {
                    const path = env.args.path?.replace(/^\$\{site}/, '/idebanken')
                    if (!path) {
                        logger.warning(`Part_idebanken_table_of_contents is missing path arg`)
                        return []
                    }
                    const content = getContent({ key: path })
                    if (!content) {
                        logger.warning(
                            `Part_idebanken_table_of_contents could not find content at path: ${path}`
                        )
                        return []
                    }

                    return getFieldByDescriptor<TableOfContentsSection>(
                        content,
                        'idebanken:table-of-contents-section'
                    )
                },
            },
            Part_idebanken_table_of_contents_section: {
                sectionNumber: (
                    env: DataFetchingEnvironment<
                        { path?: string },
                        LocalContextRecord,
                        Source<TableOfContentsSection>
                    >
                ): number => {
                    const path = env.args.path?.replace(/^\$\{site}/, '/idebanken')
                    if (!path) {
                        logger.warning(`Part_idebanken_table_of_contents is missing path arg`)
                        return 0
                    }
                    const content = getContent({ key: path })
                    if (!content) {
                        logger.warning(
                            `Part_idebanken_table_of_contents could not find content at path: ${path}`
                        )
                        return 0
                    }

                    const tableOfContentSectionIndex = getFieldByDescriptor<TableOfContentsSection>(
                        content,
                        'idebanken:table-of-contents-section'
                    ).findIndex((section) => section.title === env.source.title)

                    return tableOfContentSectionIndex + 1
                },
            },
            XData_idebanken_category_DataConfig: {
                categories: (
                    env: DataFetchingEnvironment<object, LocalContextRecord, Source<XDataCategory>>
                ): Array<string> => {
                    const categoryContents = query({
                        filters: {
                            boolean: {
                                must: [
                                    {
                                        hasValue: {
                                            field: 'type',
                                            values: ['idebanken:category'],
                                        },
                                    },
                                    {
                                        hasValue: {
                                            field: '_id',
                                            values: forceArray(env.source.categories),
                                        },
                                    },
                                ],
                            },
                        },
                    })?.hits

                    return forceArray(categoryContents)
                        .map((hit) => hit.data?.title as string)
                        .filter((it) => it)
                },
            },
            HeadlessCms: {
                header: (
                    _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
                ): LinkGroups => {
                    return runInContext({ asAdmin: true }, () => {
                        const menuConfig = getSiteConfig()?.header

                        return resolveLinkGroups(menuConfig?.linkGroups)
                    })
                },
                footer: (
                    _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
                ): {
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
                guidesUnderSection: (
                    rawEnv: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, EmptyRecord>
                ) => guidesUnderSection(rawEnv),
            },
        },
        creationCallbacks: {
            Part_idebanken_table_of_contents: (params): void => {
                params.addFields({
                    sections: {
                        args: {
                            path: nonNull(GraphQLID),
                        },
                        type: list(reference('Part_idebanken_table_of_contents_section')),
                    },
                })
            },
            Part_idebanken_table_of_contents_section: (params): void => {
                params.addFields({
                    sectionNumber: {
                        args: {
                            path: nonNull(GraphQLID),
                        },
                        type: GraphQLInt,
                    },
                })
            },
            XData_idebanken_category_DataConfig: (params): void => {
                params.modifyFields({
                    categories: {
                        type: nonNull(list(GraphQLString)),
                    },
                })
            },
            HeadlessCms: (params): void => {
                params.addFields({
                    header: {
                        type: nonNull(list(nonNull(reference('LinkGroups')))),
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
    }
}

function resolveLinkGroups(
    linkGroups?: SiteConfig['header']['linkGroups'] | SiteConfig['footer']['linkGroups']
): LinkGroups {
    return forceArray(linkGroups).map(({ title, links }) => ({
        title: title,
        links: forceArray(links).map(({ link, linkText }) => {
            const content = getContent({ key: link })
            return {
                href: content?._path?.replace(/^\/[^/]*/, '') || '/',
                linkText:
                    linkText ??
                    (content?.data?.title as string | undefined) ??
                    content?.displayName ??
                    '[Lenket innhold er ikke gyldig]',
            }
        }),
    }))
}
