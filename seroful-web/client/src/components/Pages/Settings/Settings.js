import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import multer from "multer";
import path from 'path';

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { settingsStyles } from "../../../styles/settingsStyles";
import FloatingActionButton from "@material-ui/core/Fab";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";
import { updateUser } from '../../../util/api';

export const Settings = () => {
  const styles = settingsStyles();
  const [user, setUser] = useRecoilState(userState);
  const ref = useRef(null);

  const buttonClick = () => {
    ref.current.click();
  };

  const handleChange = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const newImg = ev.target.files[0];
    setUser({...user, photoURL: newImg.name});
    updateUser(user)
    console.log(newImg.name)

    // const imgFiles = /jpeg|jpg|png|gif/;
    // const extName = fileTypes.test(path.extname(ev.originalname).toLowerCase());

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
        {/* cause we're (chip) fuckin nerds */}
        <Typography className={styles.instructor} variant="h6">
          Insert Updates Below:
        </Typography>
        <form
          className={styles.form}
          method="PATCH"
          action="/users"
          encType="multipart/form-data"
        >
          <input id="input" className={styles.input} ref={ref} type="file" onChange={(ev) => handleChange(ev)} />
          <ButtonBase
            focusRipple
            key="Profile Photo"
            className={styles.image}
            focusVisibleClassName={styles.focusVisible}
            style={{
              width: "200px",
            }}
            onClick={(ev) => buttonClick(ev)}
          >
            <span
              className={styles.imageSrc}
              style={{
                backgroundImage: ref.current ? `url(${ref.current.files.name})` : user.photoURL ? `url(${user.photoURL})` : `url("../../../resources/molecule.png")`
              }}
            />
            <span className={styles.imageBackdrop} />
            <span className={styles.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={styles.imageTitle}
              >
                {user.username}
                <span className={styles.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
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
          {/* <TextField
            error
            helperText
            label="Current Medicines"
            variant="filled"
            className
            placeholder={user.medicines}
            onBlur
            onChange
          ></TextField>
          <TextField
            error
            helperText
            label="Current Illnesses"
            variant="filled"
            className
            placeholder={user.illnesses}
            onBlur
            onChange
          ></TextField> */}
          <Button type='submit' className='btn' onClick>Submit New User Info</Button>
        </form>
      </div>
    </>
  );
};
