import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { Category as XDataCategory } from '@xp-types/site/x-data'
import { forceArray } from '/lib/utils/array-utils'
import { get as getContent, query } from '/lib/xp/content'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { runInContext } from '/lib/repos/run-in-context'
import { getSiteConfig } from '/lib/utils/site-config'

type Source<T> = {
    __contentId: string
} & T

type ProcessedOverridableLink = { href: string; linkText: string }

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
            LinkCategory: {
                description: 'Link category',
                fields: {
                    title: {
                        type: GraphQLString,
                    },
                    links: {
                        type: nonNull(list(reference('OverridableContentLink'))),
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
                    linkCategory: {
                        type: nonNull(list(reference('LinkCategory'))),
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
                menu: (
                    _env: DataFetchingEnvironment<object, LocalContextRecord, object>
                ): Array<ProcessedOverridableLink> => {
                    return runInContext({ asAdmin: true }, () => {
                        const menuConfig = getSiteConfig()?.menu

                        return mapOverridableContentLinks(menuConfig)
                    })
                },
                footer: (
                    _env: DataFetchingEnvironment<object, LocalContextRecord, object>
                ): {
                    linkCategory: Array<{
                        title?: string
                        links?: Array<ProcessedOverridableLink>
                    }>
                } => {
                    return runInContext({ asAdmin: true }, () => {
                        const footerConfig = getSiteConfig()?.footer

                        const linkCategory = forceArray(footerConfig?.linkCategory).map(
                            (category) => ({
                                title: category.title,
                                links: mapOverridableContentLinks(category.links),
                            })
                        )

                        return {
                            footerText: footerConfig?.footerText,
                            linkCategory,
                        }
                    })
                },
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
                    menu: {
                        type: nonNull(list(reference('OverridableContentLink'))),
                    },
                    footer: {
                        type: reference('Footer'),
                    },
                })
            },
        },
    }
}

function mapOverridableContentLinks<T extends { link: string; linkText?: string }>(
    items?: T | T[]
): Array<ProcessedOverridableLink> {
    return forceArray(items).map(({ link, linkText }) => {
        const content = getContent({ key: link })
        return {
            href: content?._path?.replace(/^\/[^/]*/, '') || '/',
            linkText:
                linkText ??
                (content?.data?.title as string | undefined) ??
                content?.displayName ??
                '[Lenket innhold er ikke gyldig]',
        }
    })
}
