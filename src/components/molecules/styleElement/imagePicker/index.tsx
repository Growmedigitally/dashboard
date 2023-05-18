import React from 'react'
import styles from './imagePicker.module.scss';

function ImagePicker({ showLabel = true }) {
    return (
        <div className={styles.imagePickerWrap}>
            {showLabel && <div className={styles.label}>
                Image Picker
            </div>}
            <div className={styles.elementWrapp}>
                <div className={styles.actionWrap}>

                </div>
            </div>
        </div>
    )
}

export default ImagePicker