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

export function extensions({ list, GraphQLString, reference, nonNull }: GraphQL): Extensions {
    return {
        types: {
            MenuItem: {
                description: 'Menu items',
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
                ): Array<{ href: string; linkText: string }> => {
                    return runInContext({ asAdmin: true }, () => {
                        const menuConfig = getSiteConfig()?.menu

                        return forceArray(menuConfig).map(({ link, linkText }) => {
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
                        type: nonNull(list(reference('MenuItem'))),
                    },
                })
            },
        },
    }
}
