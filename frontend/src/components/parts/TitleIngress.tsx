import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import { AuthorsAndDate } from '~/components/common/AuthorsAndDate'
import { XP_TitleIngress } from '@xp-types/site/parts'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import Image from 'next/image'

type PageData = {
    ingress: string
    title: string
    authors?: string | Array<string>
}

const TitleIngressView = ({ common, meta }: PartData<XP_TitleIngress, PageData>) => {
    const commonGet = common?.get

    const data = commonGet?.dataAsJson
    // console.log('TitleIngressView data:', commonGet.data)
    const src = commonGet?.data?.heroImage?.url || ''
    const title = data?.title || '[Mangler tittel på innholdet]'

    return (
        <>
            {src && (
                <div className="lg:mx-[calc(-2*(var(--ax-space-96)_-_0.5rem))]">
                    <Image
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={src}
                        alt="Test"
                        width={1024}
                        height={576}
                        sizes="(min-width: 1024px) 1024px, 100vw"
                        className="w-full h-auto object-cover rounded-xl"
                    />
                </div>
            )}
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
            <AuthorsAndDate authors={data?.authors} published={commonGet?.publish?.first} />
        </>
    )
}

export default TitleIngressView
