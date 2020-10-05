import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { LoginForm } from "./components/LoginForm/LoginForm";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";
import { useRecoilState } from "recoil";
import { emailState, pwState } from "./store/store";

firebase.initializeApp(firebaseConfig);

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();
  // eslint-disable-next-line
  const [email, setEmail] = useRecoilState(emailState);
  // eslint-disable-next-line
  const [pw, setPw] = useRecoilState(pwState);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (init) setInit(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(email);
  }, [email]);

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(() => console.log("User logged in."))
      .catch((err) => console.log(err));
    setEmail("");
    setPw("");
  };

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then(() => console.log("User created successfully."))
      .catch((err) => console.log(err));
    setEmail("");
    setPw("");
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
    <>
      Welcome to the party, {user.email}.
      <Button variant="outlined" onClick={() => logout()}>
        Log Out
      </Button>
    </>
  );
}
export default App;
