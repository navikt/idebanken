'use client'
import { Search } from '@navikt/ds-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchButton } from '@navikt/ds-react/Search'
import { useEffect, useRef } from 'react'

export const SOK_SEARCH_PARAM = 'ord'

interface SearchWrapperProps extends React.HTMLAttributes<HTMLFormElement> {
    isSearchOpen?: boolean
}

export function SearchWrapper({ onSubmit, isSearchOpen, ...rest }: Readonly<SearchWrapperProps>) {
    const searchParams = useSearchParams()
    const router = useRouter()
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
        <form
            ref={formRef}
            role="search"
            name={'idebanken-search'}
            onSubmit={
                onSubmit
                    ? onSubmit
                    : (e) => {
                          e.preventDefault()
                          router.push(
                              `/sok?ord=${encodeURIComponent((e.target as HTMLFormElement)[SOK_SEARCH_PARAM].value)}`
                          )
                      }
            }
            {...rest}>
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
