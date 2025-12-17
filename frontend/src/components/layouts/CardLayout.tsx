import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import CardHeader from '../parts/CardHeader'
import { XP_Card } from '@xp-types/site/layouts'
import { alignmentClassNames } from '~/utils/classNames'
import { CommonType } from '~/types/graphql-types'

interface CardLayoutProps {
    layout: {
        config: XP_Card
        descriptor: string
        regions: {
            content: { components: PageComponent[] }
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
        centerHalfWidth,
        overrideWidth,
        xAlignment,
        yAlignment,
        highlightedLayout,
        noGutters,
    } = layout.config ?? {}

    const shadow = highlightedLayout?._selected === 'shadow'
    const headingColor = shadow ? highlightedLayout?.shadow?.headingColor : undefined

    const asTag: 'article' | 'section' = heading ? 'article' : 'section'

    const containerClasses = classNames(
        shadow && 'shadow-ib-shadow rounded-ib p-6 md:py-8 bg-white',
        centerHalfWidth && 'w-full md:w-1/2 md:mx-auto',
        alignmentClassNames(xAlignment, yAlignment)
    )

    const backgroundClasses = `${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']}`

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={backgroundClasses}
            layoutPath={path}
            width={overrideWidth}
            noGutters={noGutters}>
            <Box className={containerClasses} as={asTag} data-color={'neutral'}>
                <CardHeader
                    prefix={prefix}
                    heading={heading}
                    headingColor={headingColor}
                    shadow={shadow}
                />
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
