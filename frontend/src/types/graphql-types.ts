import { MetaData } from '@enonic/nextjs-adapter'
import { Category, Footer, Header } from '~/types/generated'

export type PartData<Part, ContentType = unknown> = {
    part: {
        descriptor: string
        config: Part
    }
} & BaseQueryResponse<ContentType>

export type ContentTypeData<CommonContentTypeData, TypeName extends string> = {
    data: {
        get: {
            type: TypeName
            data: CommonContentTypeData
        }
    }
} & BaseQueryResponse

type BaseQueryResponse<ContentTypeData = UnknownJSONContent> = {
    common: CommonType<ContentTypeData>
    meta: MetaData
}

export type CommonType<T = UnknownJSONContent> = {
    get: CommonContentType<T>
    getSite: CommonGetSite
    header: Header
    footer: Footer
    categories: Array<Category>
}

export type CommonContentType<T = UnknownJSONContent> = {
    displayName: string
    _id: string
    type: `${string}:${string}`
    dataAsJson: T
    xAsJson: UnknownJSONContent
    publish: {
        first: string
    }
    x: {
        idebanken: {
            meta: {
                icon: {
                    mediaUrl: string
                }
            }
        }
    }
}

type CommonGetSite = {
    displayName: string
    _path: string
}

type UnknownJSONContent = Record<string, string | Array<string> | object>
