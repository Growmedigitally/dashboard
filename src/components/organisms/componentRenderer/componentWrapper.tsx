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
import { getActiveEditorComponent, initialState, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';
import { useAppSelector } from '@hook/useAppSelector';

type pageProps = {
    builderState: any,
    lastChild: any,
    itemIndex: any,
    uid: any,
    currentPage: any,
    children: any
}
function ComponentWrapper({ builderState, lastChild, itemIndex, uid, currentPage, children }: pageProps) {
    const dispatch = useAppDispatch();
    const activeComponent = useAppSelector(getActiveEditorComponent);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const actionWrapCss = { "padding": "10px", "height": "auto", "width": "auto", "overflow": "auto" };

    const onClickAction = (event: any, action: string) => {
        const listKey = Object.keys(builderState)[0];
        const builderStateCopy: any = { ...builderState };
        switch (action) {
            case 'UP':
                builderStateCopy[listKey] = move(builderStateCopy[listKey], { from: itemIndex, to: itemIndex - 1 });
                break;
            case 'DOWN':
                builderStateCopy[listKey] = move(builderStateCopy[listKey], { from: itemIndex + 1, to: itemIndex });
                break;
            case 'DELETE':
                const components: any = [...toArray(builderStateCopy[listKey])];
                components.splice(itemIndex, 1);
                builderStateCopy[listKey] = components;
                break;
            case 'EDIT':
                break;
            default:
                break;
        }
        dispatch(updateBuilderState(builderStateCopy));
        dispatch(updateActiveEditorComponent(action == 'EDIT' ? { itemIndex, uid, originalState: builderState[Object.keys(builderState)[0]][itemIndex] } : initialState.activeEditorComponent));
        event.stopPropagation();
    }

    return (
        <div className={`${styles.componentContentWrap} ${activeComponent.itemIndex === itemIndex ? styles.active : ''} ${lastChild ? styles.lastChild : ''} ${itemIndex == 0 ? styles.firstChild : ''}`}>
            {currentPage == 'BUILDER' && <div className={styles.actionsWrap} style={confirmationOpen ? actionWrapCss : {}}>
                <Tooltip title="Move Up" color={'#8892b0'} key='1'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'UP')}>
                        <FiArrowUp />
                    </div>
                </Tooltip>
                <Tooltip title="Move Down" color={'#8892b0'} key='2'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'DOWN')}>
                        <FiArrowDown />
                    </div>
                </Tooltip>
                <Tooltip title="Delete Section" color={'#8892b0'} key='3'>
                    <Popconfirm
                        title="Delete Section"
                        description="Are you sure you want to delete this section?"
                        onConfirm={(e) => onClickAction(e, 'DELETE')}
                        onOpenChange={(status) => setConfirmationOpen(status)}
                    >
                        <div className={`iconWrap hover ${styles.iconWrap}`}>
                            <FiTrash2 />
                        </div>
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Edit Section" color={'#8892b0'} key='4'>
                    <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'EDIT')}>
                        <FiEdit2 />
                    </div>
                </Tooltip>
            </div>}
            {children}
        </div >
    )
}

export default ComponentWrapper