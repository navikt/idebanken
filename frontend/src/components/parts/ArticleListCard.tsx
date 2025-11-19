import { PartData } from '~/types/graphql-types'
import { Part_Idebanken_Article_Card_List } from '~/types/generated'
import { getAsset, getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import {
    LinkCard,
    LinkCardImage,
    LinkCardTitle,
    LinkCardAnchor,
    LinkCardDescription,
} from '@navikt/ds-react/LinkCard'
import Image from 'next/image'

type Card = Part_Idebanken_Article_Card_List['list'][number]

interface Config {
    list: Card[]
}

export function ArticleCardList({ part, meta }: PartData<Config>) {
    const { list } = part.config
    if (!list?.length) return null

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {list.map((card) => (
                <p key={card.url}>{card.title}</p>
            ))}
        </div>
    )
}

export default ArticleCardList
