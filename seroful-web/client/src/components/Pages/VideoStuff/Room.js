import { StylesContext } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
// i love u bro
export const Room = ({ roomName, token, handleLogout }) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const remoteParticipants = participants.map((part) => (
        <p key={part.sid}>{part.identity}</p>
    ));
    useEffect(() => {
        const partiConnected = (participant) => {
            setParticipants((prevParti) => [...prevParti, participant])
        };
        const partiDisconnected = (participant) => {
            setParticipants((prevParti) => prevParti.filter((part) => part !== participant));
        };
        Video.connect(token, {
            name: roomName,
        }).then((room) => {
            setRoom(room);
            room.on('participantConnected', partiConnected);
            room.on('participantDisconnected', partiDisconnected);
        });
    });
    // wAT THE FUCK WHY
    return (
        <div className='room'>
            <h4>Room: {roomName}</h4>
            <button onClick={handleLogout}>Logout</button>
            <div className='local-participant'>
                {room ? (
                    <p key={room.localParticipant.sid}>{room.localParticipant.identity}</p>
                ) : (
                    ''
                )}
            </div>
            <h6>Remote Participants</h6>
            <div className='remote-participants'>{remoteParticipants}</div>
        </div>
    );
};