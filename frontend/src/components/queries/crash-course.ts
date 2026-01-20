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
            type
            displayName
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

export type CrashCourseData = {
    slides: FetchContentResult[]
    structure: CrashCourseStructure
}

// typescript
export async function getCrashCourseSlideContents(
    props: FetchContentResult
): Promise<CrashCourseData> {
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

    const slides = (
        await Promise.all(
            slidePaths.map((contentPath) =>
                fetchContent({
                    locale: props.meta.locale,
                    contentPath,
                })
            )
        )
    ).filter(Boolean) as FetchContentResult[]

    const pathToSlideDeckIndex = new Map<string, number>()
    allItems.forEach((item, idx) => {
        if (item?._path) pathToSlideDeckIndex.set(item._path, idx)
    })

    // Build structured hierarchy with indices, names, and paths
    const structure: CrashCourseStructure = {
        parts: crashCourseParts.map((part, partIdx) => {
            const partChildren = forceArray(childrenArrays[partIdx])
            return {
                index: pathToSlideDeckIndex.get(part._path) ?? -1,
                localIndex: partIdx,
                name: part.displayName ?? '',
                path: part._path,
                pages: partChildren.map((page, pageIdx) => ({
                    index: pathToSlideDeckIndex.get(page._path) ?? -1,
                    localIndex: pageIdx,
                    name: page.displayName ?? '',
                    path: page._path,
                })),
            }
        }),
    }

    return { slides, structure }
}

export type CrashCourseStructure = {
    parts: Array<{
        index: number
        localIndex: number
        name: string
        path: string
        pages: Array<{
            index: number
            localIndex: number
            name: string
            path: string
        }>
    }>
}
