import React from 'react'
import { APP_NAME, PartData } from '@enonic/nextjs-adapter'
import { ParsedHtml } from '../common/ParsedHtml'
import { CommonType } from '../queries/common'

// fully qualified XP part name:
export const TEXT_EDITOR_PART_NAME = `${APP_NAME}:text-editor`

export interface TextEditorData {
    part: PartData
    common: CommonType
}

export const TextEditorView = (props: TextEditorData) => {
    const { part, common } = props

    return <ParsedHtml processedHtml={part.config?.simpleTextEditor} />
}
