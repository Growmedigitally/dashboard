import React, { useState } from 'react'
import styles from '@organismsCSS/componentRenderer/componentRenderer.module.scss';
import { FiArrowUp } from 'react-icons/fi';
import { FiArrowDown } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { Popconfirm, theme, Tooltip } from 'antd';
import { useAppDispatch } from '@hook/useAppDispatch';
import { move, toArray } from '@util/moveItem';
import { updateBuilderState } from '@reduxStore/slices/builderState';
import { getActiveEditorComponent, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';
import { useAppSelector } from '@hook/useAppSelector';


const actionWrapCss = { "padding": "10px", "height": "auto", "width": "auto", "overflow": "auto" };
function ComponentRenderer({ droppedComponentsList, lastChild, itemIndex, page, componentConfig }) {
    const dispatch = useAppDispatch();
    const activeComponentId = useAppSelector(getActiveEditorComponent);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const onUpArrowClick = () => {
        const listKey = Object.keys(droppedComponentsList)[0];
        const droppedComponentsListCopy: any = { ...droppedComponentsList };
        droppedComponentsListCopy[listKey] = move(droppedComponentsListCopy[listKey], { from: itemIndex, to: itemIndex - 1 });
        dispatch(updateBuilderState(droppedComponentsListCopy));
    }

    const onDownArrowClick = () => {
        const listKey = Object.keys(droppedComponentsList)[0];
        const droppedComponentsListCopy: any = { ...droppedComponentsList };
        droppedComponentsListCopy[listKey] = move(droppedComponentsListCopy[listKey], { from: itemIndex + 1, to: itemIndex });
        dispatch(updateBuilderState(droppedComponentsListCopy));
    }

    const onDeleteClick = () => {
        const listKey = Object.keys(droppedComponentsList)[0];
        const droppedComponentsListCopy: any = { ...droppedComponentsList };
        const components: any = [...toArray(droppedComponentsListCopy[listKey])];
        components.splice(itemIndex, 1);
        droppedComponentsListCopy[listKey] = components;
        dispatch(updateBuilderState(droppedComponentsListCopy));
    }

    const onEditClick = () => {
        dispatch(updateActiveEditorComponent(itemIndex));
    }

    return (
        <div className={`${styles.componentRendererWrap} ${activeComponentId == itemIndex ? styles.active : ''} ${lastChild ? styles.lastChild : ''} ${itemIndex == 0 ? styles.firstChild : ''}`}>
            {page == 'BUILDER' && <div className={styles.actionsWrap} style={confirmationOpen ? actionWrapCss : {}}>
                <Tooltip title="Move Up" color={'#8892b0'} key='1'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={onUpArrowClick}>
                        <FiArrowUp />
                    </div>
                </Tooltip>
                <Tooltip title="Move Down" color={'#8892b0'} key='2'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={onDownArrowClick}>
                        <FiArrowDown />
                    </div>
                </Tooltip>
                <Tooltip title="Delete Section" color={'#8892b0'} key='3'>
                    <Popconfirm
                        title="Delete Section"
                        description="Are you sure you want to delete this section?"
                        onConfirm={onDeleteClick}
                        onOpenChange={(status) => setConfirmationOpen(status)}
                    >
                        <div className={`iconWrap hover ${styles.iconWrap}`}>
                            <FiTrash2 />
                        </div>
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Edit Section" color={'#8892b0'} key='4'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={onEditClick}>
                        <FiEdit2 />
                    </div>
                </Tooltip>
            </div >}
            {componentConfig.text}
        </div >
    )
}

export default ComponentRenderer