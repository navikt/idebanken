import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const response = await fetch(`${process.env.SEARCH_API_URL}/content/search?${searchParams}`)
    const data = await response.json()

    return NextResponse.json(data)
}
