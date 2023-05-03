import React, { useEffect } from 'react'
import { Button, Layout, theme } from 'antd';
const { Header, Content } = Layout;

import {
    BulbOutlined,
    BulbFilled
} from '@ant-design/icons';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { consoleLog } from 'src/utils/conole.log';
import { getDarkModeState, toggleDarkMode } from '@reduxStore/slices/darkMode';

function HeaderComponent() {

    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} >

        </Header>
    )
}

export default HeaderComponent