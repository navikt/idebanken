import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Related_Topics } from '~/types/generated'

export default function RelatedTopics({ part, common }: PartData<Part_Idebanken_Related_Topics>) {
    const config = part.config
    console.log('RelatedTopics config:', common)

    if (!config) return null

    return <div>test</div>
}
