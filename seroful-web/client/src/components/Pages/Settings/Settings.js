import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
// import multer from "multer";
// import path from 'path';

import firebase from "firebase/app";
import "firebase/auth";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { settingsStyles } from "../../../styles/settingsStyles";
// import FloatingActionButton from "@material-ui/core/Fab";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, Fab } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/store";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import * as api from "../../../util/api";
export const Settings = () => {
  const styles = settingsStyles();
  const [user, setUser] = useRecoilState(userState);
  const [img, setImg] = useState(null);
  const [newData, setNewData] = useState(null);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const uploadPhoto = async (ev) => {
    ev.preventDefault();

    try {
      if (img) {
        let formData = new FormData();
        formData.set("image", img, `${Date.now()}-${img.name}`);

        const data = await api.uploadPhoto(formData);
        if (data) {
          const userPhoto = { photoURL: data.fileLocation };
          const user = await api.updateUser(userPhoto);
          console.log(user);
          setUser((x) => (x = { ...x, photoURL: data.fileLocation }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserInfo = async (ev) => {
    console.log(newData);
    if (newData && newData.email)
      firebase.auth().currentUser.updateEmail(newData.email);

    api.updateUser(newData);

    if (newData && newData.password)
      firebase
        .auth()
        .currentUser.updatePassword(newData.password)
        .then((x) =>
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log(
                "User has changed their password and has been signed out."
              );
              setError(false);
            })
        );
  };

  return (
    <>
      <Helmet>
        <title>Seroful - Settings</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            {user.displayName}'s Settings
          </Typography>
          <hr />
        </header>
        <Typography className={styles.instructor} variant="h6">
          Insert Updates Below:
        </Typography>
        <form
          style={{ textAlign: "center" }}
          onSubmit={(ev) => uploadPhoto(ev)}
        >
          <label htmlFor="image">
            <input
              id="image"
              name="image"
              type="file"
              style={{ display: "none" }}
              onChange={(ev) => setImg(ev.target.files[0])}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddAPhotoIcon /> Upload Photo
            </Fab>
            {img ? (
              <Fab
                color="secondary"
                size="small"
                type="submit"
                component="button"
                aria-label="add"
                variant="extended"
              >
                Confirm
              </Fab>
            ) : null}
          </label>
        </form>
        <br />
        <div className={styles.inputs}>
          <Typography variant="caption">
            * Any options left blank will not be changed.
          </Typography>
          <br />
          <TextField
            onChange={(ev) => {
              const value = ev.target.value;
              setNewData((x) => (x = { ...x, username: value }));
            }}
            label="New Username"
          />
          <br />
          <TextField
            onChange={(ev) => {
              const value = ev.target.value;
              setNewData((x) => (x = { ...x, displayName: value }));
            }}
            label="New Display Name"
          />
          <br />
          <TextField
            onChange={(ev) => {
              const value = ev.target.value;
              setNewData((x) => (x = { ...x, email: value }));
            }}
            label="New Email"
          />
          <br />
          <br />
          <TextField
            error={newData.password && newData.password.length < 6}
            helperText="Password must be at least 6 characters!"
            onChange={(ev) => {
              const value = ev.target.value;
              setNewData((x) => (x = { ...x, password: value }));
            }}
            label="New Password"
          />
          <TextField
            error={error}
            helperText="Passwords do not match!"
            onChange={(ev) => {
              const value = ev.target.value;
              return value !== newData.password && value !== ""
                ? setError(true)
                : null;
            }}
            label="Confirm Password"
          />
        </div>
        <Button className="btn" onClick={() => handleUserInfo()}>
          Submit New User Info
        </Button>
      </div>
    </>
  );
};
