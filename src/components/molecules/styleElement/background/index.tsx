import React from 'react'
import BackgroundColor from '../backgroundColor';
import styles from "./index.module.scss";

function BackgroundElement() {
    return (
        <div className={styles.backgroundElementWrap}>
            <BackgroundColor />
        </div>
    )
}

export default BackgroundElement