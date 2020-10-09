import { Button } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";

import { userState } from "../../../store/store";
import { useRecoilValue } from "recoil";

import { PageDrawer } from "../../PageDrawer/PageDrawer";
// import { homeStyles } from "../../../styles/homeStyles";

export const Home = () => {
  const activeUser = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Seroful - Home</title>
      </Helmet>
      <Button style={{ left: "50%" }} onClick={() => console.log(activeUser)}>Click Me</Button>
      <PageDrawer />
    </>
  );
};
