import { BodyShort, VStack } from '@navikt/ds-react'
import { FileIcon, FilePdfIcon, FileWordIcon } from '@navikt/aksel-icons'
import type { PartProps } from '@enonic/nextjs-adapter'
import { ButtonView } from './Button'
import TrackFirstLink from '~/components/common/analytics/TrackFirstLink'
import { AnalyticsEvents } from '~/utils/analytics/umami'

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
                        const fileName = `${item.displayName}${ext ? `.${ext}` : ''}`
                        return (
                            <li
                                key={item._path}
                                className="flex flex-wrap items-center justify-between gap-6
                                rounded-xl px-3 pt-6 pb-6
                                bg-dark-blue-100 border-1 border-dark-blue-400">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-400 text-brand-black shadow-sm">
                                        {icon}
                                    </span>
                                    <div className="max-w-50 md:max-w-80">
                                        <BodyShort
                                            truncate
                                            title={fileName}
                                            className="font-medium">
                                            {fileName}
                                        </BodyShort>
                                        <BodyShort className="font-light">
                                            {toKb(item.attachments[0]?.size)}kb
                                        </BodyShort>
                                    </div>
                                </div>
                                <TrackFirstLink
                                    analyticsEventName={AnalyticsEvents.BUTTON_CLICKED}
                                    eventData={{
                                        knappType: 'download',
                                        knappVariant: 'primary',
                                        filnavn: fileName,
                                    }}>
                                    <ButtonView
                                        config={{
                                            url: item.mediaUrl,
                                            external: true,
                                            variant: 'primary',
                                            size: 'medium',
                                            linkText: 'Last ned',
                                        }}
                                        download
                                    />
                                </TrackFirstLink>
                            </li>
                        )
                    })}
                </VStack>
            </VStack>
        </>
    )
}
