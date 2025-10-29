import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { XP_SingleColumn } from '@xp-types/site/layouts'

interface SingleColumnLayoutProps {
    layout: {
        config: XP_SingleColumn
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
    const { alignment, bgColor, boxColor, paddingTop, paddingBottom, overrideWidth } = config

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`}
            layoutPath={path}
            overrideWidth={overrideWidth}>
            <Box
                className={classNames(
                    alignment ? `text-${alignment}` : 'text-left',
                    boxColor ? `${boxColor} rounded-3xl p-6 md:py-8` : ''
                )}>
                <RegionView
                    name="content"
                    className="[&>*]:my-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                    components={regions['content']?.components}
                    common={common}
                    meta={meta}
                />
            </Box>
        </BleedingBackgroundPageBlock>
    )
}

export default SingleColumnLayout
