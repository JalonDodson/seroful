import React, { Fragment, useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { friendsStyles } from "../../../styles/friendsStyles";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/store";
import * as api from "../../../util/api";
import { Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper } from "@material-ui/core"

import firebase from "firebase/app";
import "firebase/firestore";

import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";


export const Friends = () => {
    const styles = friendsStyles();
    const [user, setUser] = useRecoilState(userState);
    const [message, setMessage] = useState(null);
    const [deleter, setDeleter] = useState(null);

    const msgRef = useRef();

    useEffect(() => {
      const subscriber = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot(
          (docSnapshot) => {
            const data = docSnapshot.data();
            setUser(data);
          },
          (e) => console.log(e)
        );
      return () => subscriber();
      //eslint-disable-next-line
    }, []);

  return (
    <>
      <Helmet>
        <title>Seroful - {user.displayName}'s Friends</title>
      </Helmet>
      <div className={styles.wrapper} style={{ overflow: "hidden" }}>
    <Paper className={styles.listBox}>
      <List>
        {user.friends && user.friends.current ?
        user.friends.current.map((x, i) => {
          const since = new Date(x.friendSince).toString();
          return (<Fragment key={i}>
            <ListItem>
              <ListItemAvatar>
                {x.photoURL ? <Avatar alt={x.username} src={x.photoURL} /> : <Avatar>{x.displayName[0]}</Avatar>}
              </ListItemAvatar>
              <ListItemText>
                {x.username}<span style={{ float: "right" }}><IconButton onClick={() => setMessage(y => y = {bool: true, recipient: x.username})}><SendIcon /></IconButton> <IconButton onClick={() => setDeleter(y => y = { username: x.username, bool: true })}><DeleteIcon /></IconButton></span>
                <br />Friend Since: {since.split(" ")[1]} {since.split(" ")[2]}
              </ListItemText>
            </ListItem>
          </Fragment>)
        }) : null}
        {user.friends.current.length === 0 ? <h3>{`No friends found. I'll be your friend? <3`}</h3> : null}
        </List>
        </Paper>
      <PageDrawer />
      </div>
      <Dialog open={message && message.bool} onClose={() => setMessage(null)}>
              <DialogTitle style={{ textAlign: "center" }}>New Message To: {message && message.recipient}</DialogTitle>
              <DialogContent>
                <TextField
                  variant="outlined"
                  defaultValue=""
                  inputRef={msgRef}
                  label="Message Content"
                  style={{ width: 400 }}
                />
                <Divider />
                <Button
                  startIcon={<CloseIcon />}
                  onClick={() => setMessage(null)}
                >
                  Cancel
                </Button>
                <Button
                  style={{ float: "right" }}
                  startIcon={<SendIcon />}
                  onClick={() => {
                    api
                      .sendMessage(
                        user.username,
                        message.recipient,
                        msgRef.current.value
                      )
                      .then(setMessage(null));
                  }}
                >
                  Send Message
                </Button>
              </DialogContent>
            </Dialog>
            <Dialog open={deleter && deleter.bool} onClose={() => setDeleter(null)}>
            <DialogTitle>Are you sure you want to delete {deleter && deleter.username}?</DialogTitle>
            <DialogActions>
            <Button
                  style={{ float: "right" }}
                  onClick={() => setDeleter(null)}
                >
                  No
                </Button>
            <Button
                  style={{ float: "right" }}
                  onClick={() => {
                    api.deleteFriend(deleter.username)
                    setDeleter(null);
                  }}
                >
                  Yes
                </Button>
            </DialogActions>
            </Dialog>
    </>
  );
};
