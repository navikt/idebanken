import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { Layout_Idebanken_Card } from '~/types/generated.d'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { useMemo } from 'react'
import CardHeader from '../parts/CardHeader'

interface CardLayoutProps {
    layout: {
        config: Layout_Idebanken_Card
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

const CardLayout = (props: CardLayoutProps) => {
    const { common, meta, layout, path } = props
    const { regions } = layout
    const config = layout.config ?? {}
    const { alignment, bgColor, paddingTop, paddingBottom, prefix, heading, headingColor } = config

    const containerClasses = useMemo(
        () =>
            classNames(
                alignment ? `text-${alignment}` : 'text-left',
                'rounded-3xl p-6 md:py-8 bg-white shadow-ib-shadow'
            ),
        [alignment]
    )

    const backgroundClasses = useMemo(
        () => `${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`,
        [paddingTop, paddingBottom]
    )

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={backgroundClasses}
            layoutPath={path}>
            <Box className={containerClasses} as="article">
                <CardHeader prefix={prefix} heading={heading} headingColor={headingColor} />

                <RegionView
                    name="content"
                    className="[&>*]:my-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                    components={regions.content?.components}
                    common={common}
                    meta={meta}
                />
            </Box>
        </BleedingBackgroundPageBlock>
    )
}

export default CardLayout
