import React from 'react'

function PropsEditor({ config, onConfigUpdate }) {



    const handlePropsChange = (event) => {
        const { name, value } = event.target;
        const configCopy = { ...config };
        let propsCopy = { ...configCopy.props };
        propsCopy = { ...propsCopy, [name]: value };
        configCopy.props = propsCopy;
        onConfigUpdate(configCopy);
    };


    return (
        <React.Fragment>
            {config?.editable?.props.map((property, index) => {
                return <React.Fragment key={index}>
                    <label htmlFor={property}>Prop Value:  </label>
                    <input
                        type="text"
                        id={property}
                        name={property}
                        value={config.props ? config.props[property] : ''}
                        onChange={handlePropsChange}
                    />

                    <hr />
                </React.Fragment>
            })}
        </React.Fragment>
    )
}

export default PropsEditor