import React, { useState, useEffect } from "react";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { Navigator } from "./components/Navigator/Navigator";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, userToken } from "./store/store";
import * as api from "./util/api";

firebase.initializeApp(firebaseConfig);

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();
  const [activeUser, setActive] = useRecoilState(userState);
  // eslint-disable-next-line

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user)
      await api.getActiveUser(user.email).then((resp) => setActive(resp));
    if (init) setInit(false);
  };

  // useEffect(() => {
  //   const subscriber = firebase.firestore()
  //   .collection("users")
  //   .doc(user.email)
  // })

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line
  }, []);

  if (init) return null;
  if (!user) {
    return <LoginForm />;
  }
  return (
    <>
      <Navigator />
    </>
  );
}
export default App;
