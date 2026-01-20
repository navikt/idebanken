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
    return forceArray(res?.guillotine?.getChildren)
        .filter<Content>((it) => it !== null && it !== undefined)
        .filter((it) => it.type?.startsWith('idebanken:crash-course-'))
}

// typescript
export async function getCrashCourseSlideContents(
    props: FetchContentResult
): Promise<FetchContentResult[]> {
    const path: string = props.common?.get?._path

    // Fetch top-level parts
    const crashCourseParts = await getChildren(path)

    // Interleave each part with its children: [part, ...children]
    const allItems: Content[] = []
    const childrenArrays = await Promise.all(
        crashCourseParts.map((part) => getChildren(part._path))
    )
    crashCourseParts.forEach((part, idx) => {
        allItems.push(part)
        const children = forceArray(childrenArrays[idx])
        allItems.push(...children)
    })

    // Map to hrefs and fetch contents
    const slidePaths = allItems
        .map((item) => enonicSitePathToHref(item?._path))
        .filter(Boolean) as string[]

    const results = await Promise.all(
        slidePaths.map((contentPath) =>
            fetchContent({
                locale: props.meta.locale,
                contentPath,
            })
        )
    )

    return results.filter(Boolean) as FetchContentResult[]
}
