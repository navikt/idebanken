import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { Layout_Idebanken_Card } from '~/types/generated.d'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { Heading } from '@navikt/ds-react'
import { HeadingView } from '../parts/Heading'

interface CardLayoutProps {
    layout: {
        config: Layout_Idebanken_Card
        descriptor: string
        regions: {
            content: {
                components: PageComponent[]
            }
        }
    }
    common: CommonType
    meta: MetaData
    path: string
}

const CardLayout = (props: CardLayoutProps) => {
    const { common, meta, layout, path } = props
    const regions = layout.regions
    const config = layout.config ?? {}
    console.log('config', config)
    const { alignment, bgColor, paddingTop, paddingBottom, prefix, heading, headingColor } = config

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`}
            layoutPath={path}>
            <Box
                className={classNames(
                    alignment ? `text-${alignment}` : 'text-left',
                    `rounded-3xl p-6 md:py-8 bg-white`
                )}>
                {(heading || prefix) && (
                    <div
                        className={classNames(
                            'rounded-t-3xl',
                            '-mt-6 md:-mt-8',
                            '-mx-6',
                            'px-6',
                            'py-4 md:py-5',
                            headingColor || ''
                        )}>
                        {heading && (
                            <HeadingView level="2" size="large" className="m-0">
                                <span className="inline-flex items-center gap-4">
                                    {prefix ? (
                                        <span className="translate-y-[-3px] flex items-center justify-center rounded-full w-12 h-12 shrink-0 bg-amber-400 leading-none">
                                            <span className="translate-y-[2px]">{prefix}</span>
                                        </span>
                                    ) : null}
                                    <span className="leading-tight">{heading}</span>
                                </span>
                            </HeadingView>
                        )}
                    </div>
                )}

                <RegionView
                    name="content"
                    className="[&>*]:my-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                    components={regions['content']?.components}
                    common={common}
                    meta={meta}
                />
            </Box>
        </BleedingBackgroundPageBlock>
    )
}

export default CardLayout
