import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import * as api from "../../util/api";

import {
  userState,
  loginHelperState,
  registerHelperState,
} from "../../store/store";
import { useRecoilState } from "recoil";

import molecule from "../../resources/molecule.png";
import { loginStyles, textTheme } from "../../styles/loginStyles";

export const LoginForm = (props) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const styles = loginStyles();
  const [enableRegister, setEnableRegister] = useState(false);
  const [loginHelper, setLoginHelper] = useState({
    txt: "",
    errorMsg: "",
    emailError: false,
    pwError: false,
  });

  const [registerHelper, setRegisterHelper] = useState({
    txt: "",
    pwText: "",
    userTxt: "",
    emailError: false,
    pwError: false,
    userError: false,
  });

  const [pwConfirm, setPwConfirm] = useState("");
  const [pwHelpers, setPwHelpers] = useState({
    error: false,
    helperText: "",
  });

  useEffect(() => {
    if (loginHelper.errorMsg) {
      if (loginHelper.errorMsg === "auth/invalid-email") {
        setLoginHelper(
          (x) =>
            (x = {
              ...x,
              txt: "Oh noes, that's an invalid email!",
              emailError: true,
            })
        );
      } else if (loginHelper.errorMsg === "auth/user-not-found") {
        setLoginHelper(
          (x) =>
            (x = {
              ...x,
              txt: "Dangit, that email isn't registered!",
              emailError: true,
            })
        );
      } else if (loginHelper.errorMsg === "auth/wrong-password") {
        setLoginHelper(
          (x) =>
            (x = {
              ...x,
              pwText:
                "Aw man, that's the wrong password! Remember, it's case-sensitive!",
              pwError: true,
            })
        );
      }
    }
  }, [loginHelper.errorMsg]);

  useEffect(() => {
    if (registerHelper.errorMsg) {
      if (registerHelper.errorMsg === "auth/email-already-in-use") {
        setRegisterHelper(
          (x) =>
            (x = {
              ...x,
              txt:
                "Aw snap, that email is already in use! Did you mean to login?",
              emailError: true,
            })
        );
      } else if (registerHelper.errorMsg === "auth/invalid-email") {
        setRegisterHelper(
          (x) =>
            (x = {
              ...x,
              txt: "Oh noes, that's an invalid email!",
              emailError: true,
            })
        );
      }
    }
  }, [registerHelper.errorMsg]);

  useEffect(() => {
    if (pwConfirm && pwConfirm !== userInfo.pw) {
      setPwHelpers(
        (x) => (x = { error: true, helperText: "Passwords do not match!" })
      );
    } else {
      setPwHelpers((x) => (x = { error: false, helperText: "" }));
    }
  }, [pwConfirm]);

  const checkIfUsed = () => {
    setRegisterHelper(
      (x) =>
        (x = {
          ...x,
          txt: "",
          userTxt: "",
          userError: false,
          emailError: false,
        })
    );

    if (userInfo.email.includes("@") || userInfo.username.length >= 4) {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((query) => {
          query.forEach((docs) => {
            const { email, username } = docs.data();
            if (email === userInfo.email) {
              setRegisterHelper(
                (x) =>
                  (x = {
                    ...x,
                    txt: "That email has already been taken!",
                    emailError: true,
                  })
              );
            }

            if (username === userInfo.username) {
              setRegisterHelper(
                (x) =>
                  (x = {
                    ...x,
                    userTxt: "That username has already been taken!",
                    userError: true,
                  })
              );
            }
          });
        });
    }
  };
  const login = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.pw)
      .then(console.log(`User has triggered a login attempt.`))
      .catch((err) => {
        setLoginHelper((x) => (x = { ...x, errorMsg: err.code }));
        console.log(err);
      });
    setUserInfo(
      (x) => (x = { pw: "", email: "", username: "", displayName: "" })
    );
  };
  //
  const register = () => {
    const { username, displayName, email, pw } = userInfo;
    console.log(username, displayName, email);
    try {
      firebase.auth().createUserWithEmailAndPassword(email, pw);
      api.createUser(username, displayName, email);
    } catch (err) {
      setRegisterHelper((x) => (x = { ...x, errorMsg: err.code }));
      console.log(err);
    }
    setUserInfo(
      (x) => (x = { pw: "", email: "", username: "", displayName: "" })
    );
  };

  return (
    <>
      {!enableRegister ? (
        <div className={styles.loginDiv}>
          <ThemeProvider theme={textTheme}>
            <Typography className={styles.seroful} variant="h3">
              Seroful
            </Typography>
            <img className={styles.images} src={molecule} alt="molecule.png" />
            <br />
            <form noValidate autoComplete="off">
              <TextField
                label="Email"
                variant="filled"
                className={styles.email}
                error={loginHelper.emailError}
                helperText={loginHelper.txt}
                value={userInfo.email}
                onFocus={() =>
                  setLoginHelper(
                    (x) => (x = { ...x, emailError: false, txt: "" })
                  )
                }
                onChange={(ev) =>
                  setUserInfo((x) => (x = { ...x, email: ev.target.value }))
                }
              />
              <br />
              <TextField
                label="Password"
                type="password"
                variant="filled"
                className={styles.password}
                error={loginHelper.pwError}
                helperText={loginHelper.pwText}
                value={userInfo.pw}
                onFocus={() =>
                  setLoginHelper(
                    (x) => (x = { ...x, pwError: false, pwText: "" })
                  )
                }
                onChange={(ev) =>
                  setUserInfo((x) => (x = { ...x, pw: ev.target.value }))
                }
              />
              <br />
              <Button
                variant="contained"
                className={styles.button1}
                onClick={() => login()}
              >
                Login
              </Button>
              <Button
                variant="contained"
                className={styles.button2}
                onClick={() => setEnableRegister(true)}
              >
                Register
              </Button>
            </form>
          </ThemeProvider>
        </div>
      ) : (
        <div className={styles.loginDiv}>
          <ThemeProvider theme={textTheme}>
            <Typography className={styles.seroful} variant="h3">
              Seroful
            </Typography>
            <img className={styles.images} src={molecule} alt="molecule.png" />
            <form noValidate autoComplete="off">
              <TextField
                name="display"
                label="Display Name"
                variant="filled"
                className={styles.names}
                value={userInfo.displayName}
                onChange={(ev) =>
                  setUserInfo(
                    (x) => (x = { ...x, displayName: ev.target.value })
                  )
                }
              />
              <br />
              <TextField
                error={registerHelper.userError}
                helperText={registerHelper.userTxt}
                name="username"
                label="Username"
                variant="filled"
                className={styles.username}
                value={userInfo.username}
                onBlur={() => checkIfUsed()}
                onChange={(ev) =>
                  setUserInfo((x) => (x = { ...x, username: ev.target.value }))
                }
              />
              <br />
              <br />
              <TextField
                error={registerHelper.emailError}
                helperText={registerHelper.txt}
                name="email"
                onBlur={() => checkIfUsed()}
                onFocus={() =>
                  setRegisterHelper(
                    (x) => (x = { ...x, emailError: false, txt: "" })
                  )
                }
                label="Email"
                variant="filled"
                className={styles.email}
                value={userInfo.email}
                onChange={(ev) =>
                  setUserInfo((x) => (x = { ...x, email: ev.target.value }))
                }
              />
              <br />
              <TextField
                error={userInfo.pw.length < 6 && userInfo.pw !== ""}
                helperText={
                  userInfo.pw.length < 6 && userInfo.pw !== ""
                    ? "Your password must be at least 6 characters!"
                    : ""
                }
                name="password"
                label="Password"
                type="password"
                variant="filled"
                className={styles.password}
                value={userInfo.pw}
                onChange={(ev) =>
                  setUserInfo((x) => (x = { ...x, pw: ev.target.value }))
                }
              />
              <br />
              <TextField
                error={pwHelpers.error}
                helperText={pwHelpers.helperText}
                label="Confirm Password"
                type="password"
                variant="filled"
                value={pwConfirm}
                className={styles.password}
                onBlur={() =>
                  setPwHelpers((x) => (x = { helperText: "", error: false }))
                }
                onChange={(ev) => setPwConfirm(ev.target.value)}
              />
              <br />
              <Button
                variant="contained"
                className={styles.button1}
                onClick={() => setEnableRegister(false)}
                startIcon={<ArrowBackIcon />}
              >
                Back to Login
              </Button>
              <Button
                variant="contained"
                className={styles.button2}
                disabled={
                  userInfo.pw.length < 6 ||
                  registerHelper.emailError ||
                  registerHelper.userError ||
                  pwConfirm !== userInfo.pw
                }
                onClick={() => register()}
              >
                Register
              </Button>
            </form>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
