import React from 'react'
import { Layout, Menu, theme } from 'antd';
import styles from '@organismsCSS/footerComponent/footerComponent.module.scss'

const { Header, Content, Footer, Sider }: any = Layout;
function FooterComponent() {
    return (
        <Footer style={{ textAlign: 'center' }}>GrowMeDigitally ©2023</Footer>
    )
}

export default FooterComponent