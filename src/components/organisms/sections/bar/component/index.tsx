import RenderComponent from '@organisms/sections/renderComponent';
import React from 'react'
import styles from './index.module.scss';

function Bar({ config }) {
    return (
        <RenderComponent config={config} />
    )
}

export default Bar