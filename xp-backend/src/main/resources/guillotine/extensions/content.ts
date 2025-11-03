import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { EmptyRecord } from '../common-guillotine-types'
import { Content, query } from '/lib/xp/content'
import { forceArray } from '/lib/utils/array-utils'

type SkyraData = { slug: string; source?: string }

export const contentExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        Content: {
            skyra: (
                env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Content>
            ): Array<SkyraData> => {
                const content = env.source
                const thirdPartyXData = content.x.idebanken?.['third-party']

                const skyraForms: Array<SkyraData> = forceArray(thirdPartyXData?.skyra)
                    .filter((form) => form?._selected === 'this')
                    .map((form) => ({
                        slug: form.this.slug,
                    }))

                if (thirdPartyXData?.ignoreSkyraFromParents) {
                    return skyraForms
                }

                const skyraParentForms = forceArray(
                    query({
                        sort: [{ field: '_path', direction: 'DESC' }],
                        filters: {
                            boolean: {
                                must: [
                                    {
                                        exists: {
                                            field: 'x.idebanken.third-party.skyra.children',
                                        },
                                    },
                                ],
                                should: [
                                    {
                                        notExists: {
                                            field: 'x.idebanken.third-party.skyra.children.contentTypes',
                                        },
                                    },
                                    {
                                        hasValue: {
                                            field: 'x.idebanken.third-party.skyra.children.contentTypes',
                                            values: [content.type],
                                        },
                                    },
                                ],
                            },
                        },
                    }).hits
                )

                return skyraParentForms
                    .filter(
                        (c: Content) =>
                            content._path !== c._path && content._path.startsWith(c._path)
                    )
                    .flatMap((c) =>
                        forceArray(c.x.idebanken?.['third-party']?.skyra)
                            ?.filter((form) => form?._selected === 'children')
                            .map<SkyraData>((form) => ({
                                slug: form.children.slug,
                                source: c._path,
                            }))
                    )
                    .concat(skyraForms)
            },
        },
    },
    types: {
        SkyraData: {
            description: 'Data needed to add a Skyra form',
            fields: {
                slug: { type: nonNull(GraphQLString) },
                source: { type: GraphQLID },
            },
            interfaces: [],
        },
    },
    creationCallbacks: {
        Content: (params): void => {
            params.addFields({
                skyra: {
                    type: nonNull(list(nonNull(reference('SkyraData')))),
                },
            })
        },
    },
})
