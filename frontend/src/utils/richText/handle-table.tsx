import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser'
import { MetaData, RichTextData } from '@enonic/nextjs-adapter'
import { ElementType } from 'domelementtype'
import { Accordion, HGrid, Table } from '@navikt/ds-react'
import {
    TableBody,
    TableDataCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '@navikt/ds-react/Table'
import React from 'react'
import { AccordionContent, AccordionHeader, AccordionItem } from '@navikt/ds-react/Accordion'
import classNames from 'classnames'

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

    const headerCells =
        headerRows.length > 0
            ? ((headerRows[0].children as DOMNode[]).filter(
                  (c) => c.type === ElementType.Tag
              ) as Element[])
            : []

    return (
        <>
            <Accordion className="md:hidden">
                {bodyRows.map((row, i) => {
                    const cells = (row.children as DOMNode[]).filter(
                        (c) => c.type === ElementType.Tag
                    ) as Element[]
                    const headerCell = cells[0]
                    const contentCells = cells.slice(1)

                    return (
                        <AccordionItem key={i}>
                            <AccordionHeader>
                                {headerCell
                                    ? domToReact(headerCell.children as DOMNode[], options)
                                    : null}
                                {cells.length > 1
                                    ? ` - ${domToReact(cells[1].children as DOMNode[], options)}`
                                    : null}
                            </AccordionHeader>
                            <AccordionContent>
                                <dl>
                                    {contentCells.map((cell, j) => {
                                        const headerIndex = j + 1
                                        const currentHeader = headerCells[headerIndex]
                                        return (
                                            <HGrid
                                                key={j}
                                                columns={{ xs: 1, sm: 4 }}
                                                gap={{ sm: 'space-32' }}
                                                className={classNames(
                                                    'py-2',
                                                    j !== contentCells.length - 1 &&
                                                        'border-b border-(--ib-border-dark-blue-subtleA)'
                                                )}>
                                                <dt className="font-normal col-span-1">
                                                    {currentHeader &&
                                                        domToReact(
                                                            currentHeader.children as DOMNode[],
                                                            options
                                                        )}
                                                </dt>
                                                <dd className={'col-span-3'}>
                                                    {domToReact(
                                                        cell.children as DOMNode[],
                                                        options
                                                    )}
                                                </dd>
                                            </HGrid>
                                        )
                                    })}
                                </dl>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
            <Table className={'hidden md:table'}>
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
        </>
    )
}
