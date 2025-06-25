// Get a nested object value from an array of keys
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
