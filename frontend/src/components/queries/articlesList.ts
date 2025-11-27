import { Article_Card, Part_Idebanken_Article_Card_List } from '~/types/generated'

interface PartComponent {
    descriptor?: string
    config?: { idebanken?: { article_card_list?: Part_Idebanken_Article_Card_List } }
}
interface ComponentWrapper {
    part?: PartComponent | null
}
interface QueryResponse {
    guillotine?: {
        get?: { components?: ComponentWrapper[] }
    }
}

const ARTICLE_PART_QUERY = `
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
                  themeTags { id name }
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

export async function fetchArticleCardList(
    contentId: string,
    offset: number,
    count: number
): Promise<{ total: number; list: Article_Card[] }> {
    const data: QueryResponse = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: ARTICLE_PART_QUERY,
            variables: { contentId, offset, count },
        }),
    }).then((r) => r.json())

    const components: ComponentWrapper[] = data.guillotine?.get?.components ?? []
    const wrapper = components.find((w) => w.part?.descriptor === 'idebanken:article-card-list')
    const cfg = wrapper?.part?.config?.idebanken?.article_card_list

    return {
        total: cfg?.total ?? 0,
        list: cfg?.list ?? [],
    }
}
