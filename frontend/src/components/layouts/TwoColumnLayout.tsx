import type { Layout_Idebanken__2_Column } from '~/types/generated.d'
import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { HGrid } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

interface TwoColumnLayoutProps {
    layout: {
        config: Layout_Idebanken__2_Column
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
}

const TwoColumnLayout = (props: TwoColumnLayoutProps) => {
    const regions = props.layout.regions
    const { common, meta, layout } = props
    const leftSpan = Number(layout.config?.leftSpan) || 6
    const rightSpan = 12 - leftSpan
    const breakLeftFirst = layout.config?.breakLeftFirst

    return (
        <BleedingBackgroundPageBlock bgColor={layout.config?.bgColor} className="py-6">
            <HGrid
                className="relative z-20 items-stretch"
                gap={{
                    xs: 'space-16',
                    lg: 'space-20',
                    xl: 'space-24',
                }}
                columns={{ xs: 1, md: 12 }}>
                <div
                    className={`
						col-span-1 md:col-span-${leftSpan}
						${breakLeftFirst ? 'max-md:order-1' : 'max-md:order-2'}
                        h-full
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
						col-span-1 md:col-span-${rightSpan}
						${breakLeftFirst ? 'max-md:order-2' : 'max-md:order-1'}
                        h-full
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

export default TwoColumnLayout
