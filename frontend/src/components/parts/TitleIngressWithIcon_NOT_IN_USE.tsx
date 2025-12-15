import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'
import { HeadingView } from '~/components/parts/Heading'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import { HStack, Tag, VStack } from '@navikt/ds-react'
import Image from 'next/image'
import { RENDER_MODE } from '@enonic/nextjs-adapter'
import { XP_TitleIngressIcon } from '@xp-types/site/parts'
import { QuestionmarkIcon } from '@navikt/aksel-icons'

type PageData = {
    ingress: string
    title: string
}

const TitleIngressWithIconView = ({
    common,
    meta,
    part,
}: PartData<XP_TitleIngressIcon, PageData>) => {
    const commonGet = common?.get

    const data = commonGet?.dataAsJson
    const title = data?.title || '[Mangler tittel på innholdet]'
    const config = part.config ?? {}
    const { bgColor, showType } = config
    const type = commonGet?.type || ''
    const typeLabel = (type.split(':').pop() ?? '').toUpperCase()

    const remoteIconUrl = commonGet?.x?.idebanken?.meta?.icon?.mediaUrl || null
    const hasImageIcon = typeof remoteIconUrl === 'string' && remoteIconUrl.length > 0

    return (
        <>
            <div className="lg:mx-[calc(-2*var(--ax-space-64))]">
                <BleedingBackgroundPageBlock
                    bgColor={bgColor}
                    marginInline={{ xs: 'full', lg: 'space-28' }}
                    bleedClassName={`overflow-hidden ${bgColor ? 'lg:rounded-[200px]' : ''}`}>
                    <HStack
                        align="center"
                        gap="space-32"
                        className="py-11 flex-wrap lg:flex-nowrap">
                        <div
                            className="hidden lg:flex self-center lg:-ml-30 items-center justify-center shrink-0 rounded-full w-22 h-22"
                            style={{ backgroundColor: 'var(--ib-prefix-bg, var(--ib-pink-200))' }}>
                            {hasImageIcon ? (
                                <Image
                                    unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                    width={44}
                                    height={44}
                                    alt=""
                                    aria-hidden
                                    src={remoteIconUrl}
                                    className={
                                        /\.svg(\?.*)?$/i.test(remoteIconUrl)
                                            ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                            : undefined
                                    }
                                />
                            ) : (
                                <QuestionmarkIcon
                                    aria-hidden
                                    className="w-11 h-11 dark:brightness-0 dark:contrast-50"
                                />
                            )}
                        </div>
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

export default TitleIngressWithIconView
