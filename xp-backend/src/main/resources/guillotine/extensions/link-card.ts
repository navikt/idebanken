import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { LinkCard } from '@xp-types/site/parts'
import { getOrNull, resolveMedia } from '/lib/utils/helpers'
import { resolveCategories } from './category'
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
                const linkSelector = env.source.blockOptionSet
                if (
                    linkSelector._selected === 'externalLink' ||
                    !linkSelector.internalLink.ideBankContentSelector
                ) {
                    return []
                }
                return resolveCategories(
                    get({ key: linkSelector.internalLink.ideBankContentSelector })?.x?.idebanken
                        ?.category
                )
            },
            url: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ) => {
                const linkSelector = env.source.blockOptionSet
                if (linkSelector._selected === 'externalLink') {
                    return linkSelector.externalLink.url
                } else {
                    return enonicSitePathToHref(
                        getOrNull(linkSelector.internalLink.ideBankContentSelector)?._path
                    )
                }
            },
            icon: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ) => resolveMedia({ id: env.source.icon, type: 'absolute', scale: 'full' }),
            image: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ) => resolveMedia({ id: env.source.image, type: 'absolute', scale: 'height(800)' }),
        },
    },
    creationCallbacks: {
        Part_idebanken_link_card: (params) => {
            params.removeFields(['icon', 'image', 'blockOptionSet'])
            params.modifyFields({
                icon: {
                    type: reference('ResolvedMedia'),
                },
                image: {
                    type: reference('ResolvedMedia'),
                },
            })
            params.addFields({
                categories: {
                    type: nonNull(list(nonNull(reference('Category')))),
                },
                url: {
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
