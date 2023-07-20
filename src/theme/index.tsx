import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { theme } from 'antd';
import { useAppSelector } from "@hook/useAppSelector";
import { getDarkModeState } from "@reduxStore/slices/darkMode";

const withTheme = (children: JSX.Element) => {
    const isDarkMode = useAppSelector(getDarkModeState);

    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        // colorPrimary: '#3bceac',
                        colorPrimary: isDarkMode ? '#00C9A7' : '#002864',
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
}

export default withTheme;