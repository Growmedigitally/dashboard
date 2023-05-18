import React from 'react';
import styles from './backgroundColor.module.scss'
import ColorPickerComponent from '../colorPicker';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function BackgroundColor({ showLabel = true, value, onChange }) {

    return (
        <div className={`${styleElementCSS.styleElementWrap} ${styles.backgroundColorWrapp}`}>
            {showLabel && <div className={styleElementCSS.label}>Backgound Color</div>}
            <ColorPickerComponent value={value} onChange={onChange} />
        </div>
    )
}

export default BackgroundColor