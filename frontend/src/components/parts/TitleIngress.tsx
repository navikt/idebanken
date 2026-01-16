import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import { AuthorsAndDate } from '~/components/common/AuthorsAndDate'
import { XP_TitleIngress } from '@xp-types/site/parts'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import { HeroImage } from '~/components/common/HeroImage'
import type { Tag as TagType } from '~/types/generated.d'
import TagView from '~/components/common/TagView'

type IdebankenX = { articleTags?: { typeTags?: (TagType | null)[] | null } | null }

type PageData = {
    ingress: string
    title: string
    authors?: string | Array<string>
    overrideHeroImageText?: string
}

const TitleIngressView = ({ common, meta }: PartData<XP_TitleIngress, PageData>) => {
    const commonGet = common?.get
    const data = commonGet?.dataAsJson

    const idebankenX = (commonGet?.x as { idebanken?: IdebankenX | null })?.idebanken
    const typeTags = idebankenX?.articleTags?.typeTags?.filter((t): t is TagType => !!t) ?? []

    const hero = commonGet?.data?.heroImage

    const src = hero?.url || null
    const altText = hero?.data?.altText
    const caption = hero?.data?.caption
    const artist = hero?.data?.artist

    const title = data?.title || '[Mangler tittel på innholdet]'

    const contentType = meta?.type
    const isArticle = contentType === 'idebanken:artikkel'
    const isCoreArticle = contentType === 'idebanken:kjerneartikkel'
    const isArticleLike = isArticle || isCoreArticle

    const headingSize: '2xlarge' | '3xlarge' = isArticleLike ? '2xlarge' : '3xlarge'
    const richTextParagraphClass = isArticleLike
        ? '[&_p]:text-xl/[150%] md:[&_p]:text-2xl/[150%]'
        : '[&_p]:text-2xl/[150%] md:[&_p]:text-[2rem]/[150%]'
    const richTextWrapperClass = isArticle
        ? `${richTextParagraphClass} !mt-6`
        : richTextParagraphClass

    return (
        <>
            <HeroImage
                src={src}
                altText={altText}
                caption={caption}
                artist={artist}
                unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
            />
            {typeTags.map(({ name, color }, index) => (
                <TagView
                    key={index}
                    name={name}
                    color={color}
                    size="small"
                    className="!mb-(--ax-space-4)"
                />
            ))}
            <HeadingView level="1" size={headingSize} className="!m-0">
                {title}
            </HeadingView>
            <RichTextView
                tag="div"
                className={richTextWrapperClass}
                data={{ processedHtml: data?.ingress }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
            {isArticle && (
                <AuthorsAndDate
                    authors={data?.authors}
                    artist={artist}
                    published={commonGet?.data?.publicationDate || commonGet?.publish?.first}
                />
            )}
        </>
    )
}

export default TitleIngressView
