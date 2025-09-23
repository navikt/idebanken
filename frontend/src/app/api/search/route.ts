import { NextResponse } from 'next/server'
import { SOK_PAGE_PARAM, SOK_SEARCH_PARAM, SOK_SORT_PARAM } from '~/utils/constants'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get(SOK_SEARCH_PARAM)
    const page = searchParams.get(SOK_PAGE_PARAM)
    const sort = searchParams.get(SOK_SORT_PARAM)

    const response = await fetch(
        `${process.env.SEARCH_API_URL}/content/search?${SOK_SEARCH_PARAM}=${searchTerm}${page ? `&${SOK_PAGE_PARAM}=${page}` : ''}${sort ? `&${SOK_SORT_PARAM}=${sort}` : ''}`
    )
    const data = await response.json()

    return NextResponse.json(data)
}
