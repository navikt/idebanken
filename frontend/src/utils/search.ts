import { forceArray } from '~/utils/utils'
import { Tag } from '~/types/generated'
import { IS_DEV_MODE } from '@enonic/nextjs-adapter'
import { SOK_FACET_PARAM, SOK_FACET_TYPE_TAG, SOK_UNDER_FACET_PARAM } from '~/utils/constants'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { CommonType } from '~/types/graphql-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (callback: (...args: any[]) => unknown, wait: number) => {
    let timeoutId: number | undefined = undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
        window.clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => {
            callback(...args)
        }, wait)
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSearchResult = (data: any): data is SearchResult => {
    return (
        data &&
        typeof data === 'object' &&
        'total' in data &&
        'hits' in data &&
        Array.isArray(data.hits) &&
        'word' in data
    )
}

function appendToSearchParams(searchParams: ReadonlyURLSearchParams, key: string, value: string) {
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set(key, value)
    return urlSearchParams as ReadonlyURLSearchParams
}

export const search = async (
    paramsOrString: ReadonlyURLSearchParams | string
): Promise<SearchResult> => {
    if (typeof paramsOrString !== 'string' && paramsOrString.getAll(SOK_UNDER_FACET_PARAM).length) {
        paramsOrString = appendToSearchParams(paramsOrString, SOK_FACET_PARAM, SOK_FACET_TYPE_TAG)
    }

    const searchFetch = fetch(`/api/search?${paramsOrString?.toString()}`)
    const delay = new Promise((res) => setTimeout(res, 400))
    const [result] = await Promise.all([searchFetch, delay])

    if (!result.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await result.json()
    if (!isSearchResult(data)) {
        throw new Error('Invalid search response:', data)
    }
    return data
}

const isCommonType = (obj: object): obj is CommonType<unknown> =>
    'typeTags' in obj && Array.isArray(obj.typeTags)

export function getResultTypeTags(
    result: SearchResult['hits'][0],
    commonOrTypeTagMap?: CommonType<unknown> | Record<string, Tag>
) {
    if (!commonOrTypeTagMap) return []
    const isCommon = isCommonType(commonOrTypeTagMap)
    return [
        ...forceArray(result.typeTags)?.reduce((acc: Array<Tag>, curr) => {
            const type = isCommon
                ? commonOrTypeTagMap?.typeTags?.find((type) => type.id === curr)?.name
                : commonOrTypeTagMap[curr]?.name
            if (type) {
                acc.push({ name: type, id: '' })
            }
            return acc
        }, []),
        ...(IS_DEV_MODE ? [{ name: `Score: ${result.score}`, id: '' }] : []),
    ]
}

export function getTypeTagsMap(common?: CommonType<unknown>): Record<string, Tag> {
    if (!common) return {}
    return common?.typeTags?.reduce(
        (acc, curr) => {
            acc[curr.name] = curr
            return acc
        },
        {} as Record<string, Tag>
    )
}

export type SearchResult = {
    total: number
    word: string
    page: number
    isMore: boolean
    hits: Array<{
        displayName: string
        href: string
        highlight: string
        modifiedTime?: string
        publishedTime?: string
        audience: Array<string>
        language: string
        type: string
        iconUrl?: string
        iconColor?: string
        themeTags?: Array<string>
        typeTags?: Array<string>
        score: number
    }>
}
