import { ReactNode, useEffect, useState } from "react";
import styles from "@organismsCSS/layout/layout.module.scss";
import { getUserByToken } from "pages/apis/user";
import Router from "next/router";
import { useAppSelector } from "src/hooks/useAppSelector";
import { getUser } from "src/redux/selectors";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { updateUserData } from "src/redux/actions";
import HeadMetaTags from "src/components/organisms/headMetaTags";
import SidebarComponent from "src/components/organisms/sidebar";
import FooterComponent from "src/components/organisms/footerComponent";
import { Button, Layout, theme } from 'antd';
const { Header, Content } = Layout;

import HeaderComponent from "src/components/organisms/headerComponent";

type LayoutProps = {
  children: ReactNode;
};

export default function LayoutComponent({ children }: LayoutProps) {

  const state = useSelector((state: any) => state);
  const userDetails = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log('redux state', state)
  }, [state])

  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    if (!userDetails) {
      getUserByToken().then((user) => {
        dispatch(updateUserData(user));
      }).catch(() => {
        Router.push("/login");
      })
    }
  }, []);

  return (
    <>
      <HeadMetaTags title={'GrowMeDigitally'} description={'GrowMeDigitally'} image={'GrowMeDigitally'} siteName={'GrowMeDigitally'} storeData={'GrowMeDigitally'} />
      <Layout style={{ minHeight: '100vh' }}>
        <SidebarComponent collapsed={collapsed} />
        <Layout>
          <HeaderComponent collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
              {children}
            </div>
          </Content>
          <FooterComponent />
          <div className={styles.contentContainer}>
          </div>
        </Layout>
      </Layout>
      <main className={styles.layoutContainer}>
      </main>
    </>
  );
}
