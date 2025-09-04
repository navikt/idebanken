import { VStack, Button, BodyShort } from '@navikt/ds-react'
import { FileIcon } from '@navikt/aksel-icons'
import React from 'react'

type DownloadItem = {
    displayName: string
    _path: string // XP content path to the file
}

interface DownloadsProps {
    items: DownloadItem[]
    /**
     * Optional base URL (e.g. https://www.nav.no) if _path is site‑relative.
     * If omitted we use the path as-is (browser will resolve relatively).
     */
    baseUrl?: string
    /**
     * If true adds ?download=true (or adjust) to force attachment disposition.
     * Default: false
     */
    forceDownload?: boolean
    className?: string
}

/**
 * Convert XP content path to a downloadable URL.
 * Adjust query param if your proxy expects something else (e.g. ?attachment=true).
 */
function buildDownloadUrl(item: DownloadItem, baseUrl?: string, forceDownload?: boolean): string {
    const raw = baseUrl ? `${baseUrl.replace(/\/$/, '')}${item._path}` : item._path
    return forceDownload ? `${raw}${raw.includes('?') ? '&' : '?'}download=true` : raw
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
export const Downloads: React.FC<DownloadsProps> = ({
    items,
    baseUrl,
    forceDownload = false,
    className,
}) => {
    if (!items?.length) return null

    return (
        <VStack
            as="ul"
            gap="space-12"
            className={className}
            style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item) => {
                const url = buildDownloadUrl(item, baseUrl, forceDownload)
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
                            target="_blank"
                            onClick={(e) => {
                                // Keep default; could add analytics here.
                                // e.preventDefault() if you want to handle manually.
                            }}>
                            Last ned
                        </Button>
                    </li>
                )
            })}
        </VStack>
    )
}

// Example usage:
// <Downloads items={[{displayName:'fil', _path:'/idebanken/ressurser/documents/a.pdf'}]} baseUrl="https://www.example.com" forceDownload />
