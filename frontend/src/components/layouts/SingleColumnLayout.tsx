import type {LayoutProps} from '@enonic/nextjs-adapter';
import React from 'react'
import {RegionView} from '@enonic/nextjs-adapter/views/Region';
import styles from './SingleColumnLayout.module.css';

const SingleColumnLayout = (props: LayoutProps) => {
    const regions = props.layout.regions;
    const {common, meta, layout} = props;

    return (
        <div 
            className={layout.config?.bgColor || 'bg-extra-light-pink'}
        >
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <RegionView name="content" components={regions['content']?.components} common={common} meta={meta}/>
                </div>
            </div>
        </div>
    );
};

export default SingleColumnLayout;