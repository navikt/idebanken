import { forceArray } from '~/utils/utils'
import { Category } from '~/types/generated'
import { CommonType } from '~/components/queries/common'
import { IS_DEV_MODE } from '@enonic/nextjs-adapter'
import { SOK_PAGE_PARAM, SOK_SEARCH_PARAM, SOK_SORT_PARAM } from '~/utils/constants'
import { ReadonlyURLSearchParams } from 'next/navigation'

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

export const search = (
    setDataCallback: (data: SearchResult) => void,
    paramsOrString: ReadonlyURLSearchParams | string
) => {
    let params = ''
    if (typeof paramsOrString === 'string') {
        params = `${SOK_SEARCH_PARAM}=${paramsOrString}`
    } else {
        const searchTerm = paramsOrString.get(SOK_SEARCH_PARAM)
        const page = Number(paramsOrString.get(SOK_PAGE_PARAM) ?? 0)
        const sort = paramsOrString.get(SOK_SORT_PARAM)
        params = `${SOK_SEARCH_PARAM}=${searchTerm}${page ? `&${SOK_PAGE_PARAM}=${page}` : ''}${sort ? `&${SOK_SORT_PARAM}=${sort}` : ''}`
    }

    return fetch(`/api/search?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then((data) => {
            if (!isSearchResult(data)) {
                throw new Error('Invalid search response:', data)
            }
            setDataCallback(data)
        })
        .catch((error) => {
            console.error('Error fetching search results:', error)
        })
}
const isCommonType = (obj: object): obj is CommonType<unknown> =>
    'categories' in obj && Array.isArray(obj.categories)

export function getResultCategories(
    result: SearchResult['hits'][0],
    commonOrCategoryMap?: CommonType<unknown> | Record<string, Category>
) {
    if (!commonOrCategoryMap) return []
    const isCommon = isCommonType(commonOrCategoryMap)
    return [
        ...forceArray(result.categories)?.reduce((acc: Array<Category>, curr) => {
            const category = isCommon
                ? commonOrCategoryMap?.categories?.find((cat) => cat.id === curr)?.name
                : commonOrCategoryMap[curr]?.name
            if (category) {
                acc.push({ name: category, id: '' })
            }
            return acc
        }, []),
        { name: result.type, id: '' },
        ...(IS_DEV_MODE ? [{ name: `Score: ${result.score}`, id: '' }] : []),
    ]
}

export function getCategoriesMap(common?: CommonType<unknown>): Record<string, Category> {
    if (!common) return {}
    return common?.categories?.reduce(
        (acc, curr) => {
            acc[curr.id] = curr
            return acc
        },
        {} as Record<string, Category>
    )
}

export type SearchResult = {
    total: number
    hits: Array<{
        displayName: string
        href: string
        highlight: string
        modifiedTime?: string
        publishedTime?: string
        audience: Array<string>
        language: string
        type: string
        iconName?: string
        iconColor?: string
        categories?: Array<string>
        score: number
    }>
    word: string
}
