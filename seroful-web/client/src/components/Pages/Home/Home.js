import { Button } from "@material-ui/core";
import React, { useRef } from "react";
import { Helmet } from "react-helmet";

import { userState } from "../../../store/store";
import { useRecoilValue } from "recoil";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import * as api from "../../../util/api";
// import { homeStyles } from "../../../styles/homeStyles";
import { TextField } from "@material-ui/core";

export const Home = () => {
  const activeUser = useRecoilValue(userState);
  const inputRef = useRef();
  return (
    <>
      <Helmet>
        <title>Seroful - Home</title>
      </Helmet>
      <TextField inputRef={inputRef} label="Add Friend Test Shit" />
<<<<<<< HEAD
      {/*<Button onClick={() => {
        api.addFriend(username)
      }}>Add Friend or Some Shit</Button>*/}
=======
      <Button
        onClick={() => {
          api.addFriend(inputRef.current.value, activeUser.username);
        }}
      >
        Add Friend or Some Shit
      </Button>
>>>>>>> e9e45b5fe785f5827bb853fc9094d54efca8eb0b
      <PageDrawer />
    </>
  );
};
