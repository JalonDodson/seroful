import React from "react";

export const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4>Please Enter a Room</h4>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="field"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="room">Room name:</label>
          <input
            type="text"
            id="room"
            value={roomName}
            onChange={handleRoomNameChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
