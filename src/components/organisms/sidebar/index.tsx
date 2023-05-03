import React, { useEffect, useState } from 'react'
import { MenuProps, theme } from 'antd';
import { Layout, Menu } from 'antd';
import styles from '@organismsCSS/sidebarComponent/sidebarComponent.module.scss'
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState, toggleDarkMode } from '@reduxStore/slices/darkMode';
import { useAppDispatch } from '@hook/useAppDispatch';
import SvgIcon from '@atoms/svgIcon';
import { consoleLog } from '@util/conole.log';
import { windowRef } from '@util/window';
import { isWindowAvailable } from '@util/navigation';
import { initialThemeHandler } from '@util/utils';
const { Sider }: any = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const SidebarComponent = () => {
    const isDarkMode = useAppSelector(getDarkModeState);
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('dashboard');
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();

    useEffect(() => {
        if (isWindowAvailable()) {
            dispatch(toggleDarkMode(initialThemeHandler()));
        }
    }, [windowRef])



    const navMenu = [
        { label: 'Dashboard', key: 'dashboard', icon: 'dashboard' },
        { label: 'Analytics', key: 'analytics', icon: 'analytics' },
        { label: 'Reports', key: 'reports', icon: 'reports' },
        { label: 'website', key: 'website', icon: 'website' },
        { label: 'CRM', key: 'CRM', icon: 'CRM' },
        { label: 'Ecommerce', key: 'ecommerce', icon: 'ecommerce' },
        { label: 'Settings', key: 'settings', icon: 'settings' },
        { label: 'PWA', key: 'PWA', icon: 'PWA' },
        { label: 'Chat', key: 'chat', icon: 'chat' },
        { label: 'Note', key: 'note', icon: 'note' },
        { label: 'Query', key: 'query', icon: 'query' },
        { label: 'Promotion', key: 'promotion', icon: 'promotion' },
        {
            label: 'Profile', key: 'profile', icon: 'profile',
            subNav: [
                { label: 'View Profile', key: 'view-profile', icon: 'profile' },
                { label: 'Logout', key: 'logout', icon: 'logout' },
            ]
        },
        {
            label: 'Theme', key: 'theme', icon: 'theme',
            subNav: [
                { label: 'Dark', key: 'dark', icon: 'dark' },
                { label: 'Light', key: 'light', icon: 'light' },
                { label: 'Menu Collapsed', key: !open ? 'collapsed' : 'expanded', icon: !open ? 'collapsedMenu' : 'expandedMenu' },
            ]
        },
        { label: 'Help Center', key: 'help', icon: 'help' },
    ]

    const getMenuItems: any = (navMenu: any, isSubMenu: boolean = false) => {
        const menuItems: MenuItem[] = [];
        const emptyMenu: MenuItem[] = null;
        navMenu.map((nav: any) => {
            menuItems.push({
                label: (<span>{nav.label}</span>),
                key: nav.key,
                icon: (<span role="img" aria-label="desktop" className={`${styles.navIcon} anticon anticon-desktop ant-menu-item-icon`}>
                    <SvgIcon icon={nav.icon} onlySvg={true} />
                </span>),
                children: nav.subNav ? getMenuItems(nav.subNav, true) : emptyMenu,
                className: (isSubMenu ? styles.navMenu + ' ' + styles.navSubMenu : styles.navMenu) + ' ' + (nav.subNav ? styles.hasSubMenu : '') + (((nav.key == 'dark' && isDarkMode) || (nav.key == 'light' && !isDarkMode) ? ' ant-menu-item-selected' : '')),
            })
        })
        return menuItems;
    }

    const onClick: MenuProps['onClick'] = (menu) => {
        console.log('click', menu);
        switch (menu.key) {
            case 'light':
                localStorage.setItem("theme", 'light');
                dispatch(toggleDarkMode(false))
                break;
            case 'dark':
                localStorage.setItem("theme", 'dark');
                dispatch(toggleDarkMode(true))
                break;
            case 'collapsed':
                setOpen(!open);
                break;
            case 'expanded':
                setOpen(!open);
                break;
            default:
                setActiveNav(menu.key);
                break;
        }
    };

    return (
        <Sider
            className={isDarkMode ? "ant-layout-sider-dark" : "ant-layout-sider-light"}
            trigger={null}
            collapsible
            collapsed={collapsed}
            onMouseEnter={() => {
                if (collapsed) {
                    setCollapsed(!collapsed)
                }
            }}
            onMouseLeave={() => {
                setCollapsed(open)
            }}
            style={{
                overflow: 'auto',
                height: '100vh',
            }}
        >
            <div className={styles.sidebarContainer}>
                <div className={styles.top}>
                    <div className={styles.logoWrap} style={{ height: 32, margin: 16 }} >
                        <div className={styles.logo}>
                            <img src="/assets/3.png" />
                        </div>
                    </div>
                    <Menu
                        className={`${styles.siderNavWrap} ${collapsed ? styles.collapsedMenu : ""}`}
                        onClick={onClick} theme={isDarkMode ? 'dark' : 'light'}
                        mode="vertical" selectedKeys={[activeNav]}
                        defaultSelectedKeys={['1']}
                        items={getMenuItems(navMenu)}
                    // openKeys={['profile']}
                    />
                </div>
            </div>
        </Sider>
    )
}

export default SidebarComponent