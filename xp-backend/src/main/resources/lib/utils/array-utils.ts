import { logger } from './logging'

export const parseJsonToArray = <Type = unknown>(json: string): Type[] | null => {
    try {
        const isStringifiedArray = json.startsWith('[') && json.endsWith(']')
        return isStringifiedArray ? JSON.parse(json) : (forceArray(json) as Type[])
    } catch (e) {
        logger.info(`Failed to parse JSON string ${json} - ${e}`)
        return null
    }
}

export const forceArray = <Type>(arrayOrNot?: Type | Type[] | null) => {
    if (arrayOrNot === undefined || arrayOrNot === null) {
        return []
    }

    return Array.isArray(arrayOrNot) ? arrayOrNot : [arrayOrNot]
}

export const removeDuplicates = <Type>(
    array: Type[] | ReadonlyArray<Type>,
    isEqualPredicate?: (_a: Type, _b: Type) => boolean
) => array.filter(removeDuplicatesFilter<Type>(isEqualPredicate))

export const removeDuplicatesFilter = <Type>(isEqualPredicate?: (_a: Type, _b: Type) => boolean) =>
    isEqualPredicate
        ? (aItem: Type, aIndex: number, array: Type[] | ReadonlyArray<Type>) => {
              const bIndex = array.findIndex((bItem) => isEqualPredicate(aItem, bItem))
              return aIndex === bIndex
          }
        : (item: Type, index: number, array: Type[] | ReadonlyArray<Type>) =>
              array.indexOf(item) === index

export const iterableToArray = <Type>(iterable: IterableIterator<Type>): Type[] => {
    const array: Type[] = []

    for (const item of iterable) {
        array.push(item)
    }

    return array
}

export function flatMap<A, B>(
    xs: Array<A>,
    f: (a: A, i: number) => Array<B>,
    thisArg?: unknown
): Array<B>
export function flatMap<A, B>(
    xs: Array<A>,
    f: (a: A, i: number) => Array<B>,
    thisArg?: unknown
): Array<B>
export function flatMap<A, B>(
    xs: ReadonlyArray<A>,
    f: (a: A, i: number) => ReadonlyArray<B>,
    thisArg?: unknown
): ReadonlyArray<B>
export function flatMap<A, B>(
    xs: ReadonlyArray<A>,
    f: (a: A, i: number) => ReadonlyArray<B>,
    thisArg?: unknown
): ReadonlyArray<B> {
    return xs.reduce((result: Array<B>, x: A, i) => result.concat(f.call(thisArg ?? xs, x, i)), [])
}
