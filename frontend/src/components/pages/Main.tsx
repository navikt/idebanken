import type { PageProps, RegionProps } from '@enonic/nextjs-adapter'
import RegionsView from '@enonic/nextjs-adapter/views/Region'

export const appendRegionAttributes = (props: PageProps, regionName: string): void => {
    const page = props.page

    if (!page.regions || !Object.keys(page.regions).length) {
        page.regions = {
            [regionName]: {
                name: regionName,
                components: [],
            },
        }
    }

    // @ts-expect-error RegionView in RegionsView accepts className
    page.regions[regionName] = {
        ...page.regions[regionName],
        className: props.page.descriptor?.replace(/^[^:]*:/, 'page-'),
    } as RegionProps
}

const MainPage = (props: PageProps) => {
    appendRegionAttributes(props, 'main')

    return <RegionsView {...props} name="main" />
}

export default MainPage
