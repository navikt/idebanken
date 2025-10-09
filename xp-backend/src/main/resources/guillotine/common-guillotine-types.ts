import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions } from '@enonic-types/guillotine/extensions'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { Link, LinkSelector, TitleIngress } from '@xp-types/site/mixins'
import { Content, get as getContent } from '/lib/xp/content'
import { enonicSitePathToHref, truncateUrl } from '/lib/utils/string-utils'
import { getOrNull } from '/lib/utils/helpers'

export type Source<T> = {
    __contentId: string
} & T
export type EmptyRecord = Record<string, unknown>

export type ResolvedLink = { url: string; linkText: string; external: boolean }
export type LinkGroups = Array<{
    title?: string
    links: Array<ResolvedLink>
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
    ResolvedLink: {
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
                type: nonNull(list(nonNull(reference('ResolvedLink')))),
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

export function resolveLinks(links?: Array<Link>): Array<ResolvedLink> {
    return forceArray(links).map(({ link, linkText }) => {
        const content = getContent({ key: link })
        return {
            url: enonicSitePathToHref(content?._path),
            external: false,
            linkText:
                linkText ??
                (content?.data?.title as string | undefined) ??
                content?.displayName ??
                '[Lenket innhold er ikke gyldig]',
        }
    })
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
    internalOrExternalLink: LinkSelector['internalOrExternalLink']
): ResolvedLink {
    if (internalOrExternalLink._selected === 'internalLink') {
        return resolveInternalLink(internalOrExternalLink.internalLink)
    } else {
        return resolveExternalLink(internalOrExternalLink.externalLink)
    }
}

function resolveInternalLink(internalLink: InternalLink): ResolvedLink {
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

function resolveExternalLink(externalLink: ExternalLink): ResolvedLink {
    return {
        url: externalLink.url || '#',
        external: true,
        linkText: externalLink.linkText || truncateUrl(externalLink.url) || '[Mangler tittel]',
    }
}
