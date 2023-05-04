import React from 'react'
import { useDrag } from "react-dnd";

function DraggableItemWrap(props) {
    console.log(props.item)
    const [{ isDragging }, dragRef] = useDrag({
        type: "language",
        item: props.item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <div draggable ref={dragRef}>
            {props.children}
            {isDragging && "📂"}
        </div>
    )
}
export default DraggableItemWrap