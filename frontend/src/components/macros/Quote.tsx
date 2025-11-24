import { Macro_Idebanken_Quote_DataConfig } from '~/types/generated'
import { Macro } from '~/types/graphql-types'

export function Quote({ config }: Macro<Macro_Idebanken_Quote_DataConfig>) {
    const body = config.body ?? ''
    const source = config.source?.trim()
    return (
        <figure className="my-4 border-l-4 border-(--ib-orange-400) pl-4">
            <blockquote className="italic text-2xl font-ib-bold">— {body}</blockquote>
            {config.source && <figcaption className="mt-2 text-xl text-right">{source}</figcaption>}
        </figure>
    )
}
