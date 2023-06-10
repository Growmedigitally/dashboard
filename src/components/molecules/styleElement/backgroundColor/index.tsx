import React, { useEffect } from 'react';
import styles from './backgroundColor.module.scss'
import ColorPickerComponent from '../colorPicker';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function BackgroundColor({ value, onChange }) {

    const valueSample = [{ color: '#000', format: 'hex' }];

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.backgroundColorWrapp}`}>
            {/* {showLabel && <div className={styleElementCSS.label}>Backgound Color</div>} */}
            <ColorPickerComponent value={value} onChange={onChange} />
        </div>
    )
}

export default BackgroundColor