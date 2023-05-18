import { Popover, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import styles from '@organismsCSS/composer/composer.module.scss'
import { BUILDER_PAGE, SECTION_PAGE } from '@constant/common';
import { findKeyPath, isContainerElement } from '@util/utils';
import { FiEdit2 } from 'react-icons/fi';
import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import { getBuilderState } from '@reduxStore/slices/builderState';
import { getActiveEditorComponent, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';

type pageProps = {
    config: any,
    currentPage: string,
    parentId: any
}
function ComposerComponent({ config, currentPage, parentId }: pageProps) {
    const componentConfig = { ...config };
    const { component: ComponentType, props, children } = componentConfig;
    const dispatch = useAppDispatch();
    const builderState = useAppSelector(getBuilderState);
    const activeComponent = useAppSelector(getActiveEditorComponent);

    const onClickAction = (event: any, action: string) => {
        if ((Boolean(currentPage == BUILDER_PAGE) && !isContainerElement(componentConfig))) {
            switch (action) {
                case 'EDIT':
                    const parentConfig = builderState[Object.keys(builderState)[0]].find(i => i.id == parentId);
                    dispatch(updateActiveEditorComponent({ parentId: parentId, uid: parentConfig.uid, originalState: parentConfig, childId: componentConfig.uid }))
                    console.log(parentConfig);
                    break;
                default:
                    break;
            }
            event.stopPropagation();
        }
    }

    const renerComponent = () => {
        return <React.Fragment>
            <ComponentType style={componentConfig.style} id={componentConfig.uid} className={`${styles.composerWrap}  ${(activeComponent.parentId === parentId && activeComponent.childId === componentConfig.uid) ? styles.active : ''} ${currentPage == BUILDER_PAGE ? styles.hoverOutline : ''}`} onClick={(e) => onClickAction(e, 'EDIT')}>
                {props?.text && props.text}
                {/* {(Boolean(currentPage == BUILDER_PAGE) && !isContainerElement(componentConfig)) && <div className={`${styles.actionsWrap}`}>
                    <Tooltip title="Edit Section" color={'#8892b0'} key='4'>
                        <div className={`iconWrap hover ${styles.iconWrap}`} onClick={(e) => onClickAction(e, 'EDIT')}>
                            <FiEdit2 />
                        </div>
                    </Tooltip>
                </div>} */}
                {children ? children?.map((childConfig, index) => {
                    return <React.Fragment key={index}>
                        <ComposerComponent config={childConfig} currentPage={currentPage} parentId={parentId} />
                    </React.Fragment>
                }) : null}
            </ComponentType>
        </React.Fragment>
    }

    return (
        <>
            {ComponentType ? <>
                {renerComponent()}
            </> : null}
        </>
    );
}

export default ComposerComponent