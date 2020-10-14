import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
// import multer from "multer";
// import path from 'path';

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { settingsStyles } from "../../../styles/settingsStyles";
// import FloatingActionButton from "@material-ui/core/Fab";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, Fab } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/store";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import * as api from "../../../util/api";
export const Settings = () => {
  const styles = settingsStyles();
  const [user, setUser] = useRecoilState(userState);
  const [img, setImg] = useState(null);
  const ref = useRef(null);

  const buttonClick = () => {

    ref.current.click();
  };

  const uploadPhoto = async (ev) => {
    ev.preventDefault();

    try {
      if (img) {
        let formData = new FormData();
        formData.set("image", img, `${Date.now()}-${img.name}`)

        const data = await api.uploadPhoto(formData);
        if (data) {
          const userPhoto = { photoURL: data.fileLocation };
          const user = await api.updateUser(userPhoto);
          console.log(user);
          setUser(x => x = {...x, photoURL: data.fileLocation })
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

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
        {/* cause we're (chip) fuckin nerds */}
        <Typography className={styles.instructor} variant="h6">
          Insert Updates Below:
        </Typography>
      <form className={styles.imgForm} onSubmit={(ev) => uploadPhoto(ev)}>
        <label htmlFor="image">

        <input id="image" name="image" type="file" style={{ display: "none" }} onChange={(ev) => setImg(ev.target.files[0])}/>
        <Fab color="secondary" size="small" component="span" aria-label="add" variant="extended">
          <AddAPhotoIcon /> Upload Photo
        </Fab>
        {img ? 
        <Fab color="secondary" size="small" type="submit" component="button" aria-label="add" variant="extended">
          Confirm
        </Fab>
      : null}
      </label>
      </form>

            <form className={styles.textForm}>
          <TextField
            error
            helperText
            label="Current Username"
            variant="filled"
            className
            placeholder={user.username}
            onBlur
            onChange
          ></TextField>
          <TextField
            error
            helperText
            label="Current Email"
            variant="filled"
            className
            placeholder={user.email}
            onBlur
            onChange
          ></TextField>
          <TextField
            error
            helperText
            label="Current Password"
            variant="filled"
            className
            placeholder={user.pw}
            onBlur
            onChange
          ></TextField>
          <TextField
            error
            helperText
            label="Current Display Name"
            variant="filled"
            className
            placeholder={user.displayName}
            onBlur
            onChange
          ></TextField>
          <Button type='submit' className='btn' onClick>Submit New User Info</Button>
        </form>
      </div>
    </>
  );
};