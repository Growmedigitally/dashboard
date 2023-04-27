import React, { ReactElement } from "react";
import styles from "@templatesCSS/homePage/homePage.module.scss";
import Router from "next/router";
import { removeValueFromCookies } from "src/utils/webstorage";
import { USER_COOKIE_KEY } from "src/constants/user";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { updateUserData } from "src/redux/actions";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    removeValueFromCookies(USER_COOKIE_KEY);
    dispatch(updateUserData(null));
    Router.push('/login');
  }

  return (
    <div className={styles.homePageContainer}>

    </div>
  );
}
export default HomePage;
