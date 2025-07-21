import TemporarySearchClientComponent from '~/app/[locale]/sok/temporarySearchClientComponent'

// NB. Using this option with default value bails out static generation !!!
// export const dynamic = 'auto'

// The revalidate option is only available when using the Node.js Runtime.
// This means using the revalidate option with runtime = 'edge' will not work.
export const revalidate = 3600

export default async function Page() {
    return <TemporarySearchClientComponent />
}
