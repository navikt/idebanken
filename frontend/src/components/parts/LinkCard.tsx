import type { Link_Card, Part_Idebanken_Link_Card, Tag as TagType } from '~/types/generated.d'
import { Link } from '@navikt/ds-react'
import {
    LinkCard,
    LinkCardAnchor,
    LinkCardDescription,
    LinkCardFooter,
    LinkCardIcon,
    LinkCardImage,
    LinkCardTitle,
} from '@navikt/ds-react/LinkCard'
import React from 'react'
import Image from 'next/image'
import { getAsset, getUrl, MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { PartData } from '~/types/graphql-types'
import { XP_LinkCard, XP_LinkCardList } from '@xp-types/site/parts'
import NextLink from 'next/link'
import TagView from '~/components/common/TagView'

export const LinkCardPartView = ({
    part,
    meta,
}: PartData<
    Pick<Part_Idebanken_Link_Card, 'resolvedLinkCard'> & Omit<XP_LinkCard, 'internalOrExternalLink'>
>) => {
    const { config } = part
    const { resolvedLinkCard, displayType, showDescription, hideArrow } = config

    return LinkCardView({
        ...resolvedLinkCard,
        showDescription,
        displayType,
        hideArrow,
        meta,
    })
}

export type LinkCardViewParams = Omit<
    Link_Card,
    'description' | '__typename' | 'typeTags' | 'themeTags'
> &
    Partial<Omit<XP_LinkCardList, 'list'>> & {
        description?: string | React.ReactNode
        meta: MetaData
        typeTags?: Array<TagType>
        linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
            'data-umami-ignore'?: boolean
        }
    }

export const LinkCardView = ({
    title,
    description,
    url,
    typeTags,
    image,
    icon,
    external,
    showDescription,
    displayType,
    hideArrow,
    meta,
    linkProps,
}: LinkCardViewParams) => {
    const showIcon = displayType === 'withIcon' || displayType === 'withImageAndIcon'
    const showImage = displayType === 'withImage' || displayType === 'withImageAndIcon'

    return (
        <LinkCard data-color={brand ?? 'neutral'} arrow={!hideArrow} className="group rounded-4xl">
            {showImage && (
                <LinkCardImage aspectRatio="16/9" className="rounded-t-[calc(2rem-1px)]">
                    <Image
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={getAsset(image?.url ?? '/favicon/favicon.svg', meta)}
                        alt={''}
                        aria-hidden
                        fill
                    />
                </LinkCardImage>
            )}
            {showIcon && icon?.url && (
                <LinkCardIcon>
                    <Image
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={icon.url}
                        alt=""
                        aria-hidden
                        role="presentation"
                        width={56}
                        height={56}
                        className={
                            /\.svg(\?.*)?$/i.test(icon.url)
                                ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                : undefined
                        }
                    />
                </LinkCardIcon>
            )}
            <LinkCardTitle>
                <LinkCardAnchor asChild>
                    <Link
                        as={NextLink}
                        href={getUrl(url, meta) || '#'}
                        className={
                            'underline decoration-transparent transition-colors ease-[cubic-bezier(0, 0, 0, 1)] duration-300 group-hover:decoration-current'
                        }
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        {...linkProps}>
                        {title}
                    </Link>
                </LinkCardAnchor>
            </LinkCardTitle>
            {description && showDescription && (
                <LinkCardDescription>{description}</LinkCardDescription>
            )}
            {typeTags && typeTags?.length > 0 && (
                <LinkCardFooter className={'gap-(--ax-space-20)'}>
                    {typeTags.map(({ name, color }, index) => (
                        <TagView key={index} name={name} color={color} size="small" />
                    ))}
                </LinkCardFooter>
            )}
        </LinkCard>
    )
}
