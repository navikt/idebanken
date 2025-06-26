import type { LayoutProps } from '@enonic/nextjs-adapter'
import { RegionView } from '@enonic/nextjs-adapter/views/Region'
// import styles from './TwoColumnLayout.module.css'
import { Box, HGrid } from '@navikt/ds-react'

const TwoColumnLayout = (props: LayoutProps) => {
	console.log('TwoColumnLayout props:', props)
	const regions = props.layout.regions
	const { common, meta, layout } = props

	return (
		<Box className={layout.config?.bgColor || 'bg-extra-light-pink'}>
			<HGrid gap="6" columns={2}>
				<RegionView
					name="left"
					components={regions['left']?.components}
					common={common}
					meta={meta}
				/>
				<RegionView
					name="right"
					components={regions['right']?.components}
					common={common}
					meta={meta}
				/>
			</HGrid>
		</Box>
		// <div
		// 	className={layout.config?.bgColor || 'bg-extra-light-pink'}
		// 	style={
		// 		{ [`--left-span`]: Number(layout.config?.leftSpan || 6) + 1 } as React.CSSProperties
		// 	}>
		// 	<div className={styles.wrapper}>
		// 		<div className={styles.left}>
		// 			<RegionView
		// 				name="left"
		// 				components={regions['left']?.components}
		// 				common={common}
		// 				meta={meta}
		// 			/>
		// 		</div>
		// 		<div className={styles.right}>
		// 			<RegionView
		// 				name="right"
		// 				components={regions['right']?.components}
		// 				common={common}
		// 				meta={meta}
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default TwoColumnLayout
