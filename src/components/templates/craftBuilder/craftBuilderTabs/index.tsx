import React, { useState } from 'react'
import styles from './tabs.module.scss';
import { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import SvgIcon from '@atoms/svgIcon';
import { EDITOR_SIDEBAR, EDITOR_TABS } from '@constant/craftBuilder';
const { Sider }: any = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function TabsWrapper({ setActiveEditorTab, activeEditorTab }) {
    const isDarkMode = true;
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const getMenuItems: any = (navMenu: any, isSubMenu: boolean = false) => {
        const menuItems: MenuItem[] = [];
        navMenu.map((nav: any) => {
            menuItems.push({
                label: (<span className={styles.navLabel}>{nav.label}</span>),
                key: nav.key,
                icon: (<span role="img" aria-label="desktop" className={`${styles.navIcon} anticon anticon-desktop ant-menu-item-icon`}>
                    <SvgIcon icon={nav.icon} onlySvg={true} />
                </span>),
                className: (isSubMenu ? styles.navMenu + ' ' + styles.navSubMenu : styles.navMenu) + ' ' + (nav.subNav ? styles.hasSubMenu : '') + (((nav.key == 'dark' && isDarkMode) || (nav.key == 'light' && !isDarkMode) ? ' ant-menu-item-selected' : '')),
            })
        })
        return menuItems;
    }

    const onClickNav: MenuProps['onClick'] = (menu: any) => {
        switch (menu.key) {
            case 'collapsed':
                setOpen(!open);
                break;
            case 'expanded':
                setOpen(!open);
                break;
            default:
                setActiveEditorTab(menu.key);
                break;
        }
    };


    return (
        <>
            <div className={styles.sideBar}>
                <Menu
                    className={`${styles.siderNavWrap} ${collapsed ? styles.collapsedMenu : ""}`}
                    onClick={onClickNav} theme={!isDarkMode ? 'dark' : 'light'}
                    mode="vertical" selectedKeys={[activeEditorTab]}
                    defaultSelectedKeys={[activeEditorTab]}
                    items={getMenuItems(EDITOR_SIDEBAR)}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "4px",
                        flexDirection: "column",
                        gap: "10px",
                        height: '100vh'
                    }}
                />
            </div>
        </>
    )
}

export default TabsWrapper