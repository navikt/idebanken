import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { MetaData, RichTextData } from '@enonic/nextjs-adapter'
import { ElementType } from 'domelementtype'
import { Table } from '@navikt/ds-react'
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'
import React from 'react'

export function handleTable(
    el: Element,
    data: RichTextData,
    meta: MetaData,
    options: HTMLReactParserOptions
) {
    const children = el.children as DOMNode[]
    const tbody = children.find(
        (child) => child.type === ElementType.Tag && (child as Element).name === 'tbody'
    ) as Element | undefined
    const thead = children.find(
        (child) => child.type === ElementType.Tag && (child as Element).name === 'thead'
    ) as Element | undefined

    const getRows = (parent: Element) =>
        (parent.children as DOMNode[]).filter(
            (child) => child.type === ElementType.Tag && (child as Element).name === 'tr'
        ) as Element[]

    let headerRows: Element[] = []
    let bodyRows: Element[] = []

    if (thead) {
        headerRows = getRows(thead)
    }

    if (tbody) {
        const tbodyRows = getRows(tbody)
        if (!thead && tbodyRows.length > 0) {
            // If no explicit thead, assume first row is header (common in simple tables)
            headerRows = [tbodyRows[0]]
            bodyRows = tbodyRows.slice(1)
        } else {
            bodyRows = tbodyRows
        }
    } else if (!thead) {
        // Fallback for tables without tbody
        const directRows = getRows(el)
        if (directRows.length > 0) {
            headerRows = [directRows[0]]
            bodyRows = directRows.slice(1)
        }
    }

    if (headerRows.length === 0 && bodyRows.length === 0) return undefined

    return (
        <Table className={'overflow-auto max-w-screen'}>
            <TableHeader>
                {headerRows.map((row, i) => (
                    <TableRow key={i}>
                        {(row.children as DOMNode[])
                            .filter((c) => c.type === ElementType.Tag)
                            .map((cell, j) => {
                                const cellEl = cell as Element
                                return (
                                    <TableHeaderCell key={j} scope="col">
                                        {domToReact(cellEl.children as DOMNode[], options)}
                                    </TableHeaderCell>
                                )
                            })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {bodyRows.map((row, i) => (
                    <TableRow key={i}>
                        {(row.children as DOMNode[])
                            .filter((c) => c.type === ElementType.Tag)
                            .map((cell, j) => {
                                const cellEl = cell as Element
                                // Use HeaderCell for the first column of body rows for accessibility
                                if (j === 0) {
                                    return (
                                        <TableHeaderCell key={j} scope="row">
                                            {domToReact(cellEl.children as DOMNode[], options)}
                                        </TableHeaderCell>
                                    )
                                }
                                return (
                                    <TableDataCell key={j}>
                                        {domToReact(cellEl.children as DOMNode[], options)}
                                    </TableDataCell>
                                )
                            })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
