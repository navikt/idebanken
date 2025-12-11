import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { LinkCard } from '@xp-types/site/parts'
import { getOrNull, getTags } from '/lib/utils/helpers'
import { Content } from '/lib/xp/content'
import { enonicSitePathToHref, truncateUrl } from '/lib/utils/string-utils'
import { TitleIngress } from '@xp-types/site/mixins'
import { LinkCardItem } from './link-card-list'
import { resolveIcon, resolveImage } from '/lib/utils/media'
import { resolveThemeTags, resolveTypeTags } from '../tag'

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
                    return resolveLinkCardInternalLink(linkTypeSelector.internalLink)
                } else {
                    return resolveLinkCardExternalLink(linkTypeSelector.externalLink)
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

type LinkCardInternalLink = Extract<
    LinkCard['internalOrExternalLink'],
    { _selected: 'internalLink' }
>['internalLink']

type LinkCardExternalLink = Extract<
    LinkCard['internalOrExternalLink'],
    { _selected: 'externalLink' }
>['externalLink']

function resolveLinkCardInternalLink(internalLink: LinkCardInternalLink): LinkCardItem {
    const content = getOrNull<Content<TitleIngress>>(internalLink.contentId)
    const tags = getTags(content?.x?.idebanken)
    const themeTags = resolveThemeTags(tags)
    const typeTags = resolveTypeTags(tags)

    return {
        url: enonicSitePathToHref(content?._path),
        external: false,
        title:
            internalLink?.linkText ||
            content?.data?.shortTitle ||
            content?.data?.title ||
            content?.displayName ||
            '[Mangler tittel]',
        description: content?.data?.description,
        themeTags,
        typeTags,
        icon: resolveIcon(content),
        image: resolveImage(content, 'height(800)'),
    }
}

function resolveLinkCardExternalLink(externalLink: LinkCardExternalLink): LinkCardItem {
    return {
        url: externalLink.url || '#',
        external: true,
        title: externalLink.linkText || truncateUrl(externalLink.url) || '[Mangler tittel]',
        description: externalLink.description,
        themeTags: [],
        typeTags: [],
        icon: resolveIcon(externalLink.icon, false),
        image: resolveImage(externalLink.image, 'height(800)'),
    }
}
