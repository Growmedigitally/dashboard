import React from "react";
import styles from "@templatesCSS/homePage/homePage.module.scss";
import { useAppDispatch } from "src/hooks/useAppDispatch";

const HomePage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.homePageContainer}>
      Home
    </div>
  );
}
export default HomePage;
