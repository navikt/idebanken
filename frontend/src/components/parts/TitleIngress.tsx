import { Heading } from '@navikt/ds-react'
import { CommonType } from '~/components/queries/common'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { parseHtml } from '~/utils/parseHtml'

type PageData = {
	ingress: string
	title: string
}

export interface TitleIngressData {
	part: { descriptor?: string; config: Part_Idebanken_Heading }
	common?: CommonType<PageData>
}

const TitleIngressView = ({ common }: TitleIngressData) => {
	return (
		<>
			<Heading level={'1'} size={'xlarge'}>
				{common?.get?.dataAsJson?.title || '[Mangler tittel på innholdet]'}
			</Heading>
			<>{parseHtml(common?.get?.dataAsJson?.ingress || '[Mangler ingress]')}</>
		</>
	)
}

export default TitleIngressView
