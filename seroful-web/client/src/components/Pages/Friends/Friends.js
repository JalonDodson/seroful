import React from "react";
import { Helmet } from "react-helmet";


import { PageDrawer } from "../../PageDrawer/PageDrawer";
// import { friendsStyles } from "../../../styles/friendsStyles";

export const Friends = () => {
    // const styles = friendsStyles();
  return (
    <>
      <Helmet>
        <title>Seroful - Friends</title>
      </Helmet>
      <PageDrawer />
    </>
  );
};
