import NextLink from 'next/link'
import { Button } from '@navikt/ds-react'
import { Part_Idebanken_Button } from '~/types/generated.d'
import { validatedButtonConfig } from '~/utils/runtimeValidation'
import { MouseEventHandler } from 'react'

export interface ButtonData {
	part?: { config: Part_Idebanken_Button } // From Enonic
	config?: Part_Idebanken_Button // From Next.js
	onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ButtonView = ({ part, config, onClick }: ButtonData) => {
	const buttonConfig = part?.config ?? config
	if (!buttonConfig) return null

	const btn = validatedButtonConfig(buttonConfig)
	if (!btn) return null

	const buttonProps = {
		variant: btn.variant,
		size: btn.size,
		children: btn.text,
		...(btn.external ? { target: '_blank' } : {}),
		...(btn.url ? { as: NextLink, href: btn.url || '#' } : { onClick }),
	}

	return <Button {...buttonProps} />
}
