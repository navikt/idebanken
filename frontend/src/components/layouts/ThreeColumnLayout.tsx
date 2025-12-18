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

const ThreeColumnLayout = (props: ThreeColumnLayoutProps) => {
    const regions = props.layout.regions
    const { common, meta, layout, path } = props
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
    } = layout.config ?? {}
    const hasContentInOnlyOneRegion =
        [regions['left'], regions['center'], regions['right']].filter(
            (region) => region?.components?.length
        ).length === 1

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
            noGutters={noGutters}>
            <HGrid
                data-color={dataColor}
                className={classNames(
                    boxColor ? 'bg-(--ax-bg-softA) rounded-3xl p-6 md:py-8' : '',
                    dataColor === 'ib-brand-gray' ? 'border border-(--ax-border-subtleA)' : ''
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
                columns={{ xs: 1, md: 12 }}>
                <div
                    className={classNames(
                        `col-span-1 md:col-span-${columnSpan}`,
                        getOrderClass('left'),
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
                        `col-span-1 md:col-span-${columnSpan}`,
                        getOrderClass('center'),
                        alignmentClassNames(xAlignment, yAlignment)
                    )}>
                    <RegionView
                        className="flex flex-col space-y-(--ax-space-24) w-full"
                        name="center"
                        components={regions['center']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={classNames(
                        `col-span-1 md:col-span-${columnSpan}`,
                        getOrderClass('right'),
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

export default ThreeColumnLayout
