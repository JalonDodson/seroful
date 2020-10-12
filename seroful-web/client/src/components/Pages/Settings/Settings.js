import React from "react";
import { Helmet } from "react-helmet";
import multer from "multer";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { settingsStyles } from "../../../styles/settingsStyles";
import FloatingActionButton from "@material-ui/core/Fab";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";

export const Settings = () => {
  const styles = settingsStyles();
  const [user, setUser] = useRecoilState(userState);

  const handleUpdate = ({}) => {
    setUser({});
  };
  /*
  basically have a new collection in firestore called 'friends'
  collection has two (docs? idk wtf you call them) called wait fuck hang on
  ok so scratch that shit
  user has a new collection called 'friends' and inside there is called 'current' and 'pending'
  all pending friend requests go there and shit and yeah and shit and fuck shit and fuck
  and shit
*/
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
          <label htmlFor="input">
            <input id='input' className={styles.input} type="file" />
              <ButtonBase
                focusRipple
                key="Profile Photo"
                className={styles.image}
                focusVisibleClassName={styles.focusVisible}
                style={{
                  width: "200px",
                }}
              >
                <span
                  className={styles.imageSrc}
                  style={{
                    backgroundImage: `url(${user.photo})`,
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
          </label>
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
          <TextField
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
          ></TextField>
        </form>
      </div>
    </>
  );
};
