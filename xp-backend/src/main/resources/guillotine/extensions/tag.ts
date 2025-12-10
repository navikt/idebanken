import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord, Source } from '../common-guillotine-types'
import { AktueltTags, Tags } from '@xp-types/site/x-data'
import { Content, query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { AktueltTypeTag, ThemeTag, TypeTag } from '@xp-types/site/content-types'
import { resolveIcon } from '/lib/utils/media'

export type ResolvedTag = {
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
                color: {
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
            ): Array<ResolvedTag> => {
                return resolveThemeTags(env.source)
            },
            typeTags: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<Tags>>
            ): Array<ResolvedTag> => {
                return resolveTypeTags(env.source)
            },
        },
        XData_idebanken_aktuelt_tags_DataConfig: {
            themeTags: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<AktueltTags>>
            ): Array<ResolvedTag> => {
                return resolveThemeTags(env.source)
            },
            typeTags: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<AktueltTags>>
            ): Array<ResolvedTag> => {
                return resolveTypeTags(env.source)
            },
        },
    },
    creationCallbacks: {
        XData_idebanken_tags_DataConfig: (params): void => {
            params.modifyFields({
                themeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
                typeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
            })
        },
        XData_idebanken_aktuelt_tags_DataConfig: (params): void => {
            params.modifyFields({
                themeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
                typeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
            })
        },
    },
})

export function resolveThemeTags(tags?: Tags | AktueltTags): Array<ResolvedTag> {
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

    return mapTagContentToResolved(themeContents)
}

export function resolveTypeTags(tags?: Tags | AktueltTags): Array<ResolvedTag> {
    if (!tags?.typeTags) {
        return []
    }

    const typeTagContents = query<Content<TypeTag | AktueltTypeTag>>({
        filters: {
            boolean: {
                must: [
                    {
                        hasValue: {
                            field: 'type',
                            values: ['idebanken:type-tag', 'idebanken:aktuelt-type-tag'],
                        },
                    },
                    {
                        hasValue: {
                            field: '_id',
                            values: forceArray(tags.typeTags),
                        },
                    },
                ],
            },
        },
    })?.hits

    return mapTagContentToResolved(typeTagContents)
}

export function mapTagContentToResolved(
    themeTagContents?: Array<Content<ThemeTag | TypeTag | AktueltTypeTag>>
): Array<ResolvedTag> {
    return forceArray(themeTagContents)
        .filter((it) => it?.displayName && it._id)
        .map((hit) => {
            const icon = resolveIcon(hit)

            return {
                name: hit.displayName,
                id: hit._id,
                // @ts-expect-error theme doesn't have color
                color: hit.data?.color,
                iconUrl: icon?.url,
                caption: icon?.caption,
                iconColor: hit.x?.idebanken?.meta?.iconColor,
            }
        })
}
