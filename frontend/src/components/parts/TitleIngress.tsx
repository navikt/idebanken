import { Heading } from '@navikt/ds-react'
import { Part_Idebanken_Heading } from '~/types/generated.d'
import { htmlRichTextReplacer } from '~/utils/richText/html-rich-text-replacer'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView'
import { PartData } from '~/types/graphql-types'

type PageData = {
	ingress: string
	title: string
}

const TitleIngressView = ({ common, meta }: PartData<Part_Idebanken_Heading, PageData>) => {
	return (
		<>
			<Heading level={'1'} size={'xlarge'}>
				{common?.get?.dataAsJson?.title || '[Mangler tittel på innholdet]'}
			</Heading>
			<RichTextView
				// @ts-expect-error data.processedHtml is not required
				data={common?.get?.dataAsJson?.ingress ?? {}}
				meta={meta}
				customReplacer={htmlRichTextReplacer}
			/>
		</>
	)
}

export default TitleIngressView
