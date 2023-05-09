import React from 'react'

function RenderComponent({ config }) {
    const { component: ComponentType, props, children } = config;
    return (
        <>
            {ComponentType ? <>
                <ComponentType style={config.style}>
                    {props?.text && props.text}
                    {children ? children?.map((childConfig, index) => {
                        return <React.Fragment key={index}>
                            <RenderComponent config={childConfig} />
                        </React.Fragment>
                    }) : null}
                </ComponentType></> : null}
        </>
    );
}

export default RenderComponent