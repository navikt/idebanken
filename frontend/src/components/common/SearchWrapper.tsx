'use client'
import { Search } from '@navikt/ds-react'
import { useRouter, useSearchParams } from 'next/navigation'

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
                label={'Søk etter innhold på idebanken'}
                id={SOK_SEARCH_PARAM}
                name={SOK_SEARCH_PARAM}
                className="self-center justify-self-center"
            />
        </form>
    )
}
