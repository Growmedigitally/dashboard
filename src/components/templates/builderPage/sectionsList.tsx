import React from 'react'
import DraggableItemWrap from './draggableItemWrap';

const Data = [
  { id: 1, name: "HTML" },
  { id: 2, name: "CSS" },
  { id: 3, name: "Javascript" },
  { id: 4, name: "Python" },
];


function SectionsList() {
  return (
    <div>
      <React.Fragment>
        <p>Draged Items</p>
        {Data.map((item) => (
          <DraggableItemWrap item={item} >
            <div style={{ color: 'white' }}>
              {item.name}
            </div>
          </DraggableItemWrap>
        ))}
      </React.Fragment>
    </div>
  )
}

export default SectionsList