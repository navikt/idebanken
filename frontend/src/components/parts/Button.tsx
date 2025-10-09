import NextLink from 'next/link'
import { Button, ButtonProps } from '@navikt/ds-react'
import { MouseEventHandler } from 'react'
import { PartData } from '~/types/graphql-types'
import { LinkHeading } from './LinkHeading'
import { Part_Idebanken_Button, ResolvedLinkSelector } from '~/types/generated'
import { XP_Button } from '@xp-types/site/parts'

type ButtonConfig = {
    variant: ButtonProps['variant'] | 'link'
    size: ButtonProps['size']
} & Omit<ResolvedLinkSelector, '__typename'>

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
        return <LinkHeading show={true} title={btn.linkText} href={btn.url || '#'} />
    }
    const buttonProps = {
        variant: btn.variant,
        size: btn.size || 'medium',
        children: btn.linkText,
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

const ButtonPart = ({ part }: PartData<Part_Idebanken_Button>) => {
    const { config } = part
    const { link, size, variant } = config
    return (
        <ButtonView
            config={{
                ...link,
                size: size as XP_Button['size'],
                variant: variant as XP_Button['variant'],
                linkText: link.linkText,
            }}
        />
    )
}

export { ButtonView, ButtonPart }
