import React, { useRef, useState } from "react";
import { MediaRequest } from "./MediaRequest";

const constraints = { video: { facingMode: "environment" }, audio: true };

export const UserMedia = () => {
  const ref = useRef();
  const media = MediaRequest(constraints);
  if (media && ref.current && !ref.current.srcObject) {
    ref.current.srcObject = media;
    ref.current.play();
  }
  return (
    <>
      UserMedia foo
      <video
        style={{ border: "1px solid", width: "200px", height: "200px" }}
        ref={ref}
        autoPlay
        muted
      ></video>
    </>
  );
};
