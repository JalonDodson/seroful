import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, ButtonBase } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Video from "twilio-video";
import { Participant } from "./Participant";
import * as api from "../../../util/api";
import { roomStyles } from "../../../styles/roomStyles";

export const Room = ({ roomName, token, handleExit }) => {
  const styles = roomStyles();

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [ logoutReq, setLogout] = useState(false);
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
    <>
      <Helmet>
        <title>Seroful - {roomName}</title>
      </Helmet>
      <div className={styles.container}>
        <header className={styles.header}>
          <hr />
          <Typography variant="h3" className={styles.title}>
            Room: {roomName}
          </Typography>
          <hr />
        </header>
        <div className={styles.locPart}>
          {room ? (
            <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            />
            ) : (
              ""
              )}
              <Button className={styles.logoutButt} onClick={() => setLogout(true)}>Say Goodbye</Button>
        </div>
        <Dialog
        open={logoutReq}
        onClose={() => setLogout(false)}
        aria-label='logout-modal'
        aria-describedby='logout-modal'>
          <DialogTitle id='logout-title'>Are You Sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Would you REALLY like to leave the meeting?
            </DialogContentText>
            <div className={styles.buttCont}>
            <Link onClick={handleExit} to='/'>
            <DoneIcon label='' />
            Yes, Leave
            </Link>
            <ButtonBase onClick={() => setLogout(false)}>
              <CloseIcon label='' />
              Oops, Stay
            </ButtonBase>
            </div>
          </DialogContent>
        </Dialog>
        <h3>Remote Participants</h3>
        <div className={styles.remParts}>{remoteParticipants}</div>
      </div>
    </>
  );
};
