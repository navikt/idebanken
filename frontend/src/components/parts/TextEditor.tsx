import { parseHtml } from '~/utils/parseHtml'

export interface TextEditorData {
    part: { descriptor: string, config: { simpleTextEditor: string} }
}

export const TextEditorView = (props: TextEditorData) => {
    const { part } = props
    const html = part.config?.simpleTextEditor ?? ''

    return <>{parseHtml(html)}</>
}
