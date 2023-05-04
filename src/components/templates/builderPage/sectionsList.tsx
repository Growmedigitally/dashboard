import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@templatesCSS/builderPage/builderPage.module.scss'

function SectionsList({ ITEMS }) {

    return (
        <div>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <div className={`${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}
                        ref={provided.innerRef}
                    >
                        {ITEMS.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <React.Fragment>
                                        <div className={`${styles.itemWrap} ${snapshot.isDragging ? styles.isDragging : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={
                                                provided.draggableProps.style
                                            }>
                                            {item.content}
                                        </div>
                                        {snapshot.isDragging && (
                                            <div className={`${styles.itemWrap} ${snapshot.isDragging ? styles.isDragging : ''}`}>
                                                {item.content}
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

export default SectionsList