import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { Layout_Idebanken_Single_Column } from '~/types/generated.d'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'

interface SingleColumnLayoutProps {
    layout: {
        config: Layout_Idebanken_Single_Column
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

const SingleColumnLayout = (props: SingleColumnLayoutProps) => {
    const { common, meta, layout, path } = props
    const regions = layout.regions
    const config = layout.config ?? {}
    const { backgroundImage, alignment, bgColor, boxColor, paddingTop, paddingBottom } = config

    const backgroundStyle = backgroundImage
        ? {
              backgroundImage: 'url(/images/circles.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top right',
              backgroundSize: '50% auto',
          }
        : {}

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`}
            backgroundStyle={backgroundStyle}
            layoutPath={path}>
            <Box
                className={classNames(
                    alignment ? `text-${alignment}` : 'text-left',
                    boxColor ? `${boxColor} rounded-3xl p-6 md:py-8` : ''
                )}>
                <RegionView
                    name="content"
                    components={regions['content']?.components}
                    common={common}
                    meta={meta}
                />
            </Box>
        </BleedingBackgroundPageBlock>
    )
}

export default SingleColumnLayout
