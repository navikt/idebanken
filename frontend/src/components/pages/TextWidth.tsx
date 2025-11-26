import type { PageProps } from '@enonic/nextjs-adapter'
import RegionsView from '@enonic/nextjs-adapter/views/Region'
import { appendRegionAttributes } from '~/components/pages/Main'
import { PAGE_TEXT_WIDTH } from '~/utils/constants'

export const TextWidth = (props: PageProps) => {
    appendRegionAttributes(props, PAGE_TEXT_WIDTH)
    return <RegionsView {...props} name={PAGE_TEXT_WIDTH} />
}
