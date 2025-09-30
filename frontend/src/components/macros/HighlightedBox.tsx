import { BodyLong, BodyShort, HStack, Link, List, VStack } from '@navikt/ds-react'
import { enonicSitePathToHref } from '~/utils/utils'
import { ListItem } from '@navikt/ds-react/List'
import { MetaData } from '@enonic/nextjs-adapter'
import { Macro_Idebanken_Box_DataConfig } from '~/types/generated'

type Macro<T> = {
    name: string
    children?: string
    config: T
    meta: MetaData
}

export function HighlightedBox(args: Macro<Macro_Idebanken_Box_DataConfig>) {
    const { config, children } = args
    console.log(args)
    return (
        <VStack className={''}>
            <HStack className={'bg-blue-400 rounded-t-lg px-5 py-3'}>
                <BodyShort>{config.title}</BodyShort>
            </HStack>
            <VStack className={'bg-blue-200 rounded-b-lg p-5'}>
                <BodyLong>{children}</BodyLong>
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
