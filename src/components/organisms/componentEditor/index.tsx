import React, { useCallback, useEffect, useState } from 'react'
import styles from '@organismsCSS/componentEditor/componentEditor.module.scss';
import EditorComponentsList from '@organisms/sections/editorComponentsList';
import { useAppSelector } from '@hook/useAppSelector';
import { getActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';

function ComponentEditor({ activeComponent, builderState }) {

    const [componentConfig, setComponentConfig] = useState<any>({});
    const stateActiveComponent = useAppSelector(getActiveEditorComponent);

    useEffect(() => {
        setComponentConfig(builderState[Object.keys(builderState)[0]][stateActiveComponent.index] || {});
    }, [activeComponent])

    const getComponent = useCallback(() => {
        if (typeof EditorComponentsList[activeComponent.uid] !== "undefined") {
            return React.createElement(EditorComponentsList[activeComponent.uid], {
                key: activeComponent.uid,
                config: componentConfig
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