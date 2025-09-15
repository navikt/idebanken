import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { get as getContent } from '/lib/xp/content'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { logger } from '/lib/utils/logging'
import { TableOfContents, TableOfContentsSection } from '@xp-types/site/parts'
import { getFieldByDescriptor } from '/lib/utils/object-utils'
import { Source } from '../common-guillotine-types'

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
            ): Array<TableOfContentsSection> => {
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

                return getFieldByDescriptor<TableOfContentsSection>(
                    content,
                    'idebanken:table-of-contents-section'
                )
            },
        },
        Part_idebanken_table_of_contents_section: {
            sectionNumber: (
                env: DataFetchingEnvironment<
                    { path?: string },
                    LocalContextRecord,
                    Source<TableOfContentsSection>
                >
            ): number => {
                const path = env.args.path?.replace(/^\$\{site}/, '/idebanken')
                if (!path) {
                    logger.warning(`Part_idebanken_table_of_contents is missing path arg`)
                    return 0
                }
                const content = getContent({ key: path })
                if (!content) {
                    logger.warning(
                        `Part_idebanken_table_of_contents could not find content at path: ${path}`
                    )
                    return 0
                }

                const tableOfContentSectionIndex = getFieldByDescriptor<TableOfContentsSection>(
                    content,
                    'idebanken:table-of-contents-section'
                ).findIndex((section) => section.title === env.source.title)

                return tableOfContentSectionIndex + 1
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
                    type: list(reference('Part_idebanken_table_of_contents_section')),
                },
            })
        },
        Part_idebanken_table_of_contents_section: (params): void => {
            params.addFields({
                sectionNumber: {
                    args: {
                        path: nonNull(GraphQLID),
                    },
                    type: GraphQLInt,
                },
            })
        },
    },
})
