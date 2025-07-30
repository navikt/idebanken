'use client'
import { Search } from '@navikt/ds-react'
import { useRouter } from 'next/navigation'

export const SOK_SEARCH_PARAM = 'ord'

export function SearchWrapper({ ...rest }: Readonly<React.HTMLAttributes<HTMLFormElement>>) {
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
            }}
            {...rest}>
            <Search
                label={'Søk etter innhold på idebanken'}
                id={SOK_SEARCH_PARAM}
                name={SOK_SEARCH_PARAM}
                className="self-center justify-self-center"
            />
        </form>
    )
}
