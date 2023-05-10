import React from 'react'
import styles from '@organismsCSS/editor/stylesEditor.module.scss';
import BackgroundElement from '@molecules/styleElement/background';

function StylesEditor({ config, onConfigUpdate }) {

    const handleStyleChange = (event) => {
        const { name, value } = event.target;
        const configCopy = { ...config };
        let stylesCopy = { ...configCopy.style };
        stylesCopy = { ...stylesCopy, [name]: value };
        configCopy.style = stylesCopy;
        onConfigUpdate(configCopy);
    };

    const getStyleComponent = (property: string) => {
        let component = null;
        switch (property) {
            case 'background':
                component = <BackgroundElement />
                break;

            default:
                break;
        }
        return component;
    }

    return (
        <div className={styles.stylesEditor}>
            {config?.editable?.style.map((property, index) => {
                return <React.Fragment key={index}>
                    {getStyleComponent(property)}
                    {property == 'background' && <>
                        <label htmlFor="background">BG Color:  </label>
                        <input
                            type="text"
                            id="background"
                            name="background"
                            value={config.style?.background || ''}
                            onChange={handleStyleChange}
                        />
                    </>}
                    {property == 'color' && <>
                        <label htmlFor="color">Color:  </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={config.style?.color || ''}
                            onChange={handleStyleChange}
                        />
                    </>}
                    {property == 'fontSize' && <>
                        <label htmlFor="fontSize">fontSize:  </label>
                        <input
                            type="text"
                            id="fontSize"
                            name="fontSize"
                            value={config.style?.fontSize || ''}
                            onChange={handleStyleChange}
                        />
                    </>}
                    {property == 'padding' && <>
                        <label htmlFor="padding">padding:  </label>
                        <input
                            type="text"
                            id="padding"
                            name="padding"
                            value={config.style?.padding || ''}
                            onChange={handleStyleChange}
                        />
                    </>}
                </React.Fragment>
            })}
        </div>
    )
}

export default StylesEditor