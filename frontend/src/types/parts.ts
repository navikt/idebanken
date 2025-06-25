import {
	object,
	string,
	picklist,
	InferOutput,
	nullable,
	transform,
	array,
	pipe,
	optional,
} from 'valibot'

// Heading
export const headingConfigSchema = object({
	level: picklist(['1', '2', '3', '4', '5', '6']),
	size: picklist(['xlarge', 'large', 'medium', 'small', 'xsmall']),
	text: nullable(string()),
})

export type HeadingConfig = InferOutput<typeof headingConfigSchema>

// Button link
export const buttonConfigSchema = pipe(
	object({
		variant: picklist(['primary', 'secondary', 'tertiary']),
		size: picklist(['medium', 'small', 'xsmall']),
		text: nullable(string()),
		blockOptionSet: optional(
			nullable(
				object({
					_selected: string(),
					externalLink: nullable(
						object({
							url: nullable(string()),
						})
					),
					internalLink: nullable(
						object({
							ideBankContentSelector: nullable(
								object({
									pageUrl: nullable(string()),
								})
							),
						})
					),
				})
			)
		),
	}),
	transform((config) => {
		let url: string | null = null
		let external: boolean | null = null
		const selected = config.blockOptionSet?._selected
		if (selected === 'externalLink') {
			external = true
			const extUrl = config.blockOptionSet?.externalLink?.url || ''
			if (extUrl) {
				url = /^https?:\/\//i.test(extUrl) ? extUrl : `https://${extUrl}`
			}
		}

		if (selected === 'internalLink') {
			external = false
			const pageUrl =
				config.blockOptionSet?.internalLink?.ideBankContentSelector?.pageUrl || ''
			if (pageUrl) {
				const match = pageUrl.match(/\/(?:master|draft)\/idebanken(\/.*)/)
				url = match ? match[1] : pageUrl
			}
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { blockOptionSet, ...rest } = config
		return { ...rest, url, external }
	})
)

export type ButtonConfig = InferOutput<typeof buttonConfigSchema>

// Accordion
export const accordionItemSchema = object({
	simpleTextEditor: string(),
	header: string(),
})

export const accordionConfigSchema = object({
	accordionItem: pipe(
		array(accordionItemSchema),
		transform((value) => (Array.isArray(value) ? value : value ? [value] : []))
	),
})

export type AccordionConfig = InferOutput<typeof accordionConfigSchema>

// Image
export type ImageData = {
	part: {
		descriptor: string
		config: {
			image: {
				imageUrl: string
				data: {
					altText: string | null
				}
			}
		}
	}
}
