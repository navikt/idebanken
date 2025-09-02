'use client'
import { Search } from '@navikt/ds-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchButton } from '@navikt/ds-react/Search'

export const SOK_SEARCH_PARAM = 'ord'

export function SearchWrapper({
    onSubmit,
    ...rest
}: Readonly<React.HTMLAttributes<HTMLFormElement>>) {
    const searchParams = useSearchParams()
    const router = useRouter()
    return (
        <form
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
