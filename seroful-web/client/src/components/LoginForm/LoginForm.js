import React, { useEffect, useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {
  userState,
  loginHelperState,
  registerHelperState,
} from "../../store/store";
import { useRecoilState } from "recoil";

import molecule from "../../resources/molecule.png";
import { loginStyles, textTheme } from "../../styles/loginStyles";

export const LoginForm = (props) => {
  const styles = loginStyles();
  const [enableRegister, setEnableRegister] = useState(false);
  // eslint-disable-next-line
  const [loginHelper, setLoginHelper] = useRecoilState(loginHelperState);
  const [registerHelper, setRegisterHelper] = useRecoilState(
    registerHelperState
  );
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwHelpers, setPwHelpers] = useState({
    error: false,
    helperText: "",
  });

  useEffect(() => {
    if (pwConfirm && pwConfirm !== userInfo.pw) {
      setPwHelpers(
        (x) => (x = { error: true, helperText: "Passwords do not match!" })
      );
    } else {
      setPwHelpers((x) => (x = { error: false, helperText: "" }));
    }
  }, [pwConfirm]);
  // auth/invalid-email auth/user-not-found auth/wrong-password
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
              txt:
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
                helperText={loginHelper.txt}
                value={userInfo.pw}
                InputLabelProps={styles.labelProps}
                onFocus={() =>
                  setLoginHelper((x) => (x = { ...x, pwError: false, txt: "" }))
                }
                onChange={(ev) =>
                  setUserInfo((x) => (x = { ...x, pw: ev.target.value }))
                }
              />
              <br />
              <Button
                variant="contained"
                className={styles.button1}
                onClick={props.login}
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
                error={registerHelper.emailError}
                helperText={registerHelper.txt}
                onFocus={() =>
                  setRegisterHelper(
                    (x) => (x = { ...x, emailError: false, txt: "" })
                  )
                }
                label="Email"
                variant="filled"
                className={styles.email}
                value={userInfo.email}
                InputLabelProps={styles.labelProps}
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
                onClick={props.register}
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
