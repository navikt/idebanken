import NextLink from 'next/link'
import { Button, ButtonProps } from '@navikt/ds-react'
import { PartData } from '~/types/graphql-types'
import { LinkHeading } from './LinkHeading'
import { Part_Idebanken_Button, ResolvedLinkSelector } from '~/types/generated'
import { XP_Button } from '@xp-types/site/parts'
import { PropsWithChildren } from 'react'
import { getUrl, MetaData } from '@enonic/nextjs-adapter'
import classNames from 'classnames'

type ButtonConfigBase = Partial<Omit<ResolvedLinkSelector, '__typename'>> & {
    size: ButtonProps['size']
}

type ButtonConfigLink = ButtonConfigBase & {
    variant: 'link'
    size: ButtonProps['size']
    url: string
}

type ButtonConfigOther = ButtonConfigBase & {
    variant: Exclude<ButtonProps['variant'], 'link'>
    size: ButtonProps['size']
}

type ButtonConfig = ButtonConfigLink | ButtonConfigOther

const ButtonView = ({
    config,
    download,
    children,
    meta,
    ...rest
}: PropsWithChildren<
    ButtonProps & {
        config?: ButtonConfig
        download?: boolean
        meta: MetaData
    }
>) => {
    const btn = config
    if (!btn) return null

    if (btn.variant === 'link') {
        return (
            <LinkHeading show={true} href={getUrl(btn.url, meta) || '#'}>
                {btn.linkText || children}
            </LinkHeading>
        )
    }

    const buttonProps: ButtonProps = {
        variant: btn.variant,
        size: btn.size || 'medium',
        ...(download ? { download: true } : {}),
        ...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        ...(btn.url ? { as: NextLink, href: btn.url || '#' } : {}),
    }

    return (
        <Button
            {...rest}
            className={classNames(
                'rounded-full font-light inline-flex w-auto whitespace-nowrap justify-self-center self-center md:justify-self-start md:self-start',
                rest.className
            )}
            {...buttonProps}>
            {btn.linkText || children}
        </Button>
    )
}

const ButtonPart = ({ part, meta }: PartData<Part_Idebanken_Button>) => {
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
            className={'mr-(--ax-space-16)'}
            meta={meta}
        />
    )
}

export { ButtonView, ButtonPart }
