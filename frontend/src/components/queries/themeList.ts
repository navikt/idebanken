import { Theme_Card } from '~/types/generated'
import { QueryResponsePartData } from '~/types/graphql-types'

const THEME_PART_QUERY = `
query($path:ID!,$offset:Int!,$count:Int!){
  guillotine {
    get(key:$path){
      components {
        part {
          descriptor
          config {
            idebanken {
              theme_card_list {
                data(offset:$offset, count:$count, path:$path) {
                    total
                    list {
                      title
                      url
                      external
                      description
                      image { url caption }
                      themeTags { id name }
                      typeTags { id name }
                    }
                }
              }
            }
          }
        }
      }
    }
  }
}`

export async function fetchThemeCardList(
    path: string,
    offset: number,
    count: number
): Promise<{ total: number; list: Theme_Card[] }> {
    const data: QueryResponsePartData<'theme_card_list'> = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: THEME_PART_QUERY,
            variables: { contentId: path, offset, count },
        }),
    }).then((r) => r.json())

    const components = data.guillotine?.get?.components ?? []
    const wrapper = components.find((w) => w.part?.descriptor === 'idebanken:theme-card-list')
    const cfg = wrapper?.part?.config?.idebanken?.theme_card_list?.data

    return {
        total: cfg?.total ?? 0,
        list: cfg?.list ?? [],
    }
}
