import React, { Key, ReactNode, createElement } from 'react'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import styles from '@organismsCSS/sidebarComponent/sidebarComponent.module.scss'

const { Header, Content, Footer, Sider }: any = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: ReactNode, key: Key, icon?: ReactNode, children?: MenuItem[],): MenuItem {
    return { key, icon, children, label } as MenuItem;
}
const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const SidebarComponent = ({ collapsed }) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                overflow: 'auto',
                height: '100vh',
            }}
        >
            <div className={styles.sidebarContainer}>
                <div className={styles.logoWrap} style={{ height: 32, margin: 16 }} >
                    <img src="/assets/3.png" />
                    {/* <img src="/assets/logo_3.png" /> */}
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </div>
        </Sider>
    )
}

export default SidebarComponent