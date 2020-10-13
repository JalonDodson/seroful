import React, { useState, useEffect, useRef } from 'react';

export const Participant = ({ participant }) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);
    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap) => Array.from(trackMap.values()).map((publication) => publication.track).filter((track) => track !== null);

    useEffect(() => {
        const subscribed = (track) => {
            if (track.kind === 'video') {
                setVideoTracks((prevVids) => [...prevVids, track]);
            } else {
                setAudioTracks((prevAud) => [...prevAud, track]);
            };
        };
        const unsubscribe = (track) => {
            if (track.type === 'video') {
                setVideoTracks((prevVids) => prevVids.filter((t) => t !== track));
            } else {
                setAudioTracks((prevAud) => prevAud.filter((t) => t !== track));
            };
        };
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        participant.on('trackSubscribed', subscribed);
        participant.on('trackUnsubscribed', unsubscribe);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);
    useEffect(() => {
      const videoTrack = videoTracks[0];
      if (videoTrack) {
        videoTrack.attach(videoRef.current);
        return () => {
          videoTrack.detach();
        };
      }
    }, [videoTracks]);
    useEffect(() => {
      const audioTrack = audioTracks[0];
      if (audioTrack) {
        audioTrack.attach(audioRef.current);
        return () => {
            audioTrack.detach();
        };
      }
    }, [audioTracks]);
    return (
        <div className='participant'>
            <h4>{participant.identity}</h4>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} autoPlay={true} muted={true} />
        </div>
    );
};