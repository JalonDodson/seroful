import React, { useEffect, useState } from "react"; // react
import { Helmet } from "react-helmet"; // react
import { Button, TextField, Typography } from "@material-ui/core"; // material-ui
import { ThemeProvider } from "@material-ui/core/styles"; // material-ui
import ArrowBackIcon from "@material-ui/icons/ArrowBack"; // material-ui
import firebase from "firebase/app"; // firebase
import "firebase/auth"; // firebase
import "firebase/firestore"; // firebase
import * as api from "../../util/api"; // api
import { userState, newUser } from "../../store/store"; // state
import { useRecoilState, useSetRecoilState } from "recoil"; // state
import molecule from "../../resources/molecule.png"; // logo
import { loginStyles, textTheme } from "../../styles/loginStyles"; // styles

export const LoginForm = () => {
  const styles = loginStyles();

  const [userInfo, setUserInfo] = useState({
      email: "",
      pw: "",
      displayName: "",
      username: "",
    }),
    setNewUser = useSetRecoilState(newUser),
    [enableRegister, setEnableRegister] = useState(!1);

  const [loginHelper, setLoginHelper] = useState({
      txt: "",
      errorMsg: "",
      emailError: !1,
      pwError: !1,
    }),
    [registerHelper, setRegisterHelper] = useState({
      txt: "",
      pwText: "",
      userTxt: "",
      emailError: !1,
      pwError: !1,
      userError: !1,
    }),
    [pwHelpers, setPwHelpers] = useState({ error: !1, helperText: "" }),
    [pwConfirm, setPwConfirm] = useState("");

  useEffect(() => {
    return (
      loginHelper.errorMsg &&
        ("auth/invalid-email" === loginHelper.errorMsg
          ? setLoginHelper(
              (a) =>
                (a = {
                  ...a,
                  txt: "Oh noes, that's an invalid email!",
                  emailError: !0,
                })
            )
          : "auth/user-not-found" === loginHelper.errorMsg
          ? setLoginHelper(
              (a) =>
                (a = {
                  ...a,
                  txt: "Dangit, that email isn't registered!",
                  emailError: !0,
                })
            )
          : "auth/wrong-password" === loginHelper.errorMsg &&
            setLoginHelper(
              (a) =>
                (a = {
                  ...a,
                  pwText:
                    "Aw man, that's the wrong password! Remember, it's case-sensitive!",
                  pwError: !0,
                })
            )),
      registerHelper.errorMsg &&
        ("auth/email-already-in-use" === registerHelper.errorMsg
          ? setRegisterHelper(
              (a) =>
                (a = {
                  ...a,
                  txt:
                    "Aw snap, that email is already in use! Did you mean to login?",
                  emailError: !0,
                })
            )
          : "auth/invalid-email" === registerHelper.errorMsg &&
            setRegisterHelper(
              (a) =>
                (a = {
                  ...a,
                  txt: "Oh noes, that's an invalid email!",
                  emailError: !0,
                })
            )),
      pwConfirm && pwConfirm !== userInfo.pw
        ? setPwHelpers(
            (a) => (a = { error: !0, helperText: "Passwords do not match!" })
          )
        : setPwHelpers((a) => (a = { error: !1, helperText: "" }))
    );
    // eslint-disable-next-line
  }, [loginHelper.errorMsg, registerHelper.errorMsg, pwConfirm]);

  const checkIfUsed = () => {
    setRegisterHelper(
      (a) => (a = { ...a, txt: "", userTxt: "", userError: !1, emailError: !1 })
    );

    return (
      (userInfo.email.includes("@") || 4 <= userInfo.username.length) &&
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((a) => {
          a.forEach((a) => {
            const { email: b, username: c } = a.data(),
              // eslint-disable-next-line
              d =
                b === userInfo.email
                  ? setRegisterHelper(
                      (a) =>
                        (a = {
                          ...a,
                          txt: "That email has already been taken!",
                          emailError: !0,
                        })
                    )
                  : null,
              // eslint-disable-next-line
              e =
                c === userInfo.username
                  ? setRegisterHelper(
                      (a) =>
                        (a = {
                          ...a,
                          userTxt: "That username has already been taken!",
                          userError: !0,
                        })
                    )
                  : null;
          });
        })
    );
  };

  const login = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.pw)
      .then(console.log(`User has triggered a login attempt.`))
      .catch((e) => {
        setLoginHelper((h) => (h = { ...h, errorMsg: e.code }));
        console.log(e);
      });
    setUserInfo((x) => (x = { email: "", pw: "" }));
  };

  //
  const register = () => {
    const { username, displayName, email, pw } = userInfo;
    try {
      firebase.auth().createUserWithEmailAndPassword(email, pw);
      api.createUser(username, displayName, email);
    } catch (e) {
      setRegisterHelper((h) => (h = { ...h, errorMsg: e.code }));
    }
    setUserInfo((x) => (x = { email: "", pw: "" }));
    setNewUser(!0);
  };

  return (
    <>
      {!enableRegister ? (
        <>
          <Helmet>
            <title>Seroful - Login</title>
          </Helmet>
          <div className={styles.loginDiv}>
            <ThemeProvider theme={textTheme}>
              <Typography className={styles.seroful} variant="h3">
                Seroful
              </Typography>
              <img
                className={styles.images}
                src={molecule}
                alt="molecule.png"
              />
              <br />
              <form autoComplete="off">
                <TextField
                  label="Email"
                  type="email"
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
                  onChange={(ev) => {
                    ev.persist();
                    setUserInfo((x) => (x = { ...x, email: ev.target.value }));
                  }}
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
                  onChange={(ev) => {
                    ev.persist();
                    setUserInfo((x) => (x = { ...x, pw: ev.target.value }));
                  }}
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
        </>
      ) : (
        <>
          <Helmet>
            <title>Seroful - Register</title>
          </Helmet>
          <div className={styles.loginDiv}>
            <ThemeProvider theme={textTheme}>
              <Typography className={styles.seroful} variant="h3">
                Seroful
              </Typography>
              <img
                className={styles.images}
                src={molecule}
                alt="molecule.png"
              />
              <form autoComplete="off">
                <TextField
                  label="Display Name"
                  variant="filled"
                  className={styles.names}
                  value={userInfo.displayName}
                  onChange={(ev) => {
                    ev.persist();
                    setUserInfo((x) => (x = { ...x, displayName: ev.target.value }));
                  }}
                />
                <br />
                <TextField
                  error={registerHelper.userError}
                  helperText={registerHelper.userTxt}
                  label="Username"
                  variant="filled"
                  className={styles.username}
                  value={userInfo.username}
                  onBlur={() => checkIfUsed()}
                  onChange={(ev) => {
                    ev.persist();
                    setUserInfo((x) => (x = { ...x, username: ev.target.value }));
                  }}
                />
                <br />
                <br />
                <TextField
                  error={registerHelper.emailError}
                  helperText={registerHelper.txt}
                  onBlur={() => checkIfUsed()}
                  onFocus={() =>
                    setRegisterHelper(
                      (x) => (x = { ...x, emailError: false, txt: "" })
                    )
                  }
                  label="Email"
                  type="email"
                  variant="filled"
                  className={styles.email}
                  value={userInfo.email}
                  onChange={(ev) => {
                    ev.persist();
                    setUserInfo((x) => (x = { ...x, email: ev.target.value }));
                  }}
                />
                <br />
                <TextField
                  error={
                    userInfo.pw && userInfo.pw.length < 6 && userInfo.pw !== "" || false
                  }
                  helperText={
                    userInfo.pw && userInfo.pw.length < 6 && userInfo.pw !== ""
                      ? "Your password must be at least 6 characters!"
                      : null
                  }
                  label="Password"
                  type="password"
                  variant="filled"
                  className={styles.password}
                  value={userInfo.pw}
                  onChange={(ev) => {
                    ev.persist();
                    setUserInfo((x) => (x = { ...x, pw: ev.target.value }));
                  }}
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
                  onClick={() => {
                    setEnableRegister(false);
                    setUserInfo((x) => (x = { email: "", pw: "" }));
                    return;
                  }}
                  startIcon={<ArrowBackIcon />}
                >
                  Back to Login
                </Button>
                <Button
                  variant="contained"
                  className={styles.button2}
                  disabled={
                    (userInfo.pw && userInfo.pw.length < 6) ||
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
        </>
      )}
    </>
  );
};
