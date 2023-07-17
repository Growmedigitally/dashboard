import React from "react";
import styles from "@templatesCSS/homePage/homePage.module.scss";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import ImageEditor from "@template/imageEditor";

const HomePage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.homePageContainer}>
      <ImageEditor />
    </div>
  );
}
export default HomePage;
