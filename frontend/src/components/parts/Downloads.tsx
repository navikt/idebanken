import { VStack, Button, BodyShort } from '@navikt/ds-react'
import { FileIcon, FilePdfIcon, FileWordIcon, DownloadIcon } from '@navikt/aksel-icons'
import type { PartProps } from '@enonic/nextjs-adapter'

type DownloadItem = {
    displayName: string
    _path: string
    mediaUrl: string
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
            return <FilePdfIcon aria-hidden fontSize="1.5rem" />
        case 'doc':
        case 'docx':
            return <FileWordIcon aria-hidden fontSize="1.5rem" />
        default:
            return <FileIcon aria-hidden fontSize="1.5rem" />
    }
}

export const Downloads = (props: PartProps) => {
    const files = props.part.config?.selectedFiles as DownloadItem[] | undefined
    if (!files?.length) return null

    return (
        <VStack
            as="ul"
            gap="space-12"
            className="
            list-none m-0 p-6 rounded-[20px] bg-brand-white 
            shadow-[0_26px_44px_-12px_rgba(11,2,49,0.24)]
            ">
            {files.map((item) => {
                const ext = getExt(item.mediaUrl) || getExt(item._path) || getExt(item.displayName)
                const icon = pickIcon(ext)
                return (
                    <li
                        key={item._path}
                        className="flex items-center justify-between gap-6 rounded-lg border px-4 py-3"
                        style={{
                            borderColor: 'var(--Border-Subtle, rgba(7, 26, 54, 0.21))',
                        }}>
                        <div className="flex min-w-0 items-center gap-3">
                            <span
                                aria-hidden="true"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-brand-black shadow-sm">
                                {icon}
                            </span>
                            <div className="min-w-0">
                                <BodyShort className="truncate" title={item.displayName}>
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
    )
}
