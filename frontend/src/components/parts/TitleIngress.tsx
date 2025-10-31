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
    showType?: boolean
}

const TitleIngressView = ({ common, meta, part }: PartData<TitleIngressConfig, PageData>) => {
    const data = common?.get?.dataAsJson
    const title = data?.title || '[Mangler tittel på innholdet]'
    const config = part.config ?? {}
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

    if (config.bgColor || titleImageSrc) {
        return (
            <>
                <div className={`${titleImageSrc ? 'lg:mx-[calc(-2*var(--ax-space-64))]' : ''}`}>
                    <BleedingBackgroundPageBlock
                        bgColor={config.bgColor}
                        marginInline={{ xs: 'full', lg: 'space-28' }}
                        bleedClassName={`overflow-hidden ${config.bgColor ? 'lg:rounded-[200px]' : ''}`}>
                        <HStack
                            align="center"
                            gap="space-32"
                            className="py-11 flex-wrap lg:flex-nowrap">
                            {titleImageSrc ? (
                                <div
                                    className="hidden lg:flex self-center lg:-ml-30 items-center justify-center shrink-0 rounded-full w-22 h-22"
                                    style={{
                                        backgroundColor: 'var(--ib-prefix-bg, var(--ib-pink-200))',
                                    }}>
                                    <img
                                        aria-hidden="true"
                                        alt=""
                                        role="presentation"
                                        src={titleImageSrc}
                                        className={[
                                            'block h-auto w-11',
                                            /\.svg(\?.*)?$/i.test(titleImageSrc)
                                                ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                                : '',
                                        ].join(' ')}
                                    />
                                </div>
                            ) : null}
                            <VStack gap="space-12" align="start">
                                {config.showType && typeLabel && (
                                    <Tag
                                        variant="info-filled"
                                        size="xsmall"
                                        className="rounded-3xl py-2 px-3">
                                        {typeLabel}
                                    </Tag>
                                )}
                                <HeadingView level="1" size="xlarge" className="m-0">
                                    {title}
                                </HeadingView>
                            </VStack>
                        </HStack>
                    </BleedingBackgroundPageBlock>
                </div>
                <RichTextView
                    tag={'div'}
                    className={'[&_p]:text-[32px]/[150%]'}
                    data={{ processedHtml: data?.ingress }}
                    meta={meta}
                    customReplacer={htmlRichTextReplacer}
                />
            </>
        )
    }

    return (
        <>
            <VStack gap="space-8" align="start">
                {config.showType && typeLabel && (
                    <Tag variant="info-filled" size="small" className="rounded-3xl">
                        {typeLabel}
                    </Tag>
                )}
                <HeadingView level="1" size="xlarge" className="m-0">
                    {title}
                </HeadingView>
            </VStack>
            <RichTextView
                tag={'div'}
                className={'[&_p]:text-[32px]/[150%]'}
                data={{ processedHtml: data?.ingress }}
                meta={meta}
                customReplacer={htmlRichTextReplacer}
            />
        </>
    )
}

export default TitleIngressView
