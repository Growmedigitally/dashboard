import React from 'react'

function Foo({ componentConfig }) {
    return (
        <div className="foo">
            <hr />
            Hi I'm a Foo component with the headline:
            <h2>{componentConfig.headline}</h2>
        </div>
    )
}

export default Foo