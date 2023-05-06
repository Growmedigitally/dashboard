import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@templatesCSS/builderPage/builderContainer.module.scss'
import ComponentRenderer from '@organisms/componentRenderer';
import { useAppDispatch } from '@hook/useAppDispatch';
import { updateActiveEditorComponent } from '@reduxStore/slices/activeEditorComponent';

function BuilderContainer({ droppedComponentsList, activeDeviceType }) {
    const dispatch = useAppDispatch();

    const onClickComponent = (event: any, index: number) => {
        dispatch(updateActiveEditorComponent(index))
        event.stopPropagation()
    }
    return (
        <React.Fragment>
            <div className={`${styles.builderDroppableList} ${styles[activeDeviceType]}`}>
                {Object.keys(droppedComponentsList).map((list, i) => {
                    return (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <div className={`${styles.droppedListWrap} ${snapshot.isDraggingOver ? styles.isDraggingOver : ''}`}
                                    ref={provided.innerRef}>
                                    {droppedComponentsList[list].length ? droppedComponentsList[list].map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div className={`${styles.draggComponentWrap} ${snapshot.isDragging ? styles.sortingInProgress : ''}`}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={provided.draggableProps.style}
                                                    onClick={(e) => onClickComponent(e, index)}
                                                >
                                                    <ComponentRenderer
                                                        droppedComponentsList={droppedComponentsList}
                                                        lastChild={droppedComponentsList[list].length - 1 == index}
                                                        itemIndex={index}
                                                        page={'BUILDER'}
                                                        componentConfig={item} />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                    )
                                        : !provided.placeholder && (
                                            <div className={styles.emptyEditorWrap}>
                                                Drop items here
                                            </div>
                                        )}
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