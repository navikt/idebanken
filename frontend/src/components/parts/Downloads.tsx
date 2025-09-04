import { VStack, Button, BodyShort } from '@navikt/ds-react'
import { FileIcon } from '@navikt/aksel-icons'
import type { PartProps } from '@enonic/nextjs-adapter'

type DownloadItem = {
    displayName: string
    _path: string // XP content path to the file
    mediaUrl: string // Absolute URL to the media file
}

/**
 * Derive a simple file extension for icon / aria labels.
 */
function getExt(name: string): string | undefined {
    const m = name.match(/\.([a-z0-9]+)$/i)
    return m?.[1]?.toLowerCase()
}

/**
 * A File-download list visually similar to FileUpload list,
 * but each entry has a Download button (no upload logic).
 */
export const Downloads = (props: PartProps) => {
    console.log(props)
    const files = props.part.config.selectedFiles
    if (!files?.length) return null

    return (
        <VStack as="ul" gap="space-12" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {files.map((item: DownloadItem) => {
                const url = item.mediaUrl
                const ext = getExt(item._path) || getExt(item.displayName)
                return (
                    <li
                        key={item._path}
                        className="flex items-center justify-between gap-6 rounded border border-border-subtle px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <span
                                aria-hidden="true"
                                className="flex h-8 w-8 items-center justify-center rounded bg-surface-alt-3">
                                <FileIcon aria-hidden fontSize="1.5rem" />
                            </span>
                            <div className="min-w-0">
                                <BodyShort className="truncate" title={item.displayName}>
                                    {item.displayName}
                                    {ext ? (
                                        <span className="text-text-subtle">{'.' + ext}</span>
                                    ) : null}
                                </BodyShort>
                            </div>
                        </div>
                        <Button
                            size="small"
                            variant="secondary"
                            as="a"
                            href={url}
                            download
                            rel="noopener noreferrer"
                            target="_blank">
                            Last ned
                        </Button>
                    </li>
                )
            })}
        </VStack>
    )
}
