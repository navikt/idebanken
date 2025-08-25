import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Category as XDataCategory } from '@xp-types/site/x-data'
import { forceArray } from '/lib/utils/array-utils'
import { get as getContent, query, getChildren } from '/lib/xp/content'
import type { Content } from '/lib/xp/content'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { runInContext } from '/lib/repos/run-in-context'
import { getSiteConfig } from '/lib/utils/site-config'
import { SiteConfig } from '@xp-types/site'

type Source<T> = {
    __contentId: string
} & T

type ProcessedOverridableLink = { href: string; linkText: string }

type LinkGroups = Array<{
    title?: string
    links: Array<ProcessedOverridableLink>
}>

type EmptyRecord = Record<string, unknown>
type GuidesUnderSectionArgs = { section?: string }

export function extensions({ list, GraphQLString, reference, nonNull }: GraphQL): Extensions {
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
                ) =>
                    runInContext({ asAdmin: true }, () => {
                        const env = rawEnv as typeof rawEnv & { arguments?: GuidesUnderSectionArgs }
                        const sectionPath = getSectionArg(env)
                        if (!sectionPath) return []
                        // Expect exact form /idebanken/<section-slug>
                        if (!/^\/idebanken\/[^/]+$/.test(sectionPath)) return []

                        const parent = getContent({ key: sectionPath }) as Content<unknown> | null
                        if (!parent) return []

                        // Fetch direct children
                        const rawChildren = getChildren({ key: parent._id, count: 1000 })
                        type ChildrenObj = { hits?: Array<Content<unknown>> }
                        const children: Array<Content<unknown>> = Array.isArray(rawChildren)
                            ? (rawChildren as Array<Content<unknown>>)
                            : ((rawChildren as ChildrenObj).hits ?? [])

                        // Ensure only guides since field type is idebanken_Guide
                        return children.filter((c) => c.type === 'idebanken:guide')
                    }),
            },
        },
        creationCallbacks: {
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
                        args: { section: nonNull(GraphQLString) },
                    },
                })
            },
        },
    }
}

function getSectionArg(env: unknown): string | undefined {
    const e = env as { arguments?: GuidesUnderSectionArgs; args?: GuidesUnderSectionArgs }
    const raw = e.arguments?.section ?? e.args?.section
    if (!raw) return undefined
    const trimmed = raw.trim()
    return trimmed.length ? trimmed : undefined
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
