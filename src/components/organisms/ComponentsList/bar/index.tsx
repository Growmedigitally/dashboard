import React from 'react'

function Bar({ componentConfig }) {
    return (
        <div className="bar">
            <hr />
            Hi I'm a Bar component with the title:
            <h2>{componentConfig.title}</h2>
        </div>
    )
}

export default Bar