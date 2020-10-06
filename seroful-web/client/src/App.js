import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { Navigator } from "./components/Navigator/Navigator";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";
import { useRecoilState } from "recoil";
import { userState, userToken, loginHelperState, registerHelperState } from "./store/store";
import * as api from "./util/api";
/* 

  api.users() // then some shit here
*/
firebase.initializeApp(firebaseConfig);

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(userToken);
  const [loginHelper, setLoginHelper] = useRecoilState(loginHelperState);
  const [registerHelper, setRegisterHelper] = useRecoilState(registerHelperState);

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      const token = await user.getIdToken();
      setToken(token);
    }

    if (init) setInit(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line
  }, []);
  const login = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.pw)
      .then(console.log(`User has triggered a login attempt.`))
      .catch((err) => {
        setLoginHelper((x) => (x = { ...x, errorMsg: err.code }));
        console.log(err);
      });
      setUserInfo((x) => (x = { pw: "", email: "" }));
  };
// 
  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.pw)
      .then(console.log("User has triggered a registration attempt."))
      .catch((err) => {
        setRegisterHelper((x) => (x = { ...x, errorMsg: err.code }));
        console.log(err);
      });
      setUserInfo((x) => (x = { pw: "", email: "" }));
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out."));
  };

  if (init) return null;
  if (!user) {
    return <LoginForm login={() => login()} register={() => register()} />;
  }
  return (
    // replace with Navigator component
    <>
      <Navigator />
    </>
  );
}
export default App;