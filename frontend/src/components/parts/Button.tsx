import React from 'react'
import {APP_NAME, PartData} from '@enonic/nextjs-adapter';
import { Button } from "@navikt/ds-react";

// fully qualified XP part name:
export const HEADING_PART_NAME = `${APP_NAME}:heading`;

export interface ButtonData {
    part: PartData;
    common: any;
}

export const ButtonView = ({part, common}: ButtonData) => {
    return (
        <Button variant={part?.config?.variant}>
            {part?.config?.text || '<placeholder>'}
        </Button>
    )
};