import React from 'react';
import styles from './index.module.scss'

function BackgroundColor() {
    return (
        <div className={styles.backgroundColorWrapp}>
            <input type='color' />
        </div>
    )
}

export default BackgroundColor