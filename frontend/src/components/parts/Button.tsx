import NextLink from 'next/link'
import { Button } from '@navikt/ds-react'
import { validatedButtonConfig } from '~/utils/runtimeValidation'
import { MouseEventHandler } from 'react'
import { PartData } from '~/types/graphql-types'
import { LinkHeading } from './LinkHeading'
import { XP_Button } from '@xp-types/site/parts'
import type { ButtonConfig } from '~/types/valibot/parts'

const ButtonView = ({
    config,
    onClick,
    download,
}: {
    config?: ButtonConfig
    onClick?: MouseEventHandler<HTMLButtonElement>
    download?: boolean
}) => {
    const btn = config
    if (!btn) return null

    if (btn.variant === 'link') {
        return <LinkHeading show={true} title={btn.text} href={btn.url || '#'} />
    }
    const buttonProps = {
        variant: btn.variant,
        size: btn.size || 'medium',
        children: btn.text,
        ...(download ? { download: true } : {}),
        ...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        ...(btn.url ? { as: NextLink, href: btn.url || '#' } : { onClick }),
    }

    return (
        <Button
            data-color="ib-brand-dark-blue"
            className="rounded-[60px] font-light"
            {...buttonProps}
        />
    )
}

const ButtonPart = ({ part }: PartData<XP_Button>) => {
    const btn = validatedButtonConfig(part.config)
    if (!btn) return null

    return <ButtonView config={btn} />
}

export { ButtonView, ButtonPart }
