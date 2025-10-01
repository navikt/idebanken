import { BodyLong, BodyShort, HStack, Link, List, VStack } from '@navikt/ds-react'
import { enonicSitePathToHref } from '~/utils/utils'
import { ListItem } from '@navikt/ds-react/List'
import { MetaData } from '@enonic/nextjs-adapter'
import { Macro_Idebanken_Box_DataConfig } from '~/types/generated'
import { iconMap } from '~/utils/iconMap'

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
export function HighlightedBox(args: Macro<Macro_Idebanken_Box_DataConfig>) {
    const { config, children } = args
    const brand = brandColor[config.brand ?? 'blue']
    const Icon = iconMap[config.iconName as keyof typeof iconMap]

    return (
        <VStack className={'border border-[#E0E0E0] rounded-lg'}>
            <HStack className={`${brand.title} rounded-t-lg px-5 py-3 items-center`} gap={'2'}>
                {Icon && <Icon width={'1.5em'} height={'1.5em'} />}
                <BodyShort size={'large'}>{config.title}</BodyShort>
            </HStack>
            <VStack className={`${brand.body} rounded-b-lg p-5`}>
                <BodyLong className={'mb-3'}>{children}</BodyLong>
                {config.links && config.links.length > 0 && (
                    <List>
                        {config.links
                            ?.filter((it) => it != null)
                            ?.map(({ _path, displayName, dataAsJson }) => (
                                <ListItem key={_path}>
                                    <Link href={enonicSitePathToHref(_path)}>
                                        {dataAsJson.shortTitle || dataAsJson.title || displayName}
                                    </Link>
                                </ListItem>
                            ))}
                    </List>
                )}
            </VStack>
        </VStack>
    )
}
