import type { Layout_Idebanken__3_Column } from '~/types/generated.d'
import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { HGrid } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

interface ThreeColumnLayoutProps {
    layout: {
        config: Layout_Idebanken__3_Column
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
}

const ThreeColumnLayout = (props: ThreeColumnLayoutProps) => {
    const regions = props.layout.regions
    const { common, meta, layout } = props
    const columnSpan = 4 // Equal width for all columns (12/3 = 4)
    const stackOrder = layout.config?.stackOrder || 'left-center-right'

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

    return (
        <BleedingBackgroundPageBlock bgColor={layout.config?.bgColor} className="py-6">
            <HGrid
                gap={{
                    xs: 'space-16',
                    lg: 'space-20',
                    xl: 'space-24',
                }}
                columns={{ xs: 1, md: 12 }}>
                <div
                    className={`
                        z-20 col-span-1 md:col-span-${columnSpan}
                        ${getOrderClass('left')}
                    `}>
                    <RegionView
                        className="h-full flex flex-col gap-4"
                        name="left"
                        components={regions['left']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={`
                        z-20 col-span-1 md:col-span-${columnSpan}
                        ${getOrderClass('center')}
                    `}>
                    <RegionView
                        className="h-full flex flex-col gap-4"
                        name="center"
                        components={regions['center']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div
                    className={`
                        z-20 col-span-1 md:col-span-${columnSpan}
                        ${getOrderClass('right')}
                    `}>
                    <RegionView
                        className="h-full flex flex-col gap-4"
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
