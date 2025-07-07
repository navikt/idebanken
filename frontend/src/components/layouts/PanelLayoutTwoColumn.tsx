import type { Layout_Idebanken_Panel_2_Column } from '~/types/generated.d'
import type { PageComponent, MetaData } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box, HGrid } from '@navikt/ds-react'

interface PanelLayoutTwoColumnProps {
    layout: {
        config: Layout_Idebanken_Panel_2_Column
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

const PanelLayoutTwoColumn = (props: PanelLayoutTwoColumnProps) => {
    const regions = props.layout.regions
    const { common, meta, layout } = props
    const leftSpan = Number(layout.config?.leftSpan) || 6
    const rightSpan = 12 - leftSpan

    const [bgOuterBox, bgInnerBox] = layout.config?.background || []

    return (
        <Box
            as="section"
            padding={{
                xs: 'space-8',
                sm: 'space-12',
                md: 'space-16',
                lg: 'space-20',
                xl: 'space-24',
            }}
            className={bgOuterBox?.bgColor || 'bg-extra-light-pink'}>
            <HGrid
                gap={{ sm: 'space-8', md: 'space-12', lg: 'space-20', xl: 'space-24' }}
                columns={{ xs: 1, md: 12 }}
                padding={{
                    xs: 'space-8',
                    sm: 'space-12',
                    md: 'space-16',
                    lg: 'space-20',
                    xl: 'space-24',
                }}
                className={`${bgInnerBox?.bgColor || 'bg-extra-light-pink'} rounded-3xl`}>
                <div className={`col-span-1 md:col-span-${leftSpan}`}>
                    <RegionView
                        name="left"
                        components={regions['left']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
                <div className={`col-span-1 md:col-span-${rightSpan}`}>
                    <RegionView
                        name="right"
                        components={regions['right']?.components}
                        common={common}
                        meta={meta}
                    />
                </div>
            </HGrid>
        </Box>
    )
}

export default PanelLayoutTwoColumn
