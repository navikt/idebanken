import { fetchContent, fetchGuillotine } from '@enonic/nextjs-adapter/server'
import { getContentApiUrl, getLocaleMapping, Result } from '@enonic/nextjs-adapter'
import type { FetchContentResult } from '@enonic/nextjs-adapter/src/types'
import { forceArray } from '~/utils/utils'
import { Query } from '~/types/generated'

const crashCourseChildrenQuery = `
query($path:ID!){
    guillotine {
        getChildren(key:$path) {
            _path
        }
    }
}`

export async function getCrashCourseSlideContents(
    props: FetchContentResult
): Promise<FetchContentResult[]> {
    const crashCourseChildren = (await fetchGuillotine(
        getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
        getLocaleMapping({ contentPath: process.env.ENONIC_API ?? '' }),
        {
            method: 'POST',
            body: {
                query: crashCourseChildrenQuery,
                variables: {
                    path: props.common?.get?._path,
                },
            },
            next: {
                revalidate: 3600, // 1 hour
                tags: ['crash-course'],
            },
        }
    )) as Result & Query

    const slidePaths = forceArray(crashCourseChildren.guillotine?.getChildren).map((child) =>
        child?._path?.replace(/^\/[^/]+/, '')
    )

    return Promise.all(
        slidePaths?.map(async (path) => {
            if (!path) {
                return undefined
            }
            return fetchContent({
                locale: props.meta.locale,
                contentPath: path,
            })
        })
    )?.then((res) => res.filter(Boolean) as FetchContentResult[]) // Filter out undefined results
}
