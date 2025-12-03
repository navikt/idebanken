import { Article_Card } from '~/types/generated'
import { QueryResponsePartData } from '~/types/graphql-types'

const ARTICLE_PART_QUERY = `
query($contentId:ID!,$offset:Int!,$count:Int!,$typeTagIds:String){
  guillotine {
    get(key:$contentId){
      components {
        part {
          descriptor
          config {
            idebanken {
              article_card_list {
                list(offset:$offset,count:$count,typeTagIds:$typeTagIds) {
                  title
                  url
                  external
                  description
                  image { url caption }
                  themeTags { id name }
                  typeTags { id name }
                }
                total(typeTagIds:$typeTagIds)
              }
            }
          }
        }
      }
    }
  }
}`

export async function fetchArticleCardList(
    contentId: string,
    offset: number,
    count: number,
    typeTagIdsCsv?: string
): Promise<{ total: number; list: Article_Card[] }> {
    const data: QueryResponsePartData<'article_card_list'> = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: ARTICLE_PART_QUERY,
            variables: { contentId, offset, count, typeTagIds: typeTagIdsCsv },
        }),
    }).then((r) => r.json())

    const components = data.guillotine?.get?.components ?? []
    const wrapper = components.find((w) => w.part?.descriptor === 'idebanken:article-card-list')
    const cfg = wrapper?.part?.config?.idebanken?.article_card_list

    return {
        total: cfg?.total ?? 0,
        list: cfg?.list ?? [],
    }
}
