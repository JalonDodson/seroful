import React, { useState, useCallback } from "react";

import { Lobby } from './Lobby';
import { Room } from './Room';
 
export const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((ev) => {
    setUsername(ev.target.value);
  },{}); 
  const handleRoomNameChange = useCallback((ev) => {
    setRoomName(ev.target.value);
  },{});
  const handleSubmit = useCallback(async (ev) => {
      ev.preventDefault();
        const data = await fetch('/video/token', {
            method: 'POST',
            body: JSON.stringify({
                identity: username,
                room: roomName,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
        setToken(data.token);
  }, [username, roomName]);
  const handleLogout = useCallback((ev) => {
      setToken(null);
  }, []);
  let render;
  token ? render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
  ) : render = (
    <Lobby
    username={username}
    roomName={roomName}
    handleUsernameChange={handleUsernameChange}
    handleRoomNameChange={handleRoomNameChange}
    handleSubmit={handleSubmit}
 />
  );
  return render;
};

// TODO: need to set&&send VideoChat to it's own pathway to be rendered 