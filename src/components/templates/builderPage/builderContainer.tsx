import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@templatesCSS/builderPage/builderContainer.module.scss'
import ComponentRenderer from '@organisms/componentRenderer/index';
import { useAppDispatch } from '@hook/useAppDispatch';
import { initialState, updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';
import { BACKGROUND_TYPES, BUILDER_PAGE } from '@constant/common';
import SiteConfig from '@type/siteConfig';
import { useAppSelector } from '@hook/useAppSelector';
import { getSiteConfig } from '@reduxStore/slices/siteConfig';
import getBackground from '@util/getBackgroundStyle';

function BuilderContainer({ builderState, activeDeviceType }) {
    const dispatch = useAppDispatch();
    const siteConfig = useAppSelector(getSiteConfig);

    const onClickComponent = (event: any, index: any, uid: number) => {
        if (uid) dispatch(updateActiveEditorComponent({ parentId: builderState[Object.keys(builderState)[0]][index].id, uid, originalState: builderState[Object.keys(builderState)[0]][index] }))
        else dispatch(updateActiveEditorComponent(initialState.activeEditorComponent));
        event.stopPropagation()
    }
    return (
        <React.Fragment>
            {(siteConfig?.background?.type == BACKGROUND_TYPES.IMAGE) && <style dangerouslySetInnerHTML={{
                __html: `
                #builderBody{
                    position:relative;
                }
                #builderBody:after {
                        content: ' ';
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        opacity:${siteConfig?.background?.opacity || 1};
                        background:url(${siteConfig?.background?.src});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;
                    }`
            }}></style>}
            <div className={`${styles.builderDroppableList} ${styles[activeDeviceType]}`} onClick={(e) => onClickComponent(e, null, null)}>
                {Object.keys(builderState).map((list, i) => {
                    return (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <div className={`${styles.bodyFrame} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}
                                    ref={provided.innerRef}
                                    id="builderBody"
                                    style={{ ...siteConfig?.style, ...getBackground(siteConfig?.background) }}
                                >
                                    {builderState[list].length ? builderState[list].map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div className={`${styles.draggComponentWrap} ${snapshot.isDragging ? styles.sortingInProgress : ''}`}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={provided.draggableProps.style}
                                                    onClick={(e) => onClickComponent(e, index, item.uid)}
                                                >
                                                    <ComponentRenderer
                                                        builderState={builderState}
                                                        lastChild={builderState[list].length - 1 == index}
                                                        index={index}
                                                        parentId={item.id}
                                                        uid={item.uid}
                                                        currentPage={BUILDER_PAGE}
                                                        componentConfig={item}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    )) : <>
                                        <div className={styles.emptyEditorWrap}>
                                            Drop items here
                                        </div>
                                        {/* {!provided.placeholder && (
                                            <div className={styles.emptyEditorWrap}>
                                                Drop items here
                                            </div>)} */}
                                    </>}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    );
                })}
            </div>
        </React.Fragment>
    )
}

export default BuilderContainer