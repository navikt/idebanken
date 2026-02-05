import { fetchContent } from '@enonic/nextjs-adapter/server'
import MainView from '@enonic/nextjs-adapter/views/MainView'

export default async function NotFound() {
    const contentResult = await fetchContent({
        locale: 'no',
        contentPath: '404',
    })
    return <MainView {...contentResult} />
}
