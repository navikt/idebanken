import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import BleedingBackgroundPageBlock from '../layouts/BleedingBackgroundPageBlock'
import { HStack, Tag, VStack } from '@navikt/ds-react'
import Image from 'next/image'
import classNames from 'classnames'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import { XP_TitleIngress } from '@xp-types/site/parts'

type PageData = {
    ingress: string
    title: string
}

const TitleIngressView = ({ common, meta, part }: PartData<XP_TitleIngress, PageData>) => {
    const data = common?.get?.dataAsJson
    const title = data?.title || '[Mangler tittel på innholdet]'
    const config = part.config ?? {}
    const { bgColor, showType, displayType } = config
    const type = common?.get?.type || ''
    const typeLabel = (type.split(':').pop() ?? '').toUpperCase()

    const titleImageSrc = common?.get?.x?.idebanken?.meta?.icon?.mediaUrl

    if ((bgColor || titleImageSrc) && displayType === 'icon') {
        return (
            <>
                <div className={`${titleImageSrc ? 'lg:mx-[calc(-2*var(--ax-space-64))]' : ''}`}>
                    <BleedingBackgroundPageBlock
                        bgColor={bgColor}
                        marginInline={{ xs: 'full', lg: 'space-28' }}
                        bleedClassName={`overflow-hidden ${bgColor ? 'lg:rounded-[200px]' : ''}`}>
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
                                    <Image
                                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                        width={44}
                                        height={44}
                                        aria-hidden
                                        alt=""
                                        src={titleImageSrc}
                                        className={classNames(
                                            /\.svg(\?.*)?$/i.test(titleImageSrc)
                                                ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                                : ''
                                        )}
                                    />
                                </div>
                            ) : null}
                            <VStack gap="space-12" align="start">
                                {showType && typeLabel && (
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
                {showType && typeLabel && (
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
