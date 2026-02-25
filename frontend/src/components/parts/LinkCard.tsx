import type { Link_Card, Part_Idebanken_Link_Card, Tag as TagType } from '~/types/generated.d'
import { Box, Link } from '@navikt/ds-react'
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
import classNames from 'classnames'

export const LinkCardPartView = ({
    part,
    meta,
}: PartData<
    Pick<Part_Idebanken_Link_Card, 'resolvedLinkCard'> & Omit<XP_LinkCard, 'internalOrExternalLink'>
>) => {
    const { config } = part
    const { resolvedLinkCard, displayType, showDescription, hideArrow, hideTag, color } = config

    return LinkCardView({
        ...resolvedLinkCard,
        showDescription,
        displayType,
        hideArrow,
        hideTag,
        meta,
        color,
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
    hideTag,
    meta,
    linkProps,
    color,
    lang,
}: LinkCardViewParams) => {
    const showIcon =
        displayType === 'withIcon' ||
        displayType === 'withImageAndIcon' ||
        displayType === 'withIconBg'
    const showImage = displayType === 'withImage' || displayType === 'withImageAndIcon'

    const mxExtraWithImage = showImage ? `md:mx-(--ax-space-12)` : ''
    const mbExtraWithImage = showImage ? 'md:mb-(--ax-space-12)' : ''
    const mtExtraWithImage = showImage ? 'md:mt-(--ax-space-12)' : ''

    return (
        <>
            <div className={'hidden'} aria-hidden>
                {title}
                {url}
                {description}
            </div>
            <LinkCard
                data-color={'inherit'}
                lang={lang ?? undefined}
                arrow={!hideArrow}
                className={classNames(
                    'group rounded-ib',
                    showImage ? '[&>svg:last-child]:mt-(--ax-space-12)' : ' px-7 py-6',
                    color === 'white' || !color ? 'bg-(--ax-bg-default)!' : '',
                    'text-left'
                )}>
                {showImage && (
                    <LinkCardImage aspectRatio="16/9" className="rounded-t-[calc(1.5rem-1px)]">
                        <Image
                            unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                            src={getAsset(image?.url ?? '/images/link-card-fallback.svg', meta)}
                            alt={''}
                            aria-hidden
                            fill
                        />
                    </LinkCardImage>
                )}
                {showIcon && icon?.url && (
                    <LinkCardIcon>
                        <Box
                            className={
                                displayType === 'withIconBg'
                                    ? 'w-[56px] h-[56px] rounded-full bg-(--ib-bg-pink-moderate) flex justify-center align-middle'
                                    : ''
                            }>
                            <Image
                                unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                                src={icon.url}
                                alt=""
                                aria-hidden
                                role="presentation"
                                width={displayType === 'withIconBg' ? 30 : 36}
                                height={displayType === 'withIconBg' ? 30 : 36}
                                className={
                                    /\.svg(\?.*)?$/i.test(icon.url)
                                        ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                        : undefined
                                }
                            />
                        </Box>
                    </LinkCardIcon>
                )}
                <LinkCardTitle className={classNames(mxExtraWithImage, mtExtraWithImage)}>
                    <LinkCardAnchor asChild>
                        <Link
                            as={NextLink}
                            href={getUrl(url, meta) || '#'}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            {...linkProps}>
                            {title || '[Mangler tittel]'}
                        </Link>
                    </LinkCardAnchor>
                </LinkCardTitle>
                {description && showDescription && (
                    <LinkCardDescription
                        className={classNames(
                            mxExtraWithImage,
                            showImage ? 'mt-(--ax-space-16)' : ''
                        )}>
                        {description}
                    </LinkCardDescription>
                )}
                {!hideTag && typeTags && typeTags?.length > 0 && (
                    <LinkCardFooter
                        className={classNames(
                            `gap-(--ax-space-20)`,
                            showImage ? `mt-(--ax-space-32)` : ' mt-(--ax-space-8)',
                            mbExtraWithImage,
                            mxExtraWithImage
                        )}>
                        {typeTags.map(({ name, color }, index) => (
                            <TagView
                                key={index}
                                name={name}
                                color={color}
                                size="small"
                                className={'text-(--ax-text-neutral-subtle)'}
                            />
                        ))}
                    </LinkCardFooter>
                )}
            </LinkCard>
        </>
    )
}
