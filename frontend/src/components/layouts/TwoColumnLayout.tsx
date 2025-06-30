import type { LayoutProps } from '@enonic/nextjs-adapter'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box, HGrid } from '@navikt/ds-react'

const TwoColumnLayout = (props: LayoutProps) => {
	const regions = props.layout.regions
	const { common, meta, layout } = props
	const breakLeftFirst = layout.config?.breakLeftFirst

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
			className={layout.config?.bgColor || 'bg-extra-light-pink'}>
			<HGrid
				gap={{ sm: 'space-8', md: 'space-12', lg: 'space-20', xl: 'space-24' }}
				columns={{ xs: 1, md: 12 }}>
				<div
					className={`
						col-span-1 md:col-span-${layout.config?.leftSpan || 6}
						${breakLeftFirst ? 'max-md:order-1' : 'max-md:order-2'}
					`}>
					<RegionView
						name="left"
						components={regions['left']?.components}
						common={common}
						meta={meta}
					/>
				</div>
				<div
					className={`
						col-span-1 md:col-span-${12 - (layout.config?.leftSpan || 6)}
						${breakLeftFirst ? 'max-md:order-2' : 'max-md:order-1'}
					`}>
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

export default TwoColumnLayout
