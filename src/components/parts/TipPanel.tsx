import React from 'react'
import { PartData } from '@enonic/nextjs-adapter';
import { ParsedHtml } from '../common/ParsedHtml';
import { InfoBox } from '../common/InfoBox';
import styles from './TipPanel.module.css';
import { Heading } from '@navikt/ds-react';
import classNames from 'classnames';
import { Card } from '../common/Card';

export interface TipPanelData {
    part: PartData;
}

export const TipPanelView = (props: TipPanelData) => {
    const {part} = props;
    const {
        heading,
        panel = [],
        bgColor = 'bg-extra-light-pink',
        reverse = false
    } = part.config

    console.log(panel)
    const [ card1, card2 ] = Array.isArray(panel) ? panel : [panel];
    
    console.log({card1, card2})

    return (
        <div className={classNames(styles.panel, bgColor)}>
            <div className={styles.heading}>
                <Heading level='2' size='large'>{heading}</Heading>
            </div>
            <Card className={classNames(styles.card1, card1.bgColor, reverse && styles.reverse)}>
                <ParsedHtml processedHtml={card1?.simpleTextEditor} />
            </Card>
            { card2 && 
                <Card className={classNames(styles.card2, card2.bgColor, reverse && styles.reverse)}>
                    <ParsedHtml processedHtml={card2?.simpleTextEditor} />
                </Card>
            }
        </div>
    )
};