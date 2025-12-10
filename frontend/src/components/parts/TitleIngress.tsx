import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import { AuthorsAndDate } from '~/components/common/AuthorsAndDate'
import { XP_TitleIngress } from '@xp-types/site/parts'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import { HeroImage } from '~/components/common/HeroImage'
import type { Tag as TagType } from '~/types/generated.d'
import { BodyShort } from '@navikt/ds-react/Typography'
import { CircleFillIcon } from '@navikt/aksel-icons'

type IdebankenX = { articleTypeTags?: { typeTags?: (TagType | null)[] | null } | null }

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
    const typeTags = idebankenX?.articleTypeTags?.typeTags?.filter((t): t is TagType => !!t) ?? []

    const hero = commonGet?.data?.heroImage

    const src = hero?.url || null
    const altText = hero?.data?.altText
    const caption = hero?.data?.caption
    const artist = hero?.data?.artist

    const title = data?.title || '[Mangler tittel på innholdet]'

    const contentType = meta?.type
    const headingSizeMap: Record<string, 'xlarge' | '2xlarge'> = {
        'idebanken:artikkel': '2xlarge',
    }
    const headingSize: 'xlarge' | '2xlarge' = headingSizeMap[contentType ?? ''] ?? 'xlarge'

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
                <BodyShort
                    as={'span'}
                    key={index}
                    size="small"
                    className={
                        'text-sm flex items-center flex-nowrap gap-(--ax-space-8) text-(--ib-text-dark-blue-icon)'
                    }>
                    <CircleFillIcon
                        width={9}
                        height={9}
                        aria-hidden
                        color={`var(--${color ?? 'ib-brand-black'})`}
                    />
                    {name}
                </BodyShort>
            ))}
            <HeadingView level="1" size={headingSize} className="m-0">
                {title}
            </HeadingView>
            <RichTextView
                tag="div"
                className="[&_p]:text-[32px]/[150%]"
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
