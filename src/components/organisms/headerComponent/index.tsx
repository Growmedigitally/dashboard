import React, { useEffect } from 'react'
import { Button, Layout, theme } from 'antd';
const { Header, Content } = Layout;

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BulbOutlined,
    BulbFilled
} from '@ant-design/icons';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { getDarkModeState, getUser } from 'src/redux/selectors';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { toggleDarkMode } from 'src/redux/actions/common';
import { consoleLog } from 'src/utils/conole.log';

function HeaderComponent({ collapsed, setCollapsed }) {

    const { token: { colorBgContainer } } = theme.useToken();
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(getDarkModeState);

    useEffect(() => {
        consoleLog('isdarkmode', isDarkMode);
    }, [isDarkMode])

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <Button
                type="text"
                icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
                onClick={() => dispatch(toggleDarkMode(!isDarkMode))}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            {isDarkMode ? 'Dark' : 'Light'}
        </Header>
    )
}

export default HeaderComponent