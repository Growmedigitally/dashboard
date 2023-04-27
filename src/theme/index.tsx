import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { theme } from 'antd';

const withTheme = (children: JSX.Element) => (

    <>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#dee1ec',
                    borderRadius: 5,
                    wireframe: false
                }
            }}
        >
            <ConfigProvider
                theme={{
                    token: {
                        borderRadius: 4,
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ConfigProvider>
    </>
)

export default withTheme;