import React, { Component, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import console = require('console');

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('==> dest', destination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item: any = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const Content = styled.div`
    margin-right: 200px;
`;

const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
`;

const Container = styled(List)`
    margin: 0.5rem 0.5rem 1.5rem;
    background: #ccc;
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

const ITEMS = [
    {
        id: uuid(),
        content: 'Headline'
    },
    {
        id: uuid(),
        content: 'Copy'
    },
    {
        id: uuid(),
        content: 'Image'
    },
    {
        id: uuid(),
        content: 'Slideshow'
    },
    {
        id: uuid(),
        content: 'Quote'
    }
];

function Editor() {
    const [state, setstate] = useState({
        [uuid()]: []
    })
    const onDragEnd = result => {
        const { source, destination } = result;

        console.log('==> result', result);

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                setstate({
                    [destination.droppableId]: reorder(
                        state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                setstate({
                    [destination.droppableId]: copy(
                        ITEMS,
                        state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                setstate(
                    move(
                        state[source.droppableId],
                        state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Kiosk
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}>
                        {ITEMS.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}>
                                {(provided, snapshot) => (
                                    <React.Fragment>
                                        <Item
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            isDragging={snapshot.isDragging}
                                            style={
                                                provided.draggableProps
                                                    .style
                                            }>
                                            {item.content} Sections
                                        </Item>
                                        {snapshot.isDragging && (
                                            <Clone>{item.content}</Clone>
                                        )}
                                    </React.Fragment>
                                )}
                            </Draggable>
                        ))}
                    </Kiosk>
                )}
            </Droppable>
            <Content>
                {Object.keys(state).map((list, i) => {
                    console.log('==> list', list);
                    return (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <Container
                                    ref={provided.innerRef}
                                    isDraggingOver={
                                        snapshot.isDraggingOver
                                    }>
                                    {state[list].length
                                        ? state[list].map(
                                            (item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(
                                                        provided,
                                                        snapshot
                                                    ) => (
                                                        <Item
                                                            {...provided.dragHandleProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            isDragging={
                                                                snapshot.isDragging
                                                            }
                                                            style={
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            }>
                                                            {item.content}
                                                        </Item>
                                                    )}
                                                </Draggable>
                                            )
                                        )
                                        : !provided.placeholder && (
                                            <Notice>
                                                Drop items here
                                            </Notice>
                                        )}
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    );
                })}
            </Content>
        </DragDropContext>
    );
}

export default Editor