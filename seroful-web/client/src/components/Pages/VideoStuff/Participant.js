import React, { useState, useEffect, useRef } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MuiCardMedia from "@material-ui/core/CardMedia";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { participantStyles } from "../../../styles/participantStyles";

export const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();
  const styles = participantStyles();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const subscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((prevVids) => [...prevVids, track]);
      } else {
        setAudioTracks((prevAud) => [...prevAud, track]);
      }
    };
    const unsubscribe = (track) => {
      if (track.type === "video") {
        setVideoTracks((prevVids) => prevVids.filter((t) => t !== track));
      } else {
        setAudioTracks((prevAud) => prevAud.filter((t) => t !== track));
      }
    };
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", subscribed);
    participant.on("trackUnsubscribed", unsubscribe);

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
    <>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {participant.identity}
            </Typography>
          </CardContent>
          <MuiCardMedia
          component='video'
            alt={`${participant.identity}`}
            height="140"
            src={videoRef}
            autoPlay={true}
            
          />
          <MuiCardMedia
            component="audio"
            src={audioRef}
            autoPlay={true}
            muted={false}
          />
        </CardActionArea>
        <CardActions>
          <ButtonBase size="small" color="primary">
            {/*TODO: conditionally render MuteIcon/MutedIcon*/}
          </ButtonBase>
          <ButtonBase size="small" color="primary">
            {/*TODO: conditionally render VideoIcon/VideoOffIcon*/}
          </ButtonBase>
        </CardActions>
      </Card>
    </>
  );
};

{/* <div className="participant">
  <h4>{participant.identity}</h4>
  <video ref={videoRef} autoPlay={true} />
  <audio ref={audioRef} autoPlay={true} muted={false} />
</div>; */}
