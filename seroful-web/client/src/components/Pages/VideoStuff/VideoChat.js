import React from "react";
import { Helmet } from "react-helmet";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { Room } from "./Room";
// import { videoStyles } from '../../../styles/videoStyles';
import { useRecoilState, useRecoilValue } from "recoil";
import { videoToken, roomData } from "../../../store/store";

export const VideoChat = () => {
  // const styles = videoStyles();
  const newRoomData = useRecoilValue(roomData);
  const [token, setToken] = useRecoilState(videoToken);
  const handleExit = () => setToken(null);

  let render;
  token
    ? (render = (
        <>
        <Helmet>
          <title>Seroful - Video Chat</title>
        </Helmet>
        <PageDrawer />
        <Room roomName={newRoomData} token={token} handlExit={() => handleExit} />
        </>
      ))
    : render = null;
  return render;
};

// TODO: need to set&&send VideoChat to it's own pathway to be rendered
