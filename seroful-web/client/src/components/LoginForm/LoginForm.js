import React, { useState } from "react";

import { Button, TextField, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { userState } from "../../store/store";
import { useRecoilState } from "recoil";

import molecule from "../../resources/molecule.png";
import { loginStyles } from "../../styles/loginStyles";

export const LoginForm = (props) => {
  const styles = loginStyles();
  const [enableRegister, setEnableRegister] = useState(false);
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useRecoilState(userState);

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
              label="First Name"
              variant="outlined"
              className={styles.email}
              onBlur={(ev) =>
                setUserInfo((x) => (x = { ...x, first: ev.target.value }))
              }
            />
            <br />
            <TextField
              label="Last Name"
              variant="outlined"
              className={styles.password}
              onBlur={(ev) =>
                setUserInfo((x) => (x = { ...x, last: ev.target.value }))
              }
            />
            <br />
            <br />
            <TextField
              label="Email"
              variant="outlined"
              className={styles.email}
              onBlur={(ev) =>
                setUserInfo((x) => (x = { ...x, email: ev.target.value }))
              }
            />
            <br />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              className={styles.password}
              onBlur={(ev) =>
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
              onBlur={(ev) =>
                setUserInfo((x) => (x = { ...x, email: ev.target.value }))
              }
            />
            <br />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              className={styles.password}
              onBlur={(ev) =>
                setUserInfo((x) => (x = { ...x, pw: ev.target.value }))
              }
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
