import { NextResponse } from 'next/server'
import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import { getContentApiUrl, getLocaleMapping } from '@enonic/nextjs-adapter'

interface ArticleCard {
    url: string
    external: boolean
    title: string
    description?: string | null
    image?: { url?: string | null; caption?: string | null } | null
    categories: Array<{ id: string; name: string }>
}

interface ArticleCardListConfig {
    total?: number
    list?: ArticleCard[]
}

interface PartComponent {
    descriptor?: string
    config?: {
        idebanken?: {
            article_card_list?: ArticleCardListConfig
        }
    }
}

interface ComponentWrapper {
    part?: PartComponent | null
}

interface GuillotineResponse {
    guillotine?: {
        get?: {
            components?: ComponentWrapper[]
        }
    }
}

const QUERY = `
query($contentId:ID!,$offset:Int!,$count:Int!){
  guillotine {
    get(key:$contentId){
      components {
        part {
          descriptor
          config {
            idebanken {
              article_card_list {
                list(offset:$offset,count:$count) {
                  title
                  url
                  external
                  description
                  image { url caption }
                  categories { id name }
                }
                total
              }
            }
          }
        }
      }
    }
  }
}`

export async function POST(req: Request) {
    const {
        contentId,
        offset = 0,
        count = 10,
    } = (await req.json()) as {
        contentId?: string
        offset?: number
        count?: number
    }

    if (!contentId) {
        return NextResponse.json({ total: 0, list: [] as ArticleCard[], offset, count })
    }

    const apiUrl = getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' })
    const localeMapping = getLocaleMapping({ contentPath: process.env.ENONIC_API ?? '' })

    const raw = await fetchGuillotine<GuillotineResponse>(apiUrl, localeMapping, {
        method: 'POST',
        body: { query: QUERY, variables: { contentId, offset, count } },
        next: { revalidate: 0 },
    })

    const components: ComponentWrapper[] = raw.guillotine?.get?.components ?? []
    const wrapper = components.find((w) => w.part?.descriptor === 'idebanken:article-card-list')
    const cfg = wrapper?.part?.config?.idebanken?.article_card_list

    return NextResponse.json({
        total: cfg?.total ?? 0,
        list: cfg?.list ?? [],
        offset,
        count,
    })
}

export async function GET() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
