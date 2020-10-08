import React, { useState, useEffect } from "react";

import { LoginForm } from "./components/LoginForm/LoginForm";
import { Navigator } from "./components/Navigator/Navigator";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";
import { useRecoilState } from "recoil";
import { userToken } from "./store/store";

firebase.initializeApp(firebaseConfig);

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  // eslint-disable-next-line
  const [token, setToken] = useRecoilState(userToken);

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (user) {
      console.log(user);
      const token = await user.getIdToken();
      setToken(token);
    }

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