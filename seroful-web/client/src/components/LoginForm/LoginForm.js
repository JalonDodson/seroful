import React, { useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { emailState, pwState } from "../../store/store";
import { useRecoilState } from "recoil";

import molecule from "../../resources/molecule.png";
import { loginStyles } from "../../styles/loginStyles";

export const LoginForm = (props) => {
  const styles = loginStyles();
  const [enableRegister, setEnableRegister] = useState(false);
  // eslint-disable-next-line
  const [email, setEmail] = useRecoilState(emailState);
  // eslint-disable-next-line
  const [pw, setPw] = useRecoilState(pwState);

  return (
    <>
      {!enableRegister ? (
        <div className={styles.loginDiv}>
          <Typography className={styles.seroful} variant="h3">
            Seroful
          </Typography>
          <img className={styles.images} src={molecule} alt="molecule.png" />
          <form noValidate autoComplete="off">
            <TextField
              label="Email"
              variant="outlined"
              className={styles.email}
              onBlur={(ev) => setEmail((x) => ev.target.value)}
            />
            <br />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              className={styles.password}
              onBlur={(ev) => setPw((x) => ev.target.value)}
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
        </div>
      ) : (
        <div className={styles.loginDiv}>
          <Typography className={styles.seroful} variant="h3">
            Seroful
          </Typography>
          <img className={styles.images} src={molecule} alt="molecule.png" />
          <form noValidate autoComplete="off">
            <TextField
              label="Email"
              variant="outlined"
              className={styles.email}
              onBlur={(ev) => setEmail((x) => ev.target.value)}
            />
            <br />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              className={styles.password}
              onBlur={(ev) => setPw((x) => ev.target.value)}
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
        </div>
      )}
    </>
  );
};
