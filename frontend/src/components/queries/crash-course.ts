// typescript
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
            dataAsJson
        }
    }
}`

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

export type CrashCourseData = {
    slides: FetchContentResult[]
    structure: CrashCourseStructure
}

function isCrashCoursePartOrIntro(item: Content | undefined): boolean {
    const t = item?.type ?? ''
    return t.endsWith('crash-course-part') || t.endsWith('crash-course-intro')
}

export async function getCrashCourseSlideContents(
    props: FetchContentResult
): Promise<CrashCourseData> {
    const path: string = props.common?.get?._path

    // Fetch top-level children (can be parts or slides)
    const topLevelItems = await getChildren(path)

    // Fetch children for all parts in parallel and keep a lookup
    const crashCoursePartsAndIntro = topLevelItems.filter(isCrashCoursePartOrIntro)
    const partAndIntroChildrenEntries = await Promise.all(
        crashCoursePartsAndIntro.map(
            async (part) => [part._path, await getChildren(part._path)] as const
        )
    )
    const partAndIntroChildrenMap = new Map<string, Content[]>(
        partAndIntroChildrenEntries.map(([p, kids]) => [p, forceArray(kids)])
    )

    // Build the slide deck in order:
    // - if a top-level item is a part, include the part followed by its children
    // - if a top-level item is a slide, include it directly
    const allItems: Content[] = []
    topLevelItems.forEach((item) => {
        if (!item) return
        if (isCrashCoursePartOrIntro(item)) {
            allItems.push(item)
            allItems.push(...forceArray(partAndIntroChildrenMap.get(item._path)))
        } else {
            allItems.push(item)
        }
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

    // Global slide index mapping based on the interleaved allItems order
    const pathToSlideDeckIndex = new Map<string, number>()
    allItems.forEach((item, idx) => {
        if (item?._path) pathToSlideDeckIndex.set(item._path, idx)
    })

    // Parts-only structure for navigation, with global and local indices
    const structure: CrashCourseStructure = {
        parts: crashCoursePartsAndIntro.map((part, partIdx) => {
            const partChildren = forceArray(partAndIntroChildrenMap.get(part._path))
            return {
                index: pathToSlideDeckIndex.get(part._path) ?? -1,
                localIndex: partIdx,
                name: part.displayName ?? '[Mangler tittel]',
                path: part._path,
                pages: partChildren.map((page, pageIdx) => ({
                    index: pathToSlideDeckIndex.get(page._path) ?? -1,
                    localIndex: pageIdx,
                    name: page.dataAsJson.title ?? page.displayName ?? '',
                    path: page._path,
                })),
            }
        }),
    }

    return { slides, structure }
}

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
