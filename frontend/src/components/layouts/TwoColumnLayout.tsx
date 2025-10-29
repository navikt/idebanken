import type { MetaData, PageComponent } from '@enonic/nextjs-adapter'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { HGrid } from '@navikt/ds-react'
import BleedingBackgroundPageBlock from '~/components/layouts/BleedingBackgroundPageBlock'
import classNames from 'classnames'
import { paddingsY } from '~/utils/tailwind-lookup-table'
import { XP_2Column } from '@xp-types/site/layouts'

interface TwoColumnLayoutProps {
    layout: {
        config: XP_2Column
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
    path: string
}

const TwoColumnLayout = (props: TwoColumnLayoutProps) => {
    const regions = props.layout.regions
    const { common, meta, layout, path } = props
    const {
        leftSpan,
        breakLeftFirst,
        bgColor,
        boxColor,
        paddingTop,
        paddingBottom,
        overrideWidth,
    } = layout.config ?? {}
    const rightSpan = 12 - Number(leftSpan ?? 6)

    return (
        <BleedingBackgroundPageBlock
            bgColor={bgColor}
            className={`${paddingsY[paddingTop ?? 'pt-6']} ${paddingsY[paddingBottom ?? 'pb-6']} pb-0.5`}
            layoutPath={path}
            overrideWidth={overrideWidth}>
            <HGrid
                className={classNames(
                    'items-stretch',
                    boxColor ? `${boxColor} rounded-3xl p-6 md:py-8` : ''
                )}
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
                        className="h-full grid auto-rows-fr gap-4"
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
                        className="h-full grid auto-rows-fr gap-4"
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
