import React from 'react'
import { PartData } from '@enonic/nextjs-adapter';
import { ParsedHtml } from '../common/ParsedHtml';
import { InfoBox } from '../common/InfoBox';

export interface InfoBoxData {
    part: PartData;
}

export const InfoBoxView = (props: InfoBoxData) => {
    const {part} = props

    return (
        <InfoBox bgColorClass={part.config?.bgColor}>
            <ParsedHtml processedHtml={part.config?.simpleTextEditor} />
        </InfoBox>
    )
};