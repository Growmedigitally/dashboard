import React from "react";
import PropsEditor from "./propsEditor";
import StyleEditor from "./styleEditor";

const EditorComponent = ({ index, config, onConfigUpdate }) => {


    const updatePrentConfig = (c, index) => {
        const updatedConfig: any = { ...config };
        updatedConfig.children = [...config.children]
        updatedConfig.children[index] = c;
        onConfigUpdate(updatedConfig);
    }
    return (
        <div>
            <label htmlFor="value">Children:{config.component}</label>
            <hr />
            {Boolean(Boolean(config?.editable?.style?.length) && config?.editable?.style?.length != 0) && <StyleEditor config={config} onConfigUpdate={(updatedConfig) => onConfigUpdate(updatedConfig)} />}
            {Boolean(Boolean(config?.editable?.props?.length) && config?.editable?.props?.length != 0) && <PropsEditor config={config} onConfigUpdate={(updatedConfig) => onConfigUpdate(updatedConfig)} />}
            <hr />
            {config.children ? config.children?.map((childConfig, index) => {
                return <React.Fragment key={index}>
                    <EditorComponent index={index} config={childConfig} onConfigUpdate={(c) => updatePrentConfig(c, index)} />
                </React.Fragment>
            }) : null}
        </div>
    )
}
export default EditorComponent;