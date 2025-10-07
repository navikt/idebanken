import { BodyLong, BodyShort, HStack, Link, List, VStack } from '@navikt/ds-react'
import { enonicSitePathToHref, truncateUrl } from '~/utils/utils'
import { ListItem } from '@navikt/ds-react/List'
import { MetaData } from '@enonic/nextjs-adapter'
import { Macro_Idebanken_Highlighted_Box_DataConfig } from '~/types/generated'
import Image from 'next/image'

type Macro<T> = {
    name: string
    children?: string
    config: T
    meta: MetaData
}

const brandColor: Record<string, Record<string, string>> = {
    blue: {
        title: 'bg-[#D3DDFF]',
        body: 'bg-[#F9FAFF]',
    },
    pink: {
        title: 'bg-[#FEE2F0]',
        body: 'bg-white',
    },
}

// TODO replace with upcoming Aksel part and create brands
export function HighlightedBox(args: Macro<Macro_Idebanken_Highlighted_Box_DataConfig>) {
    const { config, children } = args
    const brand = brandColor[config.brand ?? 'blue']
    const title = config.title ?? ''

    return (
        <VStack className={'border border-[#E0E0E0] rounded-lg'}>
            <HStack className={`${brand.title} rounded-t-lg px-5 py-3 items-center`} gap={'2'}>
                {config.icon?.url && (
                    <Image
                        src={config.icon.url}
                        alt={
                            config.icon.altText ?? config.icon.caption ?? 'Ikon for fremhevet boks'
                        }
                        width={24}
                        height={24}
                    />
                )}
                <BodyShort id={title} size={'large'}>
                    {title}
                </BodyShort>
            </HStack>
            <VStack className={`${brand.body} rounded-b-lg p-5`}>
                <BodyLong aria-labelledby={title} className={'mb-3'}>
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
