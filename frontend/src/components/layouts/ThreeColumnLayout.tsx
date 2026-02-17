import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { HGrid } from '@navikt/ds-react'
import BleedingBackgroundPageBlock, {
    legacyBgToBrandColorMap,
} from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { XP_3Column } from '@xp-types/site/layouts'
import { alignmentClassNames } from '~/utils/classNames'
import { CommonType } from '~/types/graphql-types'

interface ThreeColumnLayoutProps {
    layout: {
        config: XP_3Column
        descriptor: string
        regions: {
            left: {
                components: PageComponent[]
            }
            center: {
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

const ThreeColumnLayout = ({ common, meta, layout, path }: ThreeColumnLayoutProps) => {
    const regions = layout.regions
    const columnSpan = 4 // Equal width for all columns (12/3 = 4)
    const {
        stackOrder,
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
    const hasContentInOnlyOneRegion =
        [regions['left'], regions['center'], regions['right']].filter(
            (region) => region?.components?.length
        ).length === 1
    const isCrashCourse = meta?.type?.startsWith('idebanken:crash-course')

    const getOrderClass = (column: 'left' | 'center' | 'right') => {
        if (stackOrder === 'center-left-right') {
            return column === 'left'
                ? 'max-md:order-2'
                : column === 'center'
                  ? 'max-md:order-1'
                  : 'max-md:order-3'
        }
        if (stackOrder === 'right-center-left') {
            return column === 'left'
                ? 'max-md:order-3'
                : column === 'center'
                  ? 'max-md:order-2'
                  : 'max-md:order-1'
        }
        // Default: left-center-right
        return column === 'left'
            ? 'max-md:order-1'
            : column === 'center'
              ? 'max-md:order-2'
              : 'max-md:order-3'
    }

    const dataColor = legacyBgToBrandColorMap(boxColor)

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`}
            layoutPath={path}
            width={overrideWidth}
            noGutters={noGutters}
            meta={meta}>
            <HGrid
                data-color={dataColor}
                className={classNames(
                    boxColor ? 'bg-(--ax-bg-softA) rounded-3xl p-6 md:py-8' : '',
                    dataColor === 'ib-brand-gray' ? 'border border-(--ax-border-subtleA)' : '',
                    separator
                        ? 'md:divide-x md:divide-(--ax-border-default)/30 md:*:px-(--ax-space-32)'
                        : ''
                )}
                gap={
                    hasContentInOnlyOneRegion
                        ? {}
                        : {
                              xs: 'space-16',
                              lg: 'space-20',
                              xl: 'space-24',
                          }
                }
                columns={isCrashCourse ? 12 : { xs: 1, md: 12 }}>
                <div
                    className={classNames(
                        isCrashCourse ? '' : `col-span-1 md:col-span-${columnSpan}`,
                        isCrashCourse ? '' : getOrderClass('left'),
                        alignmentClassNames(xAlignment, yAlignment),
                        'h-full'
                    )}
                    style={
                        isCrashCourse
                            ? {
                                  gridColumn: `span ${columnSpan} / span ${columnSpan}`,
                              }
                            : undefined
                    }>
                    <RegionView
                        className="flex flex-col space-y-(--ax-space-24) w-full h-full"
                        name="left"
                        components={regions['left']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={classNames(
                        isCrashCourse ? '' : `col-span-1 md:col-span-${columnSpan}`,
                        isCrashCourse ? '' : getOrderClass('center'),
                        alignmentClassNames(xAlignment, yAlignment),
                        'h-full'
                    )}
                    style={
                        isCrashCourse
                            ? {
                                  gridColumn: `span ${columnSpan} / span ${columnSpan}`,
                              }
                            : undefined
                    }>
                    <RegionView
                        className="flex flex-col space-y-(--ax-space-24) w-full h-full"
                        name="center"
                        components={regions['center']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={classNames(
                        isCrashCourse ? '' : `col-span-1 md:col-span-${columnSpan}`,
                        isCrashCourse ? '' : getOrderClass('right'),
                        alignmentClassNames(xAlignment, yAlignment),
                        'h-full'
                    )}
                    style={
                        isCrashCourse
                            ? {
                                  gridColumn: `span ${columnSpan} / span ${columnSpan}`,
                              }
                            : undefined
                    }>
                    <RegionView
                        className="flex flex-col space-y-(--ax-space-24) w-full h-full"
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

export default ThreeColumnLayout
