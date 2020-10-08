import { useState, useEffect } from "react";

export const MediaRequest = (requestedMedia) => {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    async function userStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream((m) => (m = stream));
      } catch (error) {
        console.log("Failed: " + error);
      }
    }
    if (!mediaStream) {
      userStream();
    } else {
      const cleanup = () => {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);
  console.log(mediaStream);
  return mediaStream;
};
