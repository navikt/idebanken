import { BodyLong, BodyShort, HStack, Link, List, VStack } from '@navikt/ds-react'
import { ListItem } from '@navikt/ds-react/List'
import { getUrl, RENDER_MODE } from '@enonic/nextjs-adapter'
import { Macro_Idebanken_Highlighted_Box_DataConfig } from '~/types/generated'
import Image from 'next/image'
import { Macro } from '~/types/graphql-types'
import NextLink from 'next/link'
import { headingIdOfString } from '~/utils/utils'

export function HighlightedBox({
    config,
    children,
    meta,
}: Macro<Macro_Idebanken_Highlighted_Box_DataConfig>) {
    const { brand, title: maybeTitle, icon, linksAbsolute, links } = config
    const title = maybeTitle ?? ''
    const titleId = title ? headingIdOfString(title) : undefined
    const allLinks = links.concat(linksAbsolute)

    return (
        <VStack
            data-color={brand ?? 'neutral'}
            className="rounded-3xl shadow-ib-shadow mb-(--ax-space-28) [&:last-child]:mb-0">
            <HStack className="rounded-t-3xl px-5 py-3 items-center bg-(--ax-bg-moderate)" gap="2">
                {icon?.url && (
                    <Image
                        unoptimized={meta.renderMode !== RENDER_MODE.NEXT}
                        src={icon.url}
                        alt=""
                        aria-hidden
                        width={36}
                        height={36}
                        className={
                            /\.svg(\?.*)?$/i.test(icon.url)
                                ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                : undefined
                        }
                    />
                )}
                {title && (
                    <BodyShort size="large" className="leading-[var(--ax-font-line-height-large)]">
                        {title}
                    </BodyShort>
                )}
            </HStack>
            <VStack className="rounded-b-3xl p-5 bg-(--ax-bg-soft)">
                {children?.length ? <BodyLong className="mb-3">{children}</BodyLong> : <></>}
                {allLinks && allLinks.length ? (
                    <List className={''}>
                        {allLinks
                            ?.filter((it) => it !== null)
                            ?.map(({ url, linkText, download }) => (
                                <ListItem key={linkText}>
                                    <Link
                                        as={NextLink}
                                        href={getUrl(url, meta)}
                                        download={download}>
                                        {linkText}
                                    </Link>
                                </ListItem>
                            ))}
                    </List>
                ) : (
                    <></>
                )}
            </VStack>
        </VStack>
    )
}
