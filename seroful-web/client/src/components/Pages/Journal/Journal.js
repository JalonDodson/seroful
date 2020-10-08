import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { journalStyles } from "../../../styles/journalStyles";
import {  useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../../store/store";

import {
  Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Typography,
  TextField,
  Typography,
//   Checkbox,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";

export const Journal = () => {
  const styles = journalStyles();

  const [user, setUser] = useRecoilState(userState);  
  console.log(user);
  const [entry, setEntry] = useRecoilState(userState.journals);

  const entries = [];

  const getEntries = async (id) => {
    const entries = await firebase.firestore().collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.userID === user.id ? entries.push(doc) : null;
      })
    });
  };
  
  const submitNewEntry = (ent) => {
    
  };

  return (
    <>
      <Helmet>
        <title>Seroful - Journal</title>
      </Helmet>
      <PageDrawer />
      <div className={styles.container}>
        <header className={styles.header} >
          <hr />
          <Typography variant="h1">
            {user.displayName}'s Journal Entries
          </Typography>
          <hr />
        </header>
        <form>
          <TextField
          label="New Entry"
          type="text"
          vairent="filled"
          className={styles.newEntry}
          />
          <Button
          vairant="contained"
          onClick={(ev) => submitNewEntry((x) => {x = ev.target.value})}
          >Add Journal Entry</Button>
        </form>
      </div>
    </>
  );
};
