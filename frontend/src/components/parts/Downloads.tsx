import { VStack, Button, BodyShort } from '@navikt/ds-react'
import { FileIcon, FilePdfIcon, FileWordIcon, DownloadIcon } from '@navikt/aksel-icons'
import type { PartProps } from '@enonic/nextjs-adapter'

type DownloadItem = {
    displayName: string
    _path: string
    mediaUrl: string
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

export const Downloads = (props: PartProps) => {
    const config: DownloadsConfig = props.part.config
    const files = config?.selectedFiles as DownloadItem[] | undefined
    if (!files?.length) return null

    return (
        <>
            <VStack gap="space-28" className="list-none m-0 p-6 rounded-[20px]">
                {(config.title || config.ingress) && (
                    <VStack gap="space-16">
                        {config.title && <h2 className="text-2xl font-bold">{config?.title}</h2>}
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
                        return (
                            <li
                                key={item._path}
                                className="flex items-center justify-between gap-6 rounded-xl px-3 pt-3 pb-4 shadow-ib-shadow">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex h-16 w-16 items-center justify-center rounded-xl bg-pink-400 text-brand-black shadow-sm">
                                        {icon}
                                    </span>
                                    <div className="min-w-0">
                                        <BodyShort truncate title={item.displayName}>
                                            {item.displayName}
                                        </BodyShort>
                                    </div>
                                </div>
                                <Button
                                    as="a"
                                    href={item.mediaUrl}
                                    variant="primary-neutral"
                                    size="small"
                                    icon={<DownloadIcon aria-hidden />}
                                    aria-label={`Last ned ${item.displayName}`}
                                    download
                                    rel="noopener noreferrer"
                                    target="_blank"
                                />
                            </li>
                        )
                    })}
                </VStack>
            </VStack>
        </>
    )
}
