import type { PageProps } from '@enonic/nextjs-adapter'
import RegionsView from '@enonic/nextjs-adapter/views/Region'
import { appendRegionAttributes } from '~/components/pages/Main'
import { PAGE_FULL_WIDTH } from '~/utils/constants'

export const FullWidth = (props: PageProps) => {
    appendRegionAttributes(props, PAGE_FULL_WIDTH)
    return <RegionsView {...props} name={PAGE_FULL_WIDTH} />
}
