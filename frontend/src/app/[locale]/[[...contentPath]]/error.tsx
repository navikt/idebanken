'use client'

import Error500, { ErrorParams } from '~/components/common/error/Error500'

export default function Error(params: ErrorParams) {
    return <Error500 {...params} />
}
