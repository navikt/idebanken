'use client'

import { Search } from '@navikt/ds-react'
import { useSearchParams } from 'next/navigation'
import { SearchButton } from '@navikt/ds-react/Search'
import { useEffect, useRef } from 'react'

export const SOK_SEARCH_PARAM = 'ord'

interface SearchWrapperProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit: React.FormEventHandler<HTMLFormElement>
    isSearchOpen?: boolean
}

export function SearchWrapper({ onSubmit, isSearchOpen, ...rest }: Readonly<SearchWrapperProps>) {
    const searchParams = useSearchParams()
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (!isSearchOpen) return
        const input = formRef.current?.querySelector(
            `input[name="${SOK_SEARCH_PARAM}"]`
        ) as HTMLInputElement | null

        if (input) {
            // Use rAF to ensure element is visible before focusing
            requestAnimationFrame(() => {
                input.focus()
                input.select()
            })
        }
    }, [isSearchOpen])

    return (
        <form ref={formRef} role="search" name={'idebanken-search'} onSubmit={onSubmit} {...rest}>
            <Search
                defaultValue={searchParams.get(SOK_SEARCH_PARAM) ?? undefined}
                variant="secondary"
                role="search"
                label={'Søk etter innhold på idébanken'}
                id={SOK_SEARCH_PARAM}
                name={SOK_SEARCH_PARAM}
                className="self-center justify-self-center">
                <SearchButton aria-controls={rest['aria-controls']} className={'bg-white'} />
            </Search>
        </form>
    )
}
