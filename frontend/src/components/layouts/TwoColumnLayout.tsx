import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { HGrid } from '@navikt/ds-react'
import BleedingBackgroundPageBlock, {
    legacyBgToBrandColorMap,
} from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { XP_2Column } from '@xp-types/site/layouts'
import { alignmentClassNames } from '~/utils/classNames'
import { CommonType } from '~/types/graphql-types'

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

const TwoColumnLayout = ({ common, meta, layout, path }: TwoColumnLayoutProps) => {
    const regions = layout.regions
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
        noGutters,
        separator,
    } = layout.config ?? {}
    const leftSpanValue = Number(leftSpan ?? 6)
    const rightSpan = 12 - leftSpanValue
    const hasContentInBothRegions =
        regions['left']?.components?.length && regions['left']?.components?.length
    const isCrashCourse = meta?.type?.startsWith('idebanken:crash-course')

    const dataColor = legacyBgToBrandColorMap(boxColor)

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']} pb-0.5`}
            layoutPath={path}
            width={overrideWidth}
            noGutters={noGutters}
            meta={meta}>
            <HGrid
                data-color={dataColor}
                className={classNames(
                    boxColor
                        ? 'bg-(--ax-bg-softA) rounded-ib p-(--ax-space-24) md:p-(--ax-space-80)'
                        : '',
                    dataColor === 'ib-brand-gray' ? 'border border-(--ax-border-subtleA)' : '',
                    separator
                        ? 'md:divide-x md:divide-(--ax-border-default)/30 md:*:px-(--ax-space-32)'
                        : ''
                )}
                gap={
                    hasContentInBothRegions
                        ? {
                              xs: 'space-16',
                              lg: 'space-20',
                              xl: 'space-24',
                          }
                        : {}
                }
                columns={isCrashCourse ? 12 : { xs: 1, md: 12 }}>
                <div
                    className={classNames(
                        isCrashCourse ? '' : `col-span-1 md:col-span-${leftSpan}`,
                        isCrashCourse ? '' : breakLeftFirst ? 'max-md:order-1' : 'max-md:order-2',
                        alignmentClassNames(xAlignment, yAlignment)
                    )}
                    style={
                        isCrashCourse
                            ? {
                                  gridColumn: `span ${leftSpanValue} / span ${leftSpanValue}`,
                              }
                            : undefined
                    }>
                    <RegionView
                        className="flex flex-col gap-(--ax-space-24) space-y-(--ax-space-24) w-full"
                        name="left"
                        components={regions['left']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={classNames(
                        isCrashCourse ? '' : `col-span-1 md:col-span-${rightSpan}`,
                        isCrashCourse ? '' : breakLeftFirst ? 'max-md:order-2' : 'max-md:order-1',
                        alignmentClassNames(xAlignment, yAlignment)
                    )}
                    style={
                        isCrashCourse
                            ? {
                                  gridColumn: `span ${rightSpan} / span ${rightSpan}`,
                              }
                            : undefined
                    }>
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
