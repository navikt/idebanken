import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { LinkCard } from '@xp-types/site/parts'
import { getOrNull } from '/lib/utils/helpers'
import { resolveCategories } from '../category'
import { Content } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { TitleIngress } from '@xp-types/site/mixins'
import { LinkCardItem } from './link-card-list'
import { resolveIcon, resolveImage } from '/lib/utils/media'

export const linkCardExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    reference,
    nonNull,
    Json,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_link_card: {
            resolvedLinkCard: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCard>>
            ): LinkCardItem => {
                const linkTypeSelector = env.source.internalOrExternalLink

                if (linkTypeSelector._selected === 'internalLink') {
                    return resolveInternalLink(linkTypeSelector.internalLink)
                } else {
                    return resolveExternalLink(linkTypeSelector.externalLink)
                }
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_link_card: (params) => {
            params.removeFields(['internalOrExternalLink'])
            params.addFields({
                resolvedLinkCard: {
                    type: nonNull(reference('Link_card')),
                },
            })
        },
    },
})

type InternalLink = Extract<
    LinkCard['internalOrExternalLink'],
    { _selected: 'internalLink' }
>['internalLink']

type ExternalLink = Extract<
    LinkCard['internalOrExternalLink'],
    { _selected: 'externalLink' }
>['externalLink']

function resolveInternalLink(internalLink: InternalLink): LinkCardItem {
    const content = getOrNull<Content<TitleIngress>>(internalLink.contentId)
    const categories = resolveCategories(content?.x?.idebanken?.category)

    return {
        url: enonicSitePathToHref(content?._path),
        external: false,
        title:
            internalLink?.linkText ||
            content?.data?.shortTitle ||
            content?.data?.title ||
            '[Mangler tittel]',
        description: content?.data?.description,
        categories,
        icon: resolveIcon(content),
        image: resolveImage(content, 'height(800)'),
    }
}

function resolveExternalLink(externalLink: ExternalLink): LinkCardItem {
    return {
        url: externalLink.url || '#',
        external: true,
        title: externalLink.linkText || '[Mangler tittel]',
        description: externalLink.description,
        categories: [],
        icon: resolveIcon(externalLink.icon, false, externalLink.iconColor),
        image: resolveImage(externalLink.image, 'height(800)'),
    }
}
