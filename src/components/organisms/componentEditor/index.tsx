import React, { useCallback, useEffect, useState } from 'react'
import styles from '@organismsCSS/componentEditor/componentEditor.module.scss';
import EditorComponentsList from '@organisms/ComponentsList/editor';

function ComponentEditor({ componentUID, builderState }) {

    const [componentConfig, setComponentConfig] = useState<any>({});

    useEffect(() => {
        setComponentConfig(builderState[Object.keys(builderState)[0]].find((c) => c.uid === componentUID) || {});
    }, [componentUID])

    useEffect(() => {
        console.log("componentConfig", componentConfig)
    }, [componentConfig])

    const getComponent = useCallback(() => {
        if (typeof EditorComponentsList[componentUID] !== "undefined") {
            return React.createElement(EditorComponentsList[componentUID], {
                key: componentUID,
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