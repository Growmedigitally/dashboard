import { getUserByCredentials } from "pages/apis/user";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { updateUserData } from "src/redux/actions";
import { getUser } from "src/redux/selectors";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import styles from '@templatesCSS/loginPage/loginPage.module.scss'

function LoginPage() {

  const [cred, setUser] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(getUser);

  useEffect(() => {
    if (userDetails) {
      Router.push("/");
    }
  }, []);

  const login = async () => {
    getUserByCredentials(cred)
      .then((data) => {
        console.log("getUserByCredentials", data);
        dispatch(updateUserData(data));
        Router.push('/');
      })
      .catch((err) => setLoginError(err.message));
  }

  return <div className={styles.loginPageWrap}>
    <div className={styles.headerWrap}>
      <div className={styles.logoWrap}>
        <img src={'/assets/4.png'} />
      </div>
    </div>
    <div className={styles.bodyWrap}>
      <div className={styles.bodyContent}>
        <div className={styles.leftContent}>
          <img src="assets/images/loginPage/login-image.png" />
        </div>
        <div className={styles.rightContent}>
          <div className={styles.formWrap}>
            <div className={styles.heading}>Welcome back!</div>
            <input
              placeholder="username"
              value={cred.username}
              onChange={(e) => setUser({ ...cred, username: e.target.value })}
            />
            <br />

            <input
              placeholder="password"
              value={cred.password}
              onChange={(e) => setUser({ ...cred, password: e.target.value })}
            />
            <br />
            {loginError}
            <button onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default LoginPage;
