import Router from 'next/router'
import React from 'react'

function about() {
    return (
        <div onClick={() => Router.push('/')}>about</div>
    )
}

export default about