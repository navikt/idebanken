import { cache } from 'react'
import { fetchContent } from '@enonic/nextjs-adapter/server'

export const getContent = cache(async (locale: string, contentPath = '') => {
    return fetchContent({
        locale,
        contentPath,
    })
})
