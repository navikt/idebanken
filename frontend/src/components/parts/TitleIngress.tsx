/* eslint-disable @next/next/no-img-element */
import { Media_Image } from '~/types/generated.d'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import BleedingBackgroundPageBlock from '../layouts/BleedingBackgroundPageBlock'
import { HStack } from '@navikt/ds-react'

type PageData = {
    ingress: string
    title: string
}

type TitleIngressConfig = {
    bgColor?: string
    image?: Media_Image
}

const isSvgUrl = (url?: string) => !!url && /\.svg(\?.*)?$/i.test(url)

const TitleIngressView = ({ common, meta, part }: PartData<TitleIngressConfig, PageData>) => {
    const data = common?.get?.dataAsJson
    const title = data?.title || '[Mangler tittel på innholdet]'
    const config = part.config

    const titleImage = config.image
    let titleImageSrc: string | undefined
    let titleImageAlt = 'Illustrasjonsbilde'
    if (titleImage) {
        if ('imageUrl' in titleImage) {
            titleImageSrc = titleImage.imageUrl ?? undefined
            titleImageAlt = titleImage.data?.altText ?? titleImageAlt
        } else if ('mediaUrl' in titleImage) {
            titleImageSrc = titleImage.mediaUrl ?? undefined
            titleImageAlt = titleImage.data?.caption ?? 'Illustrasjon'
        }
    }

    if (config.bgColor) {
        return (
            <BleedingBackgroundPageBlock
                bgColor={config.bgColor}
                marginInline={{ xs: 'space-4', md: 'space-32' }}
                bleedClassName="rounded-[100px] overflow-hidden lg:mx-[-18vw]">
                <HStack align="center" gap="space-24" className="py-6">
                    {titleImageSrc ? (
                        <div className="hidden lg:block -ml-48 shrink-0 relative">
                            <img
                                src={titleImageSrc}
                                alt={titleImageAlt}
                                className="block h-auto lg:w-42 dark:invert dark:brightness-0 dark:contrast-200"
                            />
                        </div>
                    ) : null}
                    <HeadingView level="1" size="xlarge" className="m-0">
                        {title}
                    </HeadingView>
                </HStack>
            </BleedingBackgroundPageBlock>
        )
    }

    return (
        <>
            <HeadingView level="1" size="xlarge">
                {title}
            </HeadingView>
            <RichTextView
                data={{ processedHtml: data?.ingress }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
        </>
    )
}

export default TitleIngressView
