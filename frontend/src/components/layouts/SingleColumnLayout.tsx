import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { Layout_Idebanken_Single_Column } from '~/types/generated.d'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'

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
}

const SingleColumnLayout = (props: SingleColumnLayoutProps) => {
    const { common, meta, layout } = props
    const regions = layout.regions
    const backgroundStyle = layout.config?.backgroundImage
        ? {
              backgroundImage: 'url(/images/circles.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top right',
              backgroundSize: '50% auto',
          }
        : {}

    return (
        <BleedingBackgroundPageBlock
            bgColor={layout.config?.bgColor}
            className="py-6"
            backgroundStyle={backgroundStyle}>
            <Box
                className={classNames(
                    'relative z-20',
                    layout.config?.alignment ? `text-${layout.config.alignment}` : 'text-left'
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
