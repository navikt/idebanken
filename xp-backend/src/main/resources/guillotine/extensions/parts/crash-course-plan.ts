import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { CrashCourse } from '@xp-types/site/content-types'
import { logger } from '/lib/utils/logging'
import { Source } from '../../common-guillotine-types'
import { getChildren, query } from '/lib/xp/content'

export const crashCoursePlanExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    Json,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        Part_idebanken_crash_course_plan: {
            parts: (
                env: DataFetchingEnvironment<
                    { path?: string },
                    LocalContextRecord,
                    Source<CrashCourse>
                >
            ): object => {
                const path = env.args.path?.replace(/^\$\{site}\/+/, '/idebanken/')
                if (!path) {
                    logger.warning(`Part_idebanken_crash_course_plan is missing path arg`)
                    return []
                }

                const rootCrashCourseContent = query({
                    count: 1,
                    query: {
                        pathMatch: {
                            field: '_path',
                            minimumMatch: 3,
                            path: `/content${path}`,
                        },
                    },
                    filters: {
                        hasValue: {
                            field: 'type',
                            values: ['idebanken:crash-course'],
                        },
                    },
                }).hits.pop()

                if (!rootCrashCourseContent) {
                    logger.warning(
                        `Part_idebanken_crash_course_plan could not find crash course content at path: ${path}`
                    )
                    return {}
                }

                const crashCourseParts = getChildren({
                    key: rootCrashCourseContent._path,
                }).hits.filter((child) => child.type === 'idebanken:crash-course-part')

                return crashCourseParts.map((part) => {
                    const partSlides = getChildren({
                        key: part._path,
                    }).hits.filter((child) => child.type === 'idebanken:crash-course-slide')
                    return {
                        partName: part.displayName,
                        partSlides: partSlides.map((partSlide) => ({
                            slideName: partSlide.displayName,
                        })),
                    }
                })
            },
        },
    },
    types: {},
    creationCallbacks: {
        Part_idebanken_crash_course_plan: (params) => {
            params.addFields({
                parts: {
                    args: {
                        path: nonNull(GraphQLID),
                    },
                    type: Json,
                },
            })
        },
    },
})
