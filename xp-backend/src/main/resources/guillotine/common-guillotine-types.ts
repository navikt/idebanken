import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { Extensions } from '@enonic-types/guillotine/extensions'
import { SiteConfig } from '@xp-types/site'
import { forceArray } from '/lib/utils/array-utils'
import { Link } from '@xp-types/site/mixins'
import { get as getContent } from '/lib/xp/content'
import { enonicSitePathToHref } from '/lib/utils/string-utils'

export type Source<T> = {
    __contentId: string
} & T
export type EmptyRecord = Record<string, unknown>

export type ProcessedOverridableLink = { href: string; linkText: string }
export type LinkGroups = Array<{
    title?: string
    links: Array<ProcessedOverridableLink>
}>

export const commonGuillotineTypes = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions['types'] => ({
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
    LinkGroups: {
        description: 'Link groups',
        fields: {
            title: {
                type: GraphQLString,
            },
            links: {
                type: nonNull(list(nonNull(reference('OverridableContentLink')))),
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
export function resolveLinks(links?: Array<Link>): Array<ProcessedOverridableLink> {
    return forceArray(links).map(({ link, linkText }) => {
        const content = getContent({ key: link })
        return {
            href: enonicSitePathToHref(content?._path),
            linkText:
                linkText ??
                (content?.data?.title as string | undefined) ??
                content?.displayName ??
                '[Lenket innhold er ikke gyldig]',
        }
    })
}
