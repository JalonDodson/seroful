import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { Room } from "./Room";
import * as api from "../../../util/api";
import { Button, TextField } from "@material-ui/core";
import { videoStyles } from '../../../styles/videoStyles';

export const VideoChat = () => {
    const styles = videoStyles();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((ev) => {
    setUsername(ev.target.value);
  }, []);
  const handleRoomNameChange = useCallback((ev) => {
    setRoomName(ev.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (ev) => {
      console.log(username, roomName);
      ev.preventDefault();
      const data = await api.createRoom(username, roomName);
      data && setToken(data.token);
    },
    [username, roomName]
  );
  const connectToRoom = async () => {
    const data = await api.connectToRoom(username, roomName);
    data && setToken(data.token);
  };

  const handleLogout = useCallback((ev) => {
    setToken(null);
  }, []);
  let render;
  token
    ? (render = (
        <>
        <Helmet>
          <title>Seroful - Settings</title>
        </Helmet>
        <PageDrawer />
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        </>
      ))
    : (render = (
        <>
        <Helmet>
          <title>Seroful - Settings</title>
        </Helmet>
        <PageDrawer />
          {/* <Lobby
            username={username}
            roomName={roomName}
            handleUsernameChange={handleUsernameChange}
            handleRoomNameChange={handleRoomNameChange}
            handleSubmit={handleSubmit}
          /> */}
          <br />
          <br />
          <div className={styles.container}>
          <TextField
            onChange={(ev) => setUsername(ev.target.value)}
            label="Username"
          />
          <TextField
            onChange={(ev) => setRoomName(ev.target.value)}
            label="Room Name"
          />
          <Button onClick={() => connectToRoom()}>Connect to Room</Button>
          </div>
        </>
      ));
  return render;
};

// TODO: need to set&&send VideoChat to it's own pathway to be rendered
