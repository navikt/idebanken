import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { get as getContent } from '/lib/xp/content'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { logger } from '/lib/utils/logging'
import { TableOfContents } from '@xp-types/site/parts'
import { getFieldByDescriptor } from '/lib/utils/object-utils'
import { Source } from '../../common-guillotine-types'
import { Card } from '@xp-types/site/layouts'

export const tableOfContentsExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_table_of_contents: {
            sections: (
                env: DataFetchingEnvironment<
                    { path?: string },
                    LocalContextRecord,
                    Source<TableOfContents>
                >
            ): Array<string> => {
                const path = env.args.path?.replace(/^\$\{site}/, '/idebanken')
                if (!path) {
                    logger.warning(`Part_idebanken_table_of_contents is missing path arg`)
                    return []
                }
                const content = getContent({ key: path })
                if (!content) {
                    logger.warning(
                        `Part_idebanken_table_of_contents could not find content at path: ${path}`
                    )
                    return []
                }

                return getFieldByDescriptor<Card>(content, 'idebanken:card', 'layout')
                    .filter((it) => it.heading?.length)
                    .map((it) => it.heading as string)
            },
        },
    },
    creationCallbacks: {
        Part_idebanken_table_of_contents: (params): void => {
            params.addFields({
                sections: {
                    args: {
                        path: nonNull(GraphQLID),
                    },
                    type: list(GraphQLString),
                },
            })
        },
    },
})
