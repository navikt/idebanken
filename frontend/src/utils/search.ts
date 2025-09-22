import { SOK_SEARCH_PARAM } from '~/components/common/SearchWrapper'
import { forceArray } from '~/utils/utils'
import { Category } from '~/types/generated'
import { CommonType } from '~/components/queries/common'

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

export const search = (setDataCallback: (data: SearchResult) => void, searchTerm?: string | null) =>
    fetch(`/api/search?${SOK_SEARCH_PARAM}=${searchTerm}`)
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

export function getResultCategories(result: SearchResult['hits'][0], common?: CommonType<unknown>) {
    if (!common) return []
    return [
        ...forceArray(result.categories)?.reduce((acc: Array<Category>, curr) => {
            const category = common?.categories?.find((cat) => cat.id === curr)?.name
            if (category) {
                acc.push({ name: category, id: '' })
            }
            return acc
        }, []),
        { name: result.type, id: '' },
        { name: `score: ${result.score}`, id: '' },
    ]
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
