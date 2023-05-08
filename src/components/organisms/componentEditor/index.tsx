import React, { useCallback, useEffect, useState } from 'react'
import styles from '@organismsCSS/componentEditor/componentEditor.module.scss';
import EditorComponentsList from '@organisms/sections/editorComponentsList';

function ComponentEditor({ activeComponent, builderState }) {

    const [componentConfig, setComponentConfig] = useState<any>({});

    useEffect(() => {
        setComponentConfig(builderState[Object.keys(builderState)[0]].find((c) => c.uid === activeComponent.uid) || {});
    }, [activeComponent])

    useEffect(() => {
        console.log("ComponentEditor componentConfig", componentConfig)
    }, [componentConfig])

    const getComponent = useCallback(() => {
        if (typeof EditorComponentsList[activeComponent.uid] !== "undefined") {
            return React.createElement(EditorComponentsList[activeComponent.uid], {
                key: activeComponent.uid,
                componentConfig: componentConfig
            });
        }
        return null;
    }, [componentConfig])


    return (
        <div className={styles.componentEditorWrap}>
            {getComponent()}
        </div>
    )
}

export default ComponentEditor