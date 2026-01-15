import { fetchGuillotine } from '@enonic/nextjs-adapter/server'
import { getContentApiUrl } from '@enonic/nextjs-adapter'
import { commonQuery } from '~/components/queries/common'

export async function GET() {
    const res = await fetchGuillotine(
        getContentApiUrl({ contentPath: process.env.ENONIC_API ?? '' }),
        {
            site: '/idebanken',
            default: true,
            locale: 'no',
            project: 'idebanken',
        },
        {
            method: 'POST',
            body: {
                variables: {
                    path: '\${site}',
                },
                query: commonQuery,
            },
        }
    )

    if (!res.guillotine?.get?._id) {
        return new Response('Service Unavailable', {
            status: 503,
        })
    }

    return new Response('OK', {
        status: 200,
    })
}
