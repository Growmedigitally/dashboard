import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd';
import update from 'immutability-helper'
import DroppedItemWrap from './droppedItemWrap';

function Editor() {

    const [basket, setBasket] = useState([]);

    const [{ isOver }, dropRef] = useDrop({
        accept: "language",
        drop: (item) => {
            console.log(item, "editor dropRef")
            setBasket((basket) => [...basket, item])
        }
        ,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        console.log("dragIndex, hoverIndex", dragIndex, hoverIndex)
        setBasket((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }),
        )
    }, [])

    const renderCard = useCallback((card, index) => {
        return (
            <DroppedItemWrap
                key={index}
                index={index}
                id={card.id}
                moveCard={moveCard}
            >
                <div>Item:{card.name}</div>
            </DroppedItemWrap>
        )
    }, [])


    return (
        <div className='flex' ref={dropRef} style={{
            width: '400px',
            height: '500px'
        }}>
            <p className="mx-16 font-bold">Droped Items</p>
            <div>{basket.map((card, i) => renderCard(card, i))}</div>
            <div className="my-8 mx-8 rounded-xl border w-fit">
            </div>
        </div>
    )
}

export default Editor