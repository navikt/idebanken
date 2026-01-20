import { GraphQL } from '@enonic-types/guillotine/graphQL'
import { DataFetchingEnvironment, Extensions } from '@enonic-types/guillotine/extensions'
import { EmptyRecord, Source } from '../common-guillotine-types'
import type { LocalContextRecord } from '@enonic-types/guillotine/graphQL/LocalContext'
import { CrashCourse } from '@xp-types/site/content-types'
import { Content, get, query } from '/lib/xp/content'
import { logger } from '/lib/utils/logging'

export const crashCourseExtensions = ({
    list,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    reference,
    Json,
    nonNull,
}: GraphQL): Extensions => ({
    resolvers: {
        idebanken_CrashCourse: {
            crashCourseData: (
                _env: DataFetchingEnvironment<EmptyRecord, LocalContextRecord, Source<CrashCourse>>
            ): object => {
                const crashCourseContent = get({ key: _env.source?.data?.__contentId })
                const crashCourseParts = query({
                    count: -1,
                    query: {
                        like: {
                            field: '_path',
                            value: `/content${crashCourseContent?._path}/*`,
                        },
                    },
                    filters: {
                        hasValue: {
                            field: 'type',
                            values: ['idebanken:crash-course-part'],
                        },
                    },
                })
                logger.info(
                    `Crash course parts: ${JSON.stringify(crashCourseParts.hits.map((it) => it._path))}`
                )
                const crashCourseData = crashCourseParts.hits.reduce(
                    (
                        acc: Array<{ crashCoursePart: Content; slides: Array<Content> }>,
                        crashCoursePart
                    ) => {
                        const crashCourseSlides = query({
                            count: -1,
                            query: {
                                like: {
                                    field: '_path',
                                    value: `/content${crashCoursePart._path}/*`,
                                },
                            },
                            filters: {
                                hasValue: {
                                    field: 'type',
                                    values: ['idebanken:crash-course-slide'],
                                },
                            },
                        })
                        acc.push({
                            crashCoursePart: crashCoursePart,
                            slides: crashCourseSlides.hits,
                        })
                        return acc
                    },
                    []
                )
                return crashCourseData
            },
        },
    },
    types: {
        CrashCoursePart: {
            description: 'Data structure for crash course part and their slides',
            fields: {
                crashCoursePart: {
                    type: nonNull(reference('idebanken_CrashCoursePart')),
                },
                slides: {
                    type: nonNull(list(nonNull(reference('idebanken_CrashCourseSlide')))),
                },
            },
            interfaces: [],
        },
    },
    creationCallbacks: {
        idebanken_CrashCourse: (params) => {
            params.addFields({
                crashCourseData: {
                    type: Json,
                },
            })
        },
    },
})
