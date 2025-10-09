/* eslint-disable @next/next/no-img-element */
import { Media_Image } from '~/types/generated.d'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import BleedingBackgroundPageBlock from '../layouts/BleedingBackgroundPageBlock'
import { HStack, Tag, VStack } from '@navikt/ds-react'

type PageData = {
    ingress: string
    title: string
}

type TitleIngressConfig = {
    bgColor?: string
    image?: Media_Image
}

const TitleIngressView = ({ common, meta, part }: PartData<TitleIngressConfig, PageData>) => {
    const data = common?.get?.dataAsJson
    const title = data?.title || '[Mangler tittel på innholdet]'
    const config = part.config
    const type = common?.get?.type || ''
    const typeLabel = (type.split(':').pop() ?? '').toUpperCase()

    const titleImage = config.image
    let titleImageSrc: string | undefined
    if (titleImage) {
        if ('imageUrl' in titleImage) {
            titleImageSrc = titleImage.imageUrl ?? undefined
        } else if ('mediaUrl' in titleImage) {
            titleImageSrc = titleImage.mediaUrl ?? undefined
        }
    }

    if (config.bgColor) {
        return (
            <div className="lg:mx-[calc(-2*var(--ax-space-96))]">
                <BleedingBackgroundPageBlock
                    bgColor={config.bgColor}
                    marginInline={{ sm: 'space-4', md: 'space-48' }}
                    bleedClassName="rounded-[100px] overflow-hidden">
                    <HStack align="center" gap="space-24" className="py-6">
                        {titleImageSrc ? (
                            <div className="hidden lg:block -ml-48 shrink-0">
                                <img
                                    aria-hidden="true"
                                    alt=""
                                    role="presentation"
                                    src={titleImageSrc}
                                    className={[
                                        'block h-auto w-40 filter',
                                        /\.svg(\?.*)?$/i.test(titleImageSrc)
                                            ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                            : '',
                                    ].join(' ')}
                                />
                            </div>
                        ) : null}
                        <VStack gap="space-8" align="start">
                            <Tag variant="info-filled" size="small" className="rounded-3xl">
                                {typeLabel}
                            </Tag>
                            <HeadingView level="1" size="xlarge" className="m-0">
                                {title}
                            </HeadingView>
                        </VStack>
                    </HStack>
                </BleedingBackgroundPageBlock>
            </div>
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
