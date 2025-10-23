import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions } from '@enonic-types/guillotine/extensions'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { LinkSelector, TitleIngress } from '@xp-types/site/mixins'
import { Content } from '/lib/xp/content'
import { enonicSitePathToHref, truncateUrl } from '/lib/utils/string-utils'
import { getOrNull } from '/lib/utils/helpers'

export type Source<T> = {
    __contentId: string
} & T
export type EmptyRecord = Record<string, unknown>

export type ResolvedLinkSelector = { url: string; linkText: string; external: boolean }
export type LinkGroups = Array<{
    title?: string
    links: Array<ResolvedLinkSelector>
}>

export const commonGuillotineTypes = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    reference,
    nonNull,
}: GraphQL): Extensions['types'] => ({
    ResolvedLinkSelector: {
        description: 'Overridable link',
        fields: {
            url: {
                type: nonNull(GraphQLString),
            },
            linkText: {
                type: nonNull(GraphQLString),
            },
            external: {
                type: nonNull(GraphQLBoolean),
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
                type: nonNull(list(nonNull(reference('ResolvedLinkSelector')))),
            },
        },
        interfaces: [],
    },
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
            iconColor: {
                type: GraphQLString,
            },
        },
        interfaces: [],
    },
})

export function resolveLinkGroups(
    linkGroups?: SiteConfig['header']['linkGroups'] | SiteConfig['footer']['linkGroups']
): LinkGroups {
    return forceArray(linkGroups).map(({ title, links }) => ({
        title: title,
        links: resolveLinks(links),
    }))
}

export function resolveLinks(
    links?: Array<LinkSelector> | LinkSelector
): Array<ResolvedLinkSelector> {
    return forceArray(links).map((link) => resolveLink(link?.internalOrExternalLink))
}

type InternalLink = Extract<
    LinkSelector['internalOrExternalLink'],
    { _selected: 'internalLink' }
>['internalLink']

type ExternalLink = Extract<
    LinkSelector['internalOrExternalLink'],
    { _selected: 'externalLink' }
>['externalLink']

export function resolveLink(
    internalOrExternalLink?: LinkSelector['internalOrExternalLink']
): ResolvedLinkSelector {
    if (!internalOrExternalLink?._selected) {
        return {
            url: '#',
            external: false,
            linkText: '[Lenke er konfigurert feil]',
        }
    } else if (internalOrExternalLink._selected === 'internalLink') {
        return resolveInternalLink(internalOrExternalLink.internalLink)
    } else {
        return resolveExternalLink(internalOrExternalLink.externalLink)
    }
}

function resolveInternalLink(internalLink: InternalLink): ResolvedLinkSelector {
    const content = getOrNull<Content<TitleIngress>>(internalLink.contentId)

    return {
        url: enonicSitePathToHref(content?._path),
        external: false,
        linkText:
            internalLink?.linkText ||
            content?.data?.shortTitle ||
            content?.data?.title ||
            content?.displayName ||
            '[Mangler tittel]',
    }
}

function resolveExternalLink(externalLink: ExternalLink): ResolvedLinkSelector {
    return {
        url: externalLink.url || '#',
        external: true,
        linkText: externalLink.linkText || truncateUrl(externalLink.url) || '[Mangler tittel]',
    }
}
