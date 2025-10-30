import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { useMemo } from 'react'
import CardHeader from '../parts/CardHeader'
import { XP_Card } from '@xp-types/site/layouts'
import { alignmentClassNames } from '~/utils/classNames'

interface CardLayoutProps {
    layout: {
        config: XP_Card
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
    const {
        bgColor,
        paddingTop,
        paddingBottom,
        prefix,
        heading,
        headingColor,
        shadow,
        centerHalfWidth,
        overrideWidth,
        xAlignment,
        yAlignment,
    } = layout.config ?? {}

    const containerClasses = useMemo(
        () =>
            classNames(
                shadow ? 'shadow-ib-shadow' : '',
                'rounded-3xl p-6 md:py-8 bg-white',
                centerHalfWidth ? 'w-full md:w-1/2 md:mx-auto' : '', // center + 50% on md+
                alignmentClassNames(xAlignment, yAlignment)
            ),
        [shadow, centerHalfWidth, xAlignment, yAlignment]
    )

    const backgroundClasses = useMemo(
        () => `${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`,
        [paddingTop, paddingBottom]
    )

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={backgroundClasses}
            layoutPath={path}
            width={overrideWidth}>
            <Box className={containerClasses} as="article">
                <CardHeader prefix={prefix} heading={heading} headingColor={headingColor} />
                <RegionView
                    name="content"
                    className="[&>*]:my-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 w-full"
                    components={regions.content?.components}
                    common={common}
                    meta={meta}
                />
            </Box>
        </BleedingBackgroundPageBlock>
    )
}

export default CardLayout
