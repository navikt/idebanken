import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { LinkCardList } from '@xp-types/site/parts'
import { Content, get, query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'
import { imageUrl } from '/lib/xp/portal'
import { resolveCategories } from './category'
import { enonicSitePathToHref } from '/lib/utils/string-utils'

type LinkCardListItem = {
    url: string
    title: string
    description?: string
    imageUrl?: string
    iconName?: string
    iconColor?: string
    categories: Array<string>
}

export const linkCardListExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
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
                    type: nonNull(list(nonNull(reference('Link_card_list_item')))),
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
        Link_card_list_item: {
            description: 'Overridable content link',
            fields: {
                url: {
                    type: nonNull(GraphQLString),
                },
                title: {
                    type: nonNull(GraphQLString),
                },
                description: {
                    type: GraphQLString,
                },
                imageUrl: {
                    type: GraphQLString,
                },
                iconName: {
                    type: GraphQLString,
                },
                iconColor: {
                    type: GraphQLString,
                },
                categories: {
                    type: nonNull(list(nonNull(GraphQLString))),
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

function mapContentsToLinkCardList(contents: Content[]): Array<LinkCardListItem> {
    return contents.map((item) => {
        const ibxData = item.x.idebanken
        const { image, iconName, iconColor } = ibxData?.meta ?? {}
        const { shortTitle, title, description, displayName } =
            (item.data as Record<string, string>) ?? {}

        const categories = resolveCategories(ibxData?.category)

        return {
            url: enonicSitePathToHref(item._path),
            title: shortTitle ?? title ?? displayName ?? 'Ingen tittel',
            description,
            imageUrl: image
                ? imageUrl({ id: image, type: 'absolute', scale: 'width(500)' })
                : undefined,
            iconName,
            iconColor,
            categories,
        }
    })
}

const getManualList = (
    manual: Extract<LinkCardList['list'], { _selected: 'manual' }>['manual']
): Array<unknown> => {
    if (!manual.contents) {
        return []
    }

    const contents = query({
        filters: {
            hasValue: {
                field: '_id',
                values: forceArray(manual.contents),
            },
        },
    }).hits

    return mapContentsToLinkCardList(contents)
}

const getAutomaticList = (
    automatic: Extract<LinkCardList['list'], { _selected: 'automatic' }>['automatic']
): Array<unknown> => {
    const contentTypes = forceArray(automatic.contentTypes)

    let parentContentPath
    if (automatic.parentContent) {
        parentContentPath = get({ key: automatic.parentContent })?._path
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
                    ...(contentTypes.length
                        ? [
                              {
                                  hasValue: {
                                      field: 'type',
                                      values: contentTypes,
                                  },
                              },
                          ]
                        : []),
                ],
            },
        },
    }).hits

    return mapContentsToLinkCardList(contents)
}
