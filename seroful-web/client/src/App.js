import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { LoginForm } from "./components/LoginForm/LoginForm";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";
import { useRecoilState } from "recoil";
import { userState, userToken } from "./store/store";
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
      .then(console.log("User logged in."))
      .catch((err) => console.log(err));

    setUserInfo({
      email: "",
      pw: "",
    });
  };

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.pw)
      .then(() => console.log("User created successfully."))
      .catch((err) => console.log(err));
    setUserInfo({
      email: "",
      pw: "",
    });
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
      Welcome to the party, {user.email}.
      <Button variant="outlined" onClick={() => logout()}>
        Log Out
      </Button>
    </>
  );
}
export default App;
