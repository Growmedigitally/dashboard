"use client";
import React from "react";
import { ConfigProvider } from "antd";
import { theme } from 'antd';

const ThemeProvider = (props) => {
    const { token } = theme.useToken();
    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: props.isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        // colorPrimary: '#3bceac',
                        colorPrimary: props.isDarkMode ? '#00C9A7' : '#002864',
                        borderRadius: 5,
                        wireframe: false
                    },
                    components: {
                        Menu: {
                            colorItemBgSelected: token.colorPrimaryBg
                        },
                    },
                }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 4,
                        }
                    }}
                >
                    {props.children}
                </ConfigProvider>
            </ConfigProvider>
        </>
    )
}

export default ThemeProvider;