import { getUserByCredentials } from "@apiService/user";
import { useAppDispatch } from "@hook/useAppDispatch";
import { useAppSelector } from "@hook/useAppSelector";
import { updateUserData } from "@reduxStore/actions";
import { getUser } from "@reduxStore/selectors";
import Router from "next/router";
import React, { useEffect, useState } from "react";

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

  return <div>
    {loginError}
    <br />
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

    <button onClick={login}>
      Login
    </button>
  </div>;
}

export default LoginPage;
