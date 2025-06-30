import type { PageComponent, MetaData } from '@enonic/nextjs-adapter'
import type { Layout_Idebanken_Single_Column } from '~/types/generated.d'
import type { CommonType } from '../queries/common'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
import { Box } from '@navikt/ds-react'

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
