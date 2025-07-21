import { NextResponse } from 'next/server'
import { SOK_SEARCH_PARAM } from '~/components/common/SearchWrapper'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get(SOK_SEARCH_PARAM)

    const response = await fetch(`${process.env.SEARCH_API_URL}/content/search?ord=${searchTerm}`)
    const data = await response.json()

    return NextResponse.json(data)
}
