import { Part_Idebanken_Heading } from '~/types/generated.d'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'

type PageData = {
    ingress: string
    title: string
}

const TitleIngressView = ({ common, meta }: PartData<Part_Idebanken_Heading, PageData>) => {
    return (
        <>
            <HeadingView level={'1'} size={'xlarge'}>
                {common?.get?.dataAsJson?.title || '[Mangler tittel på innholdet]'}
            </HeadingView>
            <RichTextView
                data={{ processedHtml: common?.get?.dataAsJson?.ingress }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
        </>
    )
}

export default TitleIngressView
