import React, { useState, useEffect, useRef } from "react";

import ButtonBase from "@material-ui/core/ButtonBase";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import Typography from "@material-ui/core/Typography";
import { participantStyles } from "../../../styles/participantStyles";
import { userState } from "../../../store/store";
import { useRecoilValue } from "recoil";

export const Participant = ({ participant }) => {
  const styles = participantStyles();
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();
  const [vidTogg, setVidTogg] = useState(false);
  const [audTogg, setAudTogg] = useState(false);
  const image = useRecoilValue(userState);
  console.log(image);

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
    toggleVideo();
    //eslint-disable-next-line
  }, [vidTogg]);

  useEffect(() => {
    toggleAudio();
    //eslint-disable-next-line
  }, [audTogg]);

  const toggleVideo = () => {
    if (participant && participant.videoTracks) {
      return vidTogg
        ? participant.videoTracks.forEach((tracks) => tracks && tracks.track !== null ? tracks.track.disable() : null)
        : participant.videoTracks.forEach((tracks) => tracks && tracks.track !== null ? tracks.track.enable() : null);
    } else return null;
  };
  const toggleAudio = () => {
    if (participant && participant.audioTracks) {
      return audTogg
        ? participant.audioTracks.forEach((tracks) => tracks && tracks.track !== null ? tracks.track.disable() : null)
        : participant.audioTracks.forEach((tracks) => tracks && tracks.track !== null ? tracks.track.enable() : null);
    } else return null;
  };

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
      <div className={styles.container}>
        <h4 className={styles.header}>{participant.identity}</h4>
        <video className={styles.partVid} ref={videoRef} autoPlay={true} />
        {/* <img src={image.photoURL} /> */}
        <audio ref={audioRef} autoPlay={true} />
        <div className={styles.butts}>
          <ButtonBase
            onClick={() => setAudTogg(!audTogg)}
            className={styles.muteButt}
          >
            {!audTogg ? <MicIcon /> : <MicOffIcon />}
          </ButtonBase>
          <ButtonBase
            onClick={() => setVidTogg(!vidTogg)}
            className={styles.vidButt}
          >
            {!vidTogg ? <VideocamIcon /> : <VideocamOffIcon />}
          </ButtonBase>
        </div>
      </div>
    </>
  );
};

// <Card>
//   <CardActionArea>
//     <CardContent>
//       <Typography gutterBottom variant="h5" component="h2">
//         {participant.identity}
//       </Typography>
//     </CardContent>
//     <MuiCardMedia
//     component='video'
//       alt={`${participant.identity}`}
//       height="140"
//       src={videoRef}
//       autoPlay={true}

//     />
//     <MuiCardMedia
//       component="audio"
//       src={audioRef}
//       autoPlay={true}
//       muted={false}
//     />
//   </CardActionArea>
//   <CardActions>
//     <ButtonBase size="small" color="primary">
//       {/*TODO: conditionally render MuteIcon/MutedIcon*/}
//     </ButtonBase>
//     <ButtonBase size="small" color="primary">
//       {/*TODO: conditionally render VideoIcon/VideoOffIcon*/}
//     </ButtonBase>
//   </CardActions>
// </Card>
