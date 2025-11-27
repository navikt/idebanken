import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { LinkCardList } from '@xp-types/site/parts'
import { Content, get, query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { ResolvedThemeTag, resolveThemeTags } from '../theme-tag'
import { enonicSitePathToHref } from '/lib/utils/string-utils'
import { ResolvedMedia, resolveIcon, resolveImage } from '/lib/utils/media'

export type LinkCardItem = {
    url: string
    external: boolean
    title: string
    description?: string
    image?: ResolvedMedia
    icon?: ResolvedMedia
    themeTags: Array<ResolvedThemeTag>
}

export const linkCardListExtensions = ({
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
        Part_idebanken_link_card_list: {
            list: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCardList>>
            ) => {
                const { list } = env.source
                const listType = list._selected

                if (listType === 'manual') {
                    return getManualList(list.manual)
                } else if (listType === 'automatic') {
                    return getAutomaticList(list.automatic)
                }
                return []
            },
            heading: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<LinkCardList>>
            ) => {
                if (
                    env.source.list._selected !== 'automatic' ||
                    !env.source.list.automatic.showHeading
                ) {
                    return null
                }
                const { parentContent } = env.source.list.automatic
                if (!parentContent) {
                    return null
                }
                const content = get({ key: parentContent })
                if (!content) {
                    return null
                }
                return {
                    title: content.data?.title || content.displayName || 'Ingen tittel',
                    href: enonicSitePathToHref(content._path),
                }
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_link_card_list: (params) => {
            params.modifyFields({
                list: {
                    type: nonNull(list(nonNull(reference('Link_card')))),
                },
            })
            params.addFields({
                heading: {
                    type: reference('Part_idebanken_link_card_list_heading'),
                },
            })
        },
    },
    types: {
        Link_card: {
            description: 'Overridable content link',
            fields: {
                url: {
                    type: nonNull(GraphQLString),
                },
                external: {
                    type: nonNull(GraphQLBoolean),
                },
                title: {
                    type: nonNull(GraphQLString),
                },
                description: {
                    type: GraphQLString,
                },
                image: {
                    type: reference('ResolvedMedia'),
                },
                icon: {
                    type: reference('ResolvedMedia'),
                },
                themeTags: {
                    type: nonNull(list(nonNull(reference('Tag')))),
                },
            },
            interfaces: [],
        },
        Part_idebanken_link_card_list_heading: {
            description: 'Automatic heading for link card list',
            fields: {
                title: {
                    type: nonNull(GraphQLString),
                },
                href: {
                    type: nonNull(GraphQLString),
                },
            },
            interfaces: [],
        },
    },
})

function mapContentsToLinkCardList(contents: Content[]): Array<LinkCardItem> {
    return contents.map((item) => {
        const ibxData = item.x.idebanken
        const { shortTitle, title, description, displayName } =
            (item.data as Record<string, string>) ?? {}

        const themeTags = resolveThemeTags(ibxData?.tags)

        return {
            url: enonicSitePathToHref(item._path),
            external: false,
            title: shortTitle || title || displayName || '[Mangler tittel]',
            description,
            image: resolveImage(item, 'width(500)'),
            icon: resolveIcon(item),
            themeTags,
        }
    })
}

const getManualList = (
    manual: Extract<LinkCardList['list'], { _selected: 'manual' }>['manual']
): Array<LinkCardItem> => {
    const selectedContentIds = forceArray(manual.contents)
    if (!selectedContentIds.length) {
        return []
    }

    const contents = query({
        count: -1,
        filters: {
            hasValue: {
                field: '_id',
                values: selectedContentIds,
            },
        },
    }).hits

    // Sort contents according to the order of selectedContentIds. Could be solved by iterating selectedContentIds
    // and fetching each content by id, but this way we do only one query to the repository.
    const orderMap = new Map(selectedContentIds.map((id, index) => [id, index]))
    const sortedContents = contents.sort((a, b) => {
        const indexA = orderMap.get(a._id) ?? Number.MAX_SAFE_INTEGER
        const indexB = orderMap.get(b._id) ?? Number.MAX_SAFE_INTEGER
        return indexA - indexB
    })

    return mapContentsToLinkCardList(sortedContents)
}

const getAutomaticList = (
    automatic: Extract<LinkCardList['list'], { _selected: 'automatic' }>['automatic']
): Array<LinkCardItem> => {
    const contentTypes = forceArray(automatic.contentTypes)

    let parentContentPath
    if (automatic.parentContent) {
        parentContentPath = get({ key: automatic.parentContent })?._path
    }
    if (!contentTypes?.length) {
        return [
            { url: '#', external: false, title: '[Ingen innholdstyper er valgt]', themeTags: [] },
        ]
    }

    const contents = query({
        count: automatic.limit || -1,
        query: {
            boolean: {
                must: [
                    ...(parentContentPath
                        ? [
                              {
                                  like: {
                                      field: '_path',
                                      value: `/content${parentContentPath}/*`,
                                  },
                              },
                          ]
                        : []),
                ],
            },
        },
        filters: {
            boolean: {
                must: [
                    {
                        hasValue: {
                            field: 'type',
                            values: contentTypes,
                        },
                    },
                ],
            },
        },
    }).hits

    return mapContentsToLinkCardList(contents)
}
