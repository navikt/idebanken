import { PartData } from '@enonic/nextjs-adapter'
import { parseHtml } from '~/utils/parseHtml'
import { InfoBox } from '../common/InfoBox'
import styles from './DoubleInfoBox.module.css'

export interface DoubleInfoBoxData {
	part: PartData
}

// Note: It's probably better to add a flex:row option to layouts, but this is currently the only part requiring it
export const DoubleInfoBoxView = (props: DoubleInfoBoxData) => {
	const { part } = props

	const [infoBox1, infoBox2] = part.config?.infobox || []

	console.log({ infoBox1, infoBox2 })

	return (
		<div className={styles.wrapper}>
			<InfoBox bgColorClass={infoBox1.bgColor}>
				<>{parseHtml(infoBox1?.simpleTextEditor)}</>
			</InfoBox>
			<InfoBox bgColorClass={infoBox2.bgColor}>
				<>{parseHtml(infoBox2?.simpleTextEditor)}</>
			</InfoBox>
		</div>
	)
}
