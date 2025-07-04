import type { Part_Idebanken_Info_Box } from '~/types/generated.d'
import { PartData } from '~/types/graphql-types'
import { InfoBox } from '../common/InfoBox'
import { HStack } from '@navikt/ds-react'
import { validatedInfoBoxConfig } from '~/utils/runtimeValidation'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'

export const InfoBoxView = ({ part, meta }: PartData<Part_Idebanken_Info_Box>) => {
	const config = validatedInfoBoxConfig(part.config)

	if (!config) return null

	const { infoBoxItems } = config

	return (
		<HStack
			gap={{ xs: 'space-8', sm: 'space-12', md: 'space-16', lg: 'space-20', xl: 'space-24' }}>
			{infoBoxItems.map((item, idx) => (
				<InfoBox key={idx} bgColorClass={item.bgColor}>
					<RichTextView
						// @ts-expect-error data.processedHtml is not required
						data={item?.simpleTextEditor ?? {}}
						meta={meta}
						customReplacer={htmlRichTextReplacer}
					/>
				</InfoBox>
			))}
		</HStack>
	)
}
