import React from "react";
import { Helmet } from "react-helmet";

import { PageDrawer } from "../../PageDrawer/PageDrawer";

export const Planner = (props) => {
  return (
    <>
      <Helmet>
        <title> Seroful - User's Production Planner</title>
      </Helmet>
      <PageDrawer />
      <h1>something here</h1>
    </>
  );
};
