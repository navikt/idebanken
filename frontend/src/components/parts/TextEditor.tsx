import React from 'react'
import {APP_NAME, PartData} from '@enonic/nextjs-adapter';
import { ParsedHtml } from '../common/ParsedHtml';

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface TextEditorData {
    part: PartData;
    common: any;
}

export const TextEditorView = (props: TextEditorData) => {
    const {part, common} = props

    return (
        <ParsedHtml processedHtml={part.config?.simpleTextEditor} />
    )
};