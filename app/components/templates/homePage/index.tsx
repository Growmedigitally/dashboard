import React, { ReactElement } from "react";
import styles from "@styles/components/templates/homePage/homePage.module.scss";
import Router from "next/router";
import { removeValueFromCookies } from "@util/webstorage";
import { USER_COOKIE_KEY } from "@constant/user";
import { useAppDispatch } from "@hook/useAppDispatch";
import { updateUserData } from "@reduxStore/actions";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    removeValueFromCookies(USER_COOKIE_KEY);
    dispatch(updateUserData(null));
    Router.push('/login');
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div onClick={() => Router.push('/about')}>
          About
        </div>
        <br />
        <div onClick={onLogout}>
          Logout
        </div>
      </main>
    </div>
  );
}
export default HomePage;
