import { PartData } from '@enonic/nextjs-adapter'
import { parseHtml } from '~/utils/parseHtml'
import { CommonType } from '../queries/common'

export interface TextEditorData {
    part: PartData
    common: CommonType
}

export const TextEditorView = (props: TextEditorData) => {
    const { part } = props
    const html = part.config?.simpleTextEditor ?? ''

    return <>{parseHtml(html)}</>
}
