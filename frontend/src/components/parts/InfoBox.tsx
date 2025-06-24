import { PartData } from '@enonic/nextjs-adapter'
import { parseHtml } from '~/utils/parseHtml'
import { InfoBox } from '../common/InfoBox'

export interface InfoBoxData {
	part: PartData
}

export const InfoBoxView = (props: InfoBoxData) => {
	const { part } = props

	return (
		<InfoBox bgColorClass={part.config?.bgColor}>
			<>{parseHtml(part.config?.simpleTextEditor)}</>
		</InfoBox>
	)
}
