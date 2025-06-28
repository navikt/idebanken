import type { LayoutProps } from '@enonic/nextjs-adapter'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'

const SingleColumnLayout = (props: LayoutProps) => {
	const regions = props.layout.regions
	const { common, meta, layout } = props

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
			<RegionView
				name="content"
				components={regions['content']?.components}
				common={common}
				meta={meta}
			/>
		</Box>
	)
}

export default SingleColumnLayout
