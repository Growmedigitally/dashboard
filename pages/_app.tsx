import React, { useEffect, ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "@styles/app.scss";
import { NextPage } from "next";
import withTheme from "src/theme";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@reduxStore/store/store";
import Loader from "@organisms/loader";
import AlertNotification from "@organisms/alert";
import Toast from "@organisms/toast";
NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const store: any = useStore();
  // Use the layout defined at the page level, if available
  const getLayout: any = Component.getLayout ?? ((page) => page);
  return (
    <PersistGate persistor={store.__persistor} loading={<Loader />}>
      <Loader />
      <Toast />
      <AlertNotification />
      {withTheme(getLayout(<Component {...pageProps} />))}
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp);

export function reportWebVitals(metric) {
  // console.log('Largest Contentful Paint', metric)
}
