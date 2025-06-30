import { BodyShort, Heading } from '@navikt/ds-react'
import { CommonType } from '../queries/common'
import { Idebanken_Guide_Data, Part_Idebanken_Heading } from '~/types/generated.d'

export interface TitleIngressData {
	part: { descriptor?: string; config: Part_Idebanken_Heading }
	common?: CommonType<Idebanken_Guide_Data>
}

const TitleIngressView = ({ common }: TitleIngressData) => {
	return (
		<>
			<Heading level={'1'} size={'xlarge'}>
				{common?.get?.dataAsJson?.title || '[Mangler tittel på innholdet]'}
			</Heading>
			{/* @ts-expect-error children is required */}
			<BodyShort
				size="large"
				className="font-light"
				dangerouslySetInnerHTML={{
					__html: common?.get?.dataAsJson?.ingress || '[Mangler ingress på innholdet]',
				}}
				spacing
			/>
		</>
	)
}

export default TitleIngressView
