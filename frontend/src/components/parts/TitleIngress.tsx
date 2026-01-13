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
    const headingSizeMap: Record<string, '2xlarge' | '3xlarge'> = {
        'idebanken:artikkel': '2xlarge',
        'idebanken:kjerneartikkel': '2xlarge',
    }
    const headingSize: '2xlarge' | '3xlarge' = headingSizeMap[contentType ?? ''] ?? '3xlarge'
    const richTextParagraphClass = ['idebanken:artikkel', 'idebanken:kjerneartikkel'].includes(
        contentType ?? ''
    )
        ? '[&_p]:text-xl/[140%] md:[&_p]:text-2xl/[133%]'
        : '[&_p]:text-2xl/[133%] md:[&_p]:text-[32px]/[125%]'
    const richTextWrapperClass =
        contentType === 'idebanken:artikkel'
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
            <AuthorsAndDate
                authors={data?.authors}
                artist={artist}
                published={commonGet?.data?.publicationDate || commonGet?.publish?.first}
            />
        </>
    )
}

export default TitleIngressView
