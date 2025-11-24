import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import { getContentApiUrl, getLocaleMapping, Result } from '@enonic/nextjs-adapter'
import type { FetchContentResult } from '@enonic/nextjs-adapter'
import { Query } from '~/types/generated'

const articleCardsPartDescriptor = 'idebanken:article-card-list'

// GraphQL query: fetch the page and the part’s paged list + total
const articleCardsQuery = `
query ($contentId:ID!, $offset:Int!, $count:Int!) {
  guillotine {
    get(key:$contentId) {
      components {
        ... on PartComponent {
          descriptor
          config {
            idebanken {
              article_card_list {
                total
                list(offset:$offset, count:$count) {
                  url
                  external
                  title
                  description
                  image { url caption }
                  icon { url caption }
                  categories { id name }
                }
              }
            }
          }
        }
      }
    }
  }
}`

export interface ArticleCard {
    url: string
    external: boolean
    title: string
    description?: string | null
    image?: { url?: string | null; caption?: string | null } | null
    icon?: { url?: string | null; caption?: string | null } | null
    categories: Array<{ id: string; name: string }>
}

export interface ArticleCardsResult {
    total: number
    list: ArticleCard[]
    offset: number
    count: number
}

export async function getArticleCardsBatch(
    id: string | undefined,
    {
        offset = 0,
        count = 10,
        revalidateSeconds = 300, // cache 5 min
    }: { offset?: number; count?: number; revalidateSeconds?: number } = {}
): Promise<ArticleCardsResult> {
    const contentId = id
    if (!contentId) {
        return { total: 0, list: [], offset, count }
    }

    const raw = (await fetchGuillotine(
        getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
        getLocaleMapping({ contentPath: process.env.ENONIC_API ?? '' }),
        {
            method: 'POST',
            body: {
                query: articleCardsQuery,
                variables: { contentId, offset, count },
            },
            next: {
                revalidate: revalidateSeconds,
                tags: ['article-cards', contentId],
            },
        }
    )) as Result & Query

    const components = raw.guillotine?.get?.components || []
    const partNode: any = components.find((c: any) => c?.descriptor === articleCardsPartDescriptor)

    const cfg = partNode?.config?.idebanken?.article_card_list
    const list = (cfg?.list || []) as ArticleCard[]
    const total = cfg?.total ?? 0

    return { total, list, offset, count }
}
