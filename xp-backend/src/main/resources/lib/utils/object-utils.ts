// Get a nested object value from an array of keys
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Content } from '/lib/xp/content'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValuesFromKeyArray = (obj: Record<string, any>, keys: string[]): unknown => {
    if (!keys || keys.length === 0 || !obj || typeof obj !== 'object') {
        return null
    }

    const [currentKey, ...rest] = keys
    const currentValue = obj[currentKey]

    if (rest.length === 0) {
        return currentValue
    }

    if (Array.isArray(currentValue)) {
        const values = currentValue.reduce((acc, value) => {
            const deepValue = getNestedValuesFromKeyArray(value, rest)
            if (deepValue) {
                acc.push(deepValue)
            }

            return acc
        }, [])

        return values.length > 0 ? values : null
    }

    return getNestedValuesFromKeyArray(currentValue, rest)
}

// Get a nested object value from a dot-delimited string of keys
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValues = (obj: Record<string, any>, keysString: string) => {
    return getNestedValuesFromKeyArray(obj, keysString?.split('.'))
}

/**
 * Recursive function that finds the config for a specific descriptor,
 * and then maps the given field (default is 'config') to an array.
 */
export function getFieldByDescriptor<T = unknown>(
    content: Content<unknown>,
    descriptor: `idebanken:${string}`,
    fieldToMap: string = 'config'
): Array<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const configs: any[] = []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function findConfigsRecursively(obj: any, descriptor: string, fieldToMap: string) {
        if (!obj || typeof obj !== 'object') {
            return
        }

        if (obj.descriptor === descriptor && obj[fieldToMap]) {
            configs.push(obj[fieldToMap])
        }

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key]
                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        value.forEach((item) =>
                            findConfigsRecursively(item, descriptor, fieldToMap)
                        )
                    } else {
                        findConfigsRecursively(value, descriptor, fieldToMap)
                    }
                }
            }
        }
    }

    findConfigsRecursively(content.page?.regions as Record<string, unknown>, descriptor, fieldToMap)

    return configs
}
