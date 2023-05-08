import React from 'react'
import styles from './index.module.scss';

function Bar({ componentConfig }) {
    return (
        <div className={styles.fooWrapper}>
            Hi I'm a Bar component with the title:
            <h2>{componentConfig.title}</h2>
        </div>
    )
}

export default Bar