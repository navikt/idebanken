import type { Part_Idebanken_Multi_Info_Box } from '~/types/generated.d'
import { parseHtml } from '~/utils/parseHtml'
import { InfoBox } from '~/components/common/InfoBox'
import { HStack } from '@navikt/ds-react'
import { validatedInfoBoxConfig } from '~/utils/runtimeValidation'

export interface InfoBoxData {
	part: { descriptor: string; config: Part_Idebanken_Multi_Info_Box }
}

export const InfoBoxView = (props: InfoBoxData) => {
	const { part } = props
	const config = validatedInfoBoxConfig(part.config)

	if (!config) return null

	const { infoBoxItems } = config

	return (
		<HStack
			gap={{ xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24' }}>
			{infoBoxItems.map((item, idx) => (
				<InfoBox key={idx} bgColorClass={item.bgColor}>
					<>{parseHtml(item?.simpleTextEditor)}</>
				</InfoBox>
			))}
		</HStack>
	)
}
