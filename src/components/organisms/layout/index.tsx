import { ReactNode, useEffect, useState } from "react";
import styles from "@organismsCSS/layout/layout.module.scss";
import { getUserByToken } from "pages/apis/user";
import Router from "next/router";
import { useAppSelector } from "src/hooks/useAppSelector";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "src/hooks/useAppDispatch";
import HeadMetaTags from "src/components/organisms/headMetaTags";
import SidebarComponent from "src/components/organisms/sidebar";
import FooterComponent from "src/components/organisms/footerComponent";
import { Button, Layout, theme } from 'antd';
const { Header, Content } = Layout;

import HeaderComponent from "src/components/organisms/headerComponent";
import { getAuthUserState, setAuthUser } from "src/redux/slices/auth";
import { consoleLog } from "@util/conole.log";
import ErrorBoundary from "@organisms/errorBoundary";

type LayoutProps = {
  children: ReactNode;
};

export default function LayoutComponent({ children }: LayoutProps) {

  const state = useSelector((state: any) => state);
  const userDetails = useAppSelector(getAuthUserState);
  const dispatch = useAppDispatch();

  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    console.log('redux state', state)
  }, [state])

  useEffect(() => {
    if (!userDetails) {
      getUserByToken().then((user) => {
        dispatch(setAuthUser(user));
      }).catch(() => {
        Router.push("/401");
      })
    }
  }, []);

  return (
    <>
      <HeadMetaTags title={'GrowMeDigitally'} description={'GrowMeDigitally'} image={'GrowMeDigitally'} siteName={'GrowMeDigitally'} storeData={'GrowMeDigitally'} />
      <Layout style={{ minHeight: '100vh' }}>
        <SidebarComponent />
        <Layout>
          <HeaderComponent />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
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
