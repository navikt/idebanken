import { BodyShort, Heading } from '@navikt/ds-react'
import { CommonType } from '../queries/common'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { parseHtml } from '~/utils/parseHtml'

type textEditorData = {
	ingress: string
	title: string
}

export interface TitleIngressData {
	part: { descriptor?: string; config: Part_Idebanken_Heading }
	common?: CommonType<textEditorData>
}

const TitleIngressView = ({ common }: TitleIngressData) => {
	return (
		<>
			<Heading level={'1'} size={'xlarge'}>
				{common?.get?.dataAsJson?.title || '[Mangler tittel på innholdet]'}
			</Heading>
			<BodyShort size="large" className="font-light">
				{parseHtml(common?.get?.dataAsJson?.ingress || '')}
			</BodyShort>
		</>
	)
}

export default TitleIngressView
