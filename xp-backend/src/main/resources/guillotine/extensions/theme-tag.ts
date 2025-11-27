import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord, Source } from '../common-guillotine-types'
import { Tags } from '@xp-types/site/x-data'
import { Content, query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { ThemeTag } from '@xp-types/site/content-types'
import { resolveIcon } from '/lib/utils/media'

export type ResolvedThemeTag = {
    id: string
    name: string
    iconUrl?: string
    iconColor?: string
    caption?: string
}

export const themeTagExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    types: {
        Tag: {
            description: 'Resolved tag',
            fields: {
                id: {
                    type: nonNull(GraphQLID),
                },
                name: {
                    type: nonNull(GraphQLString),
                },
                iconUrl: {
                    type: GraphQLString,
                },
                iconColor: {
                    type: GraphQLString,
                },
                caption: {
                    type: GraphQLString,
                },
            },
            interfaces: [],
        },
    },
    resolvers: {
        XData_idebanken_tags_DataConfig: {
            themeTags: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<Tags>>
            ): Array<ResolvedThemeTag> => {
                return resolveThemeTags(env.source)
            },
        },
        XData_idebanken_aktuelt_tags_DataConfig: {
            themeTags: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<Tags>>
            ): Array<ResolvedThemeTag> => {
                return resolveThemeTags(env.source)
            },
        },
    },
    creationCallbacks: {
        XData_idebanken_tags_DataConfig: (params): void => {
            params.modifyFields({
                themeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
            })
        },
        XData_idebanken_aktuelt_tags_DataConfig: (params): void => {
            params.modifyFields({
                themeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
            })
        },
    },
})

export function resolveThemeTags(tags?: Tags): Array<ResolvedThemeTag> {
    if (!tags?.themeTags) {
        return []
    }

    const themeContents = query<Content<ThemeTag>>({
        filters: {
            boolean: {
                must: [
                    {
                        hasValue: {
                            field: 'type',
                            values: ['idebanken:theme-tag'],
                        },
                    },
                    {
                        hasValue: {
                            field: '_id',
                            values: forceArray(tags.themeTags),
                        },
                    },
                ],
            },
        },
    })?.hits

    return mapThemeTagContentToResolved(themeContents)
}

export function mapThemeTagContentToResolved(
    themeTagContents?: Array<Content<ThemeTag>>
): Array<ResolvedThemeTag> {
    return forceArray(themeTagContents)
        .filter((it) => it?.data?.title && it._id)
        .map((hit) => {
            const icon = resolveIcon(hit)

            return {
                name: hit.data.title,
                id: hit._id,
                iconUrl: icon?.url,
                caption: icon?.caption,
                iconColor: hit.x?.idebanken?.meta?.iconColor,
            }
        })
}
