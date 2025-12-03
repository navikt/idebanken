import { MetaData } from '@enonic/nextjs-adapter'
import {
    Footer,
    Header,
    Part_Idebanken_ComponentDataApplicationConfig,
    Tag,
} from '~/types/generated'

export type PartData<Part, ContentType = unknown> = {
    part: {
        descriptor: string
        config: Part
    }
    path: string
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
    themeTags: Array<Tag>
    typeTags: Array<Tag>
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
    data: {
        publicationDate?: string
        heroImage?: {
            url?: string
            data?: {
                altText?: string
                caption?: string
                artist?: string
            }
        }
    }
}

type CommonGetSite = {
    displayName: string
    _path: string
}

type UnknownJSONContent = Record<string, string | Array<string> | object>

export type Macro<T> = {
    name: string
    children?: string
    config: T
    meta: MetaData
}

type AllowedPartKeys = Exclude<keyof Part_Idebanken_ComponentDataApplicationConfig, '__typename'>

export type QueryResponsePartData<Part extends AllowedPartKeys> = {
    guillotine?: {
        get?: {
            components?: Array<{
                part?: {
                    descriptor: string
                    config?: {
                        idebanken?: Pick<Part_Idebanken_ComponentDataApplicationConfig, Part>
                    }
                }
            }>
        }
    }
}
