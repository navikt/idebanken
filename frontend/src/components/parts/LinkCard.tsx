import type { Link_Card, Part_Idebanken_Link_Card } from '~/types/generated.d'
import { Box } from '@navikt/ds-react'
import {
    LinkCard,
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardIcon,
    LinkCardImage,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard'
import React from 'react'
import NextImage from 'next/image'
import { getAsset, getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { XP_LinkCard, XP_LinkCardList } from '@xp-types/site/parts'

export const LinkCardPartView = ({
    part,
    meta,
}: PartData<
    Pick<Part_Idebanken_Link_Card, 'resolvedLinkCard'> & Omit<XP_LinkCard, 'internalOrExternalLink'>
>) => {
    const { config } = part
    const { resolvedLinkCard, displayType, brand, showDescription, hideArrow } = config

    return LinkCardView({
        ...resolvedLinkCard,
        brand,
        showDescription,
        displayType,
        hideArrow,
        meta,
    })
}

export type LinkCardViewParams = Omit<Link_Card, 'description' | '__typename'> &
    Partial<Omit<XP_LinkCardList, 'list'>> & {
        description?: string | React.ReactNode
        meta: MetaData
    }

export const LinkCardView = ({
    title,
    description,
    url,
    /* categories,*/
    image,
    icon,
    external,
    brand,
    showDescription,
    displayType,
    hideArrow,
    meta,
}: LinkCardViewParams) => {
    const showIcon = displayType === 'withIcon' || displayType === 'withImageAndIcon'
    const showImage = displayType === 'withImage' || displayType === 'withImageAndIcon'

    return (
        <LinkCard data-color={brand ?? 'neutral'} arrow={!hideArrow}>
            {showImage && (
                <LinkCardImage aspectRatio="16/8">
                    <NextImage
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={getAsset(image?.url ?? '/favicon/favicon.svg', meta)}
                        alt={''}
                        aria-hidden
                        fill
                    />
                </LinkCardImage>
            )}
            {showIcon && icon?.url && (
                <Box
                    asChild
                    padding="space-12"
                    className="rounded-full"
                    style={
                        icon?.iconColor
                            ? { backgroundColor: `var(--${icon?.iconColor})` }
                            : undefined
                    }>
                    <LinkCardIcon>
                        <NextImage
                            unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                            src={icon.url}
                            alt=""
                            aria-hidden
                            width={24}
                            height={24}
                            className={
                                /\.svg(\?.*)?$/i.test(icon.url)
                                    ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                    : undefined
                            }
                        />
                    </LinkCardIcon>
                </Box>
            )}
            <LinkCardTitle>
                <LinkCardAnchor
                    href={getUrl(url, meta) || '#'}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {title}
                </LinkCardAnchor>
            </LinkCardTitle>
            {description && showDescription && (
                <LinkCardDescription>{description}</LinkCardDescription>
            )}
            {/* {categories && categories.length > 0 && (
                <LinkCardFooter>
                    {categories.map((tag, index) => (
                        <Tag key={index} size="small" variant="neutral">
                            {tag.name}
                        </Tag>
                    ))}
                </LinkCardFooter>
            )} */}
        </LinkCard>
    )
}
