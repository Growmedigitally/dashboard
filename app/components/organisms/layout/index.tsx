import Head from "next/head";
import { ReactNode, useEffect } from "react";
import styles from "@styles/components/organisms/layout/layout.module.scss";
import HeadMetaTags from "@module/headMetaTags";
import { getUserByToken } from "@apiService/user";
import Router from "next/router";
import { useAppSelector } from "@hook/useAppSelector";
import { getUser } from "@reduxStore/selectors";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "@hook/useAppDispatch";
import { updateUserData } from "@reduxStore/actions";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

  const state = useSelector((state: any) => state);
  const userDetails = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('redux state', state)
  }, [state])

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
      <HeadMetaTags title={'Nextjs-redux-ts-layout'} description={'Nextjs-redux-ts-layout'} image={'Nextjs-redux-ts-layout'} siteName={'Nextjs-redux-ts-layout'} storeData={'Nextjs-redux-ts-layout'} />
      <main className={styles.main}>
        <div>
          <div className={styles.logoWrap}>
            <img src={'/assets/4.png'} />
          </div>
        </div>
        {children}
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </main>
    </>
  );
}
