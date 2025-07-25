import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { Layout_Idebanken_Single_Column } from '~/types/generated.d'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'

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

    return (
        <BleedingBackgroundPageBlock bgColor={layout.config?.bgColor}>
            <RegionView
                name="content"
                components={regions['content']?.components}
                common={common}
                meta={meta}
            />
        </BleedingBackgroundPageBlock>
    )
}

export default SingleColumnLayout
