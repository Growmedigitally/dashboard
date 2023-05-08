import React, { useCallback, useState } from 'react'
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import ComponentWrapper from './componentWrapper';
import ComponentsList from '@organisms/sections';

function ComponentRenderer(props) {
    const getComponent = useCallback((config) => {
        if (typeof ComponentsList[config.uid] !== "undefined") {
            return React.createElement(ComponentsList[config.uid], {
                key: config.uid,
                componentConfig: config
            });
        }
        return null;
    }, [])

    return (
        <div className={styles.componentRendererWrap}>
            <ComponentWrapper {...props}>
                {getComponent(props.componentConfig)}
            </ComponentWrapper>
        </div >
    )
}

export default ComponentRenderer