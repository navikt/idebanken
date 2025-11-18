import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import { AuthorsAndDate } from '~/components/common/AuthorsAndDate'
import { XP_TitleIngress } from '@xp-types/site/parts'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import { HeroImage } from '~/components/common/HeroImage'

type PageData = {
    ingress: string
    title: string
    authors?: string | Array<string>
}

const TitleIngressView = ({ common, meta }: PartData<XP_TitleIngress, PageData>) => {
    const commonGet = common?.get
    const data = commonGet?.dataAsJson

    const hero = commonGet?.data?.heroImage as
        | { url?: string; data?: { altText?: string; caption?: string; artist?: string } }
        | undefined

    const src = hero?.url || null
    const altText = hero?.data?.altText
    const caption = hero?.data?.caption
    const artist = hero?.data?.artist

    const title = data?.title || '[Mangler tittel på innholdet]'

    return (
        <>
            <HeroImage
                src={src}
                altText={altText}
                caption={caption}
                artist={artist}
                unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
            />
            <HeadingView level="1" size="xlarge" className="m-0">
                {title}
            </HeadingView>
            <RichTextView
                tag="div"
                className="[&_p]:text-[32px]/[150%]"
                data={{ processedHtml: data?.ingress }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
            <AuthorsAndDate authors={data?.authors} published={commonGet?.publish?.first} />
        </>
    )
}

export default TitleIngressView
