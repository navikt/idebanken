'use client'
import { Search } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

export const SOK_SEARCH_PARAM = 'ord'

export function SearchWrapper() {
    const router = useRouter()
    return (
        <form
            role="search"
            name={'idebanken-search'}
            onSubmit={(e) => {
                e.preventDefault()
                router.push(
                    `/sok?ord=${encodeURIComponent((e.target as HTMLFormElement)[SOK_SEARCH_PARAM].value)}`
                )
            }}>
            <Search
                label={'Søk etter innhold på idebanken'}
                id={SOK_SEARCH_PARAM}
                name={SOK_SEARCH_PARAM}
                className="max-w-60 self-center justify-self-center"
            />
        </form>
    )
}
