import { Macro_Idebanken_Quote_DataConfig, Part_Idebanken_Quote } from '~/types/generated'
import { Macro, PartData } from '~/types/graphql-types'

type QuoteMacro = Macro<Macro_Idebanken_Quote_DataConfig>
type QuotePart = PartData<Part_Idebanken_Quote>

export function QuotePartOrMacro(props: QuoteMacro | QuotePart) {
    const config =
        'part' in props ? props.part?.config : 'config' in props ? props.config : undefined
    const body = config?.body ?? ''
    const source = config?.source?.trim()

    return (
        <figure className="my-4 border-l-4 border-[var(--ib-bg-pink-raised)] pl-4">
            <blockquote className="italic text-2xl font-ib-bold">— {body}</blockquote>
            {source && <figcaption className="mt-2 text-xl text-right">{source}</figcaption>}
        </figure>
    )
}
