import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@templatesCSS/builderPage/sectionsContainer.module.scss'
import ComponentRenderer from '@organisms/componentRenderer';

function SectionsContainer({ ITEMS }) {

    return (
        <div>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <div className={`${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}
                        ref={provided.innerRef}
                    >
                        {ITEMS.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <React.Fragment>
                                        <div className={`${styles.componentWrap} ${snapshot.isDragging ? styles.draggingInProgress : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={provided.draggableProps.style}>
                                            <ComponentRenderer componentConfig={item}
                                            />
                                        </div>
                                        {snapshot.isDragging && (
                                            <div className={`${styles.componentWrap} ${styles.draggingItem} ${styles.draggingInProgress}`}>
                                                <ComponentRenderer componentConfig={item} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default SectionsContainer