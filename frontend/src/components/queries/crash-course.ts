import { fetchContent, fetchGuillotine } from '@enonic/nextjs-adapter/server'
import type { FetchContentResult } from '@enonic/nextjs-adapter'
import { getContentApiUrl, getLocaleMapping, Result } from '@enonic/nextjs-adapter'
import { enonicSitePathToHref, forceArray } from '~/utils/utils'
import { Content, Query } from '~/types/generated'

const getChildrenPathsQuery = `
query($path:ID!){
    guillotine {
        getChildren(key:$path) {
            _path
        }
    }
}`

async function getChildren(path: string): Promise<Array<Content>> {
    const res = (await fetchGuillotine(
        getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
        getLocaleMapping({ contentPath: process.env.ENONIC_API ?? '' }),
        {
            method: 'POST',
            body: {
                query: getChildrenPathsQuery,
                variables: {
                    path: path,
                },
            },
            next: {
                revalidate: 3600, // 1 hour
                tags: ['crash-course'],
            },
        }
    )) as Result & Query
    return forceArray(res?.guillotine?.getChildren).filter<Content>(
        (it) => it !== null && it !== undefined
    )
}

export async function getCrashCourseSlideContents(
    props: FetchContentResult
): Promise<FetchContentResult[]> {
    const path: string = props.common?.get?._path

    const crashCourseParts = await getChildren(path)

    const slidePaths = forceArray(crashCourseParts).map((child) =>
        enonicSitePathToHref(child?._path)
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
    )?.then((res) => res.filter(Boolean) as FetchContentResult[])
}
