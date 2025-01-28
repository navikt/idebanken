import type {LayoutProps} from '@enonic/nextjs-adapter';
import React from 'react'
import {RegionView} from '@enonic/nextjs-adapter/views/Region';
import styles from './TwoColumnLayout.module.css';

const TwoColumnLayout = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {common, meta, layout} = props;

    return (
        <div 
            className={layout.config?.bgColor || 'bg-extra-light-pink'}
            style={{ [`--left-span`]: Number(layout.config?.leftSpan || 6) + 1 } as React.CSSProperties}
        >
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <RegionView name="left" components={regions['left']?.components} common={common} meta={meta}/>
                </div>
                <div className={styles.right}>
                    <RegionView name="right" components={regions['right']?.components} common={common} meta={meta}/>
                </div>
            </div>
        </div>
    );
};

export default TwoColumnLayout;