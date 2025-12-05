import {
    Article_Card,
    Part_Idebanken_Article_Card_List,
    Part_Idebanken_ComponentDataApplicationConfig,
} from '~/types/generated'
import { QueryResponsePartData } from '~/types/graphql-types'
import { Context, VariablesGetterResult } from '@enonic/nextjs-adapter'
import { XP_ArticleCardList as ArticleCardListConfig } from '~/types/.xp-codegen/site/parts/article-card-list/index'

type Tag = Part_Idebanken_Article_Card_List['availableTypeTags'][number]

type AllowedPartKeys = Exclude<keyof Part_Idebanken_ComponentDataApplicationConfig, '__typename'>
type GetNodeFor<Part extends AllowedPartKeys> = NonNullable<
    NonNullable<QueryResponsePartData<Part>['guillotine']>['get']
>
type ProcessorInputFor<Part extends AllowedPartKeys> = {
    get?: Partial<GetNodeFor<Part>>
}

export const ARTICLE_PART_QUERY = `
query($path:ID!,$offset:Int!,$count:Int!,$typeTagIds:String){
    guillotine {
        get(key:$path){
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
                                availableTypeTags { id name }
                            }
                        }
                    }
                }
            }
        }
    }
}`

export async function fetchArticleCardList(
    path: string,
    offset: number,
    count: number,
    typeTagIdsCsv?: string
): Promise<{ total: number; list: Article_Card[] }> {
    const data: QueryResponsePartData<'article_card_list'> = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: ARTICLE_PART_QUERY,
            variables: { path, offset, count, typeTagIds: typeTagIdsCsv },
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

/* For use in _mappings.ts by article-card-list part */

export const getArticleData = {
    query: ARTICLE_PART_QUERY,
    variables: function (
        path: string,
        context?: Context,
        config?: ArticleCardListConfig
    ): VariablesGetterResult {
        return {
            path,
            count: config?.pageSize,
            offset: 0,
            typeTagIds: null,
        }
    },
}

export async function articleListProcessor(
    data: ProcessorInputFor<'article_card_list'>
): Promise<{ total: number; list: Article_Card[]; availableTypeTags: Tag[] }> {
    const components = data?.get?.components ?? []
    const wrapper = components.find((w) => w.part?.descriptor === 'idebanken:article-card-list')
    const cfg = wrapper?.part?.config?.idebanken?.article_card_list

    return {
        total: cfg?.total ?? 0,
        list: cfg?.list ?? [],
        availableTypeTags: cfg?.availableTypeTags ?? [],
    }
}
