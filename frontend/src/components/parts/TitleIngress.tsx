import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import { Authors } from '~/components/common/Authors'
import { XP_TitleIngress } from '@xp-types/site/parts'

type PageData = {
    ingress: string
    title: string
    authors?: string | Array<string>
}

const TitleIngressView = ({ common, meta }: PartData<XP_TitleIngress, PageData>) => {
    const commonGet = common?.get

    const data = commonGet?.dataAsJson
    const title = data?.title || '[Mangler tittel på innholdet]'

    return (
        <>
            <HeadingView level="1" size="xlarge" className="m-0">
                {title}
            </HeadingView>
            <RichTextView
                tag={'div'}
                className={'[&_p]:text-[32px]/[150%]'}
                data={{ processedHtml: data?.ingress }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
            <Authors authors={data?.authors} published={commonGet?.publish?.first} />
        </>
    )
}

export default TitleIngressView
