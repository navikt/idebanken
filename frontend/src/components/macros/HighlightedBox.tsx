import { BodyLong, BodyShort, HStack, Link, List, VStack } from '@navikt/ds-react'
import { enonicSitePathToHref, truncateUrl } from '~/utils/utils'
import { ListItem } from '@navikt/ds-react/List'
import { MetaData, RENDER_MODE } from '@enonic/nextjs-adapter'
import { Macro_Idebanken_Highlighted_Box_DataConfig } from '~/types/generated'
import Image from 'next/image'

type Macro<T> = {
    name: string
    children?: string
    config: T
    meta: MetaData
}

export function HighlightedBox({
    config,
    children,
    meta,
}: Macro<Macro_Idebanken_Highlighted_Box_DataConfig>) {
    const brand = config.brand
    const title = config.title ?? ''

    return (
        <VStack
            data-color={brand ?? 'neutral'}
            className="rounded-3xl shadow-ib-shadow mb-(--ax-space-28) [&:last-child]:mb-0">
            <HStack className="rounded-t-3xl px-5 py-3 items-center bg-(--ax-bg-moderate)" gap="2">
                {config.icon?.url && (
                    <Image
                        unoptimized={meta?.renderMode !== RENDER_MODE.NEXT}
                        src={config.icon.url}
                        alt={
                            config.icon.altText ?? config.icon.caption ?? 'Ikon for fremhevet boks'
                        }
                        width={36}
                        height={36}
                        className={
                            /\.svg(\?.*)?$/i.test(config.icon.url)
                                ? 'dark:invert dark:brightness-0 dark:contrast-50'
                                : undefined
                        }
                    />
                )}
                <BodyShort id={title} size="large">
                    {title}
                </BodyShort>
            </HStack>
            <VStack className="rounded-b-3xl p-5 bg-(--ax-bg-soft)">
                <BodyLong aria-labelledby={title} className="mb-3">
                    {children}
                </BodyLong>
                {config.links && config.links.length > 0 && (
                    <List aria-labelledby={title}>
                        {config.links
                            ?.filter((it) => it != null)
                            ?.map(({ _path, displayName, dataAsJson }) => (
                                <ListItem key={_path}>
                                    <Link href={enonicSitePathToHref(_path)}>
                                        {dataAsJson.shortTitle || dataAsJson.title || displayName}
                                    </Link>
                                </ListItem>
                            ))}
                        {config.linksAbsolute
                            ?.filter((it) => it != null)
                            ?.map((link) => (
                                <ListItem key={link}>
                                    <Link href={link} target="_blank" rel="noreferrer">
                                        {truncateUrl(link)}
                                    </Link>
                                </ListItem>
                            ))}
                    </List>
                )}
            </VStack>
        </VStack>
    )
}
