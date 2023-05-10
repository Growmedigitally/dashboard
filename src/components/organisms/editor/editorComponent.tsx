import React from "react";
import PropsEditor from "./propsEditor";
import StylesEditor from "./stylesEditor";
import styles from '@organismsCSS/editor/editorComponent.module.scss';
import { Collapse, theme } from "antd";
const { Panel } = Collapse;

const EditorComponent = ({ index, config, onConfigUpdate }) => {

    const { token } = theme.useToken();

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const updatePrentConfig = (c, index) => {
        const updatedConfig: any = { ...config };
        updatedConfig.children = [...config.children]
        updatedConfig.children[index] = c;
        onConfigUpdate(updatedConfig);
    }

    return (
        <div className={styles.editorComponent}>
            <Collapse
                // ghost
                style={{ background: token.colorBgLayout }}
                expandIconPosition='end'
                onChange={onChange}
                size="small"
                className={styles.elementContainer}
                defaultActiveKey={[config?.editable?.label]}>
                <Panel header={config?.editable?.label} key={config?.editable?.label}>
                    {Boolean(Boolean(config?.editable?.props?.length) && config?.editable?.props?.length != 0) && <PropsEditor config={config} onConfigUpdate={(updatedConfig) => onConfigUpdate(updatedConfig)} />}
                    {Boolean(Boolean(config?.editable?.style?.length) && config?.editable?.style?.length != 0) && <StylesEditor config={config} onConfigUpdate={(updatedConfig) => onConfigUpdate(updatedConfig)} />}
                </Panel>
            </Collapse>
            {config.children ? config.children?.map((childConfig, index) => {
                return <React.Fragment key={index}>
                    <EditorComponent index={index} config={childConfig} onConfigUpdate={(c) => updatePrentConfig(c, index)} />
                </React.Fragment>
            }) : null}
        </div>
    )
}
export default EditorComponent;