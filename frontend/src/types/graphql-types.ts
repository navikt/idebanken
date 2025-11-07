import { MetaData } from '@enonic/nextjs-adapter'
import { CommonType } from '~/components/queries/common'

export type PartData<Part, ContentType = unknown> = {
    part: {
        descriptor: string
        config: Part
    }
    meta: MetaData
    common: CommonType<ContentType>
    path: string
}
