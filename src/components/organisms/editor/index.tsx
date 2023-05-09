import React, { useEffect, useState } from 'react'
import style from '@sections/foo/editor/editor.module.scss';
import { useAppSelector } from '@hook/useAppSelector';
import { getBuilderState, updateBuilderState } from '@reduxStore/slices/builderState';
import { getActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';
import { useAppDispatch } from '@hook/useAppDispatch';
import EditorComponent from './editorComponent';

function Editor({ config }) {
    const dispatch = useAppDispatch();
    const [componentConfig, setComponentConfig] = useState<any>(JSON.parse(JSON.stringify(config)));
    const builderState = useAppSelector(getBuilderState);
    const activeComponent = useAppSelector(getActiveEditorComponent);

    useEffect(() => setComponentConfig({ ...config }), [config])

    const handleConfigUpdate = (updatedConfig) => {
        setComponentConfig(updatedConfig);
        const listKey = Object.keys(builderState)[0];
        const builderStateCopy: any = { ...builderState };
        const components = [...builderStateCopy[listKey]];
        components[activeComponent.index] = updatedConfig;
        builderStateCopy[listKey] = components;
        dispatch(updateBuilderState(builderStateCopy));
    };

    return (
        <div className={style.editorComponentContainer}>
            <EditorComponent index={null} config={componentConfig} onConfigUpdate={(con) => handleConfigUpdate(con)} />
        </div>
    )
}

export default Editor;

