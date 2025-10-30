import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { HGrid } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { XP_2Column } from '@xp-types/site/layouts'
import { alignmentClassNames } from '~/utils/classNames'

interface TwoColumnLayoutProps {
    layout: {
        config: XP_2Column
        descriptor: string
        regions: {
            left: {
                components: PageComponent[]
            }
            right: {
                components: PageComponent[]
            }
        }
    }
    common: CommonType
    meta: MetaData
    path: string
}

const TwoColumnLayout = (props: TwoColumnLayoutProps) => {
    const regions = props.layout.regions
    const { common, meta, layout, path } = props
    const {
        leftSpan,
        breakLeftFirst,
        bgColor,
        boxColor,
        paddingTop,
        paddingBottom,
        overrideWidth,
        xAlignment,
        yAlignment,
    } = layout.config ?? {}
    const rightSpan = 12 - Number(leftSpan ?? 6)
    const hasContentInBothRegions =
        regions['left']?.components?.length && regions['left']?.components?.length

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']} pb-0.5`}
            layoutPath={path}
            width={overrideWidth}>
            <HGrid
                className={boxColor ? `${boxColor} rounded-3xl p-6 md:py-8` : ''}
                gap={
                    hasContentInBothRegions
                        ? {
                              xs: 'space-16',
                              lg: 'space-20',
                              xl: 'space-24',
                          }
                        : {}
                }
                columns={{ xs: 1, md: 12 }}>
                <div
                    className={classNames(
                        `col-span-1 md:col-span-${leftSpan}`,
                        breakLeftFirst ? 'max-md:order-1' : 'max-md:order-2',
                        alignmentClassNames(xAlignment, yAlignment)
                    )}>
                    <RegionView
                        className="flex flex-col space-y-(--ax-space-24) w-full"
                        name="left"
                        components={regions['left']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={classNames(
                        `col-span-1 md:col-span-${rightSpan}`,
                        breakLeftFirst ? 'max-md:order-2' : 'max-md:order-1',
                        alignmentClassNames(xAlignment, yAlignment)
                    )}>
                    <RegionView
                        className="flex flex-col space-y-(--ax-space-24) w-full"
                        name="right"
                        components={regions['right']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
            </HGrid>
        </BleedingBackgroundPageBlock>
    )
}

export default TwoColumnLayout
