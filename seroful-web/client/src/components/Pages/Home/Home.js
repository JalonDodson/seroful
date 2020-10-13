import { Button } from "@material-ui/core";
import React, { useRef } from "react";
import { Helmet } from "react-helmet";

import { userState } from "../../../store/store";
import { useRecoilValue, useRecoilState } from "recoil";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import * as api from "../../../util/api";
import { homeStyles } from "../../../styles/homeStyles";
import { TextField, Typography } from "@material-ui/core";
import { VideoChat } from '../VideoStuff/VideoChat';

export const Home = () => {
  const styles = homeStyles();
  const activeUser = useRecoilValue(userState);
  const [user, setUser] = useRecoilState(userState);
  const inputRef = useRef();
  return (
    <>
      <Helmet>
        <title>Seroful - Home</title>
      </Helmet>
      <div className={styles.container}>
      <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            You're Home {user.displayName}!
          </Typography>
          <hr />
        </header>
      <TextField inputRef={inputRef} label="Add Friend Test Shit" />
      <Button
        onClick={() => {
          api.addFriend(inputRef.current.value, activeUser.username);
        }}
      >
        Add Friend or Some Shit
      </Button>
      <VideoChat />
      <PageDrawer />
      </div>
    </>
  );
};
