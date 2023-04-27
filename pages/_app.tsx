import React, { useEffect, ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { wrapper } from "src/redux/store/store";
import Router from "next/router";
import NProgress from "nprogress";
import "@styles/app.scss";
import { NextPage } from "next";
import withTheme from "src/theme";
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const WrappedApp = ({ Component, pageProps, }: AppPropsWithLayout) => {

  useEffect(() => {
    console.log("_app called", pageProps)
    if (pageProps) {
      // updateManifestFile(pageProps.storeData);
    }
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout: any = Component.getLayout ?? ((page) => page);

  return withTheme(getLayout(<Component {...pageProps} />));
};

export default wrapper.withRedux(WrappedApp);

export function reportWebVitals(metric) {
  // console.log('Largest Contentful Paint', metric)
}
