import { BodyShort, HStack, VStack } from '@navikt/ds-react'
import { FileIcon, FilePdfIcon, FileWordIcon } from '@navikt/aksel-icons'
import type { PartProps } from '@enonic/nextjs-adapter'
import { ButtonView } from './Button'
import { HeadingView } from './Heading'

type DownloadItem = {
    displayName: string
    _path: string
    mediaUrl: string
    attachments: { size: number }[]
}

type DownloadsConfig = {
    title?: string
    ingress?: string
    selectedFiles?: DownloadItem[]
}

/**
 * Derive a simple file extension for icon / aria labels.
 */
function getExt(name: string): string | undefined {
    const m = name.match(/\.([a-z0-9]+)$/i)
    return m?.[1]?.toLowerCase()
}

/**
 * Choose an icon based on the file extension.
 */
function pickIcon(ext?: string) {
    switch (ext) {
        case 'pdf':
            return <FilePdfIcon aria-hidden className="text-brand-black" fontSize="2.5rem" />
        case 'doc':
        case 'docx':
            return <FileWordIcon aria-hidden className="text-brand-black" fontSize="2.5rem" />
        default:
            return <FileIcon aria-hidden className="text-brand-black" fontSize="2.5rem" />
    }
}

function toKb(bytes: number, decimals = 0): number {
    const div = 1024
    return parseFloat((bytes / div).toFixed(decimals))
}

export const Downloads = ({ part, meta }: PartProps) => {
    const config: DownloadsConfig = part.config
    const files = config?.selectedFiles as DownloadItem[] | undefined
    if (!files?.length) return null

    return (
        <>
            <VStack gap="space-28" className="list-none m-0 md:px-6 rounded-[20px]">
                {(config.title || config.ingress) && (
                    <VStack gap="space-16">
                        {config.title && (
                            <HeadingView level="3" size="medium">
                                {config?.title}
                            </HeadingView>
                        )}
                        {config.ingress && (
                            <BodyShort size="small" textColor="subtle">
                                {config?.ingress}
                            </BodyShort>
                        )}
                    </VStack>
                )}

                <VStack as="ul" gap="space-28">
                    {files.map((item) => {
                        const ext =
                            getExt(item.mediaUrl) || getExt(item._path) || getExt(item.displayName)
                        const icon = pickIcon(ext)
                        const fileName = `${item.displayName}${ext ? `.${ext}` : ''}`
                        return (
                            <HStack
                                as="li"
                                key={item._path}
                                justify="space-between"
                                align="center"
                                gap="space-6"
                                paddingInline="space-12"
                                paddingBlock="space-16"
                                className="md:flex-nowrap rounded-xl bg-dark-blue-100 border-1 border-dark-blue-400">
                                <HStack align="center" gap="space-16">
                                    <HStack
                                        aria-hidden="true"
                                        justify="center"
                                        align="center"
                                        className="flex h-12 w-12 rounded-full bg-pink-200 text-brand-black shadow-sm">
                                        {icon}
                                    </HStack>
                                    <div className="flex-1 min-w-0">
                                        <BodyShort
                                            title={fileName}
                                            className="font-light break-words">
                                            {fileName}
                                        </BodyShort>
                                        <BodyShort className="font-light">
                                            {toKb(item.attachments[0]?.size)}kb
                                        </BodyShort>
                                    </div>
                                </HStack>
                                <ButtonView
                                    className="md:justify-self-center"
                                    config={{
                                        url: item.mediaUrl,
                                        external: true,
                                        variant: 'primary',
                                        size: 'medium',
                                        linkText: 'Last ned',
                                    }}
                                    download
                                    meta={meta}
                                />
                            </HStack>
                        )
                    })}
                </VStack>
            </VStack>
        </>
    )
}
