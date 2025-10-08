import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { LinkCard } from '@xp-types/site/parts'
import { getOrNull, ResolvedMedia, resolveMedia } from '/lib/utils/helpers'
import { resolveCategories } from '../category'
import { get } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'

export const linkCardExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
    Json,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_link_card: {
            categories: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ) => {
                const linkSelector = env.source.internalOrExternalLink
                if (
                    linkSelector._selected === 'externalLink' ||
                    !linkSelector.internalLink.contentId
                ) {
                    return []
                }
                return resolveCategories(
                    get({ key: linkSelector.internalLink.contentId })?.x?.idebanken?.category
                )
            },
            url: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ) => {
                const linkSelector = env.source.internalOrExternalLink

                if (linkSelector._selected === 'internalLink') {
                    return enonicSitePathToHref(
                        getOrNull(linkSelector.internalLink.contentId)?._path
                    )
                }
                return linkSelector.externalLink.url
            },
            icon: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ): ResolvedMedia => {
                const linkSelector = env.source.internalOrExternalLink

                if (linkSelector._selected === 'internalLink') {
                    return resolveMedia({
                        id: linkSelector.internalLink.contentId,
                        type: 'absolute',
                        scale: 'full',
                    })
                }

                return resolveMedia({
                    id: linkSelector.externalLink.icon,
                    type: 'absolute',
                    scale: 'full',
                })
            },
            image: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ) => {
                const linkSelector = env.source.internalOrExternalLink
                if (linkSelector._selected === 'internalLink') {
                    const contentImage = getOrNull(linkSelector.internalLink.contentId)?.x?.[
                        'com-enonic-app-metafields'
                    ]?.['meta-data']?.seoImage as string | undefined

                    return resolveMedia({
                        id: contentImage,
                        type: 'absolute',
                        scale: 'height(800)',
                    })
                }

                return resolveMedia({
                    id: linkSelector.externalLink.image,
                    type: 'absolute',
                    scale: 'height(800)',
                })
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_link_card: (params) => {
            params.removeFields(['internalOrExternalLink'])
            params.addFields({
                categories: {
                    type: nonNull(list(nonNull(reference('Category')))),
                },
                url: {
                    type: GraphQLString,
                },
                icon: {
                    type: reference('ResolvedMedia'),
                },
                image: {
                    type: reference('ResolvedMedia'),
                },
                description: {
                    type: GraphQLString,
                },
            })
        },
    },
    types: {
        ResolvedMedia: {
            description: 'Resolved image or vector',
            fields: {
                url: {
                    type: GraphQLString,
                },
                caption: {
                    type: GraphQLString,
                },
                altText: {
                    type: GraphQLString,
                },
            },
            interfaces: [],
        },
    },
})
