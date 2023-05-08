import React from 'react'

function Foo({ componentConfig }) {
    return (
        <div className="foo">
            Hi I'm a Foo component with the headline: Editor
            <h2>{componentConfig.headline}</h2>
        </div>
    )
}

export default Foo