import React from 'react'
import styles from '@organismsCSS/editor/stylesEditor.module.scss';
import BackgroundElement from '@molecules/styleElement/background';
import TextStyles from '@molecules/styleElement/textStyles';
import Border from '@molecules/styleElement/border';
import BoxShadow from '@molecules/styleElement/boxShadow';
import DirectionProperty from '@molecules/styleElement/directionProperty';
import ContentAlignment from '@molecules/styleElement/contentAlignment';
import { BACKGROUND, BORDER, BORDER_RADIUS, BOX_SHADOW, CONTENT_ALIGNMENT, MARGIN, PADDING, TEXT_STYLES } from '@constant/editorStylesProperties';

function StylesEditor({ config, onConfigUpdate }) {

    const handleStyleChange = (property, value) => {
        const configCopy = { ...config };
        let stylesCopy = { ...configCopy.style };
        stylesCopy = { ...stylesCopy, [property]: value };
        configCopy.style = stylesCopy;
        onConfigUpdate(configCopy);
    };

    const getStyleComponent = (property: string) => {
        let component = null;
        switch (property) {
            case BACKGROUND:
                component = <BackgroundElement value={config?.style?.background} onChange={(value) => handleStyleChange(BACKGROUND, value)} />
                break;
            case BORDER:
                component = <Border value={config?.style?.border} onChange={(property, value) => handleStyleChange(property, value)} />
                break;
            case BOX_SHADOW:
                component = <BoxShadow value={config?.style?.border} onChange={(property, value) => handleStyleChange(property, value)} />
                break;
            case BORDER_RADIUS:
                component = <DirectionProperty propertyType={BORDER_RADIUS} value={config?.style?.border} onChange={(property, value) => handleStyleChange(property, value)} />
                break;
            case PADDING:
                component = <DirectionProperty propertyType={PADDING} value={config?.style?.border} onChange={(property, value) => handleStyleChange(property, value)} />
                break;
            case MARGIN:
                component = <DirectionProperty propertyType={MARGIN} value={config?.style?.border} onChange={(property, value) => handleStyleChange(property, value)} />
                break;
            case TEXT_STYLES:
                component = <TextStyles config={config?.style} onChange={(property, value) => handleStyleChange(property, value)} />
                break;
            case CONTENT_ALIGNMENT:
                component = <ContentAlignment onChange={(value) => handleStyleChange('justifyContent', value)} value={config?.style?.justifyContent} />
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
                </React.Fragment>
            })}
        </div>
    )
}

export default StylesEditor