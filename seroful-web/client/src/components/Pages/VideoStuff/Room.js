import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import { Participant } from "./Participant";
import * as api from "../../../util/api";
import { roomStyles } from "../../../styles/roomStyles";

export const Room = ({ roomName, token, handleExit }) => {
  const styles = roomStyles();

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const remoteParticipants = participants.map((part) => (
    <Participant key={part.sid} participant={part} />
  ));
  useEffect(() => {
    const partiConnected = (participant) => {
      console.log(participant);
      setParticipants((prevParti) => [...prevParti, participant]);
    };
    const partiDisconnected = (participant) => {
      setParticipants((prevParti) =>
        prevParti.filter((part) => part !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then(async (room) => {
      setRoom(room);
      console.log(room.participants);
      room.on("participantConnected", partiConnected);
      room.on("participantDisconnected", partiDisconnected);
      room.participants.forEach(partiConnected);
    });
    
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach((trackPublication) => {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  return (
    <div className={styles.container}>
      <h4>Room: {roomName}</h4>
      <button onClick={handleExit}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};
