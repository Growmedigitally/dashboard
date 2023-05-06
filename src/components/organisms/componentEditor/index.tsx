import React from 'react'
import styles from '@organismsCSS/componentEditor/componentEditor.module.scss';

function ComponentEditor({ activeComponentID, droppedComponentsList }) {
    return (
        <div className={styles.componentEditorWrap}>
            ComponentEditor{activeComponentID}
        </div>
    )
}

export default ComponentEditor